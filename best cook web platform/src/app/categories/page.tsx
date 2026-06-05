"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  { icon: "🎂", label: "Tortlar", desc: "3D tort konstruktori orqali o'z orzuingizdagi tortni yarating", href: "/constructor/cake", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80" },
  { icon: "🧁", label: "Desertlar", desc: "Kapkeyk, makaron va shokolad to'plamlarini moslashtiring", href: "/constructor/dessert", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&q=80" },
  { icon: "🍔", label: "Fast Food", desc: "Burger, pitsa va hot-doglarni o'z ta'bingizga ko'ra yig'ing", href: "/constructor/fastfood", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80" },
  { icon: "🍽️", label: "Milliy Taomlar", desc: "Osh, manti, somsa va shashliklarga ingrediyentlarni qo'shing", href: "/constructor/milliy", image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80" },
  { icon: "🍰", label: "Pishiriqlar (Bakery)", desc: "Issiq nonlar, shirin kulchalar va piroglar buyurtma bering", href: "/constructor/dessert", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80" },
  { icon: "🎁", label: "Desert To'plamlari", desc: "Bayramona sovg'abop maxsus desert qutilarini shakllantiring", href: "/constructor/dessert", image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=600&q=80" },
];

export default function CategoriesPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 120, minHeight: "80vh", background: "var(--bg-elevated)", paddingBottom: 64 }}>
        <div className="container">
          <div style={{ marginBottom: 40, textAlign: "center" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px",
                borderRadius: "var(--radius-pill)",
                background: "var(--accent-light)",
                color: "var(--accent)",
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 16,
              }}
            >
              <Sparkles size={14} />
              Konstruktor turlari
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 36,
                fontWeight: 700,
                color: "var(--text-primary)",
                margin: "0 0 12px",
              }}
            >
              Taom Kategoriyalari
            </h1>
            <p style={{ fontSize: 16, color: "var(--text-secondary)", maxWidth: 580, margin: "0 auto" }}>
              Kerakli toifani tanlang, uning konstruktoriga o'ting va oshpazlarimizga o'z talablaringizni yuboring
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
            }}
            id="categories-page-grid"
          >
            {categories.map((cat, i) => (
              <motion.a
                key={cat.label}
                href={cat.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "var(--radius-xl)",
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                  overflow: "hidden",
                  textDecoration: "none",
                  boxShadow: "var(--shadow-sm)",
                  transition: "all 200ms",
                }}
                className="category-page-card"
              >
                <div style={{ height: 180, overflow: "hidden", position: "relative" }}>
                  <img src={cat.image} alt={cat.label} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }} className="cat-page-img" />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.3))" }} />
                  <span style={{ position: "absolute", bottom: 16, left: 16, fontSize: 32, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}>
                    {cat.icon}
                  </span>
                </div>
                <div style={{ padding: 24, display: "flex", flexDirection: "column", flex: 1 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 8px" }}>
                    {cat.label}
                  </h3>
                  <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.5, margin: "0 0 20px", flex: 1 }}>
                    {cat.desc}
                  </p>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--accent)",
                      marginTop: "auto",
                    }}
                  >
                    Dizayn qilish <ArrowRight size={16} />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <style jsx global>{`
        .category-page-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }
        .category-page-card:hover .cat-page-img {
          transform: scale(1.05);
        }
        @media (max-width: 900px) {
          #categories-page-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 550px) {
          #categories-page-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
