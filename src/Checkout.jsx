// src/Checkout.jsx
import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar, FooterSection } from "./LuxyLanding";


/* =======================
   SECTION: ProductGallery
   ======================= */
const ProductGallery = ({ images, title }) => (
  <div className="co__gallery">
    {images.slice(0, 4).map((src, i) => (
      <figure className="co__thumb" key={i}>
        <img src={src} alt={`${title} ${i + 1}`} loading="lazy" />
      </figure>
    ))}
  </div>
);

/* =======================
   SECTION: ProductDetails
   ======================= */
const ProductDetails = ({ product }) => {
  const [qty, setQty] = useState(1);
  const inc = () => setQty((q) => Math.min(q + 1, 99));
  const dec = () => setQty((q) => Math.max(q - 1, 1));

  return (
    <div className="co__details">
      <h1 className="co__title">{product.title}</h1>
      <div className="co__price">Rp {product.price.toLocaleString("id-ID")}</div>

      <label className="co__qtylbl">Quantity</label>
      <div className="co__qty">
        <button onClick={dec} aria-label="Decrease quantity">–</button>
        <span aria-live="polite">{qty}</span>
        <button onClick={inc} aria-label="Increase quantity">+</button>
      </div>

      <button className="co__buy">
        BUY NOW <span aria-hidden>＋</span>
      </button>
    </div>
  );
};

/* =======================
   SECTION: AccordionInfo
   ======================= */
const AccordionInfo = ({ product }) => {
  const items = useMemo(
    () => [
      { title: "Story Behind", body: product.desc },
      { title: "Notes Description", body: product.notes },
      { title: "Product Performance", body: "Longevity 6–8 hours, projection moderate." },
      { title: "What Do They Say", body: "4.8/5 from 1,200+ reviews." },
      { title: "Shipping Information", body: "Ships in 1–2 business days from ID." },
    ],
    [product.desc]
  );

  return (
    <div className="co__acc">
      {items.map((it, i) => (
        <details className="co__accItem" key={i}>
          <summary>
            {it.title}
            <span className="co__plus" aria-hidden>＋</span>
          </summary>
          <div className="co__accBody">{it.body}</div>
        </details>
      ))}
    </div>
  );
};

/* ============================
   (Opsional) Section lain di bawah
   ============================ */
const RecommendedSection = () => (
  <section className="co__reco">
    <h2>You may also like</h2>
    {/* isi kartu rekomendasi nanti */}
  </section>
);

/* =======================
   HALAMAN: Checkout (wrapper)
   ======================= */
export default function Checkout() {
  const { productId } = useParams();

  // Samakan id & images dengan ProductsSection agar nyambung
  const products = [
    {
      id: 1,
      title: "CLICK CLICK M4 Selfie",
      price: 369000,
      images: [
        "/assets/selfie/prod-m4.png",
        "/assets/selfie/product/m4-2.png",
        "/assets/selfie/product/m4-3.png",
        "/assets/selfie/product/m4-4.png",
      ],
      desc: "For the ones who love the quiet. Kadang yang paling kuat itu bukan yang paling rame. M4 hadir buat kamu yang kerja diam-diam, tapi hasilnya tetap on point.",
      notes: "",
    },
    {
      id: 2,
      title: "CLICK CLICK T8D Selfie",
      price: 369000,
      images: [
        "/assets/selfie/prod-t8d.png",
        "/assets/selfie/product/t8d-2.png",
        "/assets/selfie/product/t8d-3.png",
        "/assets/selfie/prod-t8d.png",
      ],
      desc: "Sparkly, fresh, and playful.",
    },
    {
      id: 3,
      title: "CLICK CLICK T3B Selfie",
      price: 369000,
      images: [
        "/assets/selfie/prod-t3b.png",
        "/assets/selfie/product/t3b-2.png",
        "/assets/selfie/product/t3b-3.png",
        "/assets/selfie/product/t3b-4.png",
      ],
      desc: "Sparkly, fresh, and playful.",
    },
    {
      id: 4,
      title: "CLICK CLICK T1M Selfie",
      price: 369000,
      images: [
        "/assets/selfie/prod-t1m.png",
        "/assets/selfie/product/t1m-2.png",
        "/assets/selfie/product/t1m-3.png",
        "/assets/selfie/product/t1m-4.png",
      ],
      desc: "Sparkly, fresh, and playful.",
    },
  ];

  const product = products.find((p) => p.id === Number(productId)) ?? products[0];

  return (
    <>
      <Navbar />
      <section className="co">
        <div className="co__grid">
          <ProductGallery images={product.images} title={product.title} />
          <div>
            <ProductDetails product={product} />
            <AccordionInfo product={product} />
          </div>
        </div>
      </section>
      <FooterSection />
      <style>{checkoutCSS}</style>
    </>
  );
}

