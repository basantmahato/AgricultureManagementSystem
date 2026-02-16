import AOS from "aos";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const BLOGS_PREVIEW = [
  { title: "Sustainable Farming Practices for 2025", excerpt: "Eco-friendly techniques for high yields.", category: "Sustainable Farming" },
  { title: "Soil Health: Why It Matters", excerpt: "Improve soil structure for better harvests.", category: "Soil Science" },
  { title: "Best Irrigation Methods", excerpt: "Water-saving techniques for your farm.", category: "Irrigation" }
];

function BlogPreview({ id }) {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section id={id} className="blog-preview">
      <h2 className="blog-preview-heading" data-aos="fade-up">Latest from Farm Blog</h2>
      <p className="blog-preview-sub" data-aos="fade-up">Insights, tips, and guides for farmers</p>
      <div className="blog-preview-grid">
        {BLOGS_PREVIEW.map((post, i) => (
          <Link to="/blog" key={i} className="blog-preview-card" data-aos="fade-up" data-aos-delay={i * 80}>
            <span className="blog-preview-cat">{post.category}</span>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
          </Link>
        ))}
      </div>
      <Link to="/blog" className="blog-preview-btn" data-aos="fade-up">View All Blogs</Link>
      <style>{`
        .blog-preview { padding: clamp(60px, 10vw, 80px) clamp(20px, 5vw, 48px); background: #fff; text-align: center; }
        .blog-preview-heading { color: #065f46; font-size: clamp(24px, 4vw, 32px); margin: 0 0 8px; }
        .blog-preview-sub { color: #64748b; margin: 0 0 40px; }
        .blog-preview-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; max-width: 1000px; margin: 0 auto 32px; }
        .blog-preview-card { background: #f8fafc; padding: 28px; border-radius: 12px; text-decoration: none; color: inherit; text-align: left; transition: transform 0.3s, box-shadow 0.3s; border: 1px solid #e5e7eb; }
        .blog-preview-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.08); }
        .blog-preview-cat { font-size: 12px; color: #16a34a; font-weight: 600; text-transform: uppercase; }
        .blog-preview-card h3 { margin: 8px 0 12px; font-size: 18px; color: #1f2937; }
        .blog-preview-card p { margin: 0; font-size: 14px; color: #64748b; line-height: 1.5; }
        .blog-preview-btn { display: inline-block; padding: 12px 24px; background: #16a34a; color: #fff; border-radius: 8px; text-decoration: none; font-weight: 600; }
        .blog-preview-btn:hover { background: #15803d; }
      `}</style>
    </section>
  );
}

export default BlogPreview;
