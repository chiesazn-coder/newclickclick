import React, { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = (item, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + qty } : p
        );
      } else {
        return [...prev, { ...item, qty }];
      }
    });
  };

  const updateQty = (id, qty) => {
    setCart((prev) =>
      prev.map((it) => (it.id === id ? { ...it, qty } : it))
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((it) => it.id !== id));
  };

  const clearCart = () => setCart([]);

  // total harga (buat subtotal)
  const total = useMemo(() => {
    return cart.reduce((sum, it) => {
      return sum + (Number(it.price) || 0) * (Number(it.qty) || 0);
    }, 0);
  }, [cart]);

  // 🔥 ini yang baru → jumlah unique product di cart
  const cartCount = cart.length;

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return (
    <CartContext.Provider
      value={{
        items: cart,
        total,
        cartCount,   // <--- expose ke luar
        addItem,
        updateQty,
        removeItem,
        clearCart,
        isOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
