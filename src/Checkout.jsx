  // src/Checkout.jsx
  import React, { useMemo, useState, useEffect } from "react";
  import { useParams } from "react-router-dom";
  import { Navbar, FooterSection } from "./LuxyLanding";
  import { useCart } from "./cart/CartContext";

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
      const { addItem, openCart } = useCart();
    
      const inc = () => setQty((q) => Math.min(q + 1, 99));
      const dec = () => setQty((q) => Math.max(q - 1, 1));
    
      // ========== HITUNG HARGA PROMO 50% ==========
      const originalPrice =
        typeof product?.price === "number" ? product.price : null;
    
      const discountedPrice =
        originalPrice !== null ? product.price * 0.5 : null;
    
      const priceOriginalText =
        originalPrice !== null
          ? `Rp ${originalPrice.toLocaleString("id-ID")}`
          : "";
    
      const priceDiscountText =
        discountedPrice !== null
          ? `Rp ${Math.round(discountedPrice).toLocaleString("id-ID")}`
          : "";
      // ===========================================
    
      // Saat user klik BUY NOW kita masukin harga diskon ke cart
      const buyNow = () => {
        addItem(
          {
            id: product.id,
            title: product.title,
            // <-- gunakan harga diskon, bukan harga original
            price: discountedPrice ?? product.price,
            image: product.images?.[0],
          },
          qty
        );
        openCart();
      };
    
      return (
        <div className="co__details">
          <h1 className="co__title">{product.title}</h1>
    
          {/* HARGA DENGAN DISKON */}
          <div className="co__price">
            <span className="co__price-original">{priceOriginalText}</span>
            <span className="co__price-discount">{priceDiscountText}</span>
          </div>
    
          <label className="co__qtylbl">Quantity</label>
          <div className="co__qty">
            <button onClick={dec} aria-label="Decrease quantity">–</button>
            <span aria-live="polite">{qty}</span>
            <button onClick={inc} aria-label="Increase quantity">+</button>
          </div>
    
          <button className="co__buy" onClick={buyNow}>
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
        { title: "Product Performance", body: product.performs },
        { title: "What Do They Say", body: product.reviews},
        { title: "Shipping Information", body: product.shipinfo },
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
            {it.body && (
              <div className="co__accBody" dangerouslySetInnerHTML={{ __html: it.body }} />
            )}
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

    useEffect(() => {
      // pastikan benar-benar ke atas saat masuk halaman
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, []);

    // Samakan id & images dengan ProductsSection agar nyambung
    const products = [
      {
        id: 1,
        title: "CLICK CLICK M4 MIRROR SELFIE",
        price: 1990000,
        images: [
          "/assets/selfie/prod-m4.png",
          "/assets/selfie/product/m4/m4-1.png",
          "/assets/selfie/product/m4/m4-2.png",
          "/assets/selfie/product/m4/m4-4.png",
        ],
        desc: "For the ones who live in color. <br /><br /> Kadang yang paling kuat itu bukan yang paling rame. M4 hadir buat kamu yang kerja diam-diam, tapi hasilnya tetap on point." +
              "<br /><br /> Finishing metal-nya ngasih kesan cool dan tenang. Cahayanya soft, pantulannya stabil bikin kamu lebih fokus ke vibe, bukan alatnya."+
              "Nggak perlu tampil rame. M4 tuh bukti kalau calm juga power."+
              "<br /><br />Do less. Look better.",
        performs: "Type: M4"+
                  "<br />Screen Size: 4,0 IPS"+
                  "<br />Resolution: 720×1280P"+
                  "<br />Longevity: 3 Hours"+
                  "<br />Distance: 10-15 meters",
        shipinfo: `
                  <ul class="shipinfo-list">
                    <li>Pengiriman produk dilaksanakan dari Senin hingga Jumat.</li>
                    <li>Pesan sebelum jam 15 sore untuk pengiriman di hari yang sama.</li>
                    <li>Pesanan setelah jam 15 sore akan dikirim esok hari.</li>
                    <li>Tidak ada pengiriman di hari libur dan akhir pekan.</li>
                    <li>Kami mengirim dari Jogja, dan waktu pengiriman bergantung pada jarak dan efisiensi kurir.</li>
                  </ul>
                  <p>Jika ada masalah, silakan hubungi Customer Service Click Click.</p>
                `,
        reviews: `
          <div class="revList">

            <div class="revCard">
              <div class="revAvatar">GH</div>
              <div class="revBody">
                <p class="revText">"GILA SIH INI. Soft tapi tetep tajem di kamera 😭😭 Mukaku keliatan rapi banget tanpa edit. Serius ini baru bangun aja keliatan kayak habis facial 😭✨. Cahayanya nggak lebay, pantulan stabil, nggak bikin minyak jadi disco ball. Packingnya rapih parah, berasa beli gear mahal. Lokal tapi rasa internasional 👏👏👏"</p>
                <p class="revAuthor">- @rannn._</p>
              </div>
            </div>

            <div class="revCard">
              <div class="revAvatar">NV</div>
              <div class="revBody">
                <p class="revText">"M4 tuh bukan yang rame, tapi classy. Tinggal taruh, nyala, selfie. Udah. Terus orang-orang nanya ‘kok feed lo sekarang keliatan cakep banget?’ padahal gue literally nggak ngapa-ngapain 😂."</p>
                <p class="revAuthor">- @navnav.nav</p>
              </div>
            </div>

          </div>
          `,
      },
      {
        id: 2,
        title: "CLICK CLICK T8D MIRROR SELFIE",
        price: 1850000,
        images: [
          "/assets/selfie/prod-t8d.png",
          "/assets/selfie/product/t8d/t8d-1.png",
          "/assets/selfie/product/t8d/t8d-2.png",
          "/assets/selfie/product/t8d/t8d-3.png",
        ],
        desc: "For the ones who live in color."+
              "<br /><br /> Ambil napas bentar. Bayangin pagi yang rame, tapi kamu tetep punya waktu buat senyum di depan kamera. T8D nyalain mood kamu, nggak cuma pantulanmu."+
              "<br /><br /> Desain bulatnya ngasih vibe hangat, cahayanya nyatu sama kulit, dan semua terlihat effortless tanpa filter berlebih."+ 
              "<br /><br /> T8D cocok buat yang pengin tampil real tapi fun, buat kamu yang percaya glow up terbaik itu yang datang dari rasa nyaman."+
              "<br /><br /> Keep your glow up real.",
        performs: "Type: T8D"+
                  "<br />Screen Size: 2,1 IPS"+
                  "<br />Resolution: 480×480P"+
                  "<br />Longevity: 4 Hours"+
                  "Distance: 10-15 meters",
        shipinfo: `
                  <ul class="shipinfo-list">
                    <li>Pengiriman produk dilaksanakan dari Senin hingga Jumat.</li>
                    <li>Pesan sebelum jam 15 sore untuk pengiriman di hari yang sama.</li>
                    <li>Pesanan setelah jam 15 sore akan dikirim esok hari.</li>
                    <li>Tidak ada pengiriman di hari libur dan akhir pekan.</li>
                    <li>Kami mengirim dari Jogja, dan waktu pengiriman bergantung pada jarak dan efisiensi kurir.</li>
                  </ul>
                  <p>Jika ada masalah, silakan hubungi Customer Service Click Click.</p>
                `,
        reviews: `
          <div class="revList">

            <div class="revCard">
              <div class="revAvatar">NY</div>
              <div class="revBody">
                <p class="revText">"INI ENAK BANGET 😭😭 Warnanya warm, muka keliatan glowing tapi masih gue banget bukan filter abal2. Setiap pagi selfie pake T8D langsung mood naik, vibes good day only 💖. Bentuknya gemes, naro di meja aja kamar kosan langsung jadi aesthetic 😭🙏."</p>
                <p class="revAuthor">- @cimol.siang</p>
              </div>
            </div>

            <div class="revCard">
              <div class="revAvatar">AJ</div>
              <div class="revBody">
                <p class="revText">"T8D tuh bukan cuma kaca, ini support system 😌🫶. Kayak ‘iya kamu capek tapi kamu tetep cantik kok’. Thank you for my sanity."</p>
                <p class="revAuthor">- @ajaa.lah</p>
              </div>
            </div>

          </div>
          `,
      },
      {
        id: 3,
        title: "CLICK CLICK T3B MIRROR SELFIE",
        price: 1690000,
        images: [
          "/assets/selfie/prod-t3b.png",
          "/assets/selfie/product/t3b/t3b-1.png",
          "/assets/selfie/product/t3b/t3b-2.png",
          "/assets/selfie/product/t3b/t3b-3.png",
        ],
        desc: "For days that never stop."+
              "<br /><br /> Kadang kerjaan, konten, dan cerita nggak bisa berhenti. Dan T3B dibuat buat momen itu."+
              "<br /><br /> Baterainya kuat banget (2500 mAh), layarnya lega (4.7 inch), dan cahayanya tetap soft walau lighting berubah."+ 
              "<br /><br /> Buat kamu yang nggak mau ribet ganti-ganti posisi atau nyari angle tiap jam, T3B selalu siap — stabil, tenang, dan real."+ 
              "Bukan soal power aja, tapi soal rasa tenang saat tau alat kamu selalu siap nemenin."+
              "<br /><br /> Never off. Just like you.",
        performs: "Type: T3B"+
                  "<br />Screen Size: 4,7 IPS"+
                  "<br />Resolution: 720×1080P"+
                  "<br />Longevity: 5 Hours"+
                  "Distance: 10-15 meters",
        shipinfo: `
                  <ul class="shipinfo-list">
                    <li>Pengiriman produk dilaksanakan dari Senin hingga Jumat.</li>
                    <li>Pesan sebelum jam 15 sore untuk pengiriman di hari yang sama.</li>
                    <li>Pesanan setelah jam 15 sore akan dikirim esok hari.</li>
                    <li>Tidak ada pengiriman di hari libur dan akhir pekan.</li>
                    <li>Kami mengirim dari Jogja, dan waktu pengiriman bergantung pada jarak dan efisiensi kurir.</li>
                  </ul>
                  <p>Jika ada masalah, silakan hubungi Customer Service Click Click.</p>
                `,
        reviews: `
          <div class="revList">

            <div class="revCard">
              <div class="revAvatar">VV</div>
              <div class="revBody">
                <p class="revText">"T3B = TEMAN LEMBUR 😤⚡ Baterai nggak abis-abis, lighting konsisten even sampe jam 2 pagi. Gue revisi konten buat brand 4x dan muka tetep aman nggak pucet 🥲🙏. Layarnya lega, enak cek angle. Ini nyelametin gue banget sumpah."</p>
                <p class="revAuthor">- @vivi.editforrent</p>
              </div>
            </div>

            <div class="revCard">
              <div class="revAvatar">KS</div>
              <div class="revBody">
                <p class="revText">"PENGIRIMAN CEPET, packing aman, langsung kepake buat shooting. Serius kerasa kayak ada 1 crew tambahan yg ga pernah ngeluh capek 😂."</p>
                <p class="revAuthor">- @kassshoots</p>
              </div>
            </div>

          </div>
          `,

      },
      {
        id: 4,
        title: "CLICK CLICK T1M MIRROR SELFIE",
        price: 1690000,
        images: [
          "/assets/selfie/prod-t1m.png",
          "/assets/selfie/product/t1m/t1m-1.png",
          "/assets/selfie/product/t1m/t1m-2.png",
          "/assets/selfie/product/t1m/t1m-3.png",
        ],
        desc: "For the ones who keep it real."+
              "<br /><br /> T1M nggak dirancang buat semua orang. Dia buat kamu yang pengen tampil apa adanya — tanpa takut diliat dari dekat."+
              "<br /><br /> Refleksinya jernih banget, setiap detail di wajah lo nggak disembunyiin. Dan justru di situ keindahannya: real, simple, confident."+ 
              "<br /><br /> Bingkai kaca yang solid bikin pantulannya terasa tegas. Cahaya natural-nya ngasih tone warna yang pas di kamera."+ 
              "T1M itu statement. Nggak perlu perfect, yang penting real."+
              "<br /><br /> Be seen. Be you.",
        performs: "Type: T1M"+
                  "<br />Screen Size: 3,97 IPS"+
                  "<br />Resolution: 480×800P"+
                  "<br />Longevity: 3 Hours"+
                  "Distance: 10-15 meters",
        shipinfo: `
                  <ul class="shipinfo-list">
                    <li>Pengiriman produk dilaksanakan dari Senin hingga Jumat.</li>
                    <li>Pesan sebelum jam 15 sore untuk pengiriman di hari yang sama.</li>
                    <li>Pesanan setelah jam 15 sore akan dikirim esok hari.</li>
                    <li>Tidak ada pengiriman di hari libur dan akhir pekan.</li>
                    <li>Kami mengirim dari Jogja, dan waktu pengiriman bergantung pada jarak dan efisiensi kurir.</li>
                  </ul>
                  <p>Jika ada masalah, silakan hubungi Customer Service Click Click.</p>
                `,
        reviews: `
          <div class="revList">

            <div class="revCard">
              <div class="revAvatar">SL</div>
              <div class="revBody">
                <p class="revText">"T1M NIH YA... REAL PARAH 😳✨ Dia nggak nutupin pori, nggak nipu tekstur kulit. Tapi anehnya bikin gue ngerasa pede gila. Kayak ‘iya ini muka gue SO WHAT’ 😌💅. Ini healing banget sumpah."</p>
                <p class="revAuthor">- @salsadikitserius</p>
              </div>
            </div>

            <div class="revCard">
              <div class="revAvatar">RN</div>
              <div class="revBody">
                <p class="revText">"Close-upnya jernih banget, detail keliatan semua. Bukan fake beauty, tapi ‘gue beneran secakep ini dari dekat’. LOKAL TAPI BERASA PREMIUM 👏👏👏."</p>
                <p class="revAuthor">- @rinrin.rn</p>
              </div>
            </div>

          </div>
          `,
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
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;900&display=swap');

  .desc-title {
    font-weight: 500;
  }


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

  :root{--co-text:#111;--co-muted:#6b7280;--co-border:#eee;--co-black:#0b0b0b;}
  *{box-sizing:border-box}

  .co{
      max-width:1400px;
      margin:0 auto;
      padding:32px 24px;color:var(--co-text);
      font-family: "Poppins", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial;   
      transform-origin:top center;
      transform: scale(0.9);
  }
  .co__grid{display:grid;
    grid-template-columns:1.2fr .9fr;
    gap:78px;
    align-items: start; 
  }

  .co__gallery,
  .co__details {
    align-self: start;
  }


  @media (max-width: 980px){ .co__grid{grid-template-columns:1fr;gap:28px} }

  .co__gallery{display:grid;grid-template-columns:1fr 1fr;gap:20px}
  .co__thumb{margin:0;aspect-ratio:1/1;overflow:hidden;background:#fafafa}
  .co__thumb img{width:100%;height:100%;object-fit:cover;display:block;transform:scale(1.01);transition:transform .3s ease}
  .co__thumb:hover img{transform:scale(1.04)}

  .co__title{margin:0 0 8px;font-size:clamp(22px,3vw,38px);font-weight:500;letter-spacing:.2px}
  .co__price {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 8px;
    font-size: clamp(18px,2.2vw,28px);
    margin: 0 0 22px;
    line-height: 1.2;
    font-family: "Poppins", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial;
  }
  
  .co__price-original {
    font-size: 0.8em;            /* sedikit lebih kecil dari harga promo */
    font-weight: 400;
    color: #9ca3af;              /* abu pudar */
    text-decoration: line-through;
  }
  
  .co__price-discount {
    font-size: 1em;
    font-weight: 600;
    color: #111;                 /* lebih tegas */
  }
  
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

  /* Bullet list styling for shipping info */
  .shipinfo-list {
    list-style-type: disc;     /* bentuk bullet bulat hitam */
    margin: 0 0 12px 22px;     /* jarak kiri supaya titik terlihat */
    line-height: 1.7;          /* jarak antarbaris */
    color: #111;               /* warna teks */
    font-size: 15px;
  }

  .shipinfo-list li {
    margin-bottom: 6px;        /* jarak antar poin */
  }

  .reviewText {
    font-weight: 400;
    font-size: 15px;
    line-height: 1.6;
    color: #0f172a;
    white-space: pre-line;
  }
  .reviewAuthor {
    margin-top: 8px;
    font-size: 13px;
    color: #6b7280;
    font-weight: 500;
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

  /* ==== Luxy-like Cart refinements ==== */
  .cart-drawer{ width:min(500px, 92vw); }
  .cart-head h3{ letter-spacing:.18em; font-size:12px; font-weight:800; }
  .cart-body{ padding:14px 18px 130px; }

  /* Free shipping bar */
  .cart-freeship{ padding:8px 4px 16px; }
  .cart-freeship p{ margin:6px 0 10px; font-size:14px; }
  .fs-bar{ width:100%; height:6px; background:#f1f3f7; border-radius:999px; overflow:hidden; }
  .fs-bar span{ display:block; height:100%; background:#111; }

  /* Item row & qty */
  .cart-row{ grid-template-columns:64px 1fr auto; gap:14px; }
  .qty{ border-radius:999px; padding:4px 6px; background:#fff; border:1px solid var(--cart-border); }
  .qty button{ width:22px; height:22px; background:#f6f7fb; border-radius:999px; }
  .qty span{ min-width:22px; text-align:center; font-size:13px; }

  /* Shipping protection card */
  .cart-protect{
    display:flex; align-items:center; justify-content:space-between;
    gap:12px; padding:14px; border:1px solid var(--cart-border); border-radius:12px; margin-top:14px;
  }
  .cp-title{ font-weight:700; font-size:14px; }
  .cp-sub{ color:var(--cart-muted); font-size:12px; }
  .cp-price{ font-weight:700; margin-right:10px; }

  /* iOS-like toggle */
  .switch{ position:relative; display:inline-block; width:44px; height:24px; }
  .switch input{ display:none; }
  .slider{
    position:absolute; cursor:pointer; inset:0; background:#e5e7eb; border-radius:999px; transition:.2s;
  }
  .slider:before{
    content:""; position:absolute; height:18px; width:18px; left:3px; top:3px; background:#fff; border-radius:50%; transition:.2s; box-shadow:0 1px 2px rgba(0,0,0,.2);
  }
  .switch input:checked + .slider{ background:#111; }
  .switch input:checked + .slider:before{ transform:translateX(20px); }

  /* footer & tombol */
  .tax-note{ color:var(--cart-muted); font-size:12px; margin:10px 2px 0; }
  .cart-summary{ padding:16px 18px; }
  .btn{ border-radius:999px; font-weight:800; }
  .btn-outline{ border-color:#111; }
  .btn-primary{ border-color:#111; }

  /* mobile */
  @media (max-width:780px){
    .cart-drawer{ width:100vw; }
    .cart-row{ grid-template-columns:64px 1fr; }
    .cart-right{ align-items:flex-start; gap:8px; }
  }

  /* ====== REVIEW STYLE ("What Do They Say") ====== */
  .revList {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 4px 0 0;
  }

  .revCard {
    display: grid;
    grid-template-columns: 40px 1fr;
    align-items: flex-start;
    gap: 12px;
    background: #fafafa;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 16px;
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial;
    color: #0f172a;
  }

  .revAvatar {
    width: 40px;
    height: 40px;
    border-radius: 999px;
    background: #d1d5db;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 600;
    color: #fff;
    user-select: none;
    line-height: 1;
  }

  .revBody {
    font-size: 14px;
    line-height: 1.6;
    color: #111;
    word-break: break-word;
  }

  .revText {
    margin: 0 0 8px;
    font-weight: 400;
    white-space: pre-line;
  }

  .revAuthor {
    margin: 0;
    font-size: 13px;
    font-weight: 500;
    color: #6b7280;
  }



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
