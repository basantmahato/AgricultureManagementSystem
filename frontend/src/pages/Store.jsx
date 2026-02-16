import { useState, useEffect } from "react";
import AOS from "aos";
import api from "../services/api";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function Store() {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    api.get("/equipment").then((res) => setEquipment(res.data)).catch(() => setEquipment([])).finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="store-page">
        <div className="store-loading">Loading equipment...</div>
        <style>{`.store-page { min-height: 60vh; padding: 48px 20px; text-align: center; color: #16a34a; }`}</style>
      </div>
    );

  return (
    <div className="store-page">
      <header className="store-header" data-aos="fade-down">
        <h1>Agriculture Equipment Catalog</h1>
        <p>Browse and order farm equipment. Cash on delivery available.</p>
        <Link to="/cart" className="store-cart-link">View Cart</Link>
      </header>

      <div className="store-grid">
        {equipment.map((item, i) => (
          <article key={item._id} className="store-card" data-aos="fade-up" data-aos-delay={i * 60}>
            <div className="store-card-img">
              {item.image ? (
                <img src={item.image} alt={item.name} />
              ) : (
                <div className="store-card-placeholder">🚜</div>
              )}
            </div>
            <div className="store-card-body">
              <span className="store-card-cat">{item.category}</span>
              <h3>{item.name}</h3>
              <p>{item.description || "Farm equipment"}</p>
              <div className="store-card-footer">
                <span className="store-card-price">₹{item.price.toLocaleString()}</span>
                <button className="store-card-btn" onClick={() => addToCart(item)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {equipment.length === 0 && (
        <p className="store-empty">No equipment available. Run <code>npm run seed</code> in backend to add sample data.</p>
      )}

      <style>{`
        .store-page { min-height: 100vh; padding: clamp(24px, 5vw, 48px) clamp(20px, 4vw, 32px); background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); }
        .store-loading { padding: 48px; text-align: center; }
        .store-header { text-align: center; margin-bottom: 40px; }
        .store-header h1 { color: #065f46; font-size: clamp(24px, 4vw, 32px); margin: 0 0 8px; }
        .store-header p { color: #64748b; margin: 0 0 16px; }
        .store-cart-link { display: inline-block; padding: 10px 24px; background: #16a34a; color: #fff; border-radius: 8px; text-decoration: none; font-weight: 600; }
        .store-cart-link:hover { background: #15803d; }
        .store-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; max-width: 1200px; margin: 0 auto; }
        .store-card { background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); transition: transform 0.3s, box-shadow 0.3s; }
        .store-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.1); }
        .store-card-img { height: 180px; background: #f0fdf4; display: flex; align-items: center; justify-content: center; }
        .store-card-img img { width: 100%; height: 100%; object-fit: cover; }
        .store-card-placeholder { font-size: 64px; opacity: 0.7; }
        .store-card-body { padding: 20px; }
        .store-card-cat { font-size: 12px; color: #16a34a; font-weight: 600; text-transform: uppercase; }
        .store-card-body h3 { margin: 8px 0; font-size: 18px; color: #1f2937; }
        .store-card-body p { font-size: 14px; color: #64748b; margin: 0 0 16px; line-height: 1.5; }
        .store-card-footer { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
        .store-card-price { font-size: 20px; font-weight: 700; color: #16a34a; }
        .store-card-btn { padding: 10px 18px; background: #16a34a; color: #fff; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 14px; }
        .store-card-btn:hover { background: #15803d; }
        .store-empty { text-align: center; padding: 48px; color: #64748b; }
        @media (max-width: 640px) { .store-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}

export default Store;
