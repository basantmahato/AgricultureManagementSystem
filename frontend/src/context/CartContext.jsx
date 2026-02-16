import { createContext, useState, useEffect } from "react";

const CART_KEY = "krishi_cart";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_KEY);
      if (stored) setCart(JSON.parse(stored));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item, qty = 1) => {
    setCart((prev) => {
      const found = prev.find((c) => c.equipmentId === item._id);
      if (found) {
        return prev.map((c) =>
          c.equipmentId === item._id ? { ...c, quantity: c.quantity + qty } : c
        );
      }
      return [...prev, { equipmentId: item._id, name: item.name, price: item.price, image: item.image, quantity: qty }];
    });
  };

  const removeFromCart = (equipmentId) => {
    setCart((prev) => prev.filter((c) => c.equipmentId !== equipmentId));
  };

  const updateQuantity = (equipmentId, quantity) => {
    if (quantity < 1) {
      removeFromCart(equipmentId);
      return;
    }
    setCart((prev) =>
      prev.map((c) => (c.equipmentId === equipmentId ? { ...c, quantity } : c))
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((s, c) => s + c.quantity, 0);
  const cartTotal = cart.reduce((s, c) => s + c.price * c.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};
