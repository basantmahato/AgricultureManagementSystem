import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError("");
    api
      .get(`/blogs/${encodeURIComponent(slug)}`)
      .then((res) => setPost(res.data))
      .catch((err) => {
        setPost(null);
        setError(err.response?.status === 404 ? "Article not found." : "Could not load article.");
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const formatDate = (iso) => {
    if (!iso) return "";
    try {
      return new Date(iso).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    } catch {
      return "";
    }
  };

  const paragraphs = post?.body
    ? post.body.split(/\n\n+/).map((p) => p.trim()).filter(Boolean)
    : [];

  if (loading) {
    return (
      <div className="blog-post-page">
        <div className="ui-loading ui-loading--page">
          <div className="ui-spinner" aria-hidden />
          <p>Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="blog-post-page blog-post-page--center">
        <div className="container blog-post-narrow">
          <p className="blog-post-error">{error || "Not found."}</p>
          <Link to="/blog" className="link-primary">Back to blog</Link>
        </div>
        <style>{`
          .blog-post-page--center { min-height: 50vh; display: flex; align-items: center; padding: 48px 16px; }
          .blog-post-error { margin-bottom: 16px; color: var(--color-text-muted); }
        `}</style>
      </div>
    );
  }

  return (
    <article className="blog-post-page">
      {post.image && (
        <div className="blog-post-banner">
          <img src={post.image} alt="" />
          <div className="blog-post-banner-overlay" aria-hidden />
        </div>
      )}

      <div className="container blog-post-narrow">
        <Link to="/blog" className="blog-post-back">← All articles</Link>
        <span className="blog-post-cat">{post.category}</span>
        <h1 className="blog-post-title">{post.title}</h1>
        <p className="blog-post-meta">
          {formatDate(post.publishedAt)}
          {post.readTimeMinutes ? ` · ${post.readTimeMinutes} min read` : ""}
        </p>

        <div className="blog-post-body">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <footer className="blog-post-footer">
          <Link to="/blog" className="link-primary">← Back to blog</Link>
        </footer>
      </div>

      <style>{`
        .blog-post-page {
          min-height: 100vh;
          padding-bottom: 64px;
          background: var(--color-surface-subtle);
        }
        .blog-post-banner {
          position: relative;
          width: 100%;
          max-height: 380px;
          overflow: hidden;
          margin-bottom: 28px;
        }
        .blog-post-banner img {
          width: 100%;
          height: min(380px, 50vh);
          object-fit: cover;
          display: block;
        }
        .blog-post-banner-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(15, 23, 42, 0.65), transparent 55%);
          pointer-events: none;
        }
        .blog-post-narrow {
          max-width: 720px;
          padding-left: var(--container-pad-x, 20px);
          padding-right: var(--container-pad-x, 20px);
        }
        .blog-post-back {
          display: inline-block;
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 600;
          color: var(--color-primary);
          text-decoration: none;
          margin-bottom: 20px;
        }
        .blog-post-back:hover { text-decoration: underline; }
        .blog-post-cat {
          display: block;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-primary);
          margin-bottom: 10px;
        }
        .blog-post-title {
          font-family: var(--font-heading);
          font-size: clamp(1.75rem, 4vw, 2.35rem);
          color: var(--color-accent);
          margin: 0 0 12px;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }
        .blog-post-meta {
          font-family: var(--font-body);
          font-size: 15px;
          color: var(--color-text-muted);
          margin: 0 0 32px;
        }
        .blog-post-body {
          background: var(--color-surface);
          padding: 32px 28px 36px;
          border-radius: 16px;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--color-border);
        }
        .blog-post-body p {
          font-family: var(--font-body);
          font-size: 1.0625rem;
          line-height: 1.75;
          color: var(--color-text);
          margin: 0 0 1.25em;
        }
        .blog-post-body p:last-child { margin-bottom: 0; }
        .blog-post-footer {
          margin-top: 28px;
          padding-top: 24px;
          border-top: 1px solid var(--color-border);
        }
      `}</style>
    </article>
  );
}

export default BlogPost;
