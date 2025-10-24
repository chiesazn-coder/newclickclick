// src/cart/CartDrawer.jsx
import React, { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";     // 🔥 WAJIB: import Link
import { useCart } from "./CartContext";

const CURRENCY = new Intl.NumberFormat("id-ID");

export default function CartDrawer() {
  
  const navigate = useNavigate();
  const {
    isOpen,
    closeCart,
    items = [],          // 🔒 fallback biar gak undefined
    total = 0,
    clearCart,
    removeItem,
    updateQty,
  } = useCart();

  // konfigurasi ala LuxyLemon
  const FREE_SHIP_THRESHOLD = 500_000;   // batas gratis ongkir
  const PROTECTION_PRICE    = 30_000;    // harga proteksi kirim
  const [withProtection, setWithProtection] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("shippingProtection");
    if (saved !== null) {
      setWithProtection(JSON.parse(saved) === true);
    }
  }, []);

  // subtotal cart + optional shipping protection
  const subtotal = useMemo(() => {
    return total + (withProtection ? PROTECTION_PRICE : 0);
  }, [total, withProtection]);

  // progress bar free shipping
  const remain = Math.max(0, FREE_SHIP_THRESHOLD - total);
  const progress = Math.min(
    100,
    Math.round((total / FREE_SHIP_THRESHOLD) * 100)
  );

  return (
    <>
      {/* overlay gelap di belakang drawer */}
      <div
        className={`cart-overlay ${isOpen ? "show" : ""}`}
        onClick={closeCart}
      />

      <aside
        className={`cart-drawer ${isOpen ? "open" : ""}`}
        aria-hidden={!isOpen}
      >
        {/* header */}
        <div className="cart-head">
          <h3>CART</h3>
          <button
            className="cart-close"
            aria-label="Close cart"
            onClick={closeCart}
          >
            ✕
          </button>
        </div>

        {/* body */}
        <div className="cart-body">
          {/* free shipping notice */}
          <div className="cart-freeship">
            {remain > 0 ? (
              <>
                <p>
                  Spend <b>Rp {CURRENCY.format(remain)}</b> more for FREE
                  shipping.
                </p>
                <div className="fs-bar">
                  <span style={{ width: `${progress}%` }} />
                </div>
              </>
            ) : (
              <p className="fs-done">
                You’ve unlocked <b>FREE shipping!</b>
              </p>
            )}
          </div>

          {/* keadaan cart kosong */}
          {items.length === 0 ? (
            <div className="cart-empty">
              <div>
                <h4>Your cart is empty</h4>
                <p>Let’s find something you’ll love.</p>

                <Link
                  to="/catalog"
                  className="cart-cta"
                  onClick={closeCart}
                >
                  Continue shopping
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* list item dalam cart */}
              <div className="cart-list">
                {items.map((it) => (
                  <div className="cart-row" key={it.id}>
                    <img src={it.image} alt={it.title} />

                    <div className="cart-info">
                      <div className="title">{it.title}</div>
                      <div className="meta">Qty</div>

                      <div className="qty">
                        <button
                          onClick={() =>
                            updateQty(it.id, Math.max(1, it.qty - 1))
                          }
                          aria-label="Decrease"
                        >
                          −
                        </button>
                        <span aria-live="polite">{it.qty}</span>
                        <button
                          onClick={() =>
                            updateQty(it.id, Math.min(99, it.qty + 1))
                          }
                          aria-label="Increase"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="cart-right">
                      <div className="cart-price">
                        Rp {CURRENCY.format((it.price || 0) * (it.qty || 0))}
                      </div>
                      <button
                        className="row-remove"
                        onClick={() => removeItem(it.id)}
                        aria-label="Remove"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* shipping protection card */}
              <div className="cart-protect">
                <div className="cp-left">
                  <div className="cp-title">Shipping Protection</div>
                  <div className="cp-sub">
                    Your order isn’t protected from loss or damage
                  </div>
                </div>
                <div className="cp-right">
                  <span className="cp-price">
                    Rp {CURRENCY.format(PROTECTION_PRICE)}
                  </span>

                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={withProtection}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setWithProtection(checked);
                        localStorage.setItem("shippingProtection", JSON.stringify(checked)); // ✅ simpan ke storage
                      }}
                    />
                    <span className="slider" />
                  </label>
                </div>
              </div>

              <p className="tax-note">
                Taxes and shipping calculated at checkout
              </p>
            </>
          )}
        </div>

        {/* footer summary */}
        {items.length > 0 && (
          <div className="cart-summary">
            <div className="cart-total">
              <span className="label">Subtotal</span>
              <span className="value">
                Rp {CURRENCY.format(subtotal || 0)}
              </span>
            </div>

            <div className="cart-actions">
              <Link
                to="/checkout"                   // ⬅ langsung ke form isi data, bukan /checkout/:id
                className="btn btn-primary"
                onClick={closeCart}              // ⬅ biar drawer ketutup pas pindah halaman
              >
                CHECKOUT • Rp {CURRENCY.format(subtotal || 0)}
              </Link>
            </div>
          </div>
        )}
      </aside>
    </>
    
  );
}
