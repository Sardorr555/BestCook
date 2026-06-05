"use client";

import { motion } from "framer-motion";
import { Star, ShieldAlert } from "lucide-react";

const products = [
  {
    id: "p1",
    name: "Shokoladli qulupnayli tort",
    category: "Cakes",
    price: "340,000",
    rating: 4.9,
    reviews: 112,
    allergens: ["Sut", "Tuxum"],
    emoji: "🎂",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "p2",
    name: "Limoli desert qutisi",
    category: "Desserts",
    price: "120,000",
    rating: 4.8,
    reviews: 45,
    allergens: ["Asal"],
    emoji: "🧁",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "p3",
    name: "Maxsus pishloqli Burger",
    category: "Fast Food",
    price: "45,000",
    rating: 4.7,
    reviews: 89,
    allergens: ["Gluten", "Sut"],
    emoji: "🍔",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "p4",
    name: "Bayramona to'y Oshi",
    category: "Milliy Taomlar",
    price: "180,000",
    rating: 4.9,
    reviews: 231,
    allergens: [],
    emoji: "🍽️",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=500&q=80",
  },
];

export default function PopularProducts() {
  return (
    <section id="popular-products" style={{ padding: "40px 0 80px" }}>
      <div className="container">
        <div style={{ marginBottom: 40 }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: 8,
            }}
          >
            Mashhur taomlar va loyihalar
          </h2>
          <p style={{ fontSize: 16, color: "var(--text-secondary)" }}>
            Mijozlarimiz tomonidan ko'p buyurtma qilinayotgan maxsus taomlar
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
          }}
          id="products-grid"
        >
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "all 200ms",
              }}
              className="product-card"
            >
              <div
                style={{
                  height: 160,
                  background: "var(--bg-inset)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                  }}
                  className="product-card-img"
                />
                {product.allergens.length > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      background: "var(--warning-light)",
                      color: "var(--warning)",
                      padding: "4px 8px",
                      borderRadius: "var(--radius-pill)",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                    title={`Allergenlar bor: ${product.allergens.join(", ")}`}
                  >
                    <ShieldAlert size={12} />
                    Allergen
                  </div>
                )}
              </div>

              <div
                style={{
                  padding: 20,
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "var(--accent)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: 4,
                  }}
                >
                  {product.category}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 16,
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    lineHeight: 1.3,
                    marginBottom: 8,
                    height: 42,
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {product.name}
                </h3>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: 13,
                    marginBottom: 16,
                  }}
                >
                  <Star
                    size={14}
                    fill="var(--warning)"
                    color="var(--warning)"
                  />
                  <span
                    style={{
                      fontWeight: 600,
                      color: "var(--text-primary)",
                    }}
                  >
                    {product.rating}
                  </span>
                  <span style={{ color: "var(--text-muted)" }}>
                    ({product.reviews} izohlar)
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "auto",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 18,
                        fontWeight: 700,
                        color: "var(--text-primary)",
                      }}
                    >
                      {product.price}
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        color: "var(--text-muted)",
                        marginLeft: 2,
                      }}
                    >
                      so'm
                    </span>
                  </div>

                  <a
                    href={`/constructor/${
                      product.category === "Cakes"
                        ? "cake"
                        : product.category === "Desserts"
                        ? "dessert"
                        : product.category === "Fast Food"
                        ? "fastfood"
                        : "milliy"
                    }`}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "var(--radius-pill)",
                      background: "var(--accent-light)",
                      color: "var(--accent)",
                      fontSize: 13,
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "all 120ms",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--accent)";
                      e.currentTarget.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "var(--accent-light)";
                      e.currentTarget.style.color = "var(--accent)";
                    }}
                  >
                    Dizayn qilish
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        @media (max-width: 1024px) {
          #products-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 550px) {
          #products-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
