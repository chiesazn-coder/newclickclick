import React, { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";



const Container = ({ children, className = "" }) => (
  <div className={`container ${className}`}>{children}</div>
);

const Logo = () => <a className="logo" href="#">CLICKCLICK</a>;

const IconSearch = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const IconBag = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2l1 7h10l1-7z"></path>
    <path d="M3 9h18l-1 13H4L3 9z"></path>
  </svg>
);

const ChevronDown = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const PromoStrip = () => {
  const promos = [
    "30% OFF sitewide // Already in your cart",
    "Upgrade? We've got you covered!",
    "30% OFF sitewide // No code needed",
  ];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % promos.length), 3000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="promo">
      <span>{promos[index]}</span>
    </div>
  );
};

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      {/* Row 1: centered logo */}
      <div className="logo-row">
        <Container>
          <Logo />
        </Container>
      </div>

      {/* Row 2: menu center + actions right */}
      <div className="menu-row">
      <div className="menu-inner">
        <button
          className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span><span></span><span></span>
        </button>

        <nav className={`nav-center ${menuOpen ? 'open' : ''}`}>
          <a href="#">Home</a>
          <a href="#">Product</a>
          <a href="#">About Us</a>
          <a href="#">Contact</a>
        </nav>

        <div className="actions-right">
          <button className="icon-btn"><IconSearch /></button>
          <button className="icon-btn"><ShoppingCart size={22} /></button>
        </div>
      </div>
      </div>
    </header>
  );
};

const Hero = () => {
  const [isMobile, setIsMobile] = React.useState(false);
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 👉 Tambahkan ini: reload video saat source berubah
  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [isMobile]);

  return (
    <section className="hero">
      <video
        ref={videoRef}
        className="hero-media"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/assets/hero-poster.jpg"
      >
        <source
          src={isMobile ? "/assets/catalog-mobile.mp4" : "/assets/catalog.mp4"}
          type="video/mp4"
        />
      </video>
    </section>
  );
};


export default function LuxyLanding() {
  return (
    <>
      <PromoStrip />
      <Navbar />
      <Hero />
      <ProductsSection />
      <SplitFeature />
      <VideoStrip />
      <SplitFeatureSnap />
      <Testimonials />
      <VideoCarousel />
      <FooterSection />
      <style>{css}</style>
    </>
  );
}

/* ======================================================
   ProductCard: klik/touch gambar untuk ganti image
   ====================================================== */
// pastikan di TOP FILE ada:

const ProductCard = ({ p }) => {
  const [imgIdx, setImgIdx] = React.useState(0);
  const total = p?.images?.length || (p?.image ? 1 : 0);
  const timerRef = React.useRef(null);
  const navigate = useNavigate?.(); // aman jika router belum terpasang

  const nextImage = React.useCallback(() => {
    if (total <= 1) return;
    setImgIdx((i) => (i + 1) % total);
  }, [total]);

  const stopRotateAndReset = React.useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTimeout(() => setImgIdx(0), 200);
  }, []);

  const startRotate = React.useCallback(() => {
    if (total <= 1 || timerRef.current) return;
    timerRef.current = setInterval(nextImage, 900);
  }, [nextImage, total]);

  const handleTouch = (e) => {
    e.preventDefault();
    stopRotateAndReset();
    nextImage();
    setTimeout(() => setImgIdx(0), 800);
  };

  React.useEffect(() => () => stopRotateAndReset(), [stopRotateAndReset]);

  const handleGoCheckout = (e) => {
    e.preventDefault();
    const url = `/checkout/${p.id}`;
    if (navigate) navigate(url);
    else window.location.href = url; // fallback jika belum pakai Router
  };

  const imgSrc =
    p?.images && p.images[imgIdx]
      ? p.images[imgIdx]
      : p?.image || "/assets/placeholder.png";

  const priceText =
    typeof p?.price === "number"
      ? `Rp ${p.price.toLocaleString("id-ID")}`
      : "";

  return (
    <article className="product-card">
      {p?.isNew && <span className="new-badge">NEW</span>}

      <a
        href="#"
        className="thumb"
        role="button"
        tabIndex={0}
        aria-label={`Open checkout for ${p?.title || "product"}`}
        onClick={handleGoCheckout}
        onMouseEnter={startRotate}
        onMouseLeave={stopRotateAndReset}
        onTouchStart={handleTouch}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleGoCheckout(e);
          }
        }}
      >
        <img src={imgSrc} alt={p?.alt || p?.title || "product image"} loading="lazy" />
      </a>

      <div className="meta">
        <h3 className="name">{p?.title || "Product"}</h3>
        <div className="price">{priceText}</div>
      </div>
    </article>
  );
};


