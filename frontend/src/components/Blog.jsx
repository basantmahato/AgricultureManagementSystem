import React, { useState, useEffect } from "react";
import AOS from "aos";

const Blog = ({ id }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = "pub_d4a030811307474d81f1a0b888b46a35";
  const API_URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=agriculture&language=en`;

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setArticles(data.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading)
    return (
      <section id={id} className="blog-section">
        <h2 className="blog-heading">Latest Agriculture Updates</h2>
        <div className="blog-loading">Loading AgroNews...</div>
        <style>{`
          .blog-section { padding: clamp(60px, 10vw, 80px) clamp(20px, 5vw, 48px); background: #fff; }
          .blog-heading { text-align: center; color: #065f46; font-size: clamp(24px, 4vw, 32px); margin: 0 0 32px; }
          .blog-loading { text-align: center; color: #64748b; padding: 40px; }
        `}</style>
      </section>
    );

  return (
    <section id={id} className="blog-section">
      <h2 className="blog-heading" data-aos="fade-up">Latest Agriculture Updates</h2>
      <div className="blog-grid">
        {articles.slice(0, 6).map((article, i) => (
          <article key={i} className="blog-card" data-aos="fade-up" data-aos-delay={i * 80}>
            {article.image_url && (
              <img src={article.image_url} alt="" className="blog-img" />
            )}
            <div className="blog-content">
              <h3 className="blog-title">{article.title}</h3>
              <p className="blog-desc">
                {article.description?.substring(0, 120) || "Read more..."}...
              </p>
              <a href={article.link} target="_blank" rel="noreferrer" className="blog-link">
                Read More
              </a>
            </div>
          </article>
        ))}
      </div>
      <style>{`
        .blog-section { padding: clamp(60px, 10vw, 80px) clamp(20px, 5vw, 48px); background: #fff; }
        .blog-heading { text-align: center; color: #065f46; font-size: clamp(24px, 4vw, 32px); margin: 0 0 40px; }
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .blog-card {
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
          transition: transform 0.3s, box-shadow 0.3s;
          border: 1px solid #f0f0f0;
        }
        .blog-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.1); }
        .blog-img { width: 100%; height: 200px; object-fit: cover; }
        .blog-content { padding: 20px; }
        .blog-title { font-size: 1.05rem; margin: 0 0 10px; color: #0f172a; font-weight: 600; line-height: 1.4; }
        .blog-desc { font-size: 0.9rem; color: #64748b; margin: 0 0 16px; line-height: 1.5; }
        .blog-link { color: #16a34a; font-weight: 600; text-decoration: none; }
        .blog-link:hover { text-decoration: underline; }
        @media (max-width: 640px) { .blog-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
};

export default Blog;
