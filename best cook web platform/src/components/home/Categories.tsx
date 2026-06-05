"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const categories = [
  { icon: "🎂", label: "Tortlar", desc: "3D konstruktor", href: "/constructor/cake", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80" },
  { icon: "🧁", label: "Desertlar", desc: "Kapkeyk, makaron", href: "/constructor/dessert", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=400&q=80" },
  { icon: "🍔", label: "Fast Food", desc: "Burger, pizza", href: "/constructor/fastfood", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80" },
  { icon: "🍽️", label: "Milliy Taomlar", desc: "Osh, manti, somsa", href: "/constructor/milliy", image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=400&q=80" },
  { icon: "🍰", label: "Pishiriqlar", desc: "Non, kulcha", href: "/categories/bakery", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80" },
  { icon: "🎁", label: "Desert to'plam", desc: "Sovg'a qutilari", href: "/categories/gift-boxes", image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=400&q=80" },
];

export default function Categories() {
  return (
    <section
      id="categories-section"
      style={{ padding: "80px 0 40px" }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 40,
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                fontWeight: 600,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                marginBottom: 8,
              }}
            >
              Kategoriyalar
            </h2>
            <p style={{ fontSize: 16, color: "var(--text-secondary)" }}>
              Nima buyurtma qilmoqchisiz?
            </p>
          </div>
          <a
            href="/categories"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: 15,
              fontWeight: 600,
              color: "var(--accent)",
              textDecoration: "none",
              transition: "gap 150ms",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.gap = "8px")}
            onMouseLeave={(e) => (e.currentTarget.style.gap = "4px")}
          >
            Barchasi <ArrowRight size={16} />
          </a>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 16,
          }}
          id="category-grid"
        >
          {categories.map((cat, i) => (
            <motion.a
              key={cat.label}
              href={cat.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              style={{
                position: "relative",
                height: 200,
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "20px 16px",
                textDecoration: "none",
                cursor: "pointer",
                border: "1px solid var(--border)",
              }}
              className="category-card"
            >
              {/* Background Image */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url(${cat.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  zIndex: 1,
                }}
                className="category-card-bg"
              />
              {/* Gradient Overlay */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 20%, rgba(0,0,0,0.85) 90%)",
                  zIndex: 2,
                }}
              />
              {/* Content */}
              <div style={{ position: "relative", zIndex: 3, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <span
                  style={{
                    fontSize: 24,
                    marginBottom: 8,
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                  }}
                >
                  {cat.icon}
                </span>
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#ffffff",
                    marginBottom: 2,
                    textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                  }}
                >
                  {cat.label}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: "rgba(255, 255, 255, 0.8)",
                    textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                  }}
                >
                  {cat.desc}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      <style jsx global>{`
        #category-grid {
          perspective: 1000px;
        }
        .category-card:hover .category-card-bg {
          transform: scale(1.08);
        }
        @media (max-width: 900px) {
          #category-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 550px) {
          #category-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
