// App.jsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import LuxyLanding from "./LuxyLanding";
import Checkout from "./Checkout";            // <- PDP / halaman produk
import CheckoutPage from "./pages/CheckoutPage";    // <- FORM isi data diri
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

  // kita mau SEMBUNYIKAN drawer di halaman /checkout (form)
  // tapi BIARKAN muncul di /checkout/:productId (product detail)
  const hideDrawerOnThisPage = location.pathname === "/checkout";

  return (
    <>
      {!hideDrawerOnThisPage && <CartDrawer />}

      <Routes>
        <Route path="/" element={<LuxyLanding />} />
        <Route path="/catalog" element={<Catalog />} />

        {/* Halaman checkout FORM alamat, ongkir, midtrans */}
        <Route path="/checkout" element={<CheckoutPage />} />

        {/* Halaman PDP per product */}
        <Route path="/checkout/:productId" element={<Checkout />} />

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
