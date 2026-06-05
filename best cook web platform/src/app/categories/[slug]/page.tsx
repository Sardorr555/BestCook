"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useParams } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CategorySlugPage() {
  const params = useParams();
  const slug = params?.slug as string || "dessert";

  const getSlugTitle = (s: string) => {
    if (s === "bakery") return "Pishiriqlar (Bakery)";
    if (s === "gift-boxes") return "Desert To'plamlari";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const title = getSlugTitle(slug);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 120, minHeight: "80vh", background: "var(--bg-elevated)", paddingBottom: 64, display: "flex", alignItems: "center" }}>
        <div className="container" style={{ maxWidth: 600, textAlign: "center" }}>
          <div
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-xl)",
              padding: "48px 32px",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "var(--accent-light)",
                color: "var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                margin: "0 auto 20px",
              }}
            >
              🍰
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 24,
                fontWeight: 700,
                color: "var(--text-primary)",
                margin: "0 0 12px",
              }}
            >
              {title} Bo'limi
            </h1>
            
            <p style={{ fontSize: 14.5, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 32 }}>
              Ushbu toifa ostidagi barcha pishiriqlar va desert to'plamlarini o'zgartirish hamda moslashtirish uchun bizning universal desert konstruktorimizdan foydalanishingiz mumkin.
            </p>

            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <a
                href="/constructor/dessert"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 28px",
                  borderRadius: "var(--radius-pill)",
                  background: "var(--accent)",
                  color: "#fff",
                  fontSize: 14.5,
                  fontWeight: 600,
                  textDecoration: "none",
                  boxShadow: "0 4px 12px rgba(232, 98, 43, 0.2)",
                }}
              >
                Konstruktorga o'tish <ArrowRight size={16} />
              </a>
              <a
                href="/categories"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "14px 24px",
                  borderRadius: "var(--radius-pill)",
                  border: "1px solid var(--border-strong)",
                  color: "var(--text-primary)",
                  fontSize: 14.5,
                  fontWeight: 600,
                  textDecoration: "none",
                  background: "transparent",
                }}
              >
                Orqaga qaytish
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
