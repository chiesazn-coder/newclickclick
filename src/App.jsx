// App.jsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import LuxyLanding from "./LuxyLanding";
import Checkout from "./Checkout";                  // PDP / halaman produk
import CheckoutPage from "./pages/CheckoutPage";    // FORM isi data diri
import ThankYouPage from "./pages/ThankYouPage";    // <-- NEW
import Catalog from "./Catalog";
import Contact from "./Contact";
import About from "./About";
import Shipping from "./Shipping";
import Returns from "./Returns";
import Faq from "./Faq";
import Privacy from "./Privacy";
import Terms from "./Terms";
import { CartProvider } from "./cart/CartContext";
import CartDrawer from "./cart/CartDrawer";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppInner />
      </BrowserRouter>
    </CartProvider>
  );
}

function AppInner() {
  const location = useLocation();

  // Drawer cart mau disembunyikan di:
  // - /checkout                (form checkout)
  // - /thank-you.html          (halaman selesai bayar)
  //
  // Tapi tetap tampil di:
  // - /checkout/:productId     (PDP / add to cart)
  //
  const hideDrawerOnThisPage =
    location.pathname === "/checkout" ||
    location.pathname === "/thank-you.html"; // <-- NEW

  return (
    <>
      {!hideDrawerOnThisPage && <CartDrawer />}

      <Routes>
        {/* Landing / homepage */}
        <Route path="/" element={<LuxyLanding />} />

        {/* Katalog produk */}
        <Route path="/catalog" element={<Catalog />} />

        {/* Halaman checkout FORM alamat, ongkir, midtrans */}
        <Route path="/checkout" element={<CheckoutPage />} />

        {/* PDP per produk (detail produk di mana user bisa pilih qty dll) */}
        <Route path="/checkout/:productId" element={<Checkout />} />

        {/* Halaman Thank You setelah balik dari Midtrans */}
        <Route
          path="/thank-you.html"
          element={<ThankYouPage />} // <-- NEW
        />

        {/* Halaman info lain */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </>
  );
}

export default App;
