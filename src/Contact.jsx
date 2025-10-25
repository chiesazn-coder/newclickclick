// Contact.jsx
import React from "react";
import { Navbar, FooterSection } from "./LuxyLanding";

const Container = ({ children, className = "" }) => (
  <div className={`cc-container ${className}`}>{children}</div>
);

export default function Contact() {
  return (
    <>
        <Navbar />
        <main className="cc-contact-page">
            <Container>

                <ContactForm /> 

                {/* Row 1: WhatsApp + Email */}
                <section className="cc-grid cc-grid--two">
                <article className="cc-card">
                    <h3 className="cc-card-title">WhatsApp</h3>
                    <a href="https://wa.me/6282146151597" className="cc-main-link">
                    +62 821-4615-1597
                    </a>
                    <p className="cc-muted">Quick response during business hours.</p>
                </article>

                <article className="cc-card">
                    <h3 className="cc-card-title">Email</h3>
                    <a href="mailto:officialclickclick@gmail.com" className="cc-main-link">
                    officialclickclick@gmail.com
                    </a>
                    <p className="cc-muted">
                    For complaints or order tracking, please include your order number.
                    </p>
                </article>
                </section>

                {/* Row 2: Business Address (full width) */}
                <section className="cc-grid">
                <article className="cc-card">
                    <h3 className="cc-card-title">Business Address</h3>
                    <p className="cc-body">
                    Ruang Auditorium, LPP, Jl. Urip Sumoharjo No.100, 2nd Floor,<br/>
                    Klitren, Gondokusuman, Yogyakarta, Indonesia 55222
                    </p>
                    <p className="cc-muted">
                    Business Hours: Monday – Friday, 09:00 – 18:00 WIB
                    </p>
                </article>
                </section>

                {/* Row 3: Quick FAQ (full width) */}
                <section className="cc-grid">
                <article className="cc-card">
                    <h3 className="cc-card-title">Quick FAQ</h3>
                    <ul className="cc-list">
                    <li>
                        Tracking numbers are sent automatically once the package is handed
                        over to the courier.
                    </li>
                    <li>
                        To request a return/warranty claim, contact us via WhatsApp or
                        email (include photo/video evidence).
                    </li>
                    <li>
                        Payments are processed securely via Midtrans; we do not store your
                        card data.
                    </li>
                    </ul>
                </article>
                </section>
            </Container>
        </main>
      <FooterSection />
     <style>{css}</style>
    </>

  );
}

function ContactForm() {
    const onSubmit = (e) => {
      e.preventDefault();
      // TODO: kirim ke backend / service (EmailJS, Formspree, API sendiri)
      alert("Thanks! Your message has been sent.");
    };
  
    return (
      <section className="cc-form">
        <h2 className="cc-form-title">CONTACT US</h2>
        <p className="cc-form-sub">
          We'd love to hear from you.
          Please fill out the form below or email us at{" "}
          <a href="mailto:officialclickclick@gmail.com">officialclickclick@gmail.com</a>.
          We aim to reply within 24 hours.
        </p>
  
        <form className="cc-form-grid" onSubmit={onSubmit}>
          <div className="cc-field">
            <input type="text" name="name" placeholder="Name" required />
          </div>
          <div className="cc-field">
            <input type="email" name="email" placeholder="Email" required />
          </div>
          <div className="cc-field cc-field--full">
            <textarea name="message" rows="8" placeholder="Comment" required />
          </div>
  
          <button type="submit" className="cc-btn">
            SEND MESSAGE
          </button>
        </form>
      </section>
    );
}
  

const css = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;900&display=swap');

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

/* ========== CART DRAWER (Luxy airy style) ========== */
:root{
  --cart-bg:#fff;
  --cart-text:#111;
  --cart-muted:#6b7280;
  --cart-border:#eef0f4;
  --cart-shadow: -18px 0 40px rgba(0,0,0,.10);
  --cart-accent:#111;      /* ganti kalau mau brand color */
}

.cart-overlay{
  position:fixed; inset:0;
  background:rgba(0,0,0,.42);
  opacity:0; visibility:hidden;
  transition:opacity .2s ease, visibility 0s linear .2s;
  z-index:98;
}
.cart-overlay.show{ opacity:1; visibility:visible; transition:opacity .2s ease; }

.cart-drawer,
.cart-drawer *{ font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial; }

.cart-drawer{
  position:fixed; top:0; right:0;
  height:100vh;
  width:min(520px, 38vw);          /* lebih slim & premium */
  background:var(--cart-bg);
  box-shadow:var(--cart-shadow);
  transform:translateX(100%);
  transition:transform .34s cubic-bezier(.22,.61,.36,1);
  z-index:99;
  display:flex; flex-direction:column;
  border-left:1px solid var(--cart-border);
}
.cart-drawer.open{ transform:translateX(0); }

