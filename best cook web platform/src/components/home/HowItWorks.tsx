"use client";

import { motion } from "framer-motion";
import { Edit3, CheckSquare, Truck } from "lucide-react";

const steps = [
  {
    icon: <Edit3 size={24} style={{ color: "var(--accent)" }} />,
    number: "01",
    title: "Dizayn qiling",
    desc: "3D tort, desert, burger yoki milliy taomlar konstruktori yordamida taomingizni o'zingiz loyihalashtiring.",
  },
  {
    icon: <CheckSquare size={24} style={{ color: "var(--accent)" }} />,
    number: "02",
    title: "Buyurtma bering",
    desc: "Tayyor dizayningizni oshpazga yuboring. Oshpaz buyurtmani tasdiqlaydi va tayyorlashni boshlaydi.",
  },
  {
    icon: <Truck size={24} style={{ color: "var(--accent)" }} />,
    number: "03",
    title: "Yetkazib berish",
    desc: "Belgilangan vaqtda shaxsiy taomingizni issiq yoki sovuq holda, xavfsiz qadoqlangan holda yetkazib beramiz.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      style={{
        padding: "80px 0",
        background: "var(--bg-elevated)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="container" style={{ maxWidth: "var(--container-narrow)" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: 12,
            }}
          >
            Tizim qanday ishlaydi?
          </h2>
          <p style={{ fontSize: 16, color: "var(--text-secondary)" }}>
            Atigi 3 qadamda orzuingizdagi taomga ega bo'ling
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 32,
            position: "relative",
          }}
          id="steps-grid"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                position: "relative",
                padding: "24px 16px",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "var(--accent-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                  position: "relative",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                {step.icon}
                <span
                  style={{
                    position: "absolute",
                    top: -6,
                    right: -6,
                    background: "var(--accent)",
                    color: "#fff",
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    fontWeight: 700,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {step.number}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 18,
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: 10,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "var(--text-secondary)",
                }}
              >
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        @media (max-width: 768px) {
          #steps-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
