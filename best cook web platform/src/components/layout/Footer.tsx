"use client";

import {
  MapPin,
  Phone,
  Mail,
  Send,
  ChevronRight,
} from "lucide-react";

const footerSections = [
  {
    title: "Konstruktorlar",
    links: [
      { label: "3D Tort Konstruktor", href: "/constructor/cake" },
      { label: "Desert Konstruktor", href: "/constructor/dessert" },
      { label: "Fast Food Konstruktor", href: "/constructor/fastfood" },
      { label: "Milliy Taomlar", href: "/constructor/milliy" },
    ],
  },
  {
    title: "Kompaniya",
    links: [
      { label: "Biz haqimizda", href: "/about" },
      { label: "Oshpazlar uchun", href: "/partner-portal" },
      { label: "Yordam markazi", href: "/help" },
      { label: "Maxfiylik siyosati", href: "/privacy" },
    ],
  },
  {
    title: "Foydalanuvchilar",
    links: [
      { label: "Ro'yxatdan o'tish", href: "/register" },
      { label: "Buyurtmalarim", href: "/orders" },
      { label: "Allergiya sozlamalari", href: "/allergies" },
      { label: "Yordam", href: "/help" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      id="site-footer"
      style={{
        background: "var(--bg-dark)",
        color: "var(--text-on-dark)",
        paddingTop: 80,
        paddingBottom: 32,
        marginTop: 120,
      }}
    >
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr repeat(3, 1fr)",
          gap: 48,
        }}
      >
        {/* Brand Column */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background:
                  "linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontFamily: "var(--font-display)",
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              BC
            </div>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: "-0.03em",
              }}
            >
              Best Cook
            </span>
          </div>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.7,
              color: "rgba(250, 247, 242, 0.6)",
              maxWidth: 280,
              marginBottom: 24,
            }}
          >
            Professional oshpazlardan shaxsiy taom mahsulotlarini dizayn qiling
            va buyurtma bering. Tort, desert, fast food va milliy taomlar.
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              fontSize: 14,
              color: "rgba(250, 247, 242, 0.6)",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <MapPin size={16} /> Toshkent, O'zbekiston
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Phone size={16} /> +998 90 123 45 67
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Mail size={16} /> info@bestcook.uz
            </span>
          </div>
        </div>

        {/* Link Columns */}
        {footerSections.map((section) => (
          <div key={section.title}>
            <h4
              style={{
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "var(--font-body)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "rgba(250, 247, 242, 0.4)",
                marginBottom: 20,
              }}
            >
              {section.title}
            </h4>
            <div
              style={{ display: "flex", flexDirection: "column", gap: 12 }}
            >
              {section.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    fontSize: 15,
                    color: "rgba(250, 247, 242, 0.7)",
                    textDecoration: "none",
                    transition: "color 120ms",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--accent)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(250, 247, 242, 0.7)")
                  }
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Newsletter */}
      <div
        className="container"
        style={{
          marginTop: 64,
          paddingTop: 32,
          borderTop: "1px solid rgba(250, 247, 242, 0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div>
            <h4
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 20,
                fontWeight: 600,
                marginBottom: 4,
              }}
            >
              Yangiliklardan xabardor bo'ling
            </h4>
            <p
              style={{
                fontSize: 14,
                color: "rgba(250, 247, 242, 0.5)",
              }}
            >
              Eng yaxshi oshpazlar va maxsus takliflar haqida bilib oling
            </p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              type="email"
              placeholder="Email manzilingiz"
              id="newsletter-email"
              style={{
                padding: "12px 18px",
                borderRadius: "var(--radius-pill)",
                border: "1px solid rgba(250, 247, 242, 0.15)",
                background: "rgba(250, 247, 242, 0.06)",
                color: "var(--text-on-dark)",
                fontSize: 14,
                outline: "none",
                width: 260,
              }}
            />
            <button
              id="newsletter-submit"
              style={{
                padding: "12px 24px",
                borderRadius: "var(--radius-pill)",
                background: "var(--accent)",
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 6,
                transition: "background 120ms",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--accent-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--accent)")
              }
            >
              <Send size={16} /> Obuna bo'lish
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="container"
        style={{
          marginTop: 32,
          paddingTop: 24,
          borderTop: "1px solid rgba(250, 247, 242, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <p
          style={{
            fontSize: 13,
            color: "rgba(250, 247, 242, 0.4)",
          }}
        >
          © 2026 Best Cook. Barcha huquqlar himoyalangan.
        </p>
        <div style={{ display: "flex", gap: 16 }}>
          <a
            href="https://instagram.com"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "1px solid rgba(250, 247, 242, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(250, 247, 242, 0.6)",
              transition: "all 120ms",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor =
                "rgba(250, 247, 242, 0.15)";
              e.currentTarget.style.color = "rgba(250, 247, 242, 0.6)";
            }}
            aria-label="Instagram"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <a
            href="https://t.me"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "1px solid rgba(250, 247, 242, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(250, 247, 242, 0.6)",
              transition: "all 120ms",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor =
                "rgba(250, 247, 242, 0.15)";
              e.currentTarget.style.color = "rgba(250, 247, 242, 0.6)";
            }}
            aria-label="Telegram"
          >
            <Send size={16} />
          </a>
        </div>
      </div>

      {/* Responsive styles */}
      <style jsx global>{`
        @media (max-width: 900px) {
          #site-footer > .container:first-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          #site-footer > .container:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
