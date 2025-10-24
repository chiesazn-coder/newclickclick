import React, { useEffect, useState, useMemo } from "react";

export default function ThankYouPage() {
  // =========================
  // Helpers
  // =========================
  function fmt(n) {
    return new Intl.NumberFormat("id-ID").format(
      Math.max(0, Math.floor(n || 0))
    );
  }

  function toAbs(src) {
    try {
      return new URL(src || "assets/placeholder.png", window.location.href)
        .href;
    } catch (e) {
      return src || "assets/placeholder.png";
    }
  }

  function midToUi(s) {
    switch (String(s || "").toLowerCase()) {
      case "capture":
      case "settlement":
        return "PAID";
      case "pending":
        return "PENDING";
      case "deny":
        return "DENIED";
      case "cancel":
        return "CANCELLED";
      case "expire":
        return "EXPIRED";
      default:
        return "";
    }
  }

  function mapServerToUi(s) {
    s = String(s || "").toLowerCase();
    if (s === "paid" || s === "settlement" || s === "capture") return "PAID";
    if (s === "pending") return "PENDING";
    if (s === "cancel") return "CANCELLED";
    if (s === "deny") return "DENIED";
    if (s === "expire") return "EXPIRED";
    if (s === "refund") return "REFUND";
    if (s === "chargeback") return "CHARGEBACK";
    return "PENDING";
  }

  function statusTag(statusRaw) {
    const s = String(statusRaw || "").toUpperCase();
    let cls = "pending";
    let txt = "Pending";

    if (s === "PAID" || s === "SETTLEMENT") {
      cls = "ok";
      txt = "Paid";
    } else if (
      s === "CANCELLED" ||
      s === "DENIED" ||
      s === "EXPIRED" ||
      s === "REFUND" ||
      s === "CHARGEBACK"
    ) {
      cls = "fail";
      txt = s === "EXPIRED" ? "Expired" : "Failed";
    }

    return (
      <span className={`tag ${cls}`}>
        Status: {txt}
      </span>
    );
  }

  // =========================
  // State
  // =========================
  const [orderId, setOrderId] = useState("");
  const [dataObj, setDataObj] = useState(null); // normalized order data
  const [invoiceHref, setInvoiceHref] = useState("javascript:void(0)");
  const [showMember, setShowMember] = useState(false);
  const [memberMsg, setMemberMsg] = useState("");
  const [finalized, setFinalized] = useState(false); // stop polling when final status reached

  // =========================
  // Derived values (safe fallbacks if dataObj belum siap)
  // =========================
  const subtotalDisplay = useMemo(() => {
    return "Rp " + fmt(dataObj?.subtotal || 0);
  }, [dataObj]);
  const shippingDisplay = useMemo(() => {
    return "Rp " + fmt(dataObj?.shippingFee || 0);
  }, [dataObj]);
  const discountDisplay = useMemo(() => {
    const d = dataObj?.discount || 0;
    return "Rp " + fmt(d);
  }, [dataObj]);
  const totalDisplay = useMemo(() => {
    return "Rp " + fmt(dataObj?.total || 0);
  }, [dataObj]);

  const hasDiscount = !!(dataObj && dataObj.discount > 0);

  // =========================
  // First load: grab snapshot from storage & URL
  // =========================
  useEffect(() => {
    // ambil query param
    const params = new URLSearchParams(window.location.search);
    const qOrderId =
      params.get("order_id") ||
      params.get("orderId") ||
      sessionStorage.getItem("last_order_id") ||
      localStorage.getItem("last_order_id") ||
      "";

    const qMidStat = String(params.get("transaction_status") || "").toLowerCase();

    setOrderId(qOrderId || "");

    // ambil snapshot order yg kita simpan waktu checkout
    let snapshot = null;
    try {
      const s1 = sessionStorage.getItem("last_checkout_snapshot");
      const s2 = localStorage.getItem("last_checkout_snapshot");
      snapshot = JSON.parse(s1 || s2 || "null");
    } catch (_) {
      snapshot = null;
    }

    // normalize snapshot ke bentuk dataObj kita
    if (snapshot && snapshot.order_id === qOrderId) {
      // override status kalau ada info status dari midtrans redirect (?transaction_status=...)
      const forcedStatus = midToUi(qMidStat);
      if (forcedStatus) {
        snapshot.status = forcedStatus;
      }

      // siapkan object normalisasi buat rendering
      const items = Array.isArray(snapshot.items)
        ? snapshot.items.map((it) => ({
            title: it.title || it.name || "Item",
            price: Number(it.price) || 0,
            qty: Number(it.qty || it.quantity) || 1,
            image: toAbs(it.image),
          }))
        : [];

      const subtotal = Number(
        snapshot.subtotal != null ? snapshot.subtotal : 0
      );
      const shipFee = Number(
        snapshot.shippingFee != null ? snapshot.shippingFee : 0
      );
      const discVal = Number(
        snapshot.discount != null ? snapshot.discount : 0
      );
      const totalVal = Number(
        snapshot.total != null ? snapshot.total : subtotal + shipFee - discVal
      );

      // customer block
      const cust = snapshot.customer || {};
      const addr = cust.address || {};

      // bentuk final state
      const shaped = {
        order_id: snapshot.order_id,
        status: snapshot.status || "PENDING",
        subtotal: subtotal,
        shippingFee: shipFee,
        discount: discVal,
        total: totalVal,
        customer: {
          name: (cust.name || "Guest").trim(),
          email: cust.email || "",
          phone: cust.phone || "",
          address: {
            line1: addr.line1 || "",
            line2: addr.line2 || "",
            city: addr.city || "",
            province: addr.province || "",
            zip: addr.zip || "",
            country: addr.country || "ID",
          },
        },
        items,
        userId: snapshot.userId || null,
      };

      // kalau status sudah paid, kosongkan cart lokal
      if (String(shaped.status).toUpperCase() === "PAID") {
        try {
          localStorage.removeItem("cc_cart_v1");
        } catch (_) {}
      }

      // membership banner logic
      try {
        const ssUid =
          localStorage.getItem("cc_user_id") ||
          sessionStorage.getItem("cc_user_id");
        const st = String(shaped.status || "").toUpperCase();
        if (
          shaped.userId &&
          (st === "PAID" || st === "SETTLEMENT")
        ) {
          const nm = shaped.customer.name || "Member";
          const mail = shaped.customer.email || "(no email)";
          if (ssUid && ssUid === shaped.userId) {
            setMemberMsg(
              `Hi ${nm}! Your membership account with ${mail} is now active.`
            );
          } else {
            setMemberMsg(
              `Membership for ${mail} is active and linked to this order.`
            );
          }
          setShowMember(true);
        } else {
          setShowMember(false);
        }
      } catch (_) {
        setShowMember(false);
      }

      // buat tombol "View in Dashboard (JSON)" versi data URL
      try {
        const hrefData =
          "data:application/json;charset=utf-8," +
          encodeURIComponent(JSON.stringify(snapshot, null, 2));
        setInvoiceHref(hrefData);
      } catch (_) {
        setInvoiceHref("javascript:void(0)");
      }

      setDataObj(shaped);

      // kalau status final, jangan polling
      const FINAL_STATES = [
        "PAID",
        "CANCELLED",
        "DENIED",
        "EXPIRED",
        "REFUND",
        "CHARGEBACK",
        "SETTLEMENT",
      ];
      if (FINAL_STATES.includes(String(shaped.status).toUpperCase())) {
        setFinalized(true);
      }
    } else {
      // snapshot tidak cocok / tidak ada
      setDataObj({
        order_id: qOrderId || "",
        status: "PENDING",
        subtotal: 0,
        shippingFee: 0,
        discount: 0,
        total: 0,
        items: [],
        customer: {
          name: "Guest",
          email: "",
          phone: "",
          address: {
            line1: "",
            line2: "",
            city: "",
            province: "",
            zip: "",
            country: "ID",
          },
        },
      });
      setInvoiceHref("javascript:void(0)");
      setShowMember(false);
    }
  }, []);

  // =========================
  // Polling status dari server/backend kamu
  // (opsional, akan mulai setelah mount dan berhenti kalau sudah final)
  // =========================
  useEffect(() => {
    if (!orderId) return;
    if (finalized) return;

    let stop = false;

    async function pollOnce() {
      // NOTE:
      // endpoint ini kamu nanti bikin sendiri di backend publik:
      // /api/order-status.php?order_id=...
      // sekarang saat masih lokal boleh aja gagal (404), tidak masalah.
      try {
        const r = await fetch(
          "/api/order-status.php?order_id=" + encodeURIComponent(orderId),
          { cache: "no-store" }
        );
        if (!r.ok) return;

        let j = {};
        try {
          j = await r.json();
        } catch (e) {
          j = {};
        }

        setDataObj((prev) => {
          if (!prev) return prev;

          // map status server -> UI status
          const mappedStatus = mapServerToUi(j.status);

          // rakit object baru pake data terbaru dari server (fallback ke snapshot lama untuk field yg kosong)
          const newObj = {
            ...prev,
            status: mappedStatus || prev.status,
            subtotal:
              j.subtotal != null ? j.subtotal : prev.subtotal,
            shippingFee:
              j.shippingFee != null ? j.shippingFee : prev.shippingFee,
            discount:
              j.discount != null ? j.discount : prev.discount,
            total: j.total != null ? j.total : prev.total,
            customer: {
              name:
                (j.customer && j.customer.name) ||
                prev.customer?.name ||
                "",
              email:
                (j.customer && j.customer.email) ||
                prev.customer?.email ||
                "",
              phone:
                (j.customer && j.customer.phone) ||
                prev.customer?.phone ||
                "",
              address: prev.customer?.address || {
                line1: "",
                line2: "",
                city: "",
                province: "",
                zip: "",
                country: "ID",
              },
            },
            // items tetap pakai snapshot awal (belum ada endpoint detail item per order)
            items: prev.items || [],
          };

          // update membership banner kalau sekarang status sudah paid
          const stUp = String(newObj.status || "").toUpperCase();
          if (
            stUp === "PAID" ||
            stUp === "SETTLEMENT"
          ) {
            try {
              localStorage.removeItem("cc_cart_v1");
            } catch (_) {}
          }

          // cek final state -> hentikan polling
          const FINAL_STATES = [
            "PAID",
            "CANCELLED",
            "DENIED",
            "EXPIRED",
            "REFUND",
            "CHARGEBACK",
            "SETTLEMENT",
          ];
          if (FINAL_STATES.includes(stUp)) {
            setFinalized(true);
          }

          // tombol invoice: kalau backend kamu nanti bisa return JSON langsung
          setInvoiceHref(
            `/api/order-status.php?order_id=${encodeURIComponent(orderId)}`
          );

          return newObj;
        });
      } catch (e) {
        // diam aja, ini optional
      }
    }

    // jalankan sekarang + interval
    pollOnce();
    const t = setInterval(() => {
      if (stop) return;
      if (finalized) return;
      pollOnce();
    }, 3000);

    return () => {
      stop = true;
      clearInterval(t);
    };
  }, [orderId, finalized]);

  // =========================
  // Render UI
  // =========================

  // bikin tampilan items belanja
  const renderedItems = (dataObj?.items || []).length ? (
    (dataObj.items || []).map((it, idx) => (
      <div className="item" key={idx}>
        <img
          className="thumb"
          src={toAbs(it.image)}
          alt=""
        />
        <div style={{ flex: 1 }}>
          <div>
            <strong>{it.title || "Item"}</strong>
          </div>
          <div className="small muted">Qty {it.qty || 0}</div>
        </div>
        <div>
          <strong>Rp {fmt((it.price || 0) * (it.qty || 0))}</strong>
        </div>
      </div>
    ))
  ) : (
    <div className="small muted">No items found.</div>
  );

  // detail penerima
  const custBlock = dataObj ? (
    <>
      <div>
        <strong>{dataObj.customer?.name || "Guest"}</strong>
      </div>
      <div className="muted small">{dataObj.customer?.email || "-"}</div>

      <div
        className="small"
        style={{ marginTop: 8 }}
      >
        {(dataObj.customer?.address?.line1 || "") +
          " " +
          (dataObj.customer?.address?.line2 || "")}
        <br />
        {(dataObj.customer?.address?.city || "") +
          " " +
          (dataObj.customer?.address?.province || "") +
          " " +
          (dataObj.customer?.address?.zip || "")}
        <br />
        {dataObj.customer?.address?.country || "ID"}
      </div>

      <div
        className="small muted"
        style={{ marginTop: 8 }}
      >
        Phone: {dataObj.customer?.phone || "-"}
      </div>
    </>
  ) : (
    <>Loading…</>
  );

  // status bar di atas
  const statusBar = (
    <div className="muted small" id="statusWrap">
      {statusTag(dataObj?.status || "PENDING")}{" "}
      <span className="small muted">
        Order ID: {orderId || "-"}
      </span>
    </div>
  );

  return (
    <>
      {/* Inline styles dari HTML original */}
      <style>{`
        :root{--ink:#0b1020;--muted:#6b7280;--ok:#10b981;--warn:#f59e0b;--bad:#ef4444;--bg:#f7f7fb;}
        *{box-sizing:border-box}
        body.react-thankyou-page-context & {
          background:var(--bg);
          color:var(--ink);
          font-family:Inter,system-ui,Arial,sans-serif;
        }
        .wrap{max-width:1020px;margin:40px auto;padding:0 16px}
        .card{background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:20px}
        h1{margin:0 0 8px;font-size:28px}
        h3{margin:8px 0 8px}
        .muted{color:var(--muted)}
        .grid{display:grid;gap:16px}
        @media(min-width:900px){.grid{grid-template-columns:2fr 1.2fr}}
        .row{display:flex;justify-content:space-between;align-items:center;margin:8px 0}
        .total{font-size:22px;font-weight:700}
        .tag{display:inline-flex;align-items:center;gap:6px;padding:6px 10px;border-radius:999px;font-size:12px;font-weight:600}
        .tag.ok{background:#ecfdf5;color:#065f46}
        .tag.pending{background:#fffbeb;color:#92400e}
        .tag.fail{background:#fef2f2;color:#991b1b}
        .items{display:flex;flex-direction:column;gap:12px;margin-top:8px}
        .item{display:flex;gap:12px;align-items:center}
        .thumb{width:56px;height:56px;border-radius:10px;background:#f3f4f6;object-fit:cover}
        .btn{display:inline-flex;align-items:center;justify-content:center;height:44px;padding:0 16px;border-radius:10px;
            border:1px solid #111827;background:#111827;color:#fff;text-decoration:none;font-weight:600;font-size:14px;line-height:1.2}
        .btn.ghost{background:#fff;color:#111827}
        .small{font-size:12px}
        .hr{height:1px;background:#f1f1f3;margin:16px 0}
        .totalLabel{font-size:22px;font-weight:700}
        .rowBtns{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}
        .member-banner{
          border:1px dashed #e5e7eb;
          border-radius:16px;
          background:#fff;
          padding:14px;
          margin:12px 0;
        }
        .member-title{
          font-weight:700;
          margin-bottom:4px;
        }
      `}</style>

      {/* wrapper untuk kasih background seperti <body> original */}
      <div
        className="react-thankyou-page-context"
        style={{
          background: "var(--bg)",
          color: "var(--ink)",
          fontFamily: "Inter,system-ui,Arial,sans-serif",
          minHeight: "100vh",
          margin: 0,
        }}
      >
        <div className="wrap grid">
          {/* LEFT: order summary */}
          <section className="card">
            <h1>Thank you! 🎉</h1>

            {statusBar}

            <div className="hr" />

            {/* Membership / account banner */}
            {showMember ? (
              <div className="member-banner">
                <div className="member-title">Membership active 🎉</div>
                <div className="small muted">{memberMsg}</div>
              </div>
            ) : null}

            <h3>Order Summary</h3>
            <div className="items">{renderedItems}</div>

            <div className="hr" />

            <div className="row">
              <span>Subtotal</span>
              <strong>{subtotalDisplay}</strong>
            </div>

            <div className="row muted">
              <span>Shipping</span>
              <span>{shippingDisplay}</span>
            </div>

            {hasDiscount ? (
              <div className="row muted">
                <span>Discount</span>
                <span>{discountDisplay}</span>
              </div>
            ) : null}

            <div className="row total">
              <span>Total</span>
              <span>{totalDisplay}</span>
            </div>

            <div className="hr" />

            <div className="rowBtns">
              <a className="btn ghost" href="/">
                Back to Store
              </a>
              <a
                className="btn"
                href={invoiceHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                View in Dashboard (JSON)
              </a>
            </div>

            <p className="small muted" style={{ marginTop: "8px" }}>
              {orderId ? `Order: ${orderId}` : "Order not found"}
            </p>

            <p className="small muted">
              The invoice and tracking number will be sent to you via email or
              WhatsApp.
            </p>
          </section>

          {/* RIGHT: customer details */}
          <aside className="card">
            <h3>Recipient Details</h3>
            <div className="small">{custBlock}</div>
          </aside>
        </div>
      </div>
    </>
  );
}
