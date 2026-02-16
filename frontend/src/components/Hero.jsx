import AOS from "aos";
import { useEffect, useState } from "react";

const heroImages = [
  {
    url: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200",
    title: "Community Marketplace",
    description: "Connect directly with consumers and other farmers through our marketplace, promoting sustainable practices and profitable exchanges.",
    icon: "🏪"
  },
  {
    url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200",
    title: "Smart Soil Management",
    description: "Get AI-powered soil health reports and expert recommendations to optimize your crop yields and improve soil quality.",
    icon: "🌱"
  },
  {
    url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200",
    title: "Modern Farm Equipment",
    description: "Access a wide range of agricultural equipment and tools. Rent or buy everything you need for efficient farming.",
    icon: "🚜"
  },
  {
    url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200",
    title: "Expert Agriculture Guidance",
    description: "Learn from the latest farming techniques, crop management strategies, and agricultural best practices.",
    icon: "📚"
  }
];

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="hero">
      <div className="hero-slides">
        {heroImages.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.url})` }}
          />
        ))}
      </div>
      <div className="hero-overlay" />
      
      <button className="hero-slider-prev" onClick={prevSlide} aria-label="Previous slide">
        ‹
      </button>
      <button className="hero-slider-next" onClick={nextSlide} aria-label="Next slide">
        ›
      </button>

      <div className="hero-content" data-aos="fade-up">
        <div className="hero-icon">{heroImages[currentSlide].icon}</div>
        <h1 className="hero-title">{heroImages[currentSlide].title}</h1>
        <p className="hero-desc">{heroImages[currentSlide].description}</p>
      </div>

      <div className="hero-dots">
        {heroImages.map((_, index) => (
          <button
            key={index}
            className={`hero-dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <style>{`
        .hero {
          position: relative;
          min-height: 85vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #fff;
          padding: 60px 20px;
          overflow: hidden;
        }
        .hero-slides {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .hero-slide {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0;
          transition: opacity 1s ease-in-out;
        }
        .hero-slide.active {
          opacity: 1;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4));
          z-index: 1;
          pointer-events: none;
        }
        .hero-slider-prev, .hero-slider-next {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.15);
          color: #fff;
          font-size: 28px;
          cursor: pointer;
          border-radius: 50%;
          transition: background 0.2s;
          z-index: 2;
          border: none;
        }
        .hero-slider-prev:hover, .hero-slider-next:hover {
          background: rgba(255,255,255,0.3);
        }
        .hero-slider-prev { left: 16px; }
        .hero-slider-next { right: 16px; }
        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 720px;
        }
        .hero-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }
        .hero-title {
          font-size: clamp(32px, 6vw, 52px);
          font-weight: 800;
          margin: 0 0 16px;
          letter-spacing: -0.5px;
        }
        .hero-desc {
          font-size: clamp(15px, 2.5vw, 18px);
          line-height: 1.6;
          opacity: 0.95;
          margin: 0;
        }
        .hero-dots {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
          z-index: 2;
        }
        .hero-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.5);
          background: transparent;
          cursor: pointer;
          transition: all 0.3s;
          padding: 0;
        }
        .hero-dot:hover {
          background: rgba(255,255,255,0.3);
        }
        .hero-dot.active {
          background: #fff;
          border-color: #fff;
        }
        @media (max-width: 600px) {
          .hero {
            min-height: 70vh;
            padding: 40px 16px;
          }
          .hero-slider-prev, .hero-slider-next {
            width: 40px;
            height: 40px;
            font-size: 22px;
          }
          .hero-slider-prev { left: 8px; }
          .hero-slider-next { right: 8px; }
          .hero-dots { bottom: 16px; }
        }
      `}</style>
    </section>
  );
}

export default Hero;
