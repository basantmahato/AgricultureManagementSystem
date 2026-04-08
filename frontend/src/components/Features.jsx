import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  Sprout,
  ShoppingCart,
  CloudSun,
  Tractor,
  BookOpen,
  Handshake,
} from "lucide-react";
import { prefersReducedMotion } from "../animations/gsapConfig";

const FEATURE_ICONS = [Sprout, ShoppingCart, CloudSun, Tractor, BookOpen, Handshake];

function Features({ id }) {
  const sectionRef = useRef(null);

  const items = [
    { title: "Soil intelligence", desc: "Track pH, NPK, and trends over time." },
    { title: "Fair marketplace", desc: "List produce and reach buyers directly." },
    { title: "Weather-aware tasks", desc: "Plan work with forecasts on your dashboard." },
    { title: "Equipment store", desc: "Order tools with cash on delivery." },
    { title: "Knowledge hub", desc: "Guides and tips tailored to your region." },
    { title: "Farmer network", desc: "Learn from peers and shared best practices." },
  ];

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const cards = gsap.utils.toArray(".features-card");
      if (!cards.length || !sectionRef.current) return;

      gsap.from(cards, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 88%",
          once: true,
        },
        opacity: 0,
        y: 28,
        duration: 0.55,
        stagger: 0.06,
        ease: "power2.out",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id={id} className="features" ref={sectionRef}>
      <div className="features-inner">
        <header className="features-head">
          <span className="landing-section-label">Platform</span>
          <h2 className="features-title">Everything your farm needs</h2>
          <p className="features-lead">
            One place to manage soil, equipment, tasks, and growth—built for clarity on any device.
          </p>
        </header>
        <div className="features-grid">
          {items.map((item, i) => {
            const Icon = FEATURE_ICONS[i];
            return (
              <article key={item.title} className="features-card">
                <div className="features-icon-wrap" aria-hidden>
                  {Icon && <Icon className="features-icon-svg" size={26} strokeWidth={2} />}
                </div>
                <h3>{item.title}</h3>
                <p className="features-desc">{item.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
      <style>{`
        .features {
          padding: clamp(72px, 12vw, 120px) var(--container-pad-x, 20px);
          background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
        }
        .features-inner {
          max-width: 1120px;
          margin: 0 auto;
        }
        .features-head {
          text-align: center;
          max-width: 560px;
          margin: 0 auto 56px;
        }
        .features-title {
          font-family: var(--font-heading);
          color: var(--color-accent);
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 700;
          margin: 0 0 16px;
          letter-spacing: -0.02em;
        }
        .features-lead {
          font-family: var(--font-body);
          font-size: 1.0625rem;
          color: var(--color-text-muted);
          line-height: 1.65;
          margin: 0;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
          gap: 20px;
        }
        .features-card {
          position: relative;
          padding: 28px 24px 28px;
          border-radius: 16px;
          background: #fff;
          border: 1px solid rgba(226, 232, 240, 0.9);
          box-shadow: 0 1px 3px rgba(15, 23, 42, 0.06);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          overflow: hidden;
        }
        .features-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--color-primary), #86efac);
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .features-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);
          border-color: rgba(34, 197, 94, 0.25);
        }
        .features-card:hover::before {
          opacity: 1;
        }
        .features-icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: var(--color-primary-muted);
          color: var(--color-primary);
          margin-bottom: 14px;
        }
        .features-icon-svg {
          flex-shrink: 0;
        }
        .features-card h3 {
          font-family: var(--font-heading);
          margin: 0 0 8px;
          font-size: 1.125rem;
          color: var(--color-text);
          font-weight: 600;
        }
        .features-desc {
          font-family: var(--font-body);
          margin: 0;
          font-size: 0.9375rem;
          color: var(--color-text-muted);
          line-height: 1.55;
        }
        @media (max-width: 640px) {
          .features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}

export default Features;
