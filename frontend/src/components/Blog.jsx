import React, { useState, useEffect } from 'react';

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Replace 'YOUR_API_KEY' and the URL with your chosen provider (e.g., NewsData.io)
  const API_KEY = 'pub_d4a030811307474d81f1a0b888b46a35';
  const API_URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=agriculture&language=en`;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setArticles(data.results || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div style={styles.loader}>Loading AgroNews...</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Latest Agriculture Updates</h2>
      <div style={styles.grid}>
        {articles.map((article, index) => (
          <div key={index} style={styles.card}>
            {article.image_url && (
              <img src={article.image_url} alt="news" style={styles.image} />
            )}
            <div style={styles.content}>
              <h3 style={styles.title}>{article.title}</h3>
              <p style={styles.description}>
                {article.description?.substring(0, 100)}...
              </p>
              <a href={article.link} target="_blank" rel="noreferrer" style={styles.button}>
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' },
  heading: { textAlign: 'center', color: '#1e293b', marginBottom: '30px' },
  grid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
    gap: '20px' 
  },
  card: { 
    background: '#fff', 
    borderRadius: '12px', 
    overflow: 'hidden', 
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
  },
  image: { width: '100%', height: '200px', objectFit: 'cover' },
  content: { padding: '15px' },
  title: { fontSize: '1.1rem', marginBottom: '10px', color: '#0f172a' },
  description: { fontSize: '0.9rem', color: '#64748b', marginBottom: '15px' },
  button: { 
    color: '#38bdf8', 
    textDecoration: 'none', 
    fontWeight: 'bold', 
    fontSize: '0.9rem' 
  },
  loader: { textAlign: 'center', marginTop: '50px', fontSize: '1.2rem' }
};

export default Blog;