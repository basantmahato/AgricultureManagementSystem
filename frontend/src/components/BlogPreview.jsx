import AOS from "aos";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import api from "../services/api";

const TINTS = [
  "linear-gradient(145deg, #ecfdf5 0%, #d1fae5 50%, #fff 100%)",
  "linear-gradient(145deg, #f0fdf4 0%, #bbf7d0 50%, #fff 100%)",
  "linear-gradient(145deg, #f8fafc 0%, #e2e8f0 50%, #fff 100%)",
];

function BlogPreview({ id }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  useEffect(() => {
    api
      .get("/blogs?limit=3")
      .then((res) => setPosts(res.data || []))
      .catch(() => setPosts([]));
  }, []);

  return (
    <section id={id} className="blog-preview">
      <div className="blog-preview-inner">
        <header className="blog-preview-head" data-aos="fade-up">
          <span className="landing-section-label">Journal</span>
          <h2 className="blog-preview-heading">Ideas for better harvests</h2>
          <p className="blog-preview-sub">Short reads on soil, water, and equipment—updated regularly.</p>
        </header>
        <div className="blog-preview-grid">
          {posts.map((post, i) => (
            <Link
              to={`/blog/${post.slug}`}
              key={post._id || post.slug}
              className="blog-preview-card"
              data-aos="fade-up"
              data-aos-delay={i * 80}
              style={{ "--card-tint": TINTS[i % TINTS.length] }}
            >
              <div className="blog-preview-thumb-wrap">
                {post.image ? (
                  <img
                    src={post.image}
                    alt=""
                    className="blog-preview-thumb"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div
                    className="blog-preview-thumb blog-preview-thumb--placeholder"
                    style={{ "--card-tint": TINTS[i % TINTS.length] }}
                    aria-hidden
                  />
                )}
              </div>
              <div className="blog-preview-card-body">
                <span className="blog-preview-cat">{post.category}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <span className="blog-preview-cta">
                  Read article
                  <ArrowRight size={16} strokeWidth={2.5} aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>
        {posts.length === 0 && (
          <p className="blog-preview-empty">Latest stories load when the blog is seeded on the server.</p>
        )}
        <div className="blog-preview-actions" data-aos="fade-up">
          <Link to="/blog" className="blog-preview-btn">
            View all articles
            <ArrowRight size={18} strokeWidth={2.5} aria-hidden />
          </Link>
        </div>
      </div>
      <style>{`
        .blog-preview {
          padding: clamp(72px, 11vw, 120px) var(--container-pad-x, 20px);
          background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
        }
        .blog-preview-inner {
          max-width: 1120px;
          margin: 0 auto;
        }
        .blog-preview-head {
          text-align: center;
          max-width: 520px;
          margin: 0 auto 48px;
        }
        .blog-preview-heading {
          font-family: var(--font-heading);
          color: var(--color-accent);
          font-size: clamp(1.75rem, 4vw, 2.35rem);
          margin: 0 0 12px;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .blog-preview-sub {
          font-family: var(--font-body);
          color: var(--color-text-muted);
          margin: 0;
          font-size: 1.0625rem;
          line-height: 1.6;
        }
        .blog-preview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }
        .blog-preview-empty {
          text-align: center;
          color: var(--color-text-muted);
          font-size: 14px;
          margin-bottom: 24px;
        }
        .blog-preview-card {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          text-align: left;
          padding: 0;
          overflow: hidden;
          border-radius: 18px;
          text-decoration: none;
          color: inherit;
          background: var(--card-tint);
          border: 1px solid rgba(226, 232, 240, 0.8);
          box-shadow: 0 4px 24px rgba(15, 23, 42, 0.04);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .blog-preview-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(15, 23, 42, 0.1);
        }
        .blog-preview-thumb-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          background: #e2e8f0;
          flex-shrink: 0;
        }
        .blog-preview-thumb {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .blog-preview-thumb--placeholder {
          background: var(--card-tint, linear-gradient(145deg, #ecfdf5 0%, #d1fae5 100%));
        }
        .blog-preview-card-body {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          flex: 1;
          padding: 22px 24px 28px;
        }
        .blog-preview-cat {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-primary);
          margin-bottom: 12px;
        }
        .blog-preview-card h3 {
          font-family: var(--font-heading);
          margin: 0 0 10px;
          font-size: 1.125rem;
          color: var(--color-text);
          line-height: 1.35;
          font-weight: 600;
        }
        .blog-preview-card p {
          font-family: var(--font-body);
          margin: 0 0 16px;
          font-size: 0.9375rem;
          color: var(--color-text-muted);
          line-height: 1.55;
          flex: 1;
        }
        .blog-preview-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-body);
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--color-primary);
          margin-top: auto;
        }
        .blog-preview-actions {
          text-align: center;
        }
        .blog-preview-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 48px;
          padding: 0 28px;
          border-radius: 12px;
          background: var(--color-primary);
          color: #fff;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s;
        }
        .blog-preview-btn:hover {
          background: var(--color-primary-hover);
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
}

export default BlogPreview;
