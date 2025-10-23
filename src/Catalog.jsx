// Catalog.jsx
import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from "react";
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

  function TextPanel({ p }) {
    return (
      <section className="textpanel" aria-live="polite">
        <h2 className="tp-title">{p.title}</h2>
  
        <p className="tp-meta">
          <span>Device Type:</span>{" "}
          {p.meta.map((m, i) => (
            <span key={i}>
              {m}
              {i < p.meta.length - 1 ? " | " : ""}
            </span>
          ))}
        </p>
  
        <p className="tp-text">{p.text}</p>
  
        {p.notes && (
          <p className="tp-notes" dangerouslySetInnerHTML={{ __html: p.notes }} />
        )}
        {p.spec && <p className="tp-spec"><strong>{p.spec}</strong></p>}
        {p.dur && <p className="tp-dur">{p.dur}</p>}
  
        <div className="tp-cta">
          <Link to={`/checkout/${p.checkoutSlug}`}>Go to Product</Link>
        </div>
      </section>
    );
  }


  function ImageCarousel({ products, active, setActive }) {
    const N = products.length;
  
    // 1) items jadi stabil (tidak bikin refs berubah2)
    const REPEAT = 7; 
    const MID_BLOCK = Math.floor(REPEAT / 2);
    const items = React.useMemo(
      () => Array.from({ length: REPEAT }, () => products).flat(),
      [products]
    );
  
    const initialVIndex = MID_BLOCK * N;
  
    const viewportRef = useRef(null);
    const cardRefs = useRef([]);
    cardRefs.current = items.map((_, i) => cardRefs.current[i] || React.createRef());
  
    // 2) helper center (tetap)
    const centerOnVIndex = useCallback((vIdx, behavior = "smooth") => {
      const viewport = viewportRef.current;
      const el = cardRefs.current[vIdx]?.current;
      if (!viewport || !el) return;
      const vpRect = viewport.getBoundingClientRect();
      const rect = el.getBoundingClientRect();
      const targetLeft =
        (rect.left - vpRect.left) + viewport.scrollLeft
        - (viewport.clientWidth / 2 - rect.width / 2);
      viewport.scrollTo({ left: targetLeft, behavior });
    }, []);
  
    // 3) cari vIndex terdekat (tetap)
    const getNearestVIndex = useCallback(() => {
      const viewport = viewportRef.current;
      if (!viewport) return initialVIndex;
  
      const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
      const vpRect = viewport.getBoundingClientRect();
  
      let bestIdx = 0;
      let bestDist = Infinity;
  
      cardRefs.current.forEach((ref, idx) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cardCenter =
          (rect.left - vpRect.left) + viewport.scrollLeft + rect.width / 2;
        const dist = Math.abs(cardCenter - viewportCenter);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = idx;
        }
      });
  
      return bestIdx;
    }, [initialVIndex]);
  
    // 4) TUNGGU SEMUA IMG SIAP -> baru center (perbaiki “first swipe jump”)
    const [imgsReady, setImgsReady] = useState(false);
    useEffect(() => {
      const vp = viewportRef.current;
      if (!vp) return;
      const imgs = Array.from(vp.querySelectorAll('img'));
      if (imgs.length === 0) { setImgsReady(true); return; }
  
      let left = imgs.length;
      const done = () => { left -= 1; if (left <= 0) setImgsReady(true); };
  
      imgs.forEach(img => {
        if (img.complete) done();
        else img.addEventListener('load', done, { once: true });
      });
  
      return () => imgs.forEach(img => img.removeEventListener?.('load', done));
    }, []);
  
    // 5) INIT: setelah gambar siap, center TANPA animasi, set active sinkron
    useLayoutEffect(() => {
      if (!imgsReady) return;
      centerOnVIndex(initialVIndex, "auto");
      const realIdx = ((initialVIndex % N) + N) % N;
      if (realIdx !== active) setActive(realIdx);
  
      const onResize = () => centerOnVIndex(getNearestVIndex(), "auto");
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imgsReady]);
  
    // 6) rAF scroll sync (tetap)
    const rafId = useRef(0);
    const onScroll = () => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        const vIdx = getNearestVIndex();
        const realIdx = ((vIdx % N) + N) % N;
        if (realIdx !== active) setActive(realIdx);
        rafId.current = 0;
      });
    };
  
    // 7) rebase seamless (tetap)
    const scrollEndTimer = useRef(0);
    const onScrollEnd = () => {
      clearTimeout(scrollEndTimer.current);
      scrollEndTimer.current = setTimeout(() => {
        const viewport = viewportRef.current;
        if (!viewport) return;
  
        const vIdx = getNearestVIndex();
        const realIdx = ((vIdx % N) + N) % N;
  
        const leftEdge = N;
        const rightEdge = (REPEAT - 1) * N - 1;
  
        if (vIdx < leftEdge || vIdx > rightEdge) {
          const midVIdx = MID_BLOCK * N + realIdx;
          centerOnVIndex(midVIdx, "auto");
        }
      }, 120);
    };
  
    const go = (dir) => {
      const curV = getNearestVIndex();
      const nextV = dir === "next" ? curV + 1 : curV - 1;
      centerOnVIndex(nextV, "smooth");
    };
  
    const goReal = (realIdx) => {
      const midVIdx = MID_BLOCK * N + realIdx;
      centerOnVIndex(midVIdx, "smooth");
    };
  
    return (
      <section className={`slides ${imgsReady ? "is-ready" : "is-loading"}`}>
        <div
          className="slides-viewport"
          ref={viewportRef}
          onScroll={() => { onScroll(); onScrollEnd(); }}
        >
          <div className="slides-track">
            {items.map((p, vIdx) => {
              const realIdx = ((vIdx % N) + N) % N;
              const isActive = realIdx === active;
              return (
                <figure
                  key={`${p.checkoutSlug}-${vIdx}`}
                  className={`card ${isActive ? "is-active" : ""}`}
                  ref={cardRefs.current[vIdx]}
                  onClick={() => centerOnVIndex(vIdx, "smooth")}
                  aria-current={isActive ? "true" : "false"}
                >
                  <img src={p.imageSrc} alt={p.imageAlt} loading="lazy" />
                </figure>
              );
            })}
          </div>
        </div>
  
        <button className="nav-btn left" aria-label="Previous" onClick={() => go("prev")} />
        <button className="nav-btn right" aria-label="Next" onClick={() => go("next")} />
  
        <div className="nav-dots" role="tablist" aria-label="Product slides">
          {products.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === active ? "on" : ""}`}
              aria-label={`Go to slide ${i + 1}`}
              aria-selected={i === active}
              onClick={() => goReal(i)}
              role="tab"
            />
          ))}
        </div>
      </section>
    );
  }
  

  // di atas export default function Catalog() { ... }, taruh setelah imports
  function useMedia(query) {
    const [matches, setMatches] = React.useState(false);
  
    React.useEffect(() => {
      if (typeof window === "undefined" || !window.matchMedia) return;
      const mq = window.matchMedia(query);
      const onChange = (e) => setMatches(e.matches);
      setMatches(mq.matches); // nilai awal
  
      if (mq.addEventListener) {
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
      } else if (mq.addListener) {
        mq.addListener(onChange);
        return () => mq.removeListener(onChange);
      }
    }, [query]);
  
    return matches;
  }
  
  
export default function Catalog() {

  const [active, setActive] = useState(0);
  const isMobile = useMedia("(max-width: 820px)");
  
  // buat ref untuk wrapper dan konten
  const wrapRef = useRef(null);
  const contentRef = useRef(null);

  const measureRef = useRef(null);        // <— baru
  const [maxH, setMaxH] = useState(null); // <— baru

  const products = [
    {
      checkoutSlug: "1",
      imageSrc: "/assets/selfie/product/m4/m4-1.png",
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
      imageSrc: "/assets/selfie/product/t8d/t8d-1.png",
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
      imageSrc: "/assets/selfie/product/t3b/t3b-1.png",
      imageAlt: "t3b",
      title: "For days that never stop.",
      meta: ["Mirror", "Screen", "Magnetic"],
      text:
        "Kadang kerjaan, konten, dan cerita nggak bisa berhenti. Dan T3B dibuat buat momen itu. Baterainya kuat banget (2500 mAh), layarnya lega (4.7 IPS) dan cahayanya tetap soft walau lighting berubah. Buat kamu yang nggak mau ribet ganti-ganti posisi atau nyari angle tiap jam, T3B selalu siap — stabil, tenang, dan real. Bukan soal power aja, tapi soal rasa tenang saat tau alat kamu selalu siap nemenin.",
      notes:
        "<strong>VISION</strong> WIDE 4.7 IPS FRAME, CLEAN TONE | <strong>LIGHT</strong> BALANCED LIGHT, NATURAL COLOR"+
        "<br /><strong>CORE</strong> 2500 mAh BATTERY, SPEAKER ACTIVE, MAGNETIC LOOK",
      spec: "MATERIAL ALUMINUM ALLOY",
      dur: "PENGGUNAAN 2 JAM | JARAK PAKAI 12 METER",
    },
    {
      checkoutSlug: "4",
      imageSrc: "/assets/selfie/product/t1m/t1m-1.png",
      imageAlt: "t1m",
      title: "For the ones who keep it real.",
      meta: ["Mirror", "Screen", "Magnetic"],
      text:
        "T1M nggak dirancang buat semua orang. Dia buat kamu yang pengen tampil apa adanya — tanpa takut diliat dari dekat. Refleksinya jernih banget, setiap detail di wajah lo nggak disembunyiin. Dan justru di situ keindahannya: real, simple, confident. Bingkai kaca yang solid bikin pantulannya terasa tegas. Cahaya natural-nya ngasih tone warna yang pas di kamera. T1M itu statement. Nggak perlu perfect, yang penting real.",
      notes:
      "<strong>VISION</strong> GLASS CLARITY, SHARP TONE | <strong>LIGHT</strong> NATURAL LIGHT, HONEST COLOR"+
      "<br /><strong>CORE</strong> MAGNETIC POWER, SOLID GLASS BODY",
      spec: "MATERIAL ALUMINUM ALLOY",
      dur: "PENGGUNAAN 2.5 JAM | JARAK PAKAI 8–10 METER",
    },
  ];
    // 1) Pre-measure semua TextPanel “offscreen”
    useEffect(() => {
      if (isMobile) return;
      if (!measureRef.current) return;
      // pastikan ukuran pengukuran sama dengan lebar TextPanel sebenarnya
      const panelNodes = Array.from(measureRef.current.children);
      const heights = panelNodes.map(n => n.offsetHeight || 0);
      const tallest = Math.max(...heights, 0);
      setMaxH(tallest);
    }, [products, isMobile]);
  
    // 2) Kalau lebar viewport berubah, re-measure (karena wrapping teks bisa beda)
    useEffect(() => {
      if (isMobile) return;
      const onResize = () => {
        if (!measureRef.current || !wrapRef.current) return;
        const panelNodes = Array.from(measureRef.current.children);
        const heights = panelNodes.map(n => n.offsetHeight || 0);
        const tallest = Math.max(...heights, 0);
        setMaxH(tallest);
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, [isMobile]);
  
    // (opsional) tetap update saat active berganti jika kamu ingin animasi kecil
    useEffect(() => {
      if (!wrapRef.current || !contentRef.current) return;
    }, [active, maxH]);

    return (
      <>
        <Navbar />
    
        {/* MOBILE: selalu render, default tersembunyi; akan tampil di ≤820px */}
        <main className="mobile-stack container">
          {products.map((p) => (
            <section key={p.checkoutSlug} className="mb-item">
              <figure className="mb-hero">
                <img src={p.imageSrc} alt={p.imageAlt} loading="lazy" />
              </figure>
              <TextPanel p={p} />
            </section>
          ))}
        </main>
    
        {/* DESKTOP: selalu render; akan disembunyikan di ≤820px oleh CSS */}
        {/* Hidden measurer (tetap aman walau ada di mobile karena visibility:hidden) */}
        <div
          ref={measureRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            visibility: "hidden",
            inset: 0,
            pointerEvents: "none",
            width: "min(620px, 100%)",
            contain: "layout size",
          }}
        >
          {products.map((p, i) => (
            <div key={i} style={{ padding: 0, margin: 0 }}>
              <TextPanel p={p} />
            </div>
          ))}
        </div>
    
        <main className="spotlight container">
          <div
            className="tp-wrap"
            ref={wrapRef}
            style={maxH ? { minHeight: `${maxH}px` } : undefined}
          >
            <div ref={contentRef}>
              <TextPanel p={products[active]} />
            </div>
          </div>
    
          <ImageCarousel
            products={products}
            active={active}
            setActive={setActive}
          />
        </main>
    
        <style>{css + spotlightCss + mobileCss}</style>
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

/* Nonaktifkan transisi saat belum siap */
.slides.is-loading .card,
.slides.is-loading .slides-track { transition: none !important; }

/* Efek depth: kartu tengah fokus, sisi kecil & agak blur */
.card { transition: transform .45s ease, opacity .45s ease, filter .35s ease; }
.card.is-active { transform: scale(1); opacity: 1; filter: none; }
.card:not(.is-active) { transform: scale(.92); opacity: .65; filter: blur(1.2px); }


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

/* === MOBILE FIRST POLISH – perbaikan layout ≤ 820px === */
@media (max-width: 820px){
  /* Container lebih rapat dan konsisten */
  .container{ padding: 0 14px; }

  /* Grid jadi 1 kolom: Carousel dulu, teks setelahnya (UX swipe dulu, baca setelahnya) */
  .spotlight{
    grid-template-columns: 1fr;
    gap: 14px;
    min-height: auto;
    padding: 16px 0 28px;
  }
  .slides{ order: 1; }
  .textpanel{ order: 2; }

  /* Hero lebih ringkas, gambar proporsional */
  .catalog-hero{ padding: 16px 0 8px; }
  .catalog-image{
    width: 92%;
    max-width: 360px;
    height: auto;
  }

  /* Tipografi panel teks lebih nyaman dibaca di mobile */
  .tp-title{ font-size: 22px; line-height: 1.25; margin-bottom: 6px; }
  .tp-meta{ font-size: 14px; line-height: 1.6; color: #374151; }
  .tp-text{ font-size: 15px; line-height: 1.9; color:#1f2937; }
  .tp-notes, .tp-spec, .tp-dur{ font-size: 14px; }

  /* Jaga tinggi wrapper agar tidak ‘loncat’ saat ganti slide */
  .tp-wrap{ transition: min-height .25s ease; }

  /* Carousel: kartu sedikit lebih besar agar fokus ke slide aktif */
  .slides-track{ gap: 14px; }
  .slides-viewport{
    /* pusatkan slide aktif dengan padding kiri/kanan yang sesuai lebar kartu */
    padding-inline: calc((100% - 82%) / 2);
    scroll-snap-type: x mandatory;
    scroll-padding-inline: 50%;
    -webkit-overflow-scrolling: touch;
  }
  .card{
    flex: 0 0 82%;
    border-radius: 14px;
  }

  /* Gradien tepi diperkecil agar tidak menggelap terlalu banyak */
  .slides::before, .slides::after{ width: 72px; }
}

/* === Tiny phones ≤ 520px: kartu lebih besar, tombol panah disembunyikan === */
@media (max-width: 520px){
  .tp-title{ font-size: 20px; }
  .tp-text{ font-size: 14px; line-height: 1.85; }

  .slides-viewport{
    padding-inline: calc((100% - 88%) / 2);
  }
  .card{ flex-basis: 88%; border-radius: 16px; }

  /* Sembunyikan panah, cukup swipe/dots */
  .nav-btn{ display:none; }

  /* Gradien tepi makin kecil supaya konten tidak ketutup */
  .slides::before, .slides::after{ width: 48px; }
}

/* === Optional: halusin scroll + aksesibilitas === */
@media (prefers-reduced-motion: reduce){
  .slides-track,
  .card,
  .tp-wrap{ transition: none !important; }
}

/* ——— TWEAK SKALA MOBILE (≤820px) ——— */
@media (max-width: 820px){
  /* cegah iOS Safari auto-zoom text */
  html, body { -webkit-text-size-adjust: 100%; }

  /* kasih “napas” kiri–kanan biar gambar tak full-bleed */
  .mobile-stack.container { padding-left: 12px; padding-right: 12px; }

  /* Gambar lebih kecil & proporsional */
  .mobile-stack .mb-hero img{
    width: 94%;           /* dari 100% → 94% */
    margin: 0 auto;       /* center */
    max-height: 40vh;     /* dari 52vh → 40vh */
    border-radius: 12px;  /* sedikit lebih kecil */
    object-fit: cover;
  }

  /* Judul & teks diperkecil */
  .mobile-stack .tp-title{
    font-size: clamp(18px, 4.6vw, 20px); /* dari 22px */
    line-height: 1.25;
    font-weight: 600;                    /* dari 700 */
    margin-bottom: 6px;
  }
  .mobile-stack .tp-meta{
    font-size: 13px;     /* dari 14px */
    line-height: 1.5;
    color:#4b5563;
  }
  .mobile-stack .tp-text{
    font-size: 14px;     /* dari 15px */
    line-height: 1.75;   /* sedikit rapat */
    color:#334155;
  }
  .mobile-stack .tp-notes,
  .mobile-stack .tp-spec,
  .mobile-stack .tp-dur{
    font-size: 13px;     /* dari 14px */
    line-height: 1.6;
  }
  .mobile-stack .tp-cta a{
    padding: 9px 12px;   /* tombol lebih kecil */
    border-radius: 10px;
    font-weight: 600;
    font-size: 14px;
  }
}

/* ——— Extra kecil (≤400px) ——— */
@media (max-width: 400px){
  .mobile-stack .mb-hero img{ width: 92%; max-height: 36vh; }
  .mobile-stack .tp-title{ font-size: 18px; }
  .mobile-stack .tp-text{ font-size: 13.5px; line-height: 1.7; }
}

`;

const spotlightCss = `
.spotlight{
  display:grid;
  grid-template-columns: 1fr 1.25fr;
  align-items:center;
  gap: clamp(24px, 5vw, 56px);
  min-height: clamp(520px, 70vh, 760px);
  padding: clamp(24px, 5vw, 56px) 0;
  transform: scale(0.9);
}

/* Text panel */
.textpanel{ max-width: 620px; }
.tp-title{ margin:0 0 10px; font-size: clamp(26px, 3.2vw, 42px); line-height:1.1; font-weight:700; }
.tp-meta{ margin: 6px 0 16px; font-size:15px; color:#111; }
.tp-meta span{ font-weight:500; }
.tp-text{ 
  margin:0 0 16px; 
  color:#1f2937; 
  line-height:1.9; 
  font-size:15px; 
  font-weight: 300;
}
.tp-notes{ margin:14px 0; font-size:14px; line-height:1.8; color:#111; }
.tp-spec{ margin:8px 0 4px; }
.tp-dur{ margin:0 0 16px; color:#374151; }
.tp-cta a{ display:inline-block; border:1px solid #111; padding:12px 16px; border-radius:12px; font-weight:700; text-decoration:none; color:#111; }
.tp-cta a:hover{ transform: translateY(-1px); }

/* Carousel */
.slides{ position:relative; }
.slides-viewport{
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  /* Gutter simetris agar slide pertama & terakhir bisa benar2 center */
  padding-inline: calc((100% - 68%) / 2);  /* 68% = lebar .card di desktop */
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
}
.slides-viewport::-webkit-scrollbar{ display:none; }

.slides-track{
  display:flex; align-items:center;
  gap: clamp(12px, 2.6vw, 24px);
  transition: transform .55s cubic-bezier(.22,.61,.36,1);
  will-change: transform;
}
.card{
  flex: 0 0 68%;
  scroll-snap-align: center;
  transition: transform .45s ease, opacity .45s ease, box-shadow .3s ease;
}
/* Highlight tengah */
.card.is-active{ transform: scale(1); opacity:1; box-shadow: 0 22px 60px rgba(0,0,0,.12); }
.card:not(.is-active){ transform: scale(.92); opacity:.6; }

.card img{ width:100%; height:100%; object-fit: cover; display:block; }
.card.is-active{ transform: scale(1); opacity:1; box-shadow: 0 22px 60px rgba(0,0,0,.12); }

/* arrows */
.nav-btn{
  position:absolute; top:50%; transform:translateY(-50%);
  width:42px; height:42px; border-radius:999px; border:0;
  background:#fff; box-shadow:0 10px 24px rgba(0,0,0,.10);
  cursor:pointer; opacity:.9;
}
.nav-btn.left{ left:-10px; }
.nav-btn.right{ right:-10px; }
.nav-btn::before{
  content:""; display:block; width:8px; height:8px;
  border-right:2px solid #111; border-bottom:2px solid #111; margin:0 auto;
  transform: rotate(225deg);
}
.nav-btn.right::before{ transform: rotate(45deg); }

/* dots */
.nav-dots{ display:flex; gap:8px; justify-content:center; margin-top:14px; }
.dot{ width:8px; height:8px; border-radius:999px; background:#d1d5db; border:0; cursor:pointer; }
.dot.on{ background:#111; }

.slides::before,
.slides::after {
  content: "";
  position: absolute;
  top: 0;
  width: 160px; /* Lebar fade diperbesar */
  height: 100%;
  pointer-events: none;
  background: linear-gradient(to right, rgba(255,255,255,0.95), rgba(255,255,255,0));
  z-index: 2;
}
.slides::after {
  right: 0;
  transform: rotate(180deg);
}

.tp-wrap {
  overflow: hidden;
  transition: height .35s ease; /* animasi anti-loncat */
  overflow: visible;
  transition: min-height .35s ease;
}

.tp-wrap { padding-bottom: 1px; }


/* Responsif */
@media (max-width: 980px){
  .spotlight{ grid-template-columns: 1fr; gap: 20px; min-height:auto; }
  .textpanel{ order:2; }
  .slides{ order:1; }
  .slides-track{ gap:16px; }
  .card{ flex: 0 0 78%; }
}
@media (max-width: 520px){
  .tp-title{ font-size: 24px; }
  .card{ flex: 0 0 86%; border-radius: 16px; }
}
@media (min-width: 1024px) {
  .spotlight {
    transform: scale(0.9);
    transform-origin: top center;
  }
}

/* (Opsional) di mobile lebar kartu sedikit lebih besar agar 3 terlihat rapat */
@media (max-width: 980px){
  .slides-viewport{ padding-inline: calc((100% - 78%) / 2); }
  .card{ flex-basis: 78%; }
}
@media (max-width: 520px){
  .slides-viewport{ padding-inline: calc((100% - 86%) / 2); }
  .card{ flex-basis: 86%; }
}
`;

/* Tambahkan di paling bawah, setelah spotlightCss */
const mobileCss = `
/* Default: sembunyikan stack (hanya muncul di mobile) */
.mobile-stack{ display:none; }

/* MOBILE STACKED LAYOUT ≤ 820px */
@media (max-width: 820px){
  /* Tampilkan stack, sembunyikan layout slider */
  .mobile-stack{ display:block; padding: 8px 0 28px; }
  .spotlight{ display:none !important; }        /* matikan versi desktop */
  .catalog-hero{ display:none !important; }     /* hero desktop tidak dipakai */

  .mb-item{ margin-bottom: 28px; }
  .mb-hero{ margin: 0 0 10px; }
  .mb-hero img{
    width: 100%;
    max-height: 52vh;
    object-fit: cover;
    border-radius: 14px;
    display:block;
  }

  /* Rapiin TextPanel untuk mobile stack */
  .textpanel{ max-width: 100%; }
  .tp-title{ font-size: 22px; line-height: 1.25; margin-bottom: 6px; }
  .tp-meta{ font-size: 14px; line-height: 1.6; color:#374151; margin-bottom: 10px; }
  .tp-text{ font-size: 15px; line-height: 1.9; color:#1f2937; }
  .tp-notes, .tp-spec, .tp-dur{ font-size: 14px; }
  .tp-cta a{
    display:inline-block; width:auto;
    text-decoration:none; border:1px solid #111;
    padding:10px 14px; border-radius:10px; font-weight:600; color:#111;
  }

  /* Bersihkan efek gradient/arrow dari carousel jika sempat tersisa */
  .slides, .nav-btn, .nav-dots{ display:none !important; }
}
`;