/* ======================================================
   ProductsSection: data + horizontal track
   ====================================================== */
const ProductsSection = () => {
  // Ganti path gambar sesuai aset kamu
  const products = [
    {
      id: 1,
      title: "CLICK CLICK M4 Selfie",
      price: 28,
      isNew: true,
      colors: ["#5C7EAB", "#E8DAC6", "#F4E98E"],
      images: [
        "/assets/selfie/prod-m4.png",
        "/assets/selfie/product/m4-2.png",
        "/assets/selfie/product/m4-3.png",
      ],
      alt: "Weekly Dashboard planner in pastel yellow",
    },
    {
      id: 2,
      title: "CLICK CLICK T8D Selfie",
      price: 28,
      isNew: true,
      colors: ["#E9E0D4", "#5C7EAB", "#6C846E"],
      images: [
        "/assets/selfie/prod-t8d.png",
        "/assets/selfie/product/t8d-2.png",
        "/assets/selfie/product/t8d-3.png",
      ],
      alt: "Mini Reset Journal in blue",
    },
    {
      id: 3,
      title: "CLICK CLICK T3B Selfie",
      price: 28,
      isNew: true,
      colors: ["#6C846E", "#5C7EAB", "#E9E0D4"],
      images: [
        "/assets/selfie/prod-t3b.png",
        "/assets/selfie/product/t3b-2.png",
        "/assets/selfie/product/t3b-3.png",
      ],
      alt: "Weekly Meal Planner in green",
    },
    {
      id: 4,
      title: "CLICK CLICK T1M Selfie",
      price: 28,
      isNew: true,
      colors: ["#6C846E", "#5C7EAB", "#E9E0D4"],
      images: [
        "/assets/selfie/prod-t1m.png",
        "/assets/selfie/product/t1m-2.png",
        "/assets/selfie/product/t1m-3.png",
      ],
      alt: "Weekly Meal Planner alt set",
    },
    {
      id: 5,
      title: "CLICK CLICK Robotic Massagers",
      price: 28,
      isNew: true,
      colors: ["#6C846E", "#5C7EAB", "#E9E0D4"],
      images: [
        "/assets/snap/pink-prod.png",
        "/assets/snap/prod-1.png",
      ],
      alt: "Weekly Meal Planner in pink",
    },
  ];

  const trackRef = React.useRef(null);

  return (
    <section className="products">
      <Container>
        <h2 className="products-title">Tools for a Balanced Life</h2>

        <div className="products-wrap">
          <div className="track" ref={trackRef}>
            {products.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};


/* ======================================================
   SplitFeature: gambar kiri, copy kanan (seperti referensi)
   ====================================================== */
const SplitFeature = () => {
  return (
    <section className="split-feature">
      {/* Kolom gambar */}
      <div className="split-media">
        <img
          src="/assets/feature-planner.jpeg"   /* ganti sesuai asetmu */
          alt="Assorted self-care planners laid on a marble surface"
          className="split-img"
        />
      </div>

      {/* Kolom teks */}
      <div className="split-copy">
        <p className="split-kicker">Bestseller</p>
        <h3 className="split-title">The Self-Care Planner</h3>
        <p className="split-desc">
          The ultimate ‘all-in-one’ planner for work, life, and self-care.
          Using our holistic planning system, you’ll learn to prioritize daily
          self-care—putting you in the best position to achieve your goals.
        </p>
        <a href="#" className="split-btn" aria-label="Shop The Self-Care Planner">
          SHOP NOW
        </a>
      </div>
    </section>
  );
};

/* ======================================================
   VideoStrip: section video full-width seperti referensi
   ====================================================== */
const VideoStrip = () => {
  const vidRef = React.useRef(null);

  // Auto-pause saat keluar viewport, play saat terlihat
  React.useEffect(() => {
    const el = vidRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Hormati prefers-reduced-motion
  React.useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    const el = vidRef.current;
    if (!el) return;
    const apply = () => {
      if (m.matches) el.pause();
      else el.play().catch(() => {});
    };
    apply();
    m.addEventListener?.('change', apply);
    return () => m.removeEventListener?.('change', apply);
  }, []);

  return (
    <section className="video-strip" aria-label="Brand film">
      <video
        ref={vidRef}
        className="video-strip_media"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        {/* pakai webm bila tersedia untuk ukuran lebih kecil */}
        {/* <source src="/assets/video/brand.webm" type="video/webm" /> */}
        <source src="/assets/snap/tutorials.mp4" type="video/mp4" />
      </video>
    </section>
  );
};

/* ======================================================
   SplitFeatureSnap: gambar kanan, copy kanan (seperti referensi)
   ====================================================== */
const SplitFeatureSnap = () => {
  return (
    <section className="split-feature-snap">
      {/* Kolom teks */}
      <div className="split-copy-snap">
        <p className="split-kicker-snap">Bestseller</p>
        <h3 className="split-title-snap">The Self-Care Planner</h3>
        <p className="split-desc-snap">
          The ultimate ‘all-in-one’ planner for work, life, and self-care.
          Using our holistic planning system, you’ll learn to prioritize daily
          self-care—putting you in the best position to achieve your goals.
        </p>
        <a href="#" className="split-btn-snap" aria-label="Shop The Self-Care Planner">
          SHOP NOW
        </a>
      </div>
      {/* Kolom gambar */}
      <div className="split-media-snap">
        <img
          src="/assets/snap/features-pink.png"   /* ganti sesuai asetmu */
          alt="Assorted self-care planners laid on a marble surface"
          className="split-img-snap"
        />
      </div>
    </section>
  );
};

/* ======================================================
   Testimonials: carousel review dengan panah navigasi
   ====================================================== */
const Star = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#ff7bd4" aria-hidden="true">
    <path d="M12 2l2.9 6.3 6.9.6-5.2 4.6 1.6 6.7L12 16.9 5.8 20.2l1.6-6.7L2.2 8.9l6.9-.6L12 2z"/>
  </svg>
);

const Verified = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="#4f46e5" aria-hidden="true">
    <path d="M12 2l2.2 1.2 2.5-.3 1.6 2 2.4.9.3 2.5 1.2 2.2-1.2 2.2-.3 2.5-2.4.9-1.6 2-2.5-.3L12 22l-2.2-1.2-2.5.3-1.6-2-2.4-.9-.3-2.5L0 12l1.2-2.2.3-2.5 2.4-.9 1.6-2 2.5.3L12 2z"/>
    <path d="M10.1 13.6l-2.2-2.2 1.4-1.4 0 0 1.5 1.5 4-4 1.4 1.4-5.4 5.1z" fill="#fff"/>
  </svg>
);

