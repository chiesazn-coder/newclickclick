import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import LuxyLanding from "./LuxyLanding";
import Checkout from "./Checkout";
import CheckoutPage from "./pages/CheckoutPage";
import ThankYouPage from "./pages/ThankYouPage";
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
      <HashRouter>
        <ScrollToTop />
        <AppInner />
      </HashRouter>
    </CartProvider>
  );
}

function AppInner() {
  const location = useLocation();

  // sembunyikan cart drawer di halaman form checkout & thank you
  const hideDrawerOnThisPage =
    location.pathname === "/checkout" ||
    location.pathname === "/thank-you.html";

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

        {/* PDP produk */}
        <Route path="/checkout/:productId" element={<Checkout />} />

        {/* Thank you setelah payment */}
        <Route path="/thank-you.html" element={<ThankYouPage />} />

        {/* Halaman info */}
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
