"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 120, minHeight: "80vh", background: "var(--bg-elevated)", paddingBottom: 64 }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ color: "var(--accent)", marginBottom: 12 }}><Shield size={40} /></div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, margin: 0, color: "var(--text-primary)" }}>
              Maxfiylik Siyosati
            </h1>
            <p style={{ fontSize: 15, color: "var(--text-secondary)", margin: "8px 0 0" }}>
              Shaxsiy ma'lumotlaringiz xavfsizligi va himoyasi
            </p>
          </div>

          <div
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-xl)",
              padding: 32,
              boxShadow: "var(--shadow-sm)",
              fontSize: 14.5,
              lineHeight: 1.7,
              color: "var(--text-secondary)",
            }}
          >
            <h3 style={{ color: "var(--text-primary)", fontSize: 18, fontWeight: 600, marginTop: 0 }}>1. Ma'lumotlarni yig'ish</h3>
            <p>
              Best Cook platformasidan foydalanish mobaynida biz sizning ism-sharifingiz, telefon raqamingiz, yetkazib berish manzilingiz hamda buyurtma tafsilotlarini yig'amiz. Bu ma'lumotlar buyurtmani to'g'ri tayyorlash va manzilga yetkazish uchun zarurdir.
            </p>

            <h3 style={{ color: "var(--text-primary)", fontSize: 18, fontWeight: 600, marginTop: 24 }}>2. Allergiya ma'lumotlari</h3>
            <p>
              Siz ko'rsatgan allergiya sozlamalari taomingizni tayyorlaydigan tegishli oshpazga taqdim etiladi. Biz ushbu ma'lumotlarni boshqa uchinchi shaxslarga tarqatmaslikni kafolatlaymiz.
            </p>

            <h3 style={{ color: "var(--text-primary)", fontSize: 18, fontWeight: 600, marginTop: 24 }}>3. To'lov xavfsizligi</h3>
            <p>
              Plastik kartalar orqali amalga oshiriladigan barcha onlayn to'lovlar xavfsiz bank shlyuzlari orqali amalga oshiriladi. Best Cook platformasi sizning to'liq karta ma'lumotlaringizni o'z serverlarida saqlamaydi.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