/* Header */
.cart-head{
  display:flex; align-items:center; justify-content:space-between;
  padding:20px 22px;
  border-bottom:1px solid var(--cart-border);
  position:sticky; top:0; background:#fff; z-index:2;
}
.cart-head h3{
  margin:0;
  letter-spacing:.12em;
  font-size:13px;
  font-weight:800;
  color:var(--cart-text);
}
.cart-close{ background:transparent; border:0; padding:6px; cursor:pointer; }

/* Body */
.cart-body{ flex:1; overflow:auto; padding:16px 18px 120px; } /* beri ruang buat footer sticky */

/* Empty state */
.cart-empty{
  height:100%;
  display:grid; place-items:center;
  text-align:center; gap:16px; color:var(--cart-text);
}
.cart-empty p{ margin:0; color:var(--cart-muted); font-size:14px; }
.cart-cta{
  display:inline-block; background:var(--cart-accent); color:#fff;
  padding:12px 18px; border-radius:999px; font-weight:800; border:0; cursor:pointer;
}

/* Items */
.cart-list{ display:flex; flex-direction:column; gap:14px; }
.cart-row{
  display:grid;
  grid-template-columns: 64px 1fr auto;  /* thumb | info | price/remove */
  gap:14px; align-items:center;
  padding:0 0 14px;
  border-bottom:1px solid var(--cart-border);
}
.cart-row img{
  width:64px; height:64px; object-fit:cover; border-radius:10px;
  border:1px solid var(--cart-border);
}
.cart-info{ display:flex; flex-direction:column; gap:4px; }
.cart-info .title{ font-size:14px; font-weight:600; color:var(--cart-text); line-height:1.3; }
.cart-info .meta{ font-size:12px; color:var(--cart-muted); }

