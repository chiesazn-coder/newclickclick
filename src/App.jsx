import LuxyLanding from "./LuxyLanding";
import Checkout from "./Checkout";
import Catalog from "./Catalog"; // ⬅️ tambah ini
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LuxyLanding />} />
        <Route path="/catalog" element={<Catalog />} /> {/* ⬅️ rute baru */}
        <Route path="/checkout/:productId" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
