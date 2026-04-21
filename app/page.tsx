"use client";

import { useState, useRef, useCallback } from "react";

interface MenuItem {
  id: string;
  name: string;
  emoji: string;
  image: string;
}

interface Category {
  id: string;
  label: string;
  emoji: string;
  multiSelect: boolean;
  note?: string;
  items: MenuItem[];
}

const CATEGORIES: Category[] = [
  {
    id: "soup",
    label: "Çorba",
    emoji: "🍲",
    multiSelect: false,
    items: [
      {
        id: "tavuk-corbasi",
        name: "Tavuk Çorbası",
        emoji: "🍗",
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=400&h=280&q=80",
      },
      {
        id: "domates-corbasi",
        name: "Domates Çorbası",
        emoji: "🍅",
        image: "https://images.unsplash.com/photo-1576577445504-6af96477db52?auto=format&fit=crop&w=400&h=280&q=80",
      },
      {
        id: "tel-sehriye",
        name: "Tel Şehriye Çorbası",
        emoji: "🍜",
        image: "https://images.unsplash.com/photo-1549572434-b0b5e75e2ef9?auto=format&fit=crop&w=400&h=280&q=80",
      },
      {
        id: "arpa-sehriye",
        name: "Arpa Şehriye Çorbası",
        emoji: "🥣",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=400&h=280&q=80",
      },
      {
        id: "kirmizi-mercimek",
        name: "Kırmızı Mercimek Çorbası",
        emoji: "🟠",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&h=280&q=80",
      },
      {
        id: "yesil-mercimek",
        name: "Yeşil Mercimek Çorbası",
        emoji: "🟢",
        image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=400&h=280&q=80",
      },
    ],
  },
  {
    id: "main",
    label: "Ana Yemek",
    emoji: "🍖",
    multiSelect: false,
    items: [
      {
        id: "sultan-kebabi",
        name: "Sultan Kebabı",
        emoji: "🥩",
        image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=400&h=280&q=80",
      },
      {
        id: "kavurmali-pilav",
        name: "Kavurmalı Pilav",
        emoji: "🍛",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=400&h=280&q=80",
      },
      {
        id: "tas-kebabi",
        name: "Tas Kebabı",
        emoji: "🥘",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&h=280&q=80",
      },
      {
        id: "karniyarik",
        name: "Karnıyarık",
        emoji: "🍆",
        image: "https://images.unsplash.com/photo-1601648764658-cf37e8c89b70?auto=format&fit=crop&w=400&h=280&q=80",
      },
      {
        id: "ali-nazik",
        name: "Ali Nazik Kebabı",
        emoji: "🫕",
        image: "https://images.unsplash.com/photo-1544025162-d76538b70b3a?auto=format&fit=crop&w=400&h=280&q=80",
      },
      {
        id: "hunkar-begendi",
        name: "Hünkar Beğendi",
        emoji: "🍽️",
        image: "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=400&h=280&q=80",
      },
      {
        id: "tavuk-sote",
        name: "Tavuk Sote",
        emoji: "🐔",
        image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=400&h=280&q=80",
      },
      {
        id: "firinda-tavuk",
        name: "Fırında Tavuk ve Patates",
        emoji: "🍗",
        image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c3?auto=format&fit=crop&w=400&h=280&q=80",
      },
    ],
  },
  {
    id: "dessert",
    label: "Tatlı",
    emoji: "🍰",
    multiSelect: false,
    items: [
      {
        id: "fakir-pasta",
        name: "Fakir Pastası",
        emoji: "🎂",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&h=280&q=80",
      },
      {
        id: "puding",
        name: "Puding",
        emoji: "🍮",
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=400&h=280&q=80",
      },
      {
        id: "pasta",
        name: "Pasta",
        emoji: "🍰",
        image: "https://images.unsplash.com/photo-1565958011-39e3d8636f56?auto=format&fit=crop&w=400&h=280&q=80",
      },
    ],
  },
  {
    id: "side_main",
    label: "Ana Yemek Yanına",
    emoji: "🍚",
    multiSelect: false,
    items: [
      {
        id: "pirinc-pilavi",
        name: "Pirinç Pilavı",
        emoji: "🍚",
        image: "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=400&h=280&q=80",
      },
      {
        id: "bulgur-pilavi",
        name: "Bulgur Pilavı",
        emoji: "🌾",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&h=280&q=80",
      },
      {
        id: "kuskus",
        name: "Kuskus",
        emoji: "🫘",
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=400&h=280&q=80",
      },
    ],
  },
  {
    id: "drink",
    label: "İçecek",
    emoji: "🥤",
    multiSelect: false,
    items: [
      {
        id: "ayran",
        name: "Ayran",
        emoji: "🥛",
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&h=280&q=80",
      },
      {
        id: "kola",
        name: "Kola",
        emoji: "🥤",
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&h=280&q=80",
      },
      {
        id: "fanta",
        name: "Fanta",
        emoji: "🍊",
        image: "https://images.unsplash.com/photo-1527960471264-932f39eb5846?auto=format&fit=crop&w=400&h=280&q=80",
      },
      {
        id: "ice-tea",
        name: "Ice Tea",
        emoji: "🍵",
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=400&h=280&q=80",
      },
    ],
  },
  {
    id: "extras",
    label: "Yan Yemek",
    emoji: "🥗",
    multiSelect: true,
    note: "Birden fazla seçebilirsin",
    items: [
      {
        id: "jalepeno-tursu",
        name: "Jalapeño Turşu",
        emoji: "🌶️",
        image: "https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?auto=format&fit=crop&w=400&h=280&q=80",
      },
      {
        id: "salatalik-tursu",
        name: "Salatalık Turşusu",
        emoji: "🥒",
        image: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&w=400&h=280&q=80",
      },
      {
        id: "yogurt",
        name: "Yoğurt",
        emoji: "🥛",
        image: "https://images.unsplash.com/photo-1488477181894-2f09564632ab?auto=format&fit=crop&w=400&h=280&q=80",
      },
      {
        id: "coban-salata",
        name: "Çoban Salata",
        emoji: "🥗",
        image: "https://images.unsplash.com/photo-1540189711765-8d53d84f5d44?auto=format&fit=crop&w=400&h=280&q=80",
      },
      {
        id: "patates-puresi",
        name: "Patates Püresi",
        emoji: "🥔",
        image: "https://images.unsplash.com/photo-1567364195957-ad407fd6fbc0?auto=format&fit=crop&w=400&h=280&q=80",
      },
    ],
  },
];

