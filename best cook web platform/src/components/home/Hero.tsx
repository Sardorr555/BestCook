"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: 72,
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(232, 98, 43, 0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "15%",
          right: "5%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(232, 98, 43, 0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Text Side */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 16px",
              borderRadius: "var(--radius-pill)",
              background: "var(--accent-light)",
              color: "var(--accent)",
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 24,
            }}
          >
            <Sparkles size={14} />
            O'zbekistondagi №1 taom konstruktor
          </motion.div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.8rem, 5.5vw, 4.5rem)",
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "var(--text-primary)",
              marginBottom: 24,
            }}
          >
            Taomingizni{" "}
            <span
              style={{
                color: "var(--accent)",
                fontStyle: "italic",
              }}
            >
              o'zingiz
            </span>{" "}
            dizayn qiling
          </h1>

          <p
            style={{
              fontSize: 18,
              lineHeight: 1.65,
              color: "var(--text-secondary)",
              maxWidth: 480,
              marginBottom: 36,
            }}
          >
            Professional oshpazlardan shaxsiy tortlar, desertlar, fast food va
            milliy taomlarni yarating. 3D konstruktor orqali tortingizni ko'ring
            va buyurtma bering.
          </p>

          {/* CTA Buttons */}
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <a
              href="/constructor/cake"
              id="hero-cta-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "16px 32px",
                borderRadius: "var(--radius-pill)",
                background: "var(--accent)",
                color: "#fff",
                fontSize: 16,
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 150ms",
                boxShadow: "0 4px 20px rgba(232, 98, 43, 0.3)",
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
              Tort yaratish <ArrowRight size={18} />
            </a>
            <a
              href="/categories"
              id="hero-cta-secondary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "16px 32px",
                borderRadius: "var(--radius-pill)",
                background: "transparent",
                color: "var(--text-primary)",
                fontSize: 16,
                fontWeight: 600,
                textDecoration: "none",
                border: "2px solid var(--border-strong)",
                transition: "all 150ms",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--text-primary)";
                e.currentTarget.style.background = "var(--text-primary)";
                e.currentTarget.style.color = "var(--text-on-dark)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-strong)";
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--text-primary)";
              }}
            >
              Kategoriyalarni ko'rish
            </a>
          </div>

          {/* Trust indicators */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              marginTop: 48,
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ display: "flex", gap: 2 }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={16}
                    fill="var(--warning)"
                    color="var(--warning)"
                  />
                ))}
              </div>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--text-primary)",
                }}
              >
                4.9
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: "var(--text-muted)",
                }}
              >
                (2,400+ izoh)
              </span>
            </div>
            <div
              style={{
                width: 1,
                height: 24,
                background: "var(--border)",
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 16,
                  fontWeight: 600,
                  color: "var(--text-primary)",
                }}
              >
                500+
              </span>
              <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
                oshpazlar
              </span>
            </div>
            <div
              style={{
                width: 1,
                height: 24,
                background: "var(--border)",
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 16,
                  fontWeight: 600,
                  color: "var(--text-primary)",
                }}
              >
                12K+
              </span>
              <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
                buyurtmalar
              </span>
            </div>
          </div>
        </motion.div>

        {/* Image Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "relative" }}
        >
          <div
            style={{
              width: "100%",
              aspectRatio: "1",
              borderRadius: "var(--radius-2xl)",
              background:
                "linear-gradient(135deg, #FFF0E8 0%, #FFE4D6 50%, #FFDBC9 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative cake illustration */}
            <div
              style={{
                fontSize: 160,
                lineHeight: 1,
                filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.1))",
              }}
            >
              🎂
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                top: "15%",
                right: "10%",
                background: "var(--bg-surface)",
                borderRadius: "var(--radius-lg)",
                padding: "12px 16px",
                boxShadow: "var(--shadow-lg)",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "var(--success-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                }}
              >
                ✓
              </div>
              <div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  Yangi buyurtma
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--text-muted)",
                  }}
                >
                  Shaxsiy tort – 340,000 so'm
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              style={{
                position: "absolute",
                bottom: "20%",
                left: "5%",
                background: "var(--bg-surface)",
                borderRadius: "var(--radius-lg)",
                padding: "10px 14px",
                boxShadow: "var(--shadow-lg)",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div style={{ display: "flex", gap: 2 }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={12}
                    fill="var(--warning)"
                    color="var(--warning)"
                  />
                ))}
              </div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--text-primary)",
                }}
              >
                &quot;Ajoyib tort!&quot;
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Responsive */}
      <style jsx global>{`
        @media (max-width: 900px) {
          #hero .container {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            padding-top: 40px;
            padding-bottom: 40px;
          }
        }
      `}</style>
    </section>
  );
}