/* =======================
   CSS khusus halaman ini
   ======================= */
const checkoutCSS = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;900&display=swap');

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

/* Mobile */
@media (max-width: 920px){
  .menu-row{border-bottom:0}
  .menu-toggle{display:block}
  .nav-center{display:none}
  .nav-center.open{display:flex;position:static;transform:none;padding:14px 0;border-top:1px solid #eee;border-bottom:1px solid #eee;flex-wrap:wrap;gap:16px;justify-content:flex-start}
  .actions-right{right:12px}
}
:root{--co-text:#111;--co-muted:#6b7280;--co-border:#eee;--co-black:#0b0b0b;}
*{box-sizing:border-box}

.co{max-width:1200px;margin:0 auto;
    padding:32px 24px;color:var(--co-text);
    font-family: "Poppins", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial;
    transform:scale(0.9);        
    transform-origin:top center;
}
.co__grid{display:grid;grid-template-columns:1.2fr .9fr;gap:78px}


@media (max-width: 980px){ .co__grid{grid-template-columns:1fr;gap:28px} }

.co__gallery{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.co__thumb{margin:0;aspect-ratio:1/1;overflow:hidden;background:#fafafa}
.co__thumb img{width:100%;height:100%;object-fit:cover;display:block;transform:scale(1.01);transition:transform .3s ease}
.co__thumb:hover img{transform:scale(1.04)}

.co__title{margin:0 0 8px;font-size:clamp(22px,3vw,38px);font-weight:500;letter-spacing:.2px}
.co__price{font-size:clamp(18px,2.2vw,28px);margin:0 0 22px}
.co__qtylbl{display:block;color:var(--co-muted);font-size:14px;margin-bottom:6px}
.co__qty{display:inline-flex;align-items:center;gap:18px;border:1px solid var(--co-border);border-radius:8px;padding:10px 14px;margin-bottom:18px}
.co__qty button{all:unset;cursor:pointer;font-size:20px;line-height:1;padding:2px 6px}
.co__qty span{min-width:18px;text-align:center;font-weight:500}

.co__buy{width:100%;display:inline-flex;align-items:center;justify-content:center;gap:10px;background:var(--co-black);color:#fff;border:0;border-radius:4px;padding:14px 18px;font-weight:200;letter-spacing:.04em;margin:10px 0 18px;cursor:pointer;transition:transform .05s ease}
.co__buy:hover{transform:translateY(-1px)}

.co__acc{margin-top:8px;border-top:1px solid var(--co-border)}
.co__accItem{border-bottom:1px solid var(--co-border);background:#f7f7f7}
.co__accItem summary{list-style:none;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:14px 16px;cursor:pointer;font-weight:200}
.co__accItem summary::-webkit-details-marker{display:none}
.co__plus{font-weight:600;opacity:.85}
.co__accItem[open] .co__plus{transform:rotate(45deg);transition:transform .15s ease}
.co__accBody{padding:14px 16px;color:#374151;line-height:1.7;background:#fff}

.co__reco{max-width:1200px;margin:0 auto;padding:10px 24px 60px}
.co__reco h2{margin:24px 0 0;font-size:clamp(18px,2.4vw,24px);font-weight:600}

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