function FoodCard({
  item,
  selected,
  onClick,
}: {
  item: MenuItem;
  selected: boolean;
  onClick: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
        selected
          ? "ring-4 ring-amber-500 shadow-lg shadow-amber-200 scale-[1.02]"
          : "ring-1 ring-stone-200 shadow-sm hover:shadow-md hover:scale-[1.01] hover:ring-amber-300"
      } bg-white`}
      aria-pressed={selected}
      aria-label={item.name}
    >
      {/* Image area */}
      <div className="relative w-full h-36 bg-amber-50 flex items-center justify-center overflow-hidden">
        {!imgError ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-5xl">{item.emoji}</span>
        )}
        {selected && (
          <div className="absolute inset-0 bg-amber-500/20 flex items-center justify-center">
            <div className="bg-amber-500 text-white rounded-full w-9 h-9 flex items-center justify-center shadow-md">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Text area */}
      <div className={`px-3 py-2.5 transition-colors ${selected ? "bg-amber-50" : "bg-white"}`}>
        <p className={`text-sm font-semibold leading-tight ${selected ? "text-amber-800" : "text-stone-800"}`}>
          {item.name}
        </p>
      </div>
    </button>
  );
}

export default function MenuSelector() {
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const summaryRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const toggleItem = useCallback(
    (categoryId: string, itemId: string, multiSelect: boolean) => {
      setSelections((prev) => {
        const current = prev[categoryId] || [];
        if (multiSelect) {
          return {
            ...prev,
            [categoryId]: current.includes(itemId)
              ? current.filter((id) => id !== itemId)
              : [...current, itemId],
          };
        } else {
          return {
            ...prev,
            [categoryId]: current.includes(itemId) ? [] : [itemId],
          };
        }
      });
    },
    []
  );

  const downloadPng = async () => {
    if (!summaryRef.current) return;
    setDownloading(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(summaryRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: false,
        logging: false,
      });
      const link = document.createElement("a");
      link.download = "menu-secimim.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      setDownloading(false);
    }
  };

  const totalSelections = Object.values(selections).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  const hasAnySelection = totalSelections > 0;

  const getSelectedNames = (cat: Category): string[] => {
    const ids = selections[cat.id] || [];
    return cat.items
      .filter((item) => ids.includes(item.id))
      .map((item) => `${item.emoji} ${item.name}`);
  };

  return (
    <div className="min-h-full bg-stone-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-8 px-4 text-center shadow-md">
        <h1 className="text-3xl font-bold tracking-tight">🍽️ Akşam Yemeği Menüsü</h1>
        <p className="mt-2 text-amber-100 text-base">
          Bu akşam ne yemek istersin? Seçimini yap!
        </p>
      </div>

      {/* Categories */}
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
        {CATEGORIES.map((cat) => {
          const selectedIds = selections[cat.id] || [];
          return (
            <section key={cat.id}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{cat.emoji}</span>
                <h2 className="text-xl font-bold text-stone-800">{cat.label}</h2>
                {cat.multiSelect && (
                  <span className="ml-1 text-xs bg-amber-100 text-amber-700 font-medium px-2 py-0.5 rounded-full border border-amber-200">
                    {cat.note}
                  </span>
                )}
                {!cat.multiSelect && (
                  <span className="ml-1 text-xs bg-stone-100 text-stone-500 font-medium px-2 py-0.5 rounded-full border border-stone-200">
                    1 seçim
                  </span>
                )}
                {selectedIds.length > 0 && (
                  <span className="ml-auto text-xs bg-amber-500 text-white font-semibold px-2.5 py-0.5 rounded-full">
                    {selectedIds.length} seçildi
                  </span>
                )}
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                {cat.items.map((item) => (
                  <FoodCard
                    key={item.id}
                    item={item}
                    selected={selectedIds.includes(item.id)}
                    onClick={() => toggleItem(cat.id, item.id, cat.multiSelect)}
                  />
                ))}
              </div>
            </section>
          );
        })}

        {/* Summary Section */}
        <section className="pt-4 border-t-2 border-stone-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-stone-800">📋 Seçimlerim</h2>
            {hasAnySelection && (
              <span className="text-sm text-stone-500">
                {totalSelections} öğe seçildi
              </span>
            )}
          </div>

          {!hasAnySelection ? (
            <div className="text-center py-12 text-stone-400">
              <p className="text-4xl mb-3">👆</p>
              <p className="text-base">Yukarıdan seçimlerini yap!</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-stone-200 overflow-hidden bg-white shadow-sm mb-6">
              {CATEGORIES.map((cat) => {
                const names = getSelectedNames(cat);
                if (names.length === 0) return null;
                return (
                  <div
                    key={cat.id}
                    className="flex items-start gap-4 px-5 py-4 border-b last:border-b-0 border-stone-100"
                  >
                    <span className="text-2xl mt-0.5">{cat.emoji}</span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-0.5">
                        {cat.label}
                      </p>
                      <p className="text-base font-medium text-stone-800">
                        {names.join(" • ")}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <button
            onClick={downloadPng}
            disabled={!hasAnySelection || downloading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg shadow-md hover:shadow-lg hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
          >
            {downloading ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Hazırlanıyor...
              </>
            ) : (
              <>📥 Menüyü PNG Olarak İndir</>
            )}
          </button>
        </section>
      </div>

      {/* Hidden summary card for PNG export */}
      <div
        ref={summaryRef}
        style={{
          position: "fixed",
          left: "-9999px",
          top: 0,
          width: "620px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
            padding: "40px",
            borderRadius: "0",
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <div style={{ fontSize: "48px", marginBottom: "8px" }}>🍽️</div>
            <h1
              style={{
                color: "white",
                fontSize: "28px",
                fontWeight: "800",
                margin: "0 0 6px",
                letterSpacing: "-0.5px",
              }}
            >
              Akşam Yemeği Menüsü
            </h1>
            <p style={{ color: "rgba(255,255,255,0.8)", margin: 0, fontSize: "14px" }}>
              21 Nisan 2026
            </p>
          </div>

          {/* Selections card */}
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            }}
          >
            {CATEGORIES.map((cat, i) => {
              const names = getSelectedNames(cat);
              if (names.length === 0) return null;
              return (
                <div
                  key={cat.id}
                  style={{
                    padding: "18px 24px",
                    borderBottom:
                      i < CATEGORIES.length - 1 ? "1px solid #f3f4f6" : "none",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "14px",
                  }}
                >
                  <span style={{ fontSize: "28px", flexShrink: 0, marginTop: "2px" }}>
                    {cat.emoji}
                  </span>
                  <div>
                    <p
                      style={{
                        fontSize: "10px",
                        fontWeight: "700",
                        color: "#9ca3af",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        margin: "0 0 4px",
                      }}
                    >
                      {cat.label}
                    </p>
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#1f2937",
                        margin: 0,
                        lineHeight: "1.4",
                      }}
                    >
                      {names.join(" • ")}
                    </p>
                  </div>
                </div>
              );
            })}

            {!hasAnySelection && (
              <div style={{ padding: "32px", textAlign: "center", color: "#9ca3af" }}>
                Henüz seçim yapılmadı
              </div>
            )}
          </div>

          {/* Footer */}
          <p
            style={{
              textAlign: "center",
              color: "rgba(255,255,255,0.6)",
              fontSize: "12px",
              marginTop: "20px",
              marginBottom: 0,
            }}
          >
            Afiyet olsun! 🌟
          </p>
        </div>
      </div>
    </div>
  );
}
