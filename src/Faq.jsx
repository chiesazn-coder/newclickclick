// Faq.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "./LuxyLanding";

export default function Faq() {
  useEffect(() => {
    document.title = "FAQ — Clickclick";
  }, []);

  return (
    <>
      {/* Top notice */}
      <div className="bg-amber-100 text-amber-900 text-center text-sm py-2">
        ⚠️ Online payment feature is being prepared. For orders, please contact us via{" "}
        <a
          href="https://wa.me/c/6282146151597"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-semibold hover:text-amber-700"
        >
          WhatsApp
        </a>
        .
      </div>

      {/* Global navbar dari project */}
      <Navbar />

      {/* HERO / Header */}
      <header className="bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-sm text-gray-600">
            <ol className="flex items-center gap-2">
              <li>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>›</li>
              <li className="text-gray-900 font-medium">FAQ</li>
            </ol>
          </nav>

          <div className="mt-5">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="mt-2 text-gray-600">
              Find answers to the most common questions about Clickclick orders, shipping, returns, and more.
            </p>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main className="font-sans bg-gray-50 text-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          {/* FAQ 1 */}
          <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">1. How do I place an order?</h2>
            <p className="mt-2 text-gray-600">
              You can browse our products in the{" "}
              <Link to="/catalog" className="underline">
                Shop
              </Link>{" "}
              section and add them to your cart. At checkout, follow the instructions to confirm your shipping
              details and complete your payment securely via Midtrans.
            </p>
          </section>

          {/* FAQ 2 */}
          <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">2. What payment methods are accepted?</h2>
            <p className="mt-2 text-gray-600">
              Payments are processed through <strong>Midtrans</strong> in a PCI-DSS certified environment. We accept
              credit/debit cards, bank transfers (virtual accounts), and QRIS. Your card details are never stored on
              our site.
            </p>
          </section>

          {/* FAQ 3 */}
          <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">3. How long does shipping take?</h2>
            <p className="mt-2 text-gray-600">
              Orders are processed within 1 business day. Delivery time depends on your location: 1–3 days for
              Jabodetabek, 2–4 days for other areas of Java, 3–7 days for Sumatra, Kalimantan, Bali, and 4–10 days for
              Sulawesi, Nusa Tenggara, Papua. For details, see our{" "}
              <Link to="/shipping" className="underline">
                Shipping & Delivery
              </Link>{" "}
              page.
            </p>
          </section>

          {/* FAQ 4 */}
          <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">4. How can I track my order?</h2>
            <p className="mt-2 text-gray-600">
              A tracking number will be sent to you via WhatsApp or email once your order has been dispatched. You can
              use this tracking number on the courier’s website or app.
            </p>
          </section>

          {/* FAQ 5 */}
          <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">5. What is your return policy?</h2>
            <p className="mt-2 text-gray-600">
              You may request a return within 7 calendar days of receiving your order, provided the items are unused and
              in original condition. For defective or incorrect items, we cover return shipping and send replacements.
              See our{" "}
              <Link to="/returns" className="underline">
                Returns & Exchanges
              </Link>{" "}
              page for full details.
            </p>
          </section>

          {/* FAQ 6 */}
          <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">6. Do your products have a warranty?</h2>
            <p className="mt-2 text-gray-600">
              Yes, Clickclick products come with a limited 12-month warranty covering manufacturing defects. Warranty
              claims require proof of purchase and follow manufacturer’s terms.
            </p>
          </section>

          {/* FAQ 7 */}
          <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">7. How can I contact customer support?</h2>
            <p className="mt-2 text-gray-600">You can reach us during business hours (Mon–Fri, 09:00 – 18:00 WIB) via:</p>
            <ul className="mt-2 list-disc pl-5 text-gray-600 space-y-1">
              <li>
                WhatsApp:{" "}
                <a
                  href="https://wa.me/c/6282146151597"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  +62 821-4615-1597
                </a>
              </li>
              <li>
                Email:{" "}
                <a href="mailto:officialclickclick@gmail.com" className="underline">
                  officialclickclick@gmail.com
                </a>
              </li>
            </ul>
          </section>
        </div>
      </main>

      {/* Footer halaman (hapus jika sudah pakai FooterSection global di layout) */}
      <footer className="bg-white border-t border-black/5 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600">© 2025 Clickclick, All rights reserved.</p>
          <nav className="flex items-center gap-6 text-gray-700">
            <Link to="/privacy" className="hover:opacity-80">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:opacity-80">
              Terms of Service
            </Link>
            <Link to="/contact" className="hover:opacity-80">
              Contact
            </Link>
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
  font-weight:300; font-size:14px; line-height:1; white-space:nowrap; color:#111; text-decoration:none;
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