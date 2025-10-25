import React from "react";
import { Navbar } from "./LuxyLanding";

const Container = ({ children, className = "" }) => (
  <div className={`about-container ${className}`}>{children}</div>
);

export default function About() {
  return (
    <>
      <Navbar />

      <main className="about-page">
        <Container>
          <header className="about-header">
            <h1>About Click Click</h1>
            <p className="about-sub">
              Behind every great idea is a simple story. Ours begins with creativity,
              connection, and the desire to make daily life a little more inspiring.
            </p>
          </header>

          <section className="about-section">
            <p>
              Founded in 2025 in Yogyakarta, Clickclick was built around one core belief:
              thoughtful design can spark confidence and joy in everyday moments. 
              What started as a small team with a shared curiosity for innovation 
              has grown into a community that celebrates simplicity, authenticity, and self-expression.
            </p>

            <p>
              We are more than a brand, we are storytellers, makers, and dreamers. 
              Each project we pursue is driven by purpose, combining form and function 
              to create something that not only looks good but feels meaningful.
            </p>

            <p>
              Our journey is still unfolding, and we’re grateful to share it with people 
              who value honesty, creativity, and mindful living. Whether you’ve been with us 
              from the start or just found your way here — welcome to Clickclick.
            </p>
          </section>

          <section className="about-section about-values">
            <h2>Our Values</h2>
            <ul>
              <li><strong>Simplicity</strong> — We believe in clarity and purpose in everything we create.</li>
              <li><strong>Connection</strong> — Every idea begins with people, and we value collaboration above all.</li>
              <li><strong>Creativity</strong> — We embrace curiosity and innovation as a way of life.</li>
            </ul>
          </section>

          <footer className="about-footer">
            <p>© 2025 Clickclick. Built with heart and creativity from Yogyakarta, Indonesia.</p>
          </footer>
        </Container>

        <style>{css}</style>
      </main>
    </>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;900&display=swap');

/* HEADER */
.navbar{
  position:sticky;
  top:0;z-index:50;
  background:#fff;
  transition:box-shadow .25s ease;
}
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


:root {
  --bg:#f4f6fa;
  --text:#0f172a;
  --muted:#6b7280;
  --radius:16px;
}

* { box-sizing: border-box; }
body, html { margin:0; padding:0; }

.about-page {
  background: var(--bg);
  color: var(--text);
  font-family: "Poppins", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial;
  padding-bottom: 60px;
  line-height: 1.7;
}

.about-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 60px 24px 40px;
}

.about-header {
  text-align: center;
  margin-bottom: 48px;
}

.about-header h1 {
  font-weight: 700;
  font-size: clamp(28px, 4vw, 42px);
  margin: 0 0 12px;
}

.about-sub {
  max-width: 680px;
  margin: 0 auto;
  color: var(--muted);
  font-size: 16px;
  line-height: 1.6;
}

.about-section {
  margin-bottom: 40px;
  font-size: 15px;
  color: var(--text);
}

.about-section p {
  margin-bottom: 22px;
}

.about-values h2 {
  font-size: 22px;
  margin-bottom: 16px;
  font-weight: 600;
}

.about-values ul {
  list-style-type: disc;
  padding-left: 20px;
  display: grid;
  gap: 12px;
  color: var(--muted);
}

.about-values strong {
  color: var(--text);
  font-weight: 600;
}

.about-footer {
  text-align: center;
  margin-top: 60px;
  color: var(--muted);
  font-size: 14px;
}
`;
