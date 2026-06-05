"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Sparkles, Heart, ShieldCheck, Target } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 120, minHeight: "80vh", background: "var(--bg-elevated)", paddingBottom: 64 }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 36,
                fontWeight: 700,
                color: "var(--text-primary)",
                margin: "0 0 12px",
              }}
            >
              Biz Haqimizda
            </h1>
            <p style={{ fontSize: 16, color: "var(--text-secondary)", maxWidth: 580, margin: "0 auto" }}>
              Best Cook – bu taom tayyorlash san'atini raqamli 3D konstruktor texnologiyasi bilan birlashtirgan o'zgacha platformadir.
            </p>
          </div>

          <div
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-2xl)",
              padding: 40,
              boxShadow: "var(--shadow-md)",
              marginBottom: 40,
              lineHeight: 1.7,
              color: "var(--text-secondary)",
              fontSize: 15.5,
            }}
          >
            <h2 style={{ color: "var(--text-primary)", fontSize: 22, fontWeight: 700, marginTop: 0, marginBottom: 16 }}>
              Bizning Missiyamiz
            </h2>
            <p style={{ marginBottom: 24 }}>
              Biz har bir foydalanuvchiga o'zi xohlagan tort, desert yoki milliy taomning dizayni va masalliqlarini to'liq nazorat qilish imkonini beramiz. Mijozlarning allergiya talablarini inobatga olgan holda, professional oshpazlar bilan to'g'ridan-to'g'ri aloqani yo'lga qo'yamiz.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 32 }} id="about-values">
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ color: "var(--accent)", flexShrink: 0 }}><Heart size={24} /></div>
                <div>
                  <h4 style={{ color: "var(--text-primary)", fontWeight: 600, margin: "0 0 4px" }}>Mehr bilan pishirilgan</h4>
                  <p style={{ margin: 0, fontSize: 13.5 }}>Har bir taom professional oshpazlarimiz tomonidan yuqori darajadagi gigiyena va e'tibor bilan pishiriladi.</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ color: "var(--accent)", flexShrink: 0 }}><ShieldCheck size={24} /></div>
                <div>
                  <h4 style={{ color: "var(--text-primary)", fontWeight: 600, margin: "0 0 4px" }}>Allergiya Xavfsizligi</h4>
                  <p style={{ margin: 0, fontSize: 13.5 }}>Bizning platformada taqiqlangan mahsulotlarni tanlash avtomatik ravishda bloklanadi.</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ color: "var(--accent)", flexShrink: 0 }}><Sparkles size={24} /></div>
                <div>
                  <h4 style={{ color: "var(--text-primary)", fontWeight: 600, margin: "0 0 4px" }}>3D Innovatsiya</h4>
                  <p style={{ margin: 0, fontSize: 13.5 }}>Siz buyurtma qilmoqchi bo'lgan mahsulotni real vaqt rejimida ko'z o'ngingizda loyihalashtirasiz.</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ color: "var(--accent)", flexShrink: 0 }}><Target size={24} /></div>
                <div>
                  <h4 style={{ color: "var(--text-primary)", fontWeight: 600, margin: "0 0 4px" }}>Tezkor Yetkazib berish</h4>
                  <p style={{ margin: 0, fontSize: 13.5 }}>Tayyor bo'lgan buyurtmalar maxsus issiqlikni saqlovchi qutilarda tez fursatda manzilingizga yetkaziladi.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <style jsx global>{`
        @media (max-width: 600px) {
          #about-values {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
