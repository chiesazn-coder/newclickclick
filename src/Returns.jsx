// Returns.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "./LuxyLanding";
import ScrollToTop from "./ScrollToTop";


export default function Returns() {
  useEffect(() => {
    document.title = "Returns & Exchanges — Clickclick";
  }, []);

  return (
    <>
      <ScrollToTop />
      <Navbar />

      {/* Header */}
      <header className="border-b bg-gray-50 text-gray-900">
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center">
            Returns & Exchanges
          </h1>
          <p className="text-center text-sm text-gray-500 mt-3">
            Last updated: <time dateTime="2025-09-11">11 September 2025</time>
          </p>
        </div>
      </header>

      {/* Main */}
      <main className="bg-gray-50 text-gray-900">
        <div className="max-w-3xl mx-auto px-4 py-10 md:py-14 leading-relaxed text-gray-800">
          {/* Section 1 */}
          <section className="mb-10">
            <h2 className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-3">
              Section 1 — Return Window & Conditions
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Request within <strong>7 calendar days</strong> of receipt
                (courier tracking).
              </li>
              <li>
                Items must be unused and returned with original
                box/accessories/manuals.
              </li>
              <li>Video evidence is recommended for defective/missing items claims.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="mb-10">
            <h2 className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-3">
              Section 2 — Defective / Wrong Item
            </h2>
            <p>
              We cover return shipping and send a replacement after verification
              of photo/video evidence.
            </p>
          </section>

          {/* Section 3 */}
          <section className="mb-10">
            <h2 className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-3">
              Section 3 — Exchanges for Preference
            </h2>
            <p>
              For color/model preference exchanges, return and re-shipping costs
              are borne by the customer. Items must remain in resalable
              condition.
            </p>
          </section>

          {/* Section 4 */}
          <section className="mb-10">
            <h2 className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-3">
              Section 4 — Return Process
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                Contact us (WhatsApp/Email) with subject:{" "}
                <em>Return/Exchange — Order Number</em>.
              </li>
              <li>Attach proof of purchase, photos/videos, and reasons.</li>
              <li>Wait for approval and return instructions.</li>
              <li>Ship the item using secure packaging.</li>
              <li>After inspection, we process a replacement or refund.</li>
            </ol>
          </section>

          {/* Section 5 */}
          <section className="mb-10">
            <h2 className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-3">
              Section 5 — Refund Method
            </h2>
            <p>
              Refunds are issued to the original payment method or via bank
              transfer within <strong>3–7 business days</strong> after item
              inspection.
            </p>
          </section>

          {/* Section 6 */}
          <section className="mb-10">
            <h2 className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-3">
              Section 6 — Exclusions
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Damage caused by misuse, impact, or modification.</li>
              <li>
                Specific clearance/promo items may be non-returnable (stated on
                the product page).
              </li>
            </ul>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-3">
              Section 7 — 12-Month Warranty
            </h2>
            <p>
              Clickclick products are covered by a limited 12-month warranty
              against manufacturing defects; claims require proof of purchase
              and follow the manufacturer’s terms.
            </p>
          </section>
        </div>
      </main>

      {/* Page footer (hapus jika sudah pakai FooterSection global) */}
      <footer className="bg-white border-t text-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-gray-600">© 2025 Clickclick. All rights reserved.</p>
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-700">
            <Link to="/terms" className="hover:underline">Terms</Link>
            <Link to="/privacy" className="hover:underline">Privacy</Link>
            <Link to="/shipping" className="hover:underline">Shipping</Link>
            <Link to="/returns" className="hover:underline">Returns</Link>
            <Link to="/contact" className="hover:underline">Contact</Link>
          </nav>
        </div>
      </footer>
      <style>{Navbarcss}</style>
    </>
  );
}

