import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Tractor, ShoppingCart } from "lucide-react";
import api from "../services/api";
import { CartContext } from "../context/CartContext";

function Store() {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    api.get("/equipment").then((res) => setEquipment(res.data)).catch(() => setEquipment([])).finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="ui-loading ui-loading--page">
        <div className="ui-spinner" aria-hidden />
        <p>Loading equipment...</p>
      </div>
    );

  return (
    <div className="store-page">
      <div className="container">
      <header className="store-header">
        <h1>Agriculture Equipment Catalog</h1>
        <p>Browse and order farm equipment. Cash on delivery available.</p>
        <Link to="/cart" className="store-cart-link">View Cart</Link>
      </header>

      <div className="store-grid">
        {equipment.map((item) => (
          <article key={item._id} className="store-card">
            <div className="store-card-media">
              {item.image ? (
                <img src={item.image} alt={item.name} loading="lazy" decoding="async" />
              ) : (
                <div className="store-card-placeholder" aria-hidden>
                  <Tractor size={48} strokeWidth={1.5} />
                </div>
              )}
              <span className="store-card-cat">{item.category}</span>
            </div>
            <div className="store-card-body">
              <h3 className="store-card-title">{item.name}</h3>
              <p className="store-card-desc">{item.description || "Farm equipment"}</p>
              <div className="store-card-row">
                <div className="store-card-price-wrap">
                  <span className="store-card-price-label">Price</span>
                  <span className="store-card-price">₹{item.price.toLocaleString()}</span>
                </div>
                <button type="button" className="store-card-btn" onClick={() => addToCart(item)}>
                  <ShoppingCart size={18} strokeWidth={2} aria-hidden />
                  Add to cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {equipment.length === 0 && (
        <p className="store-empty">No equipment available. Run <code>npm run seed</code> in backend to add sample data.</p>
      )}
      </div>

      <style>{`
        .store-page {
          min-height: 100vh;
          padding: clamp(28px, 6vw, 56px) 0;
          background: linear-gradient(165deg, var(--color-primary-muted) 0%, #ecfdf5 35%, var(--color-surface-subtle) 100%);
        }
        .store-loading { padding: 48px; text-align: center; }
        .store-header { text-align: center; margin-bottom: clamp(32px, 5vw, 48px); }
        .store-header h1 {
          font-family: var(--font-heading);
          color: var(--color-accent);
          font-size: clamp(1.5rem, 4vw, 2.125rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          margin: 0 0 10px;
        }
        .store-header p {
          font-family: var(--font-body);
          color: var(--color-text-muted);
          margin: 0 0 18px;
          font-size: 1.0625rem;
          max-width: 36rem;
          margin-left: auto;
          margin-right: auto;
        }
        .store-cart-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
          padding: 0 22px;
          background: var(--color-primary);
          color: #fff;
          border-radius: var(--radius-lg);
          text-decoration: none;
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 15px;
          transition: background 0.2s, transform 0.2s;
        }
        .store-cart-link:hover {
          background: var(--color-primary-hover);
          transform: translateY(-1px);
        }
        .store-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
          gap: clamp(20px, 3vw, 28px);
        }
        .store-card {
          display: flex;
          flex-direction: column;
          background: var(--color-surface);
          border-radius: var(--radius-2xl);
          border: 1px solid var(--color-border);
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(15, 23, 42, 0.06);
          transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
        }
        .store-card:hover {
          border-color: #86efac;
          box-shadow: 0 18px 40px rgba(22, 163, 74, 0.12);
          transform: translateY(-3px);
        }
        .store-card-media {
          position: relative;
          aspect-ratio: 5 / 4;
          background: linear-gradient(145deg, var(--color-primary-muted), #e2e8f0);
          overflow: hidden;
        }
        .store-card-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .store-card:hover .store-card-media img {
          transform: scale(1.04);
        }
        .store-card-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-primary);
          opacity: 0.4;
        }
        .store-card-cat {
          position: absolute;
          left: 12px;
          bottom: 12px;
          padding: 6px 12px;
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--color-accent);
          background: rgba(255, 255, 255, 0.95);
          border-radius: var(--radius-md);
          border: 1px solid rgba(226, 232, 240, 0.9);
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
          max-width: calc(100% - 24px);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .store-card-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 20px 22px 22px;
          border-top: 1px solid var(--color-border);
          background: linear-gradient(180deg, var(--color-surface) 0%, var(--color-surface-subtle) 100%);
        }
        .store-card-title {
          font-family: var(--font-heading);
          margin: 0 0 8px;
          font-size: 1.1875rem;
          font-weight: 700;
          color: var(--color-text);
          line-height: 1.3;
          letter-spacing: -0.01em;
        }
        .store-card-desc {
          font-family: var(--font-body);
          font-size: 14px;
          color: var(--color-text-muted);
          margin: 0 0 18px;
          line-height: 1.55;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .store-card-row {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-end;
          justify-content: space-between;
          gap: 14px;
          padding-top: 4px;
        }
        .store-card-price-wrap {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .store-card-price-label {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: var(--color-text-muted);
          font-family: var(--font-body);
        }
        .store-card-price {
          font-family: var(--font-heading);
          font-size: 1.375rem;
          font-weight: 700;
          color: var(--color-primary);
          letter-spacing: -0.02em;
        }
        .store-card-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 44px;
          padding: 0 16px;
          background: var(--color-primary);
          color: #fff;
          border: none;
          border-radius: var(--radius-lg);
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 2px 8px rgba(22, 163, 74, 0.25);
        }
        .store-card-btn:hover {
          background: var(--color-primary-hover);
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(22, 163, 74, 0.35);
        }
        .store-card-btn:active {
          transform: translateY(0);
        }
        .store-empty { text-align: center; padding: 48px; color: var(--color-text-muted); font-family: var(--font-body); }
        @media (max-width: 640px) {
          .store-grid { grid-template-columns: 1fr; }
          .store-card-row { flex-direction: column; align-items: stretch; }
          .store-card-btn { width: 100%; }
        }
      `}</style>
    </div>
  );
}

export default Store;
