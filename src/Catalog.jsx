// Catalog.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "./LuxyLanding";

function ProductSection({
    imageSrc,
    imageAlt,
    title,
    meta,
    text,
    notes,
    spec,
    dur,
    checkoutSlug,
  }) {
    const navigate = useNavigate();
    const goCheckout = () => navigate(`/checkout/${checkoutSlug}`);
  
    return (
      <>
        {/* Hero image: di luar .catalog-desc agar tidak kena transform */}
        <section className="catalog-hero">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="catalog-image"
            loading="lazy"
          />
        </section>
  
        {/* Deskripsi: tetap pakai grid & transform bawaan CSS */}
        <section className="catalog-desc">
          <aside className="desc-rail" aria-hidden="true" />
          <div className="desc-body">
            <h2 className="desc-title">{title}</h2>
  
            <p className="desc-meta">
              <span>Device Type:</span>{" "}
              {meta.map((m, i) => (
                <span key={i}>
                  {m}
                  {i < meta.length - 1 ? " | " : ""}
                </span>
              ))}
            </p>
  
            <p className="desc-text">{text}</p>
  
            {notes && (
              <p
                className="desc-notes"
                dangerouslySetInnerHTML={{ __html: notes }}
              />
            )}
  
            {spec && (
              <p className="desc-spec">
                <strong>{spec}</strong>
              </p>
            )}
            {dur && <p className="desc-dur">{dur}</p>}
  
            <p className="desc-link">
              <Link
                to={`/checkout/${checkoutSlug}`}
                onClick={(e) => {
                  e.preventDefault();
                  goCheckout();
                }}
              >
                Go to Product
              </Link>
            </p>
          </div>
        </section>
      </>
    );
  }
  

