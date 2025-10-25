import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../cart/CartContext";

const PROTECTION_PRICE = 30000;

// helper normalisasi berat/dimensi item
function normalizeCartWeights(list, defaultPerItemGram = 500) {
  if (!Array.isArray(list)) return [];
  return list.map((i) => ({
    ...i,
    weight_gram: Number(i.weight_gram || i.weight || defaultPerItemGram),
    length_cm: Number(i.length_cm || i.length || 0),
    width_cm: Number(i.width_cm || i.width || 0),
    height_cm: Number(i.height_cm || i.height || 0),
  }));
}

export default function CheckoutPage() {
  /* ==========================
     AMBIL DATA CART DARI CONTEXT
  ========================== */
  const {
    items: cartItems = [],
    total: contextTotal = 0,
  } = useCart();

  // kita simpan cart lokal hanya sebagai snapshot ter-normalisasi
  const [cart, setCart] = useState([]);

  // setiap cartItems berubah (qty naik/turun di drawer), sync ke sini
  useEffect(() => {
    setCart(normalizeCartWeights(cartItems));
  }, [cartItems]);

  /* ==========================
     CONSTANT & CONFIG
  ========================== */
  const [withProtection, setWithProtection] = useState(false);

  const CREATE_URL = "http://localhost:8000/create-transaction.php";
  const SHIP_URL = "https://clickclick.id/api/shipping-rates.php";

  // Subsidi ongkir Indonesia
  const ID_SUBSIDY_MAX = 50000; // Rp 50.000

  // Voucher rules
  const VOUCHERS = {
    CLICK50K: { type: "flat", amount: 50000, minSubtotal: 200000 },
    CLICK10: { type: "percent", amount: 10, max: 100000 },
    "DEV-20K": { type: "set-total", amount: 20000 },
    CLICK4U50: { type: "flat", amount: 50000 },
  };

  const ALPHA2_TO_3 = { ID: "IDN", SG: "SGP", MY: "MYS" };

  /* ==========================
     CONTACT & ADDRESS FORM STATE
  ========================== */
  const [email, setEmail] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  const [country, setCountry] = useState("ID");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");

  /* ==========================
     SHIPPING STATE
  ========================== */
  const [shippingOptions, setShippingOptions] = useState([]); // [{id, name, fee, original_fee, subsidy}]
  const [selectedShip, setSelectedShip] = useState(null); // {id,name,fee}
  const [shipNote, setShipNote] = useState(
    "Masukkan kota & provinsi untuk melihat opsi pengiriman."
  );
  const [loadingShip, setLoadingShip] = useState(false);

  /* ==========================
     VOUCHER / DISKON STATE
  ========================== */
  const [voucherInput, setVoucherInput] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState(null); // {code}
  const [discountValue, setDiscountValue] = useState(0);

  /* ==========================
     ERROR / SUBMIT STATE
  ========================== */
  const [errMsg, setErrMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  /* ==========================
     MIDTRANS CONFIG
  ========================== */
  const MIDTRANS_CLIENT_KEY = "Mid-client-PrSR529Mau_EpIYA"; // sandbox vs prod
  const MID_ENV =
    MIDTRANS_CLIENT_KEY.indexOf("SB-") === 0 ? "sandbox" : "production";

  /* ==========================
     HELPERS
  ========================== */
  function fIDR(n) {
    const safe = Math.max(0, Math.floor(n || 0));
    return new Intl.NumberFormat("id-ID").format(safe);
  }

  function toAbs(src) {
    try {
      return new URL(src || "/assets/placeholder.png", window.location.origin)
        .href;
    } catch (e) {
      return src || "/assets/placeholder.png";
    }
  }

  function ceilToStep(n, step) {
    const st = Math.max(1, step | 0);
    return Math.ceil(n / st) * st;
  }

  function totalActualWeightGram(list) {
    if (!Array.isArray(list)) return 0;
    return list.reduce((sum, i) => {
      const g = Math.max(0, Number(i.weight_gram) || 0);
      const qty = Math.max(0, Number(i.qty) || 0);
      return sum + g * qty;
    }, 0);
  }

  function totalVolumetricWeightGram(list, divisorCm) {
    if (!Array.isArray(list)) return 0;
    return list.reduce((sum, i) => {
      const L = Number(i.length_cm) || Number(i.length) || 0;
      const W = Number(i.width_cm) || Number(i.width) || 0;
      const H = Number(i.height_cm) || Number(i.height) || 0;
      const qty = Math.max(0, Number(i.qty) || 0);
      if (L > 0 && W > 0 && H > 0) {
        const kg = (L * W * H) / (divisorCm || 6000);
        return sum + Math.round(kg * 1000) * qty; // gram
      }
      return sum;
    }, 0);
  }

  function chargeableDomesticGram(list) {
    const actual = totalActualWeightGram(list);
    const vol = totalVolumetricWeightGram(list, 6000);
    const charge = Math.max(actual, vol);
    return ceilToStep(Math.max(1, charge), 1000); // min 1kg
  }

  function chargeableIntlGram(list) {
    const actual = totalActualWeightGram(list);
    const vol = totalVolumetricWeightGram(list, 5000);
    const charge = Math.max(actual, vol);
    return ceilToStep(Math.max(500, charge), 500); // min 0.5kg
  }

  function humanWeight(g) {
    return (g / 1000).toFixed(2).replace(/\.00$/, "") + " kg";
  }

  function getCountryAlpha3(c2) {
    const up = (c2 || country || "ID").toUpperCase();
    return ALPHA2_TO_3[up] || up;
  }

  // subtotal barang murni
  const baseSubtotal = useMemo(() => {
    return cart.reduce(
      (s, i) => s + Number(i.price || 0) * Number(i.qty || 0),
      0
    );
  }, [cart]);

  // subtotal final yg ditampilkan user (barang + optional protection)
  const subtotal = useMemo(() => {
    return baseSubtotal + (withProtection ? PROTECTION_PRICE : 0);
  }, [baseSubtotal, withProtection]);

  // normalisasi alamat Indo (Jakarta / DIY Yogyakarta)
  function normalizeAddressID(addr) {
    const clean = (s) => (s || "").toString().trim();
    const out = {
      country: addr.country || "ID",
      city: clean(addr.city),
      province: clean(addr.province),
      zip: clean(addr.zip),
    };

    if (/(jakarta)/i.test(out.city) || /(jakarta)/i.test(out.province)) {
      out.province = "DKI Jakarta";
      const s = (out.city + " " + out.province).toLowerCase();
      if (/barat/.test(s)) out.city = "Jakarta Barat";
      else if (/timur/.test(s)) out.city = "Jakarta Timur";
      else if (/selatan/.test(s)) out.city = "Jakarta Selatan";
      else if (/utara/.test(s)) out.city = "Jakarta Utara";
      else if (/pusat/.test(s)) out.city = "Jakarta Pusat";
    }

    if (
      /yogya|yogyakarta|jogja/i.test(out.city) ||
      /yogya|yogyakarta|jogja/i.test(out.province)
    ) {
      out.province = "DI Yogyakarta";
    }

    return out;
  }

  function currentAddress() {
    const raw = {
      country,
      city,
      province,
      zip,
    };
    if ((raw.country || "").toUpperCase() === "ID") {
      return normalizeAddressID(raw);
    }
    return raw;
  }

  // hitung diskon dari voucher terpilih
  function calcDiscount(sub, fee) {
    if (!appliedVoucher || !appliedVoucher.code) return 0;
    const rule = VOUCHERS[appliedVoucher.code];
    if (!rule) return 0;

    if (rule.type === "flat") {
      if (rule.minSubtotal && sub < rule.minSubtotal) return 0;
      return Math.min(rule.amount, sub);
    }

    if (rule.type === "percent") {
      const cut = Math.floor(sub * (rule.amount / 100));
      return Math.min(rule.max || cut, cut);
    }

    if (rule.type === "set-total") {
      const target = Math.max(1000, rule.amount | 0);
      const current = sub + (fee || 0);
      return current > target ? current - target : 0;
    }

    return 0;
  }

  /* ==========================
     LOAD SHIPPING PROTECTION TOGGLE (once)
  ========================== */
  useEffect(() => {
    const saved = localStorage.getItem("shippingProtection");
    if (saved) {
      try {
        setWithProtection(JSON.parse(saved));
      } catch (_) {
        // ignore parse error
      }
    }
  }, []);

  /* ==========================
     SHIPPING FETCHER
  ========================== */
  async function fetchShipping() {
    // minimal city & province isi dulu
    if (!city.trim() || !province.trim()) {
      setShippingOptions([]);
      setSelectedShip(null);
      setShipNote("Masukkan kota & provinsi untuk melihat opsi pengiriman.");
      return;
    }

    // tentuin domestic / international
    const isDomestic = country.toUpperCase() === "ID";
    const weightGram = isDomestic
      ? chargeableDomesticGram(cart)
      : chargeableIntlGram(cart);

    setLoadingShip(true);
    setSelectedShip(null);
    setShipNote("Mengambil tarif pengiriman...");

    try {
      const res = await fetch(SHIP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city,
          province,
          country,
          weight_gram: Math.max(1, weightGram),
        }),
      });

      const data = await res.json();
      let opts = Array.isArray(data.methods) ? data.methods : [];

      // apply subsidi domestik
      if (isDomestic) {
        opts = opts.map((opt) => {
          const original = Number(opt.fee || 0);
          const cut = Math.min(ID_SUBSIDY_MAX, original);
          return {
            ...opt,
            original_fee: original,
            subsidy: cut,
            fee: Math.max(0, original - cut),
          };
        });
      }

      // fallback kalau gak ada opsi
      if (!opts.length) {
        opts = [{ id: "PICKUP", name: "Ambil di Toko", fee: 0 }];
      }

      // sort by fee
      opts.sort((a, b) => Number(a.fee) - Number(b.fee));

      setShippingOptions(opts);

      // auto pilih opsi pertama
      const first = opts[0];
      if (first) {
        setSelectedShip({
          id: first.id,
          name: first.name,
          fee: Number(first.fee || 0),
        });
      }

      // build catatan
      let note = isDomestic
        ? `Subsidi ongkir Indonesia: potongan sampai IDR ${fIDR(
            ID_SUBSIDY_MAX
          )} / pengiriman.`
        : first?.etd
        ? `Estimasi: ${first.etd} hari`
        : "";

      const wShow = isDomestic
        ? chargeableDomesticGram(cart)
        : chargeableIntlGram(cart);

      note +=
        (note ? " " : "") +
        `(Berat tertagih: ${humanWeight(wShow)}${
          isDomestic ? ", dibulatkan ke 1 kg" : ", dibulatkan ke 0.5 kg"
        })`;

      setShipNote(note);
    } catch (e) {
      // fallback pickup
      const fallback = [{ id: "PICKUP", name: "Ambil di Toko", fee: 0 }];
      setShippingOptions(fallback);
      setSelectedShip({ id: "PICKUP", name: "Ambil di Toko", fee: 0 });
      setShipNote(
        "Tidak dapat memuat tarif kurir. Menampilkan opsi Pickup. (Berat tidak dihitung)"
      );
    } finally {
      setLoadingShip(false);
    }
  }

  // refetch shipping setiap address/cart berubah (debounce ringan)
  useEffect(() => {
    const t = setTimeout(fetchShipping, 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, city, province, zip, cart]);

  /* ==========================
     DISCOUNT / TOTAL
  ========================== */
  const {
    safeTotal,
    shippingFeeDisplay,
    discountDisplay,
    subDisplay,
    totalDisplay,
  } = useMemo(() => {
    const shipFee = selectedShip ? Number(selectedShip.fee || 0) : 0;
    const dVal = calcDiscount(subtotal, shipFee);

    const rawTotal = subtotal + shipFee - dVal;
    const finalTotal = Math.max(0, rawTotal);

    return {
      safeTotal: finalTotal,
      shippingFeeDisplay: selectedShip
        ? `IDR ${fIDR(shipFee)}`
        : "Enter shipping address",
      discountDisplay: `IDR ${fIDR(dVal)}`,
      subDisplay: `IDR ${fIDR(subtotal)}`,
      totalDisplay: fIDR(finalTotal),
    };
  }, [subtotal, selectedShip, appliedVoucher]);

  // sinkronkan nilai diskon numeriknya
  useEffect(() => {
    const shipFee = selectedShip ? Number(selectedShip.fee || 0) : 0;
    const dVal = calcDiscount(subtotal, shipFee);
    setDiscountValue(dVal);
  }, [subtotal, selectedShip, appliedVoucher]);

  /* ==========================
     APPLY VOUCHER
  ========================== */
  function handleApplyVoucher(e) {
    e.preventDefault();
    const code = (voucherInput || "").trim().toUpperCase();
    if (!code || !VOUCHERS[code]) {
      setAppliedVoucher(null);
      setErrMsg("Kode tidak valid.");
      return;
    }
    setAppliedVoucher({ code });
    setErrMsg("");
  }

  /* ==========================
     VALIDATION
  ========================== */
  function validateForm() {
    if (!cart.length) return "Keranjang kosong.";
    if (!email.trim()) return "Email wajib diisi.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      return "Format email tidak valid.";
    if (!firstName.trim()) return "First name wajib diisi.";
    if (!lastName.trim()) return "Last name wajib diisi.";
    if (!address1.trim()) return "Address wajib diisi.";
    if (!city.trim()) return "City wajib diisi.";
    if (!province.trim()) return "State/Province wajib diisi.";
    if (!zip.trim()) return "ZIP code wajib diisi.";
    if (!phone.trim()) return "Phone wajib diisi.";
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 8) return "Nomor telepon terlalu pendek.";
    if (!selectedShip) return "Silakan pilih metode pengiriman.";
    return "";
  }

  /* ==========================
     SUBMIT / CREATE TRANSACTION
  ========================== */
  async function handlePlaceOrder() {
    setErrMsg("");
    const v = validateForm();
    if (v) {
      setErrMsg(v);
      return;
    }

    const shipFee = selectedShip ? Number(selectedShip.fee || 0) : 0;
    const orderId = "CC-" + Date.now();

    const itemsForSnap = cart.map((i) => ({
      id: i.id,
      name: i.title,
      price: Number(i.price),
      quantity: Number(i.qty),
    }));

    if (withProtection) {
      itemsForSnap.push({
        id: "SHIP_PROTECT",
        name: "Shipping Protection",
        price: PROTECTION_PRICE,
        quantity: 1,
      });
    }

    if (discountValue > 0) {
      itemsForSnap.push({
        id: "DISCOUNT",
        name: "Voucher " + (appliedVoucher ? appliedVoucher.code : ""),
        price: -Math.min(discountValue, subtotal + shipFee),
        quantity: 1,
      });
    }

    const payload = {
      order_id: orderId,
      items: itemsForSnap,
      shipping_fee: shipFee,
      customer_details: {
        first_name: firstName || "Guest",
        last_name: lastName || "",
        email: email || "guest@example.com",
        phone: phone || "",
        shipping_address: {
          first_name: firstName || "Guest",
          last_name: lastName || "",
          phone: phone || "",
          address: [address1, address2].filter(Boolean).join(", "),
          city: city,
          postal_code: zip,
          country_code: getCountryAlpha3(country),
        },
      },
      callbacks: {
        finish:
          window.location.origin +
          "/thank-you.html?order_id=" +
          encodeURIComponent(orderId),
      },
      expiry: { unit: "days", duration: 1 },
      voucher: appliedVoucher ? appliedVoucher.code : null,
    };

    setSubmitting(true);

    try {
      const r = await fetch(CREATE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data;
      const ct = r.headers.get("content-type") || "";
      if (ct.includes("application/json")) {
        data = await r.json();
      } else {
        const text = await r.text();
        try {
          data = JSON.parse(text);
        } catch (err) {
          data = { error: text };
        }
      }

      if (!r.ok || !data || !data.token) {
        throw new Error(
          (data && data.error) ||
            `Gagal membuat transaksi (HTTP ${r.status})`
        );
      }

      // snapshot untuk halaman thank-you
      const snapshotItems = cart.map((i) => ({
        title: i.title,
        price: Number(i.price),
        qty: Number(i.qty),
        image: toAbs(i.image || i.img || i.image_url),
      }));

      if (withProtection) {
        snapshotItems.push({
          title: "Shipping Protection",
          price: PROTECTION_PRICE,
          qty: 1,
          image: "",
        });
      }

      if (discountValue > 0) {
        snapshotItems.push({
          title: "Voucher " + (appliedVoucher ? appliedVoucher.code : ""),
          price: -Math.min(discountValue, subtotal + shipFee),
          qty: 1,
          image: "",
        });
      }

      const snapshot = {
        order_id: orderId,
        items: snapshotItems,
        subtotal,
        shippingFee: shipFee,
        discount: discountValue,
        total: Math.max(0, subtotal + shipFee - discountValue),
        customer: {
          name: (firstName + " " + lastName).trim(),
          email,
          phone,
          address: {
            line1: address1,
            line2: address2,
            city,
            province,
            zip,
            country,
          },
        },
        status: "PENDING",
      };

      try {
        sessionStorage.setItem(
          "last_checkout_snapshot",
          JSON.stringify(snapshot)
        );
        localStorage.setItem("last_order_id", orderId);
      } catch (_) {}

      // redirect -> Snap Midtrans
      if (data.redirect_url) {
        window.location.href = data.redirect_url;
      } else if (MID_ENV === "production") {
        window.location.href =
          "https://app.midtrans.com/snap/v4/redirection/" + data.token;
      } else {
        window.location.href =
          "https://app.sandbox.midtrans.com/snap/v4/redirection/" +
          data.token;
      }
    } catch (err) {
      setErrMsg(err?.message || "Terjadi kesalahan.");
      setSubmitting(false);
    }
  }

  /* ==========================
     LOAD MIDTRANS SNAP SCRIPT
  ========================== */
  useEffect(() => {
    const s = document.createElement("script");
    s.src =
      MID_ENV === "production"
        ? "https://app.midtrans.com/snap/snap.js"
        : "https://app.sandbox.midtrans.com/snap/snap.js";
    s.type = "text/javascript";
    s.setAttribute("data-client-key", MIDTRANS_CLIENT_KEY);
    document.body.appendChild(s);
  }, [MID_ENV, MIDTRANS_CLIENT_KEY]);

  /* ==========================
     RENDER
  ========================== */
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-[1100px] mx-auto h-16 flex items-center justify-between px-4">
          <Link
            to="/"
            className="text-2xl font-black tracking-tight"
          >
            CLICKCLICK
          </Link>
          <Link
            to="/"
            className="text-sm underline decoration-gray-300 hover:decoration-gray-700"
          >
            Back to store
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-[1120px] mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* LEFT FORM */}
        <section className="lg:col-span-7 space-y-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            {/* Contact */}
            <div className="space-y-3">
              <h2 className="text-xl font-semibold">Contact</h2>
              <div>
                <label className="block text-[13px] text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full h-11 rounded-lg border border-gray-300 px-3 text-[15px] outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <label className="flex items-center gap-3 text-sm text-gray-700">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                  checked={newsletter}
                  onChange={(e) => setNewsletter(e.target.checked)}
                />
                Email me with news and offers
              </label>
            </div>

            {/* Delivery */}
            <div className="mt-6 space-y-3">
              <h2 className="text-xl font-semibold">Delivery</h2>
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-12">
                  <label className="block text-[13px] text-gray-700 mb-1">
                    Country/Region
                  </label>
                  <select
                    className="w-full h-11 rounded-lg border border-gray-300 px-3 text-[15px] outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="ID">Indonesia</option>
                    <option value="SG">Singapore</option>
                    <option value="MY">Malaysia</option>
                  </select>
                </div>

                <div className="col-span-12 sm:col-span-6">
                  <label className="block text-[13px] text-gray-700 mb-1">
                    First name
                  </label>
                  <input
                    className="w-full h-11 rounded-lg border border-gray-300 px-3 text-[15px] outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className="col-span-12 sm:col-span-6">
                  <label className="block text-[13px] text-gray-700 mb-1">
                    Last name
                  </label>
                  <input
                    className="w-full h-11 rounded-lg border border-gray-300 px-3 text-[15px] outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div className="col-span-12">
                  <label className="block text-[13px] text-gray-700 mb-1">
                    Address
                  </label>
                  <div className="relative">
                    <input
                      className="w-full h-11 rounded-lg border border-gray-300 px-3 pr-10 text-[15px] outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400"
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                    <svg
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeWidth="2"
                        d="M21 21l-4.35-4.35M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z"
                      />
                    </svg>
                  </div>
                </div>

                <div className="col-span-12">
                  <label className="block text-[13px] text-gray-700 mb-1">
                    Apartment, suite, dll (opsional)
                  </label>
                  <input
                    className="w-full h-11 rounded-lg border border-gray-300 px-3 text-[15px] outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </div>

                <div className="col-span-12 sm:col-span-4">
                  <label className="block text-[13px] text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    className="w-full h-11 rounded-lg border border-gray-300 px-3 text-[15px] outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400"
                    placeholder="contoh: Jakarta Barat / Sleman"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>

                <div className="col-span-12 sm:col-span-4">
                  <label className="block text-[13px] text-gray-700 mb-1">
                    State/Province
                  </label>
                  <select
                    className="w-full h-11 rounded-lg border border-gray-300 px-3 text-[15px] outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                  >
                    <option value="">Pilih provinsi</option>
                    <option>Aceh</option>
                    <option>Sumatera Utara</option>
                    <option>Sumatera Barat</option>
                    <option>Riau</option>
                    <option>Jambi</option>
                    <option>Sumatera Selatan</option>
                    <option>Bengkulu</option>
                    <option>Lampung</option>
                    <option>Kepulauan Bangka Belitung</option>
                    <option>Kepulauan Riau</option>
                    <option>DKI Jakarta</option>
                    <option>Jawa Barat</option>
                    <option>Jawa Tengah</option>
                    <option>DI Yogyakarta</option>
                    <option>Jawa Timur</option>
                    <option>Banten</option>
                    <option>Bali</option>
                    <option>Nusa Tenggara Barat</option>
                    <option>Nusa Tenggara Timur</option>
                    <option>Kalimantan Barat</option>
                    <option>Kalimantan Tengah</option>
                    <option>Kalimantan Selatan</option>
                    <option>Kalimantan Timur</option>
                    <option>Kalimantan Utara</option>
                    <option>Sulawesi Utara</option>
                    <option>Sulawesi Tengah</option>
                    <option>Sulawesi Selatan</option>
                    <option>Sulawesi Tenggara</option>
                    <option>Gorontalo</option>
                    <option>Sulawesi Barat</option>
                    <option>Maluku</option>
                    <option>Maluku Utara</option>
                    <option>Papua</option>
                    <option>Papua Tengah</option>
                    <option>Papua Pegunungan</option>
                    <option>Papua Selatan</option>
                    <option>Papua Barat</option>
                    <option>Papua Barat Daya</option>
                  </select>
                </div>

                <div className="col-span-12 sm:col-span-4">
                  <label className="block text-[13px] text-gray-700 mb-1">
                    ZIP code
                  </label>
                  <input
                    className="w-full h-11 rounded-lg border border-gray-300 px-3 text-[15px] outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                  />
                </div>

                <div className="col-span-12">
                  <label className="block text-[13px] text-gray-700 mb-1">
                    Phone
                  </label>
                  <div className="relative">
                    <input
                      className="w-full h-11 rounded-lg border border-gray-300 px-3 pr-10 text-[15px] outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400"
                      placeholder="+62…"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <svg
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeWidth="2"
                        d="M15 17h5l-1.4-4.2A2 2 0 0 0 16.7 11H15m0 6V8a2 2 0 0 0-2-2H6v9a2 2 0 0 0 2 2h7Z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping method */}
            <div className="mt-6 space-y-3">
              <h2 className="text-xl font-semibold">Shipping method</h2>

              {/* Kalau blm bisa load opsi, tombol info */}
              {!shippingOptions.length && !loadingShip ? (
                <button
                  type="button"
                  className="
                    w-full
                    rounded-xl border
                    font-semibold
                    text-left
                    px-4 py-3
                    text-[13px] leading-snug
                    sm:h-11 sm:py-0 sm:text-[15px]
                    hover:bg-gray-50
                  "
                  onClick={fetchShipping}
                >
                  Enter your shipping address to view available shipping methods.
                </button>
              ) : null}

              {/* Daftar opsi shipping */}
              {shippingOptions.length > 0 && (
                <div className="space-y-2">
                  {shippingOptions.map((opt, idx) => {
                    const checked = selectedShip?.id === opt.id;
                    return (
                      <label
                        key={opt.id || idx}
                        className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="ship"
                          checked={checked}
                          onChange={() =>
                            setSelectedShip({
                              id: opt.id,
                              name: opt.name,
                              fee: Number(opt.fee || 0),
                            })
                          }
                        />
                        <div>
                          <div className="font-medium">{opt.name}</div>
                          {opt.original_fee != null &&
                          opt.original_fee !== opt.fee ? (
                            <>
                              <div className="text-xs text-gray-500 line-through">
                                IDR {fIDR(opt.original_fee)}
                              </div>
                              <div className="text-xs text-gray-700">
                                IDR {fIDR(opt.fee)} (subsidi IDR{" "}
                                {fIDR(opt.subsidy)})
                              </div>
                            </>
                          ) : (
                            <div className="text-xs text-gray-500">
                              IDR {fIDR(opt.fee)}
                            </div>
                          )}
                        </div>
                      </label>
                    );
                  })}
                </div>
              )}

              <p className="text-xs text-gray-500">{shipNote}</p>
            </div>

            {/* Payment info-only */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-3">Payment</h2>
              <div className="rounded-2xl border border-gray-200 bg-white p-4 space-y-3">
                <p className="text-sm text-gray-700">
                  Your payment will be handled securely on Midtrans. Click{" "}
                  <strong>Pay now</strong>, to proceed and select{" "}
                  <span className="font-medium">
                    Virtual Account (BCA/BNI/BRI), QRIS,
                  </span>{" "}
                  or{" "}
                  <span className="font-medium">Credit/Debit Card</span>.
                </p>
                <div className="flex flex-wrap gap-2 text-[11px] text-gray-600">
                  <span className="px-2 py-1 rounded border">VA BCA</span>
                  <span className="px-2 py-1 rounded border">VA BNI</span>
                  <span className="px-2 py-1 rounded border">VA BRI</span>
                  <span className="px-2 py-1 rounded border">QRIS</span>
                  <span className="px-2 py-1 rounded border">
                    Credit/Debit
                  </span>
                </div>
                <div className="text-[11px] text-gray-500 flex items-center gap-1">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    className="text-gray-400"
                  >
                    <path
                      fill="currentColor"
                      d="M12 2a6 6 0 0 0-6 6v3H5a1 1 0 0 0-1 1v9h16v-9a1 1 0 0 0-1-1h-1V8a6 6 0 0 0-6-6Zm0 2a4 4 0 0 1 4 4v3H8V8a4 4 0 0 1 4-4Z"
                    />
                  </svg>
                  All transactions are secure and encrypted.
                </div>
              </div>
            </div>

            {/* Save info */}
            <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-4 space-y-3">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                />
                <span className="text-sm">
                  Save my information for a faster checkout with a Shop
                  account
                </span>
              </label>
              <div>
                <label className="block text-[13px] text-gray-700 mb-1">
                  Mobile phone number
                </label>
                <input
                  className="w-full h-11 rounded-lg border border-gray-300 px-3 text-[15px] outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400"
                  placeholder="+62"
                />
              </div>
              <div className="text-[11px] text-gray-500 flex items-center gap-1">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  className="text-gray-400"
                >
                  <path
                    fill="currentColor"
                    d="M12 2a6 6 0 0 0-6 6v3H5a1 1 0 0 0-1 1v9h16v-9a1 1 0 0 0-1-1h-1V8a6 6 0 0 0-6-6Zm0 2a4 4 0 0 1 4 4v3H8V8a4 4 0 0 1 4-4Z"
                  />
                </svg>
                Secure and encrypted
              </div>
            </div>

            {/* Submit */}
            <div className="mt-6">
              <button
                className="h-12 rounded-xl bg-gray-900 text-white font-semibold hover:opacity-90 px-6 w-full md:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={submitting}
                onClick={handlePlaceOrder}
              >
                {submitting
                  ? "Processing..."
                  : "Pay now & Continue to Midtrans"}
              </button>

              {errMsg ? (
                <p
                  className="mt-2 text-sm text-red-600"
                  aria-live="polite"
                >
                  {errMsg}
                </p>
              ) : null}
            </div>
          </div>
        </section>

        {/* RIGHT SUMMARY */}
        <aside className="lg:col-span-5">
          <div className="sticky top-20 rounded-2xl border border-gray-200 bg-white p-6">
            <div className="space-y-4">
              {cart.length ? (
                cart.map((i, idx) => (
                  <div
                    className="flex items-center gap-3"
                    key={idx + "-" + i.id}
                  >
                    <img
                      src={toAbs(i.image || i.img || i.image_url)}
                      alt={i.title || "item"}
                      className="w-14 h-14 rounded-md object-cover bg-gray-50"
                    />
                    <div className="flex-1">
                      <div className="text-sm">
                        {i.title || "-"}
                      </div>
                      <div className="text-xs text-gray-500">
                        Qty {i.qty || 0}
                      </div>
                    </div>
                    <div className="text-sm font-medium">
                      IDR{" "}
                      {fIDR(
                        Number(i.price || 0) * Number(i.qty || 0)
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500">
                  Keranjang kosong.
                </div>
              )}
            </div>

            {/* Voucher */}
            <div className="mt-4 flex gap-2">
              <input
                className="w-full h-11 rounded-lg border border-gray-300 px-3 text-[15px] outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400"
                placeholder="Discount code or gift card"
                value={voucherInput}
                onChange={(e) => setVoucherInput(e.target.value)}
              />
              <button
                className="h-11 px-4 rounded-xl border font-semibold hover:bg-gray-50"
                onClick={handleApplyVoucher}
              >
                Apply
              </button>
            </div>

            {/* Price breakdown */}
            <div className="mt-6 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{subDisplay}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{shippingFeeDisplay}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Discount</span>
                <span>{discountDisplay}</span>
              </div>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between items-baseline">
              <span className="text-xl font-semibold">Total</span>
              <div className="text-right">
                <div className="text-xs text-gray-500">IDR</div>
                <div className="text-xl font-semibold">{totalDisplay}</div>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
