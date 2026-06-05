"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Trash2, Plus, Minus, ArrowRight, ShieldAlert } from "lucide-react";
import { useState, useEffect } from "react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cart");
      if (stored) {
        setCartItems(JSON.parse(stored));
      } else {
        const mockCart = [
          {
            id: "item1",
            name: "Maxsus 3D Shokoladli Tort",
            details: "Shakl: Dumaloq | Qavatlar: 2 | Krem: Shokoladli | Bezak: Mevalar",
            price: 340000,
            quantity: 1,
            image: "🎂",
            allergens: ["Sut", "Tuxum"],
          },
          {
            id: "item2",
            name: "Tovuqli Lavash",
            details: "Tovuq go'shti, pishloq, bodring, pomidor, maxsus sous",
            price: 320000,
            quantity: 1,
            image: "🌯",
            allergens: ["Gluten"],
          },
        ];
        localStorage.setItem("cart", JSON.stringify(mockCart));
        setCartItems(mockCart);
        window.dispatchEvent(new Event("cart-updated"));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) => {
      const updated = prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(updated));
      window.dispatchEvent(new Event("cart-updated"));
      return updated;
    });
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(updated));
      window.dispatchEvent(new Event("cart-updated"));
      return updated;
    });
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = 15000;
  const total = subtotal + deliveryFee;

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 120, minHeight: "80vh" }}>
        <div className="container">
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 32,
              fontWeight: 700,
              marginBottom: 32,
            }}
          >
            Savat
          </h1>

          {cartItems.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "64px 24px",
                background: "var(--bg-surface)",
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--border)",
              }}
            >
              <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
              <h2
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 20,
                  fontWeight: 600,
                  marginBottom: 8,
                }}
              >
                Savatingiz bo'sh
              </h2>
              <p
                style={{
                  color: "var(--text-secondary)",
                  marginBottom: 24,
                  fontSize: 15,
                }}
              >
                Konstruktorlarimiz yordamida o'zingiz xohlagan taomni yaratib,
                savatga qo'shing.
              </p>
              <a
                href="/"
                style={{
                  display: "inline-flex",
                  padding: "12px 24px",
                  borderRadius: "var(--radius-pill)",
                  background: "var(--accent)",
                  color: "#fff",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Boshlash
              </a>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 340px",
                gap: 32,
              }}
              id="cart-layout"
            >
              {/* Items List */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-xl)",
                      padding: 20,
                      display: "flex",
                      gap: 20,
                      alignItems: "center",
                      position: "relative",
                    }}
                    className="cart-item"
                  >
                    <div
                      style={{
                        width: 72,
                        height: 72,
                        borderRadius: "var(--radius-lg)",
                        background: "var(--bg-inset)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 36,
                      }}
                    >
                      {item.image}
                    </div>

                    <div style={{ flex: 1 }}>
                      <h3
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: 17,
                          fontWeight: 600,
                          color: "var(--text-primary)",
                          marginBottom: 4,
                        }}
                      >
                        {item.name}
                      </h3>
                      <p
                        style={{
                          fontSize: 13,
                          color: "var(--text-secondary)",
                          marginBottom: 8,
                        }}
                      >
                        {item.details}
                      </p>

                      {item.allergens.length > 0 && (
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                            background: "var(--warning-light)",
                            color: "var(--warning)",
                            padding: "2px 8px",
                            borderRadius: "var(--radius-pill)",
                            fontSize: 11,
                            fontWeight: 600,
                          }}
                        >
                          <ShieldAlert size={12} />
                          Allergenlar: {item.allergens.join(", ")}
                        </div>
                      )}
                    </div>

                    {/* Quantity Selector */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        background: "var(--bg-inset)",
                        padding: "6px 12px",
                        borderRadius: "var(--radius-pill)",
                      }}
                    >
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        style={{
                          color: "var(--text-secondary)",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Minus size={14} />
                      </button>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontWeight: 600,
                          fontSize: 14,
                          minWidth: 16,
                          textAlign: "center",
                        }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        style={{
                          color: "var(--text-secondary)",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Price and Remove */}
                    <div style={{ textAlign: "right", minWidth: 120 }}>
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 18,
                          fontWeight: 700,
                          color: "var(--text-primary)",
                          marginBottom: 8,
                        }}
                      >
                        {(item.price * item.quantity).toLocaleString()} so'm
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        style={{
                          color: "var(--error)",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          fontSize: 13,
                          fontWeight: 500,
                        }}
                      >
                        <Trash2 size={14} /> O'chirish
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-xl)",
                  padding: 24,
                  height: "fit-content",
                  boxShadow: "var(--shadow-md)",
                }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 18,
                    fontWeight: 600,
                    marginBottom: 20,
                  }}
                >
                  Buyurtma hisobi
                </h2>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    fontSize: 14,
                    borderBottom: "1px solid var(--border)",
                    paddingBottom: 16,
                    marginBottom: 16,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--text-secondary)" }}>Mahsulotlar</span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontWeight: 500,
                        color: "var(--text-primary)",
                      }}
                    >
                      {subtotal.toLocaleString()} so'm
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--text-secondary)" }}>Yetkazib berish</span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontWeight: 500,
                        color: "var(--text-primary)",
                      }}
                    >
                      {deliveryFee.toLocaleString()} so'm
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 16,
                    fontWeight: 600,
                    marginBottom: 24,
                  }}
                >
                  <span>Jami to'lov:</span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 20,
                      fontWeight: 700,
                      color: "var(--accent)",
                    }}
                  >
                    {total.toLocaleString()} so'm
                  </span>
                </div>

                <a
                  href="/checkout"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    width: "100%",
                    padding: "14px",
                    borderRadius: "var(--radius-pill)",
                    background: "var(--accent)",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 15,
                    textDecoration: "none",
                    boxShadow: "0 4px 12px rgba(232, 98, 43, 0.2)",
                    textAlign: "center",
                    transition: "background 120ms",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "var(--accent-hover)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "var(--accent)")
                  }
                >
                  Rasmiylashtirishga o'tish <ArrowRight size={18} />
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <style jsx global>{`
        @media (max-width: 900px) {
          #cart-layout {
            grid-template-columns: 1fr !important;
          }
          .cart-item {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
          .cart-item > div:last-child {
            text-align: left !important;
            width: 100% !important;
          }
        }
      `}</style>
    </>
  );
}
