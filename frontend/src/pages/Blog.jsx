import AOS from "aos";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const BLOGS = [
  {
    id: 1,
    title: "Sustainable Farming Practices for 2025",
    excerpt: "Discover eco-friendly techniques that reduce chemical use while maintaining high yields. Learn about crop rotation, organic fertilizers, and integrated pest management.",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600",
    date: "Feb 15, 2025",
    category: "Sustainable Farming"
  },
  {
    id: 2,
    title: "Soil Health: Why It Matters for Your Crops",
    excerpt: "Healthy soil is the foundation of a successful farm. Understand pH levels, nutrient balance, and how to improve soil structure for better harvests.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600",
    date: "Feb 10, 2025",
    category: "Soil Science"
  },
  {
    id: 3,
    title: "Best Irrigation Methods for Indian Farms",
    excerpt: "From drip irrigation to sprinklers, compare water-saving techniques suitable for different crops and regions. Maximize yield while conserving water.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600",
    date: "Feb 5, 2025",
    category: "Irrigation"
  },
  {
    id: 4,
    title: "Crop Selection Guide: What to Plant This Season",
    excerpt: "Seasonal recommendations for wheat, rice, pulses, and vegetables. Climate considerations and market demand insights for smart planting decisions.",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600",
    date: "Jan 28, 2025",
    category: "Crops"
  },
  {
    id: 5,
    title: "Farm Equipment Maintenance Tips",
    excerpt: "Extend the life of your tractors, ploughs, and pumps. Routine checks, lubrication schedules, and common repairs every farmer should know.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
    date: "Jan 20, 2025",
    category: "Equipment"
  },
  {
    id: 6,
    title: "Weather-Based Farming: Plan Ahead",
    excerpt: "Use weather forecasts to schedule planting, irrigation, and harvesting. Avoid losses from unexpected rains, frost, or droughts.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600",
    date: "Jan 12, 2025",
    category: "Weather"
  }
];

function Blog() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="blog-page">
      <header className="blog-header" data-aos="fade-down">
        <h1>Farm Blog</h1>
        <p>Latest agriculture insights, tips, and guides</p>
      </header>

      <div className="blog-grid">
        {BLOGS.map((post, i) => (
          <article key={post.id} className="blog-card" data-aos="fade-up" data-aos-delay={i * 60}>
            <div className="blog-card-img">
              <img src={post.image} alt={post.title} />
              <span className="blog-card-cat">{post.category}</span>
            </div>
            <div className="blog-card-body">
              <span className="blog-card-date">{post.date}</span>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <span className="blog-card-link">Read More →</span>
            </div>
          </article>
        ))}
      </div>

      <style>{`
        .blog-page { min-height: 100vh; padding: clamp(32px, 6vw, 60px) clamp(20px, 4vw, 32px); background: #f8fafc; }
        .blog-header { text-align: center; margin-bottom: 48px; }
        .blog-header h1 { color: #065f46; font-size: clamp(28px, 5vw, 36px); margin: 0 0 8px; }
        .blog-header p { color: #64748b; margin: 0; font-size: 16px; }
        .blog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 28px; max-width: 1200px; margin: 0 auto; }
        .blog-card { background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); transition: transform 0.3s, box-shadow 0.3s; }
        .blog-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.1); }
        .blog-card-img { position: relative; height: 200px; overflow: hidden; }
        .blog-card-img img { width: 100%; height: 100%; object-fit: cover; }
        .blog-card-cat { position: absolute; top: 12px; left: 12px; padding: 6px 12px; background: #16a34a; color: #fff; font-size: 12px; font-weight: 600; border-radius: 6px; }
        .blog-card-body { padding: 24px; }
        .blog-card-date { font-size: 13px; color: #64748b; display: block; margin-bottom: 8px; }
        .blog-card-body h2 { font-size: 18px; margin: 0 0 12px; color: #1f2937; line-height: 1.4; }
        .blog-card-body p { font-size: 15px; color: #64748b; margin: 0 0 16px; line-height: 1.6; }
        .blog-card-link { color: #16a34a; font-weight: 600; text-decoration: none; }
        .blog-card-link:hover { text-decoration: underline; }
        @media (max-width: 640px) { .blog-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}

export default Blog;
