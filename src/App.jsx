import LuxyLanding from "./LuxyLanding";
import Checkout from "./Checkout";
import Catalog from "./Catalog"; // ⬅️ tambah ini
import Contact from "./Contact"; // ⬅️ tambah ini
import About from "./About";
import Shipping from "./Shipping";
import Returns from "./Returns";
import Faq from "./Faq";
import Privacy from "./Privacy";
import Terms from "./Terms";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LuxyLanding />} />
        <Route path="/catalog" element={<Catalog />} /> {/* ⬅️ rute baru */}
        <Route path="/checkout/:productId" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