.cart-right{
  display:flex; flex-direction:column; align-items:flex-end; gap:6px;
}
.cart-price{ font-weight:700; font-size:14px; color:var(--cart-text); }
.row-remove{
  border:0; background:transparent; cursor:pointer; line-height:1;
  font-size:18px; color:#9ca3af;
}
.row-remove:hover{ color:#111; }

/* Quantity (opsional, kalau kamu punya tombol qty) */
.qty{
  display:inline-flex; align-items:center; gap:8px;
  border:1px solid var(--cart-border); border-radius:999px; padding:4px 8px;
}
.qty button{
  width:22px; height:22px; border:0; background:#f6f7fb; border-radius:999px; cursor:pointer;
}
.qty span{ min-width:20px; text-align:center; font-size:13px; }

/* Totals + footer actions */
.cart-summary{
  position:sticky; bottom:0; left:0; right:0;
  background:#fff;
  border-top:1px solid var(--cart-border);
  padding:14px 18px;
  box-shadow: 0 -8px 24px rgba(0,0,0,.04);
  z-index:3;
}
.cart-total{
  display:flex; justify-content:space-between; align-items:center;
  margin:4px 0 10px;
}
.cart-total .label{ font-size:13px; color:var(--cart-muted); }
.cart-total .value{ font-weight:800; font-size:16px; color:var(--cart-text); letter-spacing:.02em; }

.cart-actions{ display:flex; gap:10px; }
.btn{
  display:inline-flex; align-items:center; justify-content:center; gap:8px;
  padding:12px 14px; border-radius:12px; font-weight:800; font-size:14px;
  width:100%; cursor:pointer; border:1px solid transparent; transition:transform .06s ease, box-shadow .2s ease, background .2s ease, color .2s ease;
}
.btn:active{ transform:translateY(1px); }

.btn-primary{ background:var(--cart-accent); color:#fff; }
.btn-primary:hover{ filter:brightness(.95); }
.btn-outline{ background:#fff; color:var(--cart-text); border-color:#111; }
.btn-outline:hover{ background:#111; color:#fff; }

/* Mobile */
@media (max-width:780px){
  .cart-drawer{ width:100vw; }
  .cart-row{ grid-template-columns:64px 1fr; }
  .cart-right{ align-items:flex-start; }
}

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

:root{
  --bg:#f4f6fa;           /* latar abu muda seperti referensi */
  --card-bg:#fff;
  --text:#0f172a;         /* hampir hitam */
  --muted:#6b7280;        /* abu teks deskripsi */
  --border:#d1d5db;       /* garis kartu */
  --radius:16px;
}


*{box-sizing:border-box}
.cc-contact-page{
  background:var(--bg);
  min-height:100vh;
  color:var(--text);
  font-family: "Poppins", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial;
  padding: 40px 0 64px;
}

.cc-container{
  max-width: 960px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Heading */
.cc-head h1{
  margin: 0;
  font-weight: 600;
  letter-spacing: .2px;
  font-size: clamp(28px, 4.6vw, 44px);
}
.cc-sub{
  margin: 6px 0 24px;
  color: var(--muted);
  font-size: 16px;
}

/* Grid */
.cc-grid{ display:grid; grid-template-columns: 1fr; gap: 22px; margin-bottom: 22px; }
.cc-grid--two{ grid-template-columns: 1fr; }
@media (min-width: 860px){
  .cc-grid--two{ grid-template-columns: 1fr 1fr; gap: 24px; }
}

/* Card */
.cc-card{
  background:var(--card-bg);
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  padding: 22px 22px;
  box-shadow: 0 0 0 rgba(0,0,0,0);   /* no heavy shadow per referensi */
}

.cc-card-title{
  margin:0 0 6px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing:.02em;
}

.cc-main-link{
  display:inline-block;
  margin: 2px 0 2px;
  color: var(--text);
  font-weight: 600;
  font-size: 18px;
  text-decoration: none;
}
.cc-main-link:hover{ text-decoration: underline; }

.cc-body{
  margin: 4px 0 0;
  line-height: 1.7;
  font-size: 15px;
}

.cc-muted{
  margin: 8px 0 0;
  color: var(--muted);
  font-size: 14px;
}

/* List */
.cc-list{
  list-style-type: disc;   /* tampilkan titik (dot) */
  list-style-position: outside;
  padding-left: 20px;      /* jarak antara bullet dan teks */
  margin: 10px 0 0 0;
  padding-left: 18px;
  display: grid;
  gap: 10px;
  font-size: 15px;
}
.cc-list li{ line-height: 1.6; }

/* ===== Contact Form (match style referensi) ===== */
.cc-form{
  text-align:center;
  margin: 10px 0 28px;
}
.cc-form-title{
  margin:0;
  font-family:"Poppins", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial;
  font-weight:700;
  letter-spacing:.06em;
  font-size: clamp(26px, 5vw, 40px);
}
.cc-form-sub{
  max-width: 760px;
  margin: 8px auto 26px;
  color: var(--muted);
  font-size: 16px;
  line-height: 1.7;
}
.cc-form-sub a{ color: inherit; text-decoration: underline; text-underline-offset: 2px; }

.cc-form-grid{
  max-width: 1060px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;
}
@media (min-width: 900px){
  .cc-form-grid{ grid-template-columns: 1fr 1fr; }
  .cc-field--full{ grid-column: 1 / -1; }
}

.cc-field input,
.cc-field textarea{
  width: 100%;
  border: 1px solid #efeceb;              /* garis tipis seperti referensi */
  background: #fff;
  border-radius: 4px;
  padding: 18px 16px;
  font-size: 15px;
  color: var(--text);
  outline: none;
  transition: border-color .15s ease, box-shadow .15s ease;
  font-family:"Poppins", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial;
}
.cc-field textarea{ resize: vertical; min-height: 220px; }
.cc-field input::placeholder,
.cc-field textarea::placeholder{ color:#a3a3a3; }

.cc-field input:focus,
.cc-field textarea:focus{
  border-color: #111;
  box-shadow: 0 0 0 3px rgba(17,17,17,.06);
}

/* Tombol besar bulat hitam (pill) */
.cc-btn{
  grid-column: 1 / -1;
  display: inline-block;
  width: 100%;
  padding: 18px 26px;
  border-radius: 999px;
  border: 0;
  background: #111;
  color: #fff;
  font-weight: 700;
  letter-spacing: .08em;
  font-size: 14px;
  cursor: pointer;
  transition: transform .06s ease, box-shadow .15s ease, background .2s ease;
}
.cc-btn:hover{ background:#000; box-shadow: 0 10px 24px rgba(0,0,0,.18); }
.cc-btn:active{ transform: translateY(1px); }

/* ===== Footer ===== */
.site-footer{
  background:#fff; color:#0f172a;
  border-top:1px solid #eef0f4;
  margin-top:50px;
  font-family:"Poppins", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial;
  transform: none !important;
  max-width: 98%;
  padding-left: 24px;
}
.f-grid{
  display:grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(24px, 3vw, 48px);
  padding: clamp(28px, 4vw, 48px) 0 24px;
}
@media (max-width: 1024px){
  .f-grid{ grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px){
  .f-grid{ grid-template-columns: 1fr; }
}

.f-title{
  margin:0 0 14px;
  font-size: clamp(18px, 4vw, 20px);
  letter-spacing:.04em;
  font-weight:500;
  color:#0f172a;     /* hampir hitam, seperti referensi */
}
.f-list{ list-style:none; margin:0; padding:0; }
.f-list li{ margin: 14px 0; }
.f-list a{
  color:#334155; text-decoration:none; font-size:14px;
}
.f-list a:hover{ color:#111; }

.f-payments{
  display:flex; align-items:center; gap:18px;
  margin-top: 20px;
  flex-wrap: wrap;
}
.f-payments img{
  height: 28px; width:auto; display:block;
  filter: none;
}

.f-bottom{
  border-top:1px solid #eef0f4;
  background:#fff;
}
.f-bottom-inner{
  display:flex; align-items:center; justify-content:space-between;
  gap:16px; padding: 14px 0;
  color:#0f172a;
}
.f-copy, .f-right{
  margin:0; font-size:14px; color:#0f172a;
}
@media (max-width: 640px){
  .f-bottom-inner{ flex-direction:column; align-items:flex-start; gap:6px; }
}

`;
