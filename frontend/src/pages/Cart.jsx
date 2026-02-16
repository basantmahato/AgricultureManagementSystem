import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [address, setAddress] = useState(user?.location || "");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (!address.trim() || !mobile.trim()) {
      alert("Address and mobile are required");
      return;
    }
    if (!user && (!name.trim() || !email.trim())) {
      alert("Name and email are required for guest checkout");
      return;
    }
    setLoading(true);
    try {
      await api.post("/orders", {
        items: cart.map((c) => ({ equipmentId: c.equipmentId, quantity: c.quantity })),
        shippingAddress: address.trim(),
        mobile: mobile.trim(),
        customerName: name.trim() || user?.name,
        customerEmail: email.trim() || user?.email
      });
      clearCart();
      setOrderPlaced(true);
    } catch (err) {
      alert(err.response?.data?.message || "Order failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="cart-page">
        <div className="cart-success">
          <h2>Order Placed Successfully!</h2>
          <p>Cash on delivery. We will contact you soon.</p>
          <Link to="/store">Continue Shopping</Link>
        </div>
        <style>{`
          .cart-page { min-height: 60vh; display: flex; align-items: center; justify-content: center; padding: 24px; }
          .cart-success { text-align: center; background: #fff; padding: 48px; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.08); }
          .cart-success h2 { color: #16a34a; margin: 0 0 12px; }
          .cart-success p { color: #64748b; margin: 0 0 24px; }
          .cart-success a { color: #16a34a; font-weight: 600; }
        `}</style>
      </div>
    );
  }

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <h2>Your cart is empty</h2>
          <Link to="/store">Browse Equipment</Link>
        </div>
        <style>{`
          .cart-page { min-height: 60vh; display: flex; align-items: center; justify-content: center; padding: 24px; }
          .cart-empty { text-align: center; }
          .cart-empty h2 { color: #64748b; margin: 0 0 16px; }
          .cart-empty a { color: #16a34a; font-weight: 600; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1>Cart</h1>

        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.equipmentId} className="cart-item">
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>₹{item.price.toLocaleString()} each</p>
              </div>
              <div className="cart-item-qty">
                <button onClick={() => updateQuantity(item.equipmentId, item.quantity - 1)}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.equipmentId, item.quantity + 1)}>+</button>
              </div>
              <div className="cart-item-total">₹{(item.price * item.quantity).toLocaleString()}</div>
              <button className="cart-item-remove" onClick={() => removeFromCart(item.equipmentId)}>Remove</button>
            </div>
          ))}
        </div>

        <form onSubmit={handleOrder} className="cart-form">
          <h2>Checkout (Cash on Delivery)</h2>
          {!user && (
            <>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" required />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            </>
          )}
          <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Shipping Address" required />
          <input value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile Number" required />

          <div className="cart-total-row">
            <strong>Total: ₹{cartTotal.toLocaleString()}</strong>
          </div>
          <button type="submit" disabled={loading}>{loading ? "Placing Order..." : "Place Order (COD)"}</button>
        </form>
      </div>

      <style>{`
        .cart-page { min-height: 100vh; padding: clamp(24px, 5vw, 48px) clamp(20px, 4vw, 32px); background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); }
        .cart-container { max-width: 640px; margin: 0 auto; background: #fff; padding: 32px; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.08); }
        .cart-container h1 { color: #065f46; margin: 0 0 24px; }
        .cart-items { margin-bottom: 32px; }
        .cart-item { display: flex; flex-wrap: wrap; align-items: center; gap: 16px; padding: 16px; border-bottom: 1px solid #e5e7eb; }
        .cart-item-info { flex: 1; min-width: 150px; }
        .cart-item-info h3 { margin: 0 0 4px; font-size: 16px; }
        .cart-item-info p { margin: 0; font-size: 14px; color: #64748b; }
        .cart-item-qty { display: flex; align-items: center; gap: 8px; }
        .cart-item-qty button { width: 32px; height: 32px; border-radius: 6px; border: 1px solid #e5e7eb; background: #fff; cursor: pointer; font-size: 18px; }
        .cart-item-qty button:hover { background: #f0fdf4; }
        .cart-item-total { font-weight: 700; color: #16a34a; }
        .cart-item-remove { padding: 6px 12px; background: #fee2e2; color: #dc2626; border: none; border-radius: 6px; cursor: pointer; font-size: 13px; }
        .cart-form { display: flex; flex-direction: column; gap: 14px; }
        .cart-form h2 { margin: 0 0 8px; font-size: 18px; color: #065f46; }
        .cart-form input { padding: 12px 14px; border: 1px solid #e5e7eb; border-radius: 8px; font-size: 15px; outline: none; }
        .cart-total-row { font-size: 18px; padding: 12px 0; }
        .cart-form button { padding: 14px; background: #16a34a; color: #fff; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 16px; }
        .cart-form button:hover:not(:disabled) { background: #15803d; }
        .cart-form button:disabled { opacity: 0.7; cursor: not-allowed; }
      `}</style>
    </div>
  );
}

export default Cart;