const Testimonials = () => {
  const trackRef = React.useRef(null);

  const scrollByCards = (dir = 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector(".t-card");
    const gap = parseInt(getComputedStyle(el).columnGap || getComputedStyle(el).gap || "24", 10);
    const step = (card?.getBoundingClientRect().width || 320) + gap;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const reviews = [
    {
      id: 1,
      name: "Kim G.",
      title: "Love the color and the",
      body: "Love the color and the bubbles on back for gripping.",
      product: "CLICK CLICK M4 Selfie Screen",
      productImg: "/assets/selfie/prod-m4.png",
      rating: 5
    },
    {
      id: 2,
      name: "Celina F.",
      title: "Purple MagSafe ring!!!!",
      body: "I love the color and all that sparkle! The stones make it pop! Highly recommended 💜",
      product: "CLICK CLICK T8D Selfie Screen",
      productImg: "/assets/selfie/prod-t8d.png",
      rating: 5
    },
    {
      id: 3,
      name: "Ava L.",
      title: "Cute and durability",
      body: "Great colors and design. Dropped my phone many times—no damage, so also durable.",
      product: "CLICK CLICK T1M Selfie Screen",
      productImg: "/assets/selfie/prod-t1m.png",
      rating: 5
    },
    {
      id: 4,
      name: "Stiven.",
      title: "Cute and durability",
      body: "Great colors and design. Dropped my phone many times—no damage, so also durable.",
      product: "CLICK CLICK T3B Selfie Screen",
      productImg: "/assets/selfie/prod-t3b.png",
      rating: 5
    },
  ];

  return (
    <section className="testimonials">
      <Container>
        <h2 className="t-title">Our Community Speaks</h2>

        <div className="t-ratingline">
          <div className="t-stars">
            <Star /><Star /><Star /><Star /><Star />
          </div>
          <span className="t-count">11060 reviews</span>
        </div>

        <div className="t-wrap">
          <button
            className="t-nav t-nav--left"
            aria-label="Previous reviews"
            onClick={() => scrollByCards(-1)}
          >
            <span>‹</span>
          </button>

          <div className="t-track" ref={trackRef}>
            {reviews.map((r) => (
              <article key={r.id} className="t-card">
                <header className="t-head">
                  <div className="t-person">
                    <strong>{r.name}</strong>
                    <span className="t-verified"><Verified /> Verified Buyer</span>
                  </div>
                  <div className="t-card-stars">
                    {Array.from({ length: r.rating }).map((_, i) => <Star key={i} size={16} />)}
                  </div>
                </header>

                <h3 className="t-card-title">{r.title}</h3>
                <p className="t-card-body">{r.body}</p>

                <footer className="t-foot">
                  {r.productImg && <img src={r.productImg} alt="" />}
                  <a href="#" className="t-product">{r.product}</a>
                </footer>
              </article>
            ))}
          </div>

          <button
            className="t-nav t-nav--right"
            aria-label="Next reviews"
            onClick={() => scrollByCards(1)}
          >
            <span>›</span>
          </button>
        </div>
      </Container>
    </section>
  );
};

/* ======================================================
   VideoCarousel: reels-style horizontal video gallery
   ====================================================== */
const VideoCarousel = () => {
  const trackRef = React.useRef(null);

  // Auto play/pause berdasarkan visibilitas item
  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const videos = Array.from(track.querySelectorAll("video"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const v = e.target;
          if (e.isIntersecting) {
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        });
      },
      { root: track, threshold: 0.6 }
    );
    videos.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);

  const scrollByOne = (dir = 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector(".reel");
    const gap = parseInt(getComputedStyle(el).columnGap || getComputedStyle(el).gap || "20", 10);
    const step = (card?.getBoundingClientRect().width || 360) + gap;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  // Ganti sumber video sesuai asetmu
  const reels = [
    { id: 1, src: "/assets/snap/reels/reel-1.mp4", poster: "/assets/reels/reel-1.jpg" },
    { id: 2, src: "/assets/snap/reels/reel-4.mp4", poster: "/assets/reels/reel-2.jpg" },
    { id: 3, src: "/assets/snap/reels/reel-3.mp4", poster: "/assets/reels/reel-3.jpg" },
    { id: 4, src: "/assets/snap/reels/reel-2.mp4", poster: "/assets/reels/reel-4.jpg"},
  ];

  return (
    <section className="reels-section">
      <Container>
        <div className="reels-head">
          <h2>CLICK CLICK in action</h2>
          <a className="reels-follow" href="#" aria-label="Follow us">FOLLOW US</a>
        </div>
      </Container>

      <div className="reels-viewport">
        <button className="reels-nav reels-nav--left" aria-label="Previous" onClick={() => scrollByOne(-1)}>‹</button>

        <div className="reels-track" ref={trackRef}>
          {reels.map((r) => (
            <article className="reel" key={r.id}>
              <video
                className="reel-media"
                muted
                loop
                playsInline
                preload="metadata"
                poster={r.poster}
              >
                <source src={r.src} type="video/mp4" />
              </video>

              <div className="reel-cap">
                <span>{r.caption}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </div>
            </article>
          ))}
        </div>

        <button className="reels-nav reels-nav--right" aria-label="Next" onClick={() => scrollByOne(1)}>›</button>
      </div>
    </section>
  );
};