const Navbarcss =`

/* HEADER */
.navbar{position:sticky;top:0;z-index:50;background:#fff;transition:box-shadow .25s ease}
.navbar.scrolled{box-shadow:0 8px 24px rgba(0,0,0,.06)}

/* Row 1: Logo (Poppins Light) */
.logo-row{border-bottom:1px solid #eee}
.logo{
  display:block; text-align:center;
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial; /* keep original font for logo */
  font-weight:900; letter-spacing:3.5px;
  font-size:32px; padding:20px 0; color:#000; text-decoration:none;
  -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale;
}

/* Row 2: Menu */
.menu-row{background:#fff;border-bottom:1px solid #eee}
.menu-inner{position:relative;height:66px}

/* Burger (mobile) */
.menu-toggle{display:none;position:absolute;left:0;top:50%;transform:translateY(-50%);border:0;background:transparent;padding:10px;cursor:pointer}
.menu-toggle span{display:block;width:22px;height:2px;background:#111;border-radius:2px;margin:3px 0}

/* Centered menu (Poppins Light) */
.nav-center{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;align-items:center;gap:42px}
.nav-center a{
  display:inline-flex;align-items:center;gap:6px;padding:0 6px;
  font-family:"Poppins", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial;
  font-weight:500; font-size:14px; line-height:1; white-space:nowrap; color:#111; text-decoration:none;
  -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale;
}
.nav-center a svg{margin-top:1px;opacity:.7}
.nav-center a:hover{color:#ff007a}
.nav-center a.highlight{color:#ff007a}

/* Actions kanan */
.actions-right{position:absolute;right:5%;top:50%;transform:translateY(-50%);display:flex;align-items:center;gap:14px}
.icon-btn{background:transparent;border:0;padding:6px;cursor:pointer;position:relative}
.cart-count{position:absolute;top:-4px;right:-6px;background:#000;color:#fff;border-radius:999px;font-size:10px;padding:2px 5px}

/* ==== MOBILE NAV like reference ==== */
@media (max-width: 980px){
  /* anchor bar kedua */
  .menu-inner{ height:56px; position:relative; }

  /* tombol burger + animasi X */
  .menu-toggle{ display:block; z-index:110; }
  .menu-toggle span{ width:22px; height:2px; background:#111; border-radius:2px; margin:4px 0; transition:.2s; }
  .menu-toggle.is-open span:nth-child(1){ transform: translateY(6px) rotate(45deg); }
  .menu-toggle.is-open span:nth-child(2){ opacity:0; }
  .menu-toggle.is-open span:nth-child(3){ transform: translateY(-6px) rotate(-45deg); }

  /* tidak butuh overlay untuk dropdown */
  .nav-overlay{ display:none !important; }

  /* RESET total style desktop pada nav-center */
  .nav-center{
    position: absolute !important;   /* bukan absolute+center */
    top: 100% !important;            /* nempel di bawah .menu-inner */
    left: 0 !important; right: 0 !important;
    transform: none !important;      /* matikan translate(-50%, -50%) */
    display: block !important;       /* jangan flex baris */
    background:#fff;
    border-top:1px solid #eee;
    box-shadow:0 10px 20px rgba(0,0,0,.06);
    overflow:hidden;
    z-index:100;

    /* efek dropdown */
    max-height:0;
    opacity:0;
    visibility:hidden;
    transition: max-height .28s ease, opacity .2s ease, visibility 0s linear .28s;
  }
  .nav-center.open{
    max-height:75vh;
    opacity:1;
    visibility:visible;
    transition: max-height .32s ease, opacity .2s ease;
  }

  /* item jadi kolom + garis + chevron */
  .nav-center a{
    display:flex; align-items:center; justify-content:space-between;
    width:100%;
    padding:18px 16px;
    font-size:20px; font-weight:400; color:#111;
    border-bottom:1px solid #eee;
  }
  .nav-center a:last-child{ border-bottom:0; }
  .nav-center a::after{ content:"›"; font-size:20px; opacity:.6; }
  .nav-center a.highlight{ color:#111; }

  /* posisi ikon kanan & logo lebih rapat */
  .actions-right{ right:16px; }
  .logo-row .logo{ padding:16px 0; }
}

/* Actions kanan */
.actions-right{position:absolute;right:5%;top:50%;transform:translateY(-50%);display:flex;align-items:center;gap:14px}
.icon-btn{background:transparent;border:0;padding:6px;cursor:pointer;position:relative}
.cart-count{position:absolute;top:-4px;right:-6px;background:#000;color:#fff;border-radius:999px;font-size:10px;padding:2px 5px}

/* Mobile */
@media (max-width: 920px){
  .menu-row{border-bottom:0}
  .menu-toggle{display:block}
  .nav-center{display:none}
  .nav-center.open{display:flex;position:static;transform:none;padding:14px 0;border-top:1px solid #eee;border-bottom:1px solid #eee;flex-wrap:wrap;gap:16px;justify-content:flex-start}
  .actions-right{right:12px}
}
`