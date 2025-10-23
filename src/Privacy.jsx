// Privacy.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "./LuxyLanding";

export default function Privacy() {
  useEffect(() => {
    document.title = "Privacy Policy — Clickclick";
  }, []);

  return (
    <>
      <Navbar />

      {/* HEADER */}
      <header className="border-b bg-gray-50 text-gray-900">
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center">
            Privacy Policy
          </h1>
          <p className="text-center text-sm text-gray-500 mt-3">
            Effective from: <time dateTime="2025-09-10">10 September 2025</time> • Version 1.1
          </p>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="bg-gray-50 text-gray-900">
        <div className="max-w-3xl mx-auto px-4 py-10 md:py-14 leading-relaxed text-gray-800 space-y-10">

          {/* Section 1 */}
          <section>
            <h2 className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-3">
              Section 1 — Introduction
            </h2>
            <p>
              This Privacy Policy explains how <strong>Clickclick</strong> collects, uses, shares, and protects
              your personal data when using <strong>clickclick.id</strong> and our services. We process data in
              accordance with <strong>Law No. 27 of 2022 on Personal Data Protection</strong> (UU PDP).
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-3">
              Section 2 — Data Controller Identity
            </h2>
            <p>
              <strong>Clickclick</strong><br />
              Address: Ruang Auditorium, LPP, Jl. Urip Sumoharjo No.100, 2nd Floor, Klitren, Gondokusuman,
              Yogyakarta, Indonesia 55222<br />
              Email:{" "}
              <a href="mailto:officialclickclick@gmail.com" className="underline">
                officialclickclick@gmail.com
              </a>
              <br />
              WhatsApp:{" "}
              <a
                href="https://wa.me/6282146151597"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                +62 821-4615-1597
              </a>
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-3">
              Section 3 — Data We Collect
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Contact & shipping details</strong>: name, email, phone, address.</li>
              <li><strong>Transaction data</strong>: products, price, status, payment reference (tokenized by Midtrans).</li>
              <li><strong>Device & usage data</strong>: cookies, IP, browser type, referrer, pages visited.</li>
              <li><strong>Support data</strong>: customer queries and correspondence.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-3">
              Section 4 — Legal Basis & Purposes
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Contract performance</strong>: order processing, payment, shipping, after-sales service.</li>
              <li><strong>Legal compliance</strong>: bookkeeping, taxation, claim handling.</li>
              <li><strong>Legitimate interests</strong>: fraud prevention, security, service improvement.</li>
              <li>
                <strong>Consent</strong>: marketing communications (newsletter, promotions). Consent may be withdrawn anytime.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-3">
              Section 5 — Data Sharing
            </h2>
            <p>Data may be shared with third-party processors bound by data processing agreements:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>Midtrans</strong> — payment processing & fraud detection.</li>
              <li>
                <strong>Couriers</strong> — NE, TIKI, SiCepat, Anteraja, Pos Indonesia, J&T Express, Ninja Xpress,
                Lion Parcel, GoSend, GrabExpress.
              </li>
              <li><strong>Hosting/CDN</strong> — Hostinger.</li>
              <li><strong>Email/Communication</strong> — Gmail (officialclickclick@gmail.com).</li>
            </ul>
            <p className="mt-2">We do not sell your personal data.</p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-3">
              Section 6 — Data Retention
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Transactions & billing: up to <strong>5 years</strong> for compliance purposes.</li>
              <li>Accounts & support: active duration plus <strong>2 years</strong>.</li>
              <li>Cookies: until expired or manually deleted.</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-3">
              Section 7 — Your Rights
            </h2>
            <p className="mb-4">
              You have the right to request: access, copy, correction, deletion, restriction, portability, and withdrawal
              of consent.
            </p>
            <p>
              To exercise your rights, contact us at{" "}
              <a href="mailto:officialclickclick@gmail.com" className="underline">
                officialclickclick@gmail.com
              </a>{" "}
              with subject “Personal Data Request.” Please provide reasonable proof of identity. We typically respond
              within <strong>14 business days</strong>.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-3">
              Section 8 — Security
            </h2>
            <p>
              Payments are processed in PCI-DSS certified environments. We use HTTPS, encryption, and access controls.
              In case of a high-risk data breach, we will notify you in accordance with legal requirements.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-3">
              Section 9 — Children
            </h2>
            <p>
              Services are not directed to individuals under 18. If we become aware of data collected without parental
              consent, it will be deleted.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-3">
              Section 10 — Changes
            </h2>
            <p>
              This policy may be updated periodically. The latest version will always be available on this page with an
              updated effective date.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-sm font-semibold tracking-wider text-gray-500 uppercase mb-3">
              Section 11 — Contact
            </h2>
            <p>
              Email:{" "}
              <a href="mailto:officialclickclick@gmail.com" className="underline">
                officialclickclick@gmail.com
              </a>
              <br />
              WhatsApp:{" "}
              <a
                href="https://wa.me/6282146151597"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                +62 821-4615-1597
              </a>
              <br />
              Address: Ruang Auditorium, LPP, Jl. Urip Sumoharjo No.100, 2nd Floor, Klitren, Gondokusuman,
              Yogyakarta 55222
            </p>
          </section>
        </div>
      </main>

      {/* FOOTER (hapus jika sudah pakai FooterSection global) */}
      <footer className="bg-white border-t text-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
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