"use client";

import { motion } from "framer-motion";
import { ChefHat } from "lucide-react";

export default function CTABanner() {
  return (
    <section id="cta-banner" style={{ padding: "40px 0" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            background: "var(--bg-dark)",
            borderRadius: "var(--radius-2xl)",
            padding: "64px 48px",
            color: "var(--text-on-dark)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 40,
            position: "relative",
            overflow: "hidden",
            boxShadow: "var(--shadow-xl)",
          }}
          id="cta-wrapper"
        >
          {/* Background shapes */}
          <div
            style={{
              position: "absolute",
              top: "-50%",
              right: "-10%",
              width: 320,
              height: 320,
              borderRadius: "50%",
              background: "rgba(232, 98, 43, 0.15)",
              filter: "blur(60px)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-40%",
              left: "-10%",
              width: 240,
              height: 240,
              borderRadius: "50%",
              background: "rgba(197, 81, 62, 0.1)",
              filter: "blur(40px)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 1, maxWidth: 540 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: "rgba(255, 255, 255, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <ChefHat size={24} style={{ color: "var(--accent)" }} />
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-on-dark)",
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                fontWeight: 600,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                marginBottom: 16,
              }}
            >
              Siz oshpazmisiz, qandolatchimi yoki restoransiz?
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "rgba(250, 247, 242, 0.6)",
                lineHeight: 1.6,
              }}
            >
              Best Cook platformasiga qo'shiling, shaxsiy buyurtmalarni qabul
              qiling va o'z biznesingizni yangi bosqichga olib chiqing.
            </p>
          </div>

          <div style={{ position: "relative", zIndex: 1, flexShrink: 0 }}>
            <a
              href="/partner-portal"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "18px 36px",
                borderRadius: "var(--radius-pill)",
                background: "var(--accent)",
                color: "#fff",
                fontSize: 16,
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 150ms",
                boxShadow: "0 4px 14px rgba(232, 98, 43, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--accent-hover)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--accent)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Hamkor bo'lib qo'shilish
            </a>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          #cta-wrapper {
            flex-direction: column !important;
            text-align: center !important;
            padding: 48px 32px !important;
          }
          #cta-wrapper > div:first-child {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
}
