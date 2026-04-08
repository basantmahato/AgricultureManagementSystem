import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, ArrowRight, Wheat, Sprout, Tractor, BookOpen } from "lucide-react";
import { prefersReducedMotion } from "../animations/gsapConfig";

const heroImages = [
  {
    url: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1600&q=80",
    title: "Grow with confidence",
    description:
      "Connect with buyers, track soil health, and run a more profitable farm from one place.",
    Icon: Wheat
  },
  {
    url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&q=80",
    title: "Soil intelligence that scales",
    description:
      "Book lab tests, upload field photos, and get actionable insights for healthier crops.",
    Icon: Sprout
  },
  {
    url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80",
    title: "Equipment when you need it",
    description:
      "Browse verified tools and machinery with simple cash-on-delivery checkout.",
    Icon: Tractor
  },
  {
    url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&q=80",
    title: "Guidance for every season",
    description:
      "Tasks, weather context, and reminders so nothing falls through the cracks.",
    Icon: BookOpen
  }
];

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const heroRef = useRef(null);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();
      const targets = heroRef.current?.querySelectorAll(".hero-anim");
      if (!targets?.length) return;

      if (reduced) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        targets,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: "power2.out",
          overwrite: "auto"
        }
      );
    },
    { dependencies: [currentSlide], scope: heroRef }
  );

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 12000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 12000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 12000);
  };

  const progress = ((currentSlide + 1) / heroImages.length) * 100;
  const { Icon: SlideIcon } = heroImages[currentSlide];

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-slides" aria-hidden>
        {heroImages.map((slide, index) => (
          <div
            key={slide.url}
            className={`hero-slide ${index === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.url})` }}
          />
        ))}
      </div>
      <div className="hero-overlay" />
      <div className="hero-grain" aria-hidden />

      <div className="hero-inner">
        <div className="hero-panel">
          <span className="hero-badge hero-anim">agroFarm</span>
          <span className="hero-icon hero-anim" aria-hidden>
            <SlideIcon className="hero-icon-svg" size={52} strokeWidth={1.35} />
          </span>
          <h1 className="hero-title hero-anim">{heroImages[currentSlide].title}</h1>
          <p className="hero-desc hero-anim">{heroImages[currentSlide].description}</p>
          <div className="hero-cta hero-anim">
            <Link to="/store" className="hero-btn hero-btn-primary">
              Shop equipment
              <ArrowRight size={18} strokeWidth={2.5} aria-hidden />
            </Link>
            <Link to="/know-your-soil" className="hero-btn hero-btn-ghost">
              Soil testing
            </Link>
          </div>
        </div>
      </div>

      <div className="hero-controls">
        <button type="button" className="hero-arrow" onClick={prevSlide} aria-label="Previous slide">
          <ChevronLeft size={22} strokeWidth={2.5} />
        </button>
        <button type="button" className="hero-arrow" onClick={nextSlide} aria-label="Next slide">
          <ChevronRight size={22} strokeWidth={2.5} />
        </button>
      </div>

      <div className="hero-footer-bar">
        <div className="hero-dots" role="tablist" aria-label="Hero slides">
          {heroImages.map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={index === currentSlide}
              className={`hero-dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
        <div className="hero-progress-track" aria-hidden>
          <div className="hero-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <style>{`
        .hero {
          position: relative;
          min-height: min(92vh, 900px);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          padding: clamp(48px, 8vw, 88px) var(--container-pad-x, 20px) 100px;
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
          opacity: 0;
          transition: opacity 1.1s ease;
        }
        .hero-slide.active {
          opacity: 1;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: linear-gradient(
            135deg,
            rgba(6, 78, 59, 0.88) 0%,
            rgba(15, 23, 42, 0.55) 45%,
            rgba(22, 101, 52, 0.5) 100%
          );
        }
        .hero-grain {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          opacity: 0.07;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        .hero-inner {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1120px;
          margin: 0 auto;
        }
        .hero-panel {
          max-width: 640px;
          padding: clamp(28px, 5vw, 40px);
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.18);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.25);
          text-align: left;
        }
        .hero-badge {
          display: inline-block;
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 16px;
        }
        .hero-icon {
          display: flex;
          align-items: center;
          margin-bottom: 16px;
          color: rgba(255, 255, 255, 0.92);
          filter: drop-shadow(0 4px 14px rgba(0, 0, 0, 0.25));
        }
        .hero-icon-svg {
          flex-shrink: 0;
        }
        .hero-title {
          font-family: var(--font-heading);
          font-size: clamp(2rem, 5vw, 3.25rem);
          font-weight: 700;
          line-height: 1.1;
          margin: 0 0 16px;
          letter-spacing: -0.03em;
        }
        .hero-desc {
          font-family: var(--font-body);
          font-size: clamp(15px, 2.2vw, 18px);
          line-height: 1.65;
          margin: 0 0 28px;
          color: rgba(255, 255, 255, 0.88);
          max-width: 52ch;
        }
        .hero-cta {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .hero-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 48px;
          padding: 0 22px;
          border-radius: 12px;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .hero-btn-primary {
          background: #fff;
          color: #065f46;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }
        .hero-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.28);
        }
        .hero-btn-ghost {
          background: rgba(255, 255, 255, 0.12);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.35);
        }
        .hero-btn-ghost:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        .hero-controls {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          z-index: 3;
          transform: translateY(-50%);
          display: flex;
          justify-content: space-between;
          padding: 0 clamp(8px, 2vw, 20px);
          pointer-events: none;
        }
        .hero-arrow {
          pointer-events: auto;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.35);
          background: rgba(255, 255, 255, 0.12);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }
        .hero-arrow:hover {
          background: rgba(255, 255, 255, 0.22);
          transform: scale(1.05);
        }
        .hero-footer-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 3;
          padding: 0 var(--container-pad-x, 20px) 24px;
          max-width: 1120px;
          margin: 0 auto;
        }
        .hero-dots {
          display: flex;
          gap: 8px;
          justify-content: center;
          margin-bottom: 12px;
        }
        .hero-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          border: none;
          padding: 0;
          background: rgba(255, 255, 255, 0.35);
          cursor: pointer;
          transition: width 0.3s, background 0.3s;
        }
        .hero-dot.active {
          width: 28px;
          background: #fff;
        }
        .hero-progress-track {
          height: 3px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.2);
          overflow: hidden;
        }
        .hero-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #86efac, #fff);
          border-radius: 999px;
          transition: width 0.5s ease;
        }
        @media (max-width: 640px) {
          .hero {
            min-height: 85vh;
            padding-bottom: 96px;
          }
          .hero-panel {
            text-align: center;
          }
          .hero-cta {
            justify-content: center;
          }
          .hero-desc {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-controls {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}

export default Hero;