/* ======================================================
   FooterSection: 4 kolom + payment logos + bottom bar
   ====================================================== */
const FooterSection = () => {
  return (
    <footer className="site-footer">
      <Container>
        {/* 4 Columns */}
        <div className="f-grid">
          <div className="f-col">
            <h4 className="f-title">CUSTOMER CARE</h4>
            <ul className="f-list">
              <li><a href="#">Shipping & Delivery</a></li>
              <li><a href="#">Returns & Exchanges</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>

          <div className="f-col">
            <h4 className="f-title">ABOUT US</h4>
            <ul className="f-list">
              <li><a href="#">Our Story</a></li>
              <li><a href="#">Wholesale</a></li>
            </ul>
          </div>

          <div className="f-col">
            <h4 className="f-title">HELP & LEGAL</h4>
            <ul className="f-list">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          <div className="f-col">
            <h4 className="f-title">FOLLOW US</h4>
            <ul className="f-list">
              <li><a href="#" aria-label="Instagram">Instagram</a></li>
              <li><a href="#" aria-label="TikTok">TikTok</a></li>
              <li><a href="#" aria-label="Shopee">Shopee</a></li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="f-bottom">
        <Container>
          <div className="f-bottom-inner">
            <p className="f-copy">© 2025 Clickclick, All rights reserved.</p>
            <p className="f-right">Secured Checkout • Trusted Payments</p>
          </div>
        </Container>
      </div>
    </footer>
  );
};



