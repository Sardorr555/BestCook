"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ChefHat, TrendingUp, Users, ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function PartnerPortalPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 120, minHeight: "80vh", background: "var(--bg-elevated)", paddingBottom: 64 }}>
        <div className="container" style={{ maxWidth: 960 }}>
          {/* Header Banner */}
          <div
            style={{
              background: "var(--bg-dark)",
              borderRadius: "var(--radius-2xl)",
              padding: "64px 48px",
              color: "var(--text-on-dark)",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              marginBottom: 48,
              boxShadow: "var(--shadow-xl)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-50%",
                right: "-10%",
                width: 300,
                height: 300,
                borderRadius: "50%",
                background: "rgba(232, 98, 43, 0.15)",
                filter: "blur(50px)",
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background: "rgba(255, 255, 255, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                }}
              >
                <ChefHat size={28} style={{ color: "var(--accent)" }} />
              </div>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  color: "#fff",
                  fontSize: "clamp(2rem, 4vw, 2.75rem)",
                  fontWeight: 700,
                  margin: "0 0 16px",
                }}
              >
                Best Cook Hamkorlar Portali
              </h1>
              <p style={{ fontSize: 16, color: "rgba(250, 247, 242, 0.7)", maxWidth: 620, margin: "0 auto 32px", lineHeight: 1.6 }}>
                Novvoyxonangiz, qandolatchiligingiz yoki restoraningiz uchun buyurtmalarni onlayn qabul qilish, mijozlarning 3D dizaynlarini ko'rish va savdoni oshirish imkoniyati.
              </p>
              
              <a
                href="/seller-dashboard"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "16px 36px",
                  borderRadius: "var(--radius-pill)",
                  background: "var(--accent)",
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: 600,
                  textDecoration: "none",
                  boxShadow: "0 4px 16px rgba(232, 98, 43, 0.3)",
                }}
              >
                Sotuvchi paneliga kirish <ArrowRight size={18} />
              </a>
            </div>
          </div>

          {/* Benefits Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
              marginBottom: 48,
            }}
            id="benefits-grid"
          >
            {[
              {
                icon: <TrendingUp size={24} style={{ color: "var(--accent)" }} />,
                title: "Daromadni Oshirish",
                desc: "Tayyor mijozlar oqimi va avtomatlashtirilgan buyurtma yig'ish orqali savdolaringizni sezilarli darajada kengaytiring.",
              },
              {
                icon: <Users size={24} style={{ color: "var(--accent)" }} />,
                title: "3D Konstruktor",
                desc: "Mijozlar buyurtma qilmoqchi bo'lgan tortlar va taomlarning 3D modellarini ko'ring. Hech qanday chalkashliklarsiz aniq tayyorlang.",
              },
              {
                icon: <ShieldCheck size={24} style={{ color: "var(--accent)" }} />,
                title: "Allergiya Nazorati",
                desc: "Tizimimiz mijozlarning allergiyalarini tekshiradi va xavfli tarkibiy qismlar haqida sizni oldindan ogohlantiradi.",
              },
            ].map((benefit, i) => (
              <div
                key={i}
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-xl)",
                  padding: 32,
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: "var(--accent-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                  }}
                >
                  {benefit.icon}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--text-primary)", margin: "0 0 10px" }}>
                  {benefit.title}
                </h3>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <style jsx global>{`
        @media (max-width: 900px) {
          #benefits-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
