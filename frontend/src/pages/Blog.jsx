import AOS from "aos";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import api from "../services/api";

const PAGE_SIZE = 6;

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    setLoading(true);
    setError("");
    api
      .get(`/blogs?page=${page}&pageSize=${PAGE_SIZE}`)
      .then((res) => {
        const d = res.data;
        if (d && Array.isArray(d.posts)) {
          setPosts(d.posts);
          setTotalPages(Math.max(1, d.totalPages || 1));
          setTotal(typeof d.total === "number" ? d.total : d.posts.length);
        } else {
          setPosts([]);
          setError("Unexpected response from server.");
        }
      })
      .catch(() => setError("Could not load articles."))
      .finally(() => setLoading(false));
  }, [page]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const formatDate = (iso) => {
    if (!iso) return "";
    try {
      return new Date(iso).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    } catch {
      return "";
    }
  };

  const startItem = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(page * PAGE_SIZE, total);

  return (
    <div className="blog-page">
      <div className="container">
        <header className="section-heading blog-header-spaced" data-aos="fade-down">
          <h1>Farm Blog</h1>
          <p>Latest agriculture insights, tips, and guides</p>
        </header>

        {loading && (
          <div className="ui-loading ui-loading--inline">
            <div className="ui-spinner" aria-hidden />
            <p>Loading articles...</p>
          </div>
        )}

        {error && <p className="blog-error">{error}</p>}

        {!loading && !error && posts.length === 0 && (
          <p className="blog-empty">
            No articles yet. Run <code>npm run seed:blog</code> in the backend folder.
          </p>
        )}

        {!loading && posts.length > 0 && (
          <>
            <div className="blog-grid">
              {posts.map((post, i) => (
                <article
                  key={post._id || post.slug}
                  id={`post-${post.slug}`}
                  className="blog-card"
                  data-aos="fade-up"
                  data-aos-delay={i * 60}
                >
                  <div className="blog-card-img">
                    {post.image ? (
                      <img src={post.image} alt="" />
                    ) : (
                      <div className="blog-card-img-fallback" aria-hidden />
                    )}
                    <span className="blog-card-cat">{post.category}</span>
                  </div>
                  <div className="blog-card-body">
                    <span className="blog-card-date">{formatDate(post.publishedAt)}</span>
                    <h2>{post.title}</h2>
                    <p>{post.excerpt}</p>
                    <Link to={`/blog/${post.slug}`} className="blog-card-link">
                      Read full article
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
              <nav className="blog-pagination" aria-label="Blog pages">
                <p className="blog-pagination-meta">
                  Showing {startItem}–{endItem} of {total}
                </p>
                <div className="blog-pagination-controls">
                  <button
                    type="button"
                    className="blog-pagination-btn"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={22} strokeWidth={2} />
                    <span>Previous</span>
                  </button>
                  <span className="blog-pagination-page">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    type="button"
                    className="blog-pagination-btn"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    aria-label="Next page"
                  >
                    <span>Next</span>
                    <ChevronRight size={22} strokeWidth={2} />
                  </button>
                </div>
              </nav>
            )}
          </>
        )}
      </div>

      <style>{`
        .blog-page { min-height: 100vh; padding: clamp(32px, 6vw, 60px) 0; background: var(--color-surface-subtle); }
        .blog-header-spaced { margin-bottom: 48px; }
        .blog-error { color: var(--color-danger); text-align: center; padding: 24px; }
        .blog-empty { text-align: center; color: var(--color-text-muted); padding: 48px 16px; }
        .blog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); gap: 28px; }
        .blog-card { scroll-margin-top: 80px; background: var(--color-surface); border-radius: var(--radius-xl); overflow: hidden; box-shadow: var(--shadow-sm); transition: transform 0.3s, box-shadow 0.3s; }
        .blog-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
        .blog-card-img { position: relative; height: 200px; overflow: hidden; background: var(--color-surface-subtle); }
        .blog-card-img img { width: 100%; height: 100%; object-fit: cover; }
        .blog-card-img-fallback { width: 100%; height: 100%; background: linear-gradient(135deg, #ecfdf5, #d1fae5); }
        .blog-card-cat { position: absolute; top: 12px; left: 12px; padding: 6px 12px; background: var(--color-primary); color: #fff; font-size: 12px; font-weight: 600; border-radius: var(--radius-sm); }
        .blog-card-body { padding: 24px; }
        .blog-card-date { font-size: 13px; color: var(--color-text-muted); display: block; margin-bottom: 8px; }
        .blog-card-body h2 { font-family: var(--font-heading); font-size: 18px; margin: 0 0 12px; color: var(--color-text); line-height: 1.4; }
        .blog-card-body > p { font-size: 15px; color: var(--color-text-muted); margin: 0 0 16px; line-height: 1.6; }
        .blog-card-link { color: var(--color-primary); font-weight: 600; text-decoration: none; }
        .blog-card-link:hover { text-decoration: underline; }
        .blog-pagination {
          margin-top: 48px;
          padding-top: 32px;
          border-top: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }
        .blog-pagination-meta {
          margin: 0;
          font-size: 14px;
          color: var(--color-text-muted);
          font-family: var(--font-body);
        }
        .blog-pagination-controls {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 16px 24px;
        }
        .blog-pagination-page {
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 600;
          color: var(--color-text);
          min-width: 8rem;
          text-align: center;
        }
        .blog-pagination-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 44px;
          padding: 0 18px;
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          background: var(--color-surface);
          color: var(--color-primary);
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background var(--transition-fast), border-color var(--transition-fast), opacity var(--transition-fast);
        }
        .blog-pagination-btn:hover:not(:disabled) {
          background: var(--color-primary-muted);
          border-color: #bbf7d0;
        }
        .blog-pagination-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }
        @media (max-width: 640px) {
          .blog-grid { grid-template-columns: 1fr; }
          .blog-pagination-btn span { display: none; }
          .blog-pagination-btn { padding: 0 14px; min-width: 44px; }
        }
      `}</style>
    </div>
  );
}

export default Blog;