export default function Catalog() {
  // DATA 4 PRODUK — tinggal ganti sesuai kebutuhanmu
  const products = [
    {
      checkoutSlug: "1",
      imageSrc: "/assets/selfie/prod-m4.png",
      imageAlt: "m4",
      title: "Clean design. Real focus.",
      meta: ["Mirror", "Screen", "Magnetic"],
      text:
        "M4 nggak butuh banyak gaya — dia nunjukin versi paling chill dari kamu. Metal body-nya halus, pantulannya jernih, dan cahaya nyebar rata. Buat kamu yang suka vibe minimal tapi tetep classy.",
      notes:
        "<strong>VISION</strong> CLEAR FRAME, SHARP DETAIL | <strong>LIGHT</strong> SOFT TONE, BALANCED LIGHT | <br /><strong>CORE</strong> MAGNETIC GRIP, CLEAN METAL FINISH",
      spec: "MATERIAL ALUMINUM ALLOY",
      dur: "PENGGUNAAN 2.5–3 JAM | JARAK PAKAI 10–15 METER",
    },
    {
      checkoutSlug: "2",
      imageSrc: "/assets/selfie/prod-t8d.png",
      imageAlt: "t8d",
      title: "Effortless fun. For faces that love the vibe.",
      meta: ["Mirror", "Screen", "Magnetic"],
      text:
        "T8D itu buat kamu yang pengin tampil chill tapi tetep standout. Desainnya bulat, ringan, dan pantulannya jernih kayak pagi yang baru mulai. Cahayanya auto-nyesuain, jadi muka tetep enak dilihat di semua angle.",
      notes:
        "<strong>VISION</strong> CLEAN REFLECTION, SOFT GLOW | <strong>LIGHT</strong> SMOOTH TONE, AUTO LIGHT | <br /><strong>CORE</strong> MAGNETIC HOLD, EASY TO CARRY",
      spec: "MATERIAL ALUMINUM ALLOY",
      dur: "PENGGUNAAN 3 JAM | JARAK PAKAI 10 METER",
    },
    {
      checkoutSlug: "3",
      imageSrc: "/assets/selfie/prod-t3b.png",
      imageAlt: "t3b",
      title: "For days that never stop",
      meta: ["Mirror", "Screen", "Magnetic"],
      text:
        "Kadang kerjaan, konten, dan cerita nggak bisa berhenti. Dan T3B dibuat buat momen itu. Baterainya kuat banget (2500 mAh), layarnya lega (4.7 inch) dan cahayanya tetap soft walau lighting berubah. Buat kamu yang nggak mau ribet ganti-ganti posisi atau nyari angle tiap jam, T3B selalu siap — stabil, tenang, dan real. Bukan soal power aja, tapi soal rasa tenang saat tau alat kamu selalu siap nemenin.",
      notes:
        "<strong>VISION</strong> WIDE 4.7 INCH FRAME, CLEAN TONE | <strong>LIGHT</strong> BALANCED LIGHT, NATURAL COLOR |<br /><strong>CORE</strong> 2500 mAh BATTERY, SPEAKER ACTIVE, MAGNETIC LOOK",
      spec: "MATERIAL ALUMINUM ALLOY",
      dur: "PENGGUNAAN 2 JAM | JARAK PAKAI 12 METER",
    },
    {
      checkoutSlug: "4",
      imageSrc: "/assets/selfie/prod-t1m.png",
      imageAlt: "t1m",
      title: "For the ones who keep it real.",
      meta: ["Mirror", "Screen", "Magnetic"],
      text:
        "T1M nggak dirancang buat semua orang. Dia buat kamu yang pengen tampil apa adanya — tanpa takut diliat dari dekat. Refleksinya jernih banget, setiap detail di wajah lo nggak disembunyiin. Dan justru di situ keindahannya: real, simple, confident. Bingkai kaca yang solid bikin pantulannya terasa tegas. Cahaya natural-nya ngasih tone warna yang pas di kamera. T1M itu statement. Nggak perlu perfect, yang penting real.",
      notes:
      "<strong>VISION</strong> GLASS CLARITY, SHARP TONE | <strong>LIGHT</strong> NATURAL LIGHT, HONEST COLOR |<br /><strong>CORE</strong> MAGNETIC POWER, SOLID GLASS BODY",
      spec: "MATERIAL ALUMINUM ALLOY",
      dur: "PENGGUNAAN 2.5 JAM | JARAK PAKAI 8–10 METER",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="catalog">
        {/* 4 SECTION dengan layout serupa */}
        {products.map((p) => (
          <ProductSection key={p.checkoutSlug} {...p} />
        ))}
      </main>

      <style>{css}</style>
    </>
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

/* base */
.catalog{ background:#fff; color:#111; font-family:"Poppins", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial;}
.container{max-width:1280px;margin:0 auto;padding:0 24px}

/* HERO */
.catalog-hero{
  display:flex; justify-content:center; align-items:center;
  padding: clamp(40px, 8vw, 100px) 0 40px;
}
.catalog-image{
  width:min(92%, 420px);
  height:auto; object-fit:contain;
  border-radius:12px;
  transition:transform .35s ease;
}


/* DESCRIPTION SECTION */
.catalog-desc{
    --railW: 110px;
    display: grid;
    grid-template-columns: var(--railW) 1fr;
    gap: clamp(20px, 4vw, 60px);
    max-width: 1100px;
  
    /* Geser keseluruhan section ke kanan */
    margin: 0 auto;
    padding: clamp(20px, 5vw, 60px) 24px 80px;
    transform: translateX(clamp(60px, 10vw, 80px));
  
    /* Biar tetap halus */
    transition: transform 0.3s ease;
}

/* left vertical rail */
.desc-rail{
  position:relative;
  margin-left: 90px;
  min-height: 380px;
  display:flex; align-items:center; justify-content:center;
}
.desc-rail .rail-line{
  position:absolute; left:50%; top:40%;
  transform: translate(-50%,-50%) rotate(-90deg);
  transform-origin:center;
  white-space:nowrap;
  font-weight:400; font-size: clamp(28px, 4.2vw, 50px);
  letter-spacing:.02em;
}
.desc-rail .rail-price{
  position:absolute; left:50%; bottom:0;
  transform: translateX(-50%) rotate(-90deg);
  white-space:nowrap;
  font-weight:400; font-size: clamp(12px, 2vw, 24px);
}

/* right body */
.desc-body{ max-width: 760px;}
.desc-title{
  margin:0 0 10px;
  font-size: clamp(14px, 2vw, 25px);
  line-height:1.06;
  font-weight:550;
}
.desc-meta{
  margin:0 0 18px;
  font-size:15px;
}
.desc-meta span{ font-weight:500; }
.desc-text{
  margin:0 0 18px;
  color:#1f2937; line-height:1.9;
  max-width: 64ch;
  font-size:15px;
}
.desc-notes{
  margin:18px 0;
  font-size:14px; line-height:1.8; color:#111;
}
.desc-spec{ margin:12px 0 6px; }
.desc-dur{ margin:0 0 16px; color:#374151; }
.desc-link a{
  color:#111; font-weight:700; text-decoration:underline;
}
.desc-link a:hover{ opacity:.8; }

/* responsive */
@media (max-width: 820px){
  .catalog-desc{ grid-template-columns: 1fr; }
  .desc-rail{
    order:2; min-height: 80px; height:80px; margin-top:8px;
  }
  .desc-rail .rail-line, .desc-rail .rail-price{
    position:relative; transform:none; left:auto; top:auto; bottom:auto;
    rotate:0deg; display:inline-block; margin-right:18px;
  }
}

/* === MOBILE POLISH === */
@media (max-width: 820px){
  /* Hero lebih rapih & proporsional */
  .catalog-hero{
    padding: 28px 0 16px;
  }
  .catalog-image{
    width: 92%;
    max-width: 360px;
  }

  /* Hapus geser kanan & rapihkan padding */
  .catalog-desc{
    grid-template-columns: 1fr;
    gap: 18px;
    padding: 16px 16px 40px;
    margin: 0 auto;
    transform: none;                /* <— penting: hilangkan geser */
    max-width: 680px;
  }

  /* Rail dipadatkan (atau disembunyikan kalau tak dipakai) */
  .desc-rail{
    order: 2;
    min-height: 0;
    height: auto;
    margin: 0;
    padding-top: 6px;
  }
  .desc-rail .rail-line,
  .desc-rail .rail-price{
    position: static;
    transform: none;
    rotate: 0deg;
    display: inline-block;
    margin-right: 12px;
    font-size: 16px;
  }

  /* Body full width + tipografi lebih terbaca */
  .desc-body{ max-width: 100%; }
  .desc-title{
    font-size: 22px;                /* naikkan minimum supaya tajuk jelas */
    line-height: 1.25;
    margin-bottom: 6px;
  }
  .desc-meta{
    font-size: 14px;
    line-height: 1.6;
    color: #374151;
    margin-bottom: 10px;
    word-wrap: break-word;
    white-space: normal;
  }
  .desc-text{
    font-size: 15px;
    line-height: 1.9;
    color: #1f2937;
    margin-bottom: 14px;
  }
  .desc-notes{
    font-size: 14px;
    line-height: 1.8;
    margin: 12px 0;
  }
  .desc-spec{
    font-size: 14px;
    margin: 8px 0 4px;
  }
  .desc-dur{
    font-size: 14px;
    color: #4b5563;
    margin: 0 0 12px;
  }

  /* Link jadi tombol agar enak di-tap */
  .desc-link a{
    display: inline-block;
    text-decoration: none;
    border: 1px solid #111;
    padding: 10px 14px;
    border-radius: 10px;
    font-weight: 600;
  }
  .desc-link a:active{ transform: translateY(1px); }
}

/* Breakpoint kecil: rapikan lagi untuk layar mungil */
@media (max-width: 480px){
  .catalog-desc{ padding: 14px 14px 34px; }
  .desc-title{ font-size: 20px; }
  .desc-text, .desc-notes, .desc-meta, .desc-spec, .desc-dur{ font-size: 14px; }
  .desc-link a{ width: 100%; text-align: center; }
}

`;
