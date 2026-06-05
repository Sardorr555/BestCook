"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "3D Konstruktor qanday ishlaydi?",
      a: "Tegishli toifadagi (masalan, tort yoki burger) konstruktor sahifasiga o'tasiz. U yerda poydevor, bezak, masalliq va o'lchamlarni tanlaysiz. O'zgarishlar real vaqtda 3D ko'rinishda aks etadi va narxi avtomatik hisoblanadi."
    },
    {
      q: "Allergiya sozlamalari buyurtmalarda qanday hisobga olinadi?",
      a: "Profil sozlamalarida yoki buyurtma jarayonida siz o'zingizda mavjud allergiyalarni (masalan, yong'oq, sut mahsulotlari) belgilaysiz. Shundan so'ng, ushbu allergenlarni o'z ichiga olgan ingrediyentlarni tanlash taqiqlanadi va oshpazlar ogohlantiriladi."
    },
    {
      q: "To'lovlar qanday qabul qilinadi?",
      a: "Bizda naqd pul, milliy plastik kartalar (Uzcard/Humo) va Visa/Mastercard xalqaro kartalari orqali onlayn to'lovlarni amalga oshirish imkoniyati mavjud."
    },
    {
      q: "Hamkor oshpaz bo'lib qanday qo'shilsa bo'ladi?",
      a: "Buning uchun pastki menyudan 'Oshpazlar uchun' yoki bosh sahifadagi 'Hamkor bo'lib qo'shilish' tugmasini bosib, ro'yxatdan o'tishingiz va shaxsiy do'koningizni yaratishingiz mumkin."
    }
  ];

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 120, minHeight: "80vh", background: "var(--bg-elevated)", paddingBottom: 64 }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ color: "var(--accent)", marginBottom: 12 }}><HelpCircle size={40} /></div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, margin: 0, color: "var(--text-primary)" }}>
              Yordam Markazi (FAQ)
            </h1>
            <p style={{ fontSize: 15, color: "var(--text-secondary)", margin: "8px 0 0" }}>
              Ko'p beriladigan savollarga javoblar
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {faqs.map((faq, index) => (
              <div
                key={index}
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-xl)",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  style={{
                    width: "100%",
                    padding: "20px 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)" }}>
                    {faq.q}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp size={18} style={{ color: "var(--text-secondary)" }} />
                  ) : (
                    <ChevronDown size={18} style={{ color: "var(--text-secondary)" }} />
                  )}
                </button>
                {openIndex === index && (
                  <div
                    style={{
                      padding: "0 24px 20px",
                      fontSize: 14.5,
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                      borderTop: "1px solid var(--border)",
                      paddingTop: 16,
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
