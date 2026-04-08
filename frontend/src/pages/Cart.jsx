import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useContext(CartContext);
  const { user } = useContext(AuthContext);
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
      <div className="page-shell page-shell--compact">
        <div className="card card--success">
          <div className="cart-success">
            <h2>Order Placed Successfully!</h2>
            <p>Cash on delivery. We will contact you soon.</p>
            <Link to="/store" className="link-primary">Continue Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="page-shell page-shell--compact">
        <div className="cart-empty">
          <h2>Your cart is empty</h2>
          <Link to="/store" className="link-primary">Browse Equipment</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="card card--panel">
        <h1>Cart</h1>

        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.equipmentId} className="cart-item">
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>₹{item.price.toLocaleString()} each</p>
              </div>
              <div className="cart-item-qty">
                <button type="button" onClick={() => updateQuantity(item.equipmentId, item.quantity - 1)}>−</button>
                <span>{item.quantity}</span>
                <button type="button" onClick={() => updateQuantity(item.equipmentId, item.quantity + 1)}>+</button>
              </div>
              <div className="cart-item-total">₹{(item.price * item.quantity).toLocaleString()}</div>
              <button type="button" className="cart-item-remove" onClick={() => removeFromCart(item.equipmentId)}>Remove</button>
            </div>
          ))}
        </div>

        <form onSubmit={handleOrder} className="form-stack cart-form">
          <h2>Checkout (Cash on Delivery)</h2>
          {!user && (
            <>
              <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" required />
              <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            </>
          )}
          <input className="input" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Shipping Address" required />
          <input className="input" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile Number" required />

          <div className="cart-total-row">
            <strong>Total: ₹{cartTotal.toLocaleString()}</strong>
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Placing Order..." : "Place Order (COD)"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Cart;