const css = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;900&display=swap');

  :root{ --text:#111; --muted:#6b7280; --pink:#ff3aa0; }
  *{box-sizing:border-box}
  body{font-family: ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial; color:var(--text)}
  .container{max-width:1280px;margin:0 auto;padding:0 24px}

  /* Promo */
  .promo{background:#ffeaf5;text-align:center;padding:8px 0;font-weight:700;font-size:13px;}

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

  /* --- Mobile navbar: sejajarkan burger + ikon kanan --- */
  @media (max-width: 920px){
    .menu-inner{
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 60px;
      padding: 0 16px;
    }
  
    /* Burger Button */
    .menu-toggle{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      border: none;
      background: transparent;
      cursor: pointer;
    }
  
    .menu-toggle span{
      display: block;
      width: 22px;
      height: 2px;
      background: #111;
      border-radius: 2px;
      margin: 3px 0;
      transition: transform 0.2s, opacity 0.2s;
    }
  
    .menu-toggle.is-open span:nth-child(1){
      transform: translateY(6px) rotate(45deg);
    }
    .menu-toggle.is-open span:nth-child(2){
      opacity: 0;
    }
    .menu-toggle.is-open span:nth-child(3){
      transform: translateY(-6px) rotate(-45deg);
    }
  
    /* Right icons */
    .actions-right{
      display: flex;
      align-items: center;
      gap: 14px;
    }
  
    .actions-right .icon-btn{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      padding: 0;
      border: none;
      background: transparent;
    }
  
    /* Hide nav-center when closed */
    .nav-center{
      display: none;
    }
    .nav-center.open{
      display: block;
      width: 100%;
      background: #fff;
      border-top: 1px solid #eee;
    }
  
    .nav-center a{
      display: block;
      padding: 14px 16px;
      font-size: 16px;
      border-bottom: 1px solid #f5f5f5;
    }
  }
  
  /* HERO */
  .hero {
    position: relative;
    min-height: 62vh;
    display: grid;
    place-items: center;
    overflow: hidden;
    background: #000; /* fallback */
  }
  
  .hero-media {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 40%;
    filter: brightness(.9);
    transition: filter 0.3s ease, object-position 0.3s ease;
  }
  
  .hero::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(0deg, rgba(0,0,0,.15), rgba(0,0,0,.15));
  }
  
  .hero-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 18px;
    padding: 40px;
  }
  
  .badge {
    background: #fff;
    padding: 5px 10px;
    border-radius: 999px;
    font-weight: 800;
    font-size: 12px;
  }
  
  h1 {
    margin: 0;
  }
  
  h1 span {
    display: block;
    font-size: 56px;
    font-weight: 900;
    background: rgba(255,255,255,.85);
    padding: 10px 16px;
    border-radius: 14px;
  }
  
  h1 span + span {
    background: rgba(255,255,255,.7);
  }
  
  .cta {
    display: inline-block;
    background: #000;
    color: #fff;
    padding: 14px 22px;
    border-radius: 12px;
    font-weight: 800;
    margin-top: 6px;
  }
  
  @media (max-width: 640px) {
    h1 span {
      font-size: 36px;
    }
  }
  
  @media (max-width: 768px) {
    .hero {
      min-height: 72vh;
    }
    .hero-media {
      object-position: center 30%;
      filter: brightness(1);
    }
  }
  
  

  /* PRODUCTS */
  .products { background:#ffff; padding:72px 0; }
  .products-title{
    text-align:center; font-size:36px; line-height:1.2; margin:0 0 36px;
    font-family: "Poppins", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial;
    font-weight:300; color:#151515;
  }

  /* horizontal track (snap on mobile) */
  .track{
    display:flex; gap:32px; overflow-x:auto; scroll-snap-type:x mandatory; padding:4px;
    scrollbar-width:none;
  }
  .track::-webkit-scrollbar { display:none; }

  /* 3 kartu terlihat di desktop */
  .product-card{
    flex:0 0 calc((100% - 2 * 32px) / 3);
    scroll-snap-align:start;
    background:transparent; border:none; box-shadow:none; position:relative; overflow:visible;
  }

  @media (max-width: 780px){
    .track{ gap:20px; }
    .product-card{ flex:0 0 78%; }
  }

  .product-card .meta {
    text-align: center;       /* ⬅️ ini kunci agar teksnya di tengah */
    margin-top: 8px;
  }
  
  .product-card .name {
    font-family: "Poppins", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 4px;
  }
  
  .product-card .price {
    font-family: "Poppins", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial;
    font-size: 14px;
    color: #111;
  }
  

  .product-card .new-badge{
    position:absolute; left:16px; top:16px;
    background:#fff; border-radius:4px; padding:6px 10px;
    font-size:12px; font-weight:700; color:#6b7280; letter-spacing:.06em;
    box-shadow:0 6px 18px rgba(0,0,0,.06);
  }

  /* gambar tidak dipotong */
  .product-card .thumb{
    aspect-ratio: 4 / 3;
    display:flex; align-items:center; justify-content:center; background:none;
  }
  .product-card img{
    width:100%; height:100%; max-width:100%; max-height:100%;
    object-fit:contain; object-position:center; display:block;
  }

  .colors{ display:flex; justify-content:center; gap:10px; margin-top:10px; }
  .color-dot{
    width:16px; height:16px; border-radius:999px; border:2px solid #fff;
    box-shadow:0 0 0 1px rgba(0,0,0,.12); display:inline-block;
  }

  @media (max-width: 1100px){
    .track{ grid-template-columns: repeat(3, 320px); }
  }
  @media (max-width: 780px){
    .products{ padding:56px 0; }
    .products-title{ font-size:28px; margin-bottom:24px; }
    .track{ grid-auto-flow: column; grid-auto-columns: 78%; gap:20px; }
    .prod-nav{ display:none; }
  }

  /* ===== Split Feature (image left, copy right) ===== */
  .split-feature{
    display:grid;
    grid-template-columns: 1.15fr 1fr; /* kiri sedikit lebih lebar sesuai referensi */
    gap:0;
    align-items:stretch;
    margin:60px 0;
    background:#fff;
  }
  @media (max-width: 980px){
    .split-feature{
      grid-template-columns: 1fr;
      margin:56px 0;
    }
  }

  .split-media{
    position:relative;
    min-height: 80vh;         /* tinggi seksi—atur sesuai selera */
    overflow:hidden;
  }
  .split-img{
    position:absolute; inset:0;
    width:100%; height:100%;
    object-fit:cover;
    object-position: center;   /* geser framing di sini (mis. 'center top', '60% 50%') */
    transform: scale(1.02);    /* zoom sedikit; ubah untuk lebih dekat/jauh */
    transition: transform .6s ease;
    will-change: transform;
  }
  .split-media:hover .split-img{ transform: scale(1.05); }

  .split-copy{
    display:flex; flex-direction:column; justify-content:center;
    padding: clamp(28px, 6vw, 80px);
    color:#111;
  }
  .split-kicker{
    font-style: italic;
    font-size: 20px;
    line-height: 1.2;
    margin: 0 0 6px;
    color:#111;
    opacity:.95;
    font-family:"Poppins", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial;
    font-weight:300;
  }
  .split-title{
    margin:0 0 16px;
    font-size: clamp(24px, 3vw, 40px);
    line-height:1.15;
    font-weight:100;
    letter-spacing:.2px;
    font-family: "Poppins", ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial;
  }
  .split-desc{
    margin:0 0 28px;
    font-size:14px;
    line-height:1.8;
    color:#374151; /* muted */
    max-width: 58ch;
    font-family:"Poppins", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial;
    font-weight:300;
  }
  
  .split-btn {
    display: inline-block;       /* supaya ukurannya ikut isi teks */
    width: auto;                 /* cegah lebar penuh */
    max-width: fit-content;      /* pastikan border gak stretch */
    padding: 10px 22px;
    border: 1px solid #111;
    color: #111;
    background: transparent;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: .06em;
    text-decoration: none;
    cursor: pointer;
    transition: all .2s ease;
  }
  
  .split-btn:hover {
    background: #111;
    color: #fff;
  }

  /* ===== VideoStrip (full-bleed video) ===== */
  .video-strip{
    position: relative;
    width: 100%;
    background: #000;          /* hitam agar transisi mulus saat buffer */
    overflow: hidden;
    margin: 56px 0;            /* jarak atas/bawah — sesuaikan */
  }
  .video-strip_media{
    display: block;
    width: 100%;
    height: clamp(52vh, 70vh, 86vh);  /* tinggi responsif a la referensi */
    object-fit: cover;
    object-position: center;         /* geser framing jika perlu */
    filter: none;
  }
  @media (max-width: 780px){
    .video-strip_media{ height: 48vh; }
    .video-strip{ margin: 40px 0; }
  }

  /* ===== Split Feature Snap (image left, copy right) ===== */
  .split-feature-snap{
    display:grid;
    grid-template-columns: 1.15fr 1fr; /* kiri sedikit lebih lebar sesuai referensi */
    gap:0;
    align-items:stretch;
    margin:60px 0;
    background:#fff;
  }
  @media (max-width: 980px){
    .split-feature-snap{
      grid-template-columns: 1fr;
      margin:56px 0;
    }
  }

  .split-media-snap{
    position:relative;
    min-height: 78vh;         /* tinggi seksi—atur sesuai selera */
    overflow:hidden;
  }
  .split-img-snap{
    position:absolute; inset:0;
    width:100%; height:100%;
    object-fit:cover;
    object-position: center;   /* geser framing di sini (mis. 'center top', '60% 50%') */
    transform: scale(1.02);    /* zoom sedikit; ubah untuk lebih dekat/jauh */
    transition: transform .6s ease;
    will-change: transform;
  }
  .split-media-snap:hover .split-img-snap{ transform: scale(1.05); }

  .split-copy-snap{
    display:flex; flex-direction:column; justify-content:center;
    padding: clamp(28px, 6vw, 80px);
    color:#111;
  }
  .split-kicker-snap{
    font-style: italic;
    font-size: 20px;
    line-height: 1.2;
    margin: 0 0 6px;
    color:#111;
    opacity:.95;
    font-family:"Poppins", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial;
    font-weight:300;
  }
  .split-title-snap{
    margin:0 0 16px;
    font-size: clamp(28px, 4vw, 44px);
    line-height:1.15;
    font-weight:600;
    letter-spacing:.2px;
    font-family: ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial;
  }
  .split-desc-snap{
    margin:0 0 28px;
    font-size:16px;
    line-height:1.8;
    color:#374151; /* muted */
    max-width: 58ch;
    font-family:"Poppins", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial;
    font-weight:300;
  }
  
  .split-btn-snap{
    display: inline-block;       /* supaya ukurannya ikut isi teks */
    width: auto;                 /* cegah lebar penuh */
    max-width: fit-content;      /* pastikan border gak stretch */
    padding: 10px 22px;
    border: 1px solid #111;
    color: #111;
    background: transparent;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: .06em;
    text-decoration: none;
    cursor: pointer;
    transition: all .2s ease;
  }
  
  .split-btn-snap:hover {
    background: #111;
    color: #fff;
  }

  /* ===== Testimonials ===== */
  .testimonials{ padding: 50px 0; background:#fff; }
  .t-title{
    font-size: clamp(24px, 3.2vw, 40px);
    margin: 0 0 16px;
    font-family:"Poppins", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial;
    font-weight: 70;
    color:#111;
  }
  .t-ratingline{
    display:flex; align-items:center; gap:14px;
    border-bottom:1px solid #e5e7eb;
    padding-bottom:16px; margin-bottom:28px;
  }
  .t-stars{ display:flex; gap:6px; align-items:center }
  .t-count{ color:#6b7280; font-family:"Poppins", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial; ;font-size:14px }

  .t-wrap{
    position:relative;
  }

  .t-track{
    display:flex; gap:24px;
    overflow-x:auto; scroll-snap-type:x mandatory;
    padding:8px 8px 8px 0;
    scrollbar-width:none;
  }
  .t-track::-webkit-scrollbar{ display:none; }

  .t-card{
    flex: 0 0 calc((100% - 2 * 24px)/3); /* 3 kartu di desktop */
    min-width: 320px;
    background:#fff;
    border:1px solid #e6e8ee;
    border-radius:16px;
    box-shadow:0 6px 18px rgba(0,0,0,.04);
    padding:24px;
    scroll-snap-align:start;
  }
  @media (max-width: 1024px){
    .t-card{ flex:0 0 calc((100% - 24px)/2); }
  }
  @media (max-width: 720px){
    .t-card{ flex:0 0 88%; }
  }

  .t-head{ display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; }
  .t-person{ display:flex; align-items:center; gap:10px; color:#111; }
  .t-person strong{ font-family:"Poppins", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial; font-weight:100; }
  .t-verified{
    display:inline-flex; align-items:center; gap:6px;
    font-size:12px; color:#4f46e5;
    background:#eef2ff; padding:4px 8px; border-radius:999px;
  }
  .t-card-stars{ display:flex; gap:4px; }

  .t-card-title{
    font-family:"Poppins", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial;
    margin:8px 0; font-size: clamp(14px, 2.2vw, 22px); line-height:1.3; font-weight:400; color:#111;
  }
  .t-card-body{
    font-family:"Poppins", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial;
    margin:0 0 18px; color:#374151; font-size:14px; line-height:1.7;
  }

  .t-foot{
    display:flex; align-items:center; gap:10px; margin-top:auto;
    border-top:1px solid #f1f3f7; padding-top:14px;
  }
  .t-foot img{ width:28px; height:28px; object-fit:cover; border-radius:6px; }
  .t-product{
    font-family:"Poppins", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial;
    color:#6b5cff; text-decoration:none; font-weight:500;
  }
  .t-product:hover{ text-decoration:underline; }

  .t-nav{
    position:absolute; top:50%; transform:translateY(-50%);
    width:44px; height:44px; border-radius:999px;
    background:#fff; border:1px solid rgba(0,0,0,.08);
    box-shadow:0 6px 18px rgba(0,0,0,.08);
    display:grid; place-items:center; cursor:pointer;
    transition: transform .15s ease, box-shadow .2s ease;
    z-index:2;
  }
  .t-nav:hover{ transform: translateY(-50%) scale(1.05); box-shadow:0 10px 24px rgba(0,0,0,.12); }
  .t-nav--left{ left:-6px; }
  .t-nav--right{ right:-6px; }
  .t-nav span{ font-size:24px; line-height:1; color:#444; }
  @media (max-width: 780px){
    .t-nav--left{ left:6px; } .t-nav--right{ right:6px; }
  }

  /* ===== Video Carousel (Away in action) ===== */
  .reels-section{
    background: #fff;
    color: #111;
    padding: 60px 0 24px;
  }
  .reels-head{
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 18px;
  }
  .reels-head h2{
    margin: 0;
    font-size: clamp(22px, 3vw, 36px);
    font-weight: 100;
    color: #111;
    font-family:"Poppins", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial;
  }
  .reels-follow{
    display: inline-block;
    padding: 10px 18px;
    border: 1px solid #111;
    color: #111;
    text-decoration: none;
    border-radius: 6px;
    font-weight: 600;
    letter-spacing: 0.06em;
    transition: background 0.2s ease, color 0.2s ease;
  }
  .reels-follow:hover{ background: #111;
    color: #fff;}

  .reels-viewport{
    position:relative; overflow:hidden; /* untuk panah menumpuk di atas track */
  }
  .reels-track{
    display:flex; gap:20px; overflow-x:auto; scroll-snap-type:x mandatory;
    padding:0 8px 24px; scrollbar-width:none;
  }
  .reels-track::-webkit-scrollbar{ display:none; }

  .reel{
    position:relative; flex:0 0 clamp(260px, 28vw, 360px);
    height: clamp(58vh, 70vh, 82vh);  /* tinggi responsif */
    background:#000; border-left:2px solid rgba(255,255,255,.18);
    scroll-snap-align:start; overflow:hidden;
  }
  .reel:first-child{ border-left:none; }

  .reel-media{
    width:100%; height:100%; object-fit:cover; object-position:center;
    display:block; transform:scale(1.02); transition:transform .4s ease;
  }
  .reel:hover .reel-media{ transform:scale(1.06); }

  .reel-cap{
    position:absolute; left:12px; right:12px; bottom:10px;
    display:flex; align-items:center; justify-content:space-between;
    gap:10px; color:#fff; text-shadow:0 1px 2px rgba(0,0,0,.35);
    font-weight:600; letter-spacing:.04em;
  }
  .reel-cap span{ text-transform:uppercase; font-size:13px; }
  .reel-cap svg{ opacity:.9; }

  .reels-nav{
    position:absolute; top:50%; transform:translateY(-50%);
    width:44px; height:44px; border-radius:999px; border:0;
    background:#fff; color:#111; box-shadow:0 8px 22px rgba(0,0,0,.25);
    display:grid; place-items:center; cursor:pointer; z-index:5;
    font-size:24px; line-height:1; transition:transform .15s ease, box-shadow .2s ease;
  }
  .reels-nav:hover{ transform:translateY(-50%) scale(1.05); box-shadow:0 12px 28px rgba(0,0,0,.3); }
  .reels-nav--left{ left:8px; }
  .reels-nav--right{ right:8px; }

  @media (max-width: 820px){
    .reel{ flex-basis: 72vw; height: 64vh; }
    .reels-nav{ width:40px; height:40px; }
  }

  /* ===== Footer ===== */
  .site-footer{
    background:#fff; color:#0f172a;
    border-top:1px solid #eef0f4;
    margin-top:56px;
    font-family:"Poppins", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial;
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
