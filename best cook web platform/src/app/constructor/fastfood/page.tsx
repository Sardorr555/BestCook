"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState, useMemo } from "react";
import { ShoppingBag, Flame, Star, ShieldAlert } from "lucide-react";

const mainItems = [
  { id: "burger", label: "Gamburger (Burger)", emoji: "🍔", basePrice: 28000, baseCalories: 520, allergens: ["Gluten", "Sut"], image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80" },
  { id: "pizza", label: "Pizza", emoji: "🍕", basePrice: 65000, baseCalories: 950, allergens: ["Gluten", "Sut"], image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80" },
  { id: "hotdog", label: "Hot-dog", emoji: "🌭", basePrice: 18000, baseCalories: 380, allergens: ["Gluten", "Sut"], image: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=600&q=80" },
];

const ingredientsList = [
  { id: "beef", label: "Mol go'shti kotleti (Beef)", price: 12000, calories: 220, category: "meat" },
  { id: "chicken", label: "Tovuq go'shti (Chicken)", price: 10000, calories: 150, category: "meat" },
  { id: "cheese", label: "Pishloq (Cheese)", price: 5000, calories: 80, category: "dairy", allergen: "Sut" },
  { id: "lettuce", label: "Salat bargi (Lettuce)", price: 2000, calories: 5, category: "veggie" },
  { id: "tomato", label: "Pomidor (Tomato)", price: 2000, calories: 10, category: "veggie" },
  { id: "onion", label: "Piyoz (Onion)", price: 1000, calories: 8, category: "veggie" },
  { id: "sauce", label: "Maxsus sous (Sauce)", price: 3000, calories: 45, category: "sauce" },
  { id: "jalapeno", label: "Jalapenyo achchiq qalampiri", price: 4000, calories: 12, category: "veggie" },
  { id: "mushrooms", label: "Qo'ziqorin (Mushrooms)", price: 5000, calories: 22, category: "veggie" },
  { id: "pepperoni", label: "Pepperoni kolbasasi", price: 8000, calories: 110, category: "meat" },
];

export default function FastFoodConstructorPage() {
  const [selectedItem, setSelectedItem] = useState("burger");
  const [activeIngredients, setActiveIngredients] = useState<string[]>([
    "beef",
    "cheese",
    "lettuce",
    "tomato",
    "sauce",
  ]);

  const toggleIngredient = (id: string) => {
    setActiveIngredients((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const currentBase = useMemo(() => {
    return mainItems.find((item) => item.id === selectedItem) || mainItems[0];
  }, [selectedItem]);

  const nutritionData = useMemo(() => {
    let price = currentBase.basePrice;
    let calories = currentBase.baseCalories;
    const allergens = new Set(currentBase.allergens);

    activeIngredients.forEach((ingId) => {
      const ing = ingredientsList.find((i) => i.id === ingId);
      if (ing) {
        price += ing.price;
        calories += ing.calories;
        if (ing.allergen) {
          allergens.add(ing.allergen);
        }
      }
    });

    return { price, calories, allergens: Array.from(allergens) };
  }, [currentBase, activeIngredients]);

  const handleAddToCart = () => {
    try {
      const selectedItemLabel = currentBase.label;
      const ingLabels = activeIngredients.map((ingId) => {
        return ingredientsList.find((i) => i.id === ingId)?.label || ingId;
      });

      const detailsStr = `Kaloriya: ${nutritionData.calories} kkal | Tarkibi: ${ingLabels.join(", ")}`;

      const cartItem = {
        id: "fastfood_" + Date.now(),
        name: `Maxsus ${selectedItemLabel.split(" ")[0]}`,
        details: detailsStr,
        price: nutritionData.price,
        quantity: 1,
        image: currentBase.emoji,
        allergens: nutritionData.allergens,
      };

      const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
      currentCart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(currentCart));

      window.dispatchEvent(new Event("cart-updated"));
      window.location.href = "/cart";
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 100, minHeight: "90vh" }}>
        <div className="container">
          <div style={{ marginBottom: 32 }}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 32,
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              🍔 Fast Food Konstruktori
            </h1>
            <p style={{ color: "var(--text-secondary)" }}>
              Burger yoki Pizzangiz tarkibini o'zingiz tanlang. Ingredientlar
              bo'yicha ozuqaviy qiymat va kaloriyalar avtomatik hisoblanadi.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 1fr",
              gap: 32,
              alignItems: "start",
            }}
            id="fastfood-layout"
          >
            {/* Visual preview and nutrition */}
            <div
              style={{
                position: "sticky",
                top: 100,
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
              className="sticky-viz"
            >
              <div
                style={{
                  height: 340,
                  background: "linear-gradient(to bottom, #FFFEE5, #FAF7E0)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-xl)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  boxShadow: "var(--shadow-md)",
                  overflow: "hidden",
                }}
              >
                <img
                  src={currentBase.image}
                  alt={currentBase.label}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "var(--radius-xl)",
                  }}
                />
              </div>

              {/* Nutrition and Calories Card */}
              <div
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-xl)",
                  padding: 24,
                  boxShadow: "var(--shadow-md)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 16,
                    fontWeight: 600,
                    marginBottom: 16,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <Flame size={18} style={{ color: "var(--accent)" }} />
                  Ozuqaviy qiymat
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                    borderBottom: "1px solid var(--border)",
                    paddingBottom: 16,
                    marginBottom: 16,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                      Energetik qiymati
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 20,
                        fontWeight: 700,
                        color: "var(--text-primary)",
                      }}
                    >
                      {nutritionData.calories} kkal
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                      Og'irligi (taxminan)
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 20,
                        fontWeight: 700,
                        color: "var(--text-primary)",
                      }}
                    >
                      {300 + activeIngredients.length * 25} g
                    </div>
                  </div>
                </div>

                {nutritionData.allergens.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 8,
                      background: "var(--warning-light)",
                      color: "var(--warning)",
                      padding: 12,
                      borderRadius: "var(--radius-md)",
                      fontSize: 13,
                      lineHeight: 1.4,
                    }}
                  >
                    <ShieldAlert size={16} style={{ flexShrink: 0, marginTop: 1 }} />
                    <div>
                      <strong>Allergen ogohlantirishi:</strong> Ushbu taom tarkibida:{" "}
                      {nutritionData.allergens.join(", ")} mavjud.
                    </div>
                  </div>
                )}
              </div>

              {/* Price and Cart Widget */}
              <div
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-xl)",
                  padding: 24,
                  boxShadow: "var(--shadow-md)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                    Umumiy narx
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 28,
                      fontWeight: 700,
                      color: "var(--accent)",
                    }}
                  >
                    {nutritionData.price.toLocaleString()} so'm
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "14px 28px",
                    borderRadius: "var(--radius-pill)",
                    background: "var(--accent)",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 15,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(232, 98, 43, 0.2)",
                  }}
                >
                  <ShoppingBag size={18} /> savatga qo'shish
                </button>
              </div>
            </div>

            {/* Customization controls */}
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {/* Main Food Item Selection */}
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
                  1. Fast food turini tanlang
                </h3>
                <div style={{ display: "flex", gap: 12 }}>
                  {mainItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedItem(item.id);
                        // Reset defaults depending on burger or pizza
                        if (item.id === "pizza") {
                          setActiveIngredients(["cheese", "sauce", "mushrooms", "pepperoni"]);
                        } else if (item.id === "hotdog") {
                          setActiveIngredients(["cheese", "sauce"]);
                        } else {
                          setActiveIngredients(["beef", "cheese", "lettuce", "tomato", "sauce"]);
                        }
                      }}
                      style={{
                        flex: 1,
                        borderRadius: "var(--radius-lg)",
                        border: "1.5px solid",
                        borderColor: selectedItem === item.id ? "var(--accent)" : "var(--border)",
                        background: selectedItem === item.id ? "var(--accent-light)" : "var(--bg-surface)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        overflow: "hidden",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--text-primary)",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      <img src={item.image} alt={item.label} style={{ width: "100%", height: 75, objectFit: "cover" }} />
                      <span style={{ display: "flex", alignItems: "center", gap: 4, padding: "8px 4px" }}>
                        <span style={{ fontSize: 16 }}>{item.emoji}</span>
                        {item.label.split(" ")[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Ingredients List selection */}
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
                  2. Masalliqlarni sozlash (Add/Remove Ingredients)
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {ingredientsList.map((ing) => {
                    const isActive = activeIngredients.includes(ing.id);
                    return (
                      <div
                        key={ing.id}
                        onClick={() => toggleIngredient(ing.id)}
                        style={{
                          padding: "14px 16px",
                          borderRadius: "var(--radius-lg)",
                          border: "1.5px solid",
                          borderColor: isActive ? "var(--accent)" : "var(--border)",
                          background: isActive ? "var(--accent-light)" : "var(--bg-surface)",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          transition: "all 120ms",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: 4,
                              border: "2px solid",
                              borderColor: isActive ? "var(--accent)" : "var(--border-strong)",
                              background: isActive ? "var(--accent)" : "transparent",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#fff",
                            }}
                          >
                            {isActive && <span style={{ fontSize: 10 }}>✔</span>}
                          </div>
                          <div>
                            <span style={{ fontSize: 14.5, fontWeight: 500, color: "var(--text-primary)" }}>
                              {ing.label}
                            </span>
                            {ing.allergen && (
                              <span
                                style={{
                                  marginLeft: 8,
                                  fontSize: 10,
                                  fontWeight: 600,
                                  color: "var(--warning)",
                                  background: "var(--warning-light)",
                                  padding: "2px 6px",
                                  borderRadius: "var(--radius-pill)",
                                }}
                              >
                                {ing.allergen}
                              </span>
                            )}
                          </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <span style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                            +{ing.calories} kkal
                          </span>
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 600 }}>
                            +{ing.price.toLocaleString()} so'm
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <style jsx global>{`
        @media (max-width: 900px) {
          #fastfood-layout {
            grid-template-columns: 1fr !important;
          }
          .sticky-viz {
            position: relative !important;
            top: 0 !important;
          }
        }
      `}</style>
    </>
  );
}
