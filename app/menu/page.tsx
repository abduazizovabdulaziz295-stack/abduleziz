"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X, Heart, Minus, Plus, ShoppingBag } from "lucide-react";

interface MenuItem {
  id: string;
  title: string;
  price: string;
  image: string;
  category: string;
  description?: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const categories = ["All", "Burger", "Twister", "Chicken", "Box"];

const localItems: MenuItem[] = [
  {
    id: "b1",
    title: "Cheese Burger",
    price: "25000",
    image: "/burger1.png",
    category: "Burger",
    description: "Sut va pishloqning mukammal uyg‘unligi bilan mazali burger.",
  },
  {
    id: "b2",
    title: "Double Burger", 
    price: "32000",
    image: "/burger2.png",
    category: "Burger",
    description: "Ikki go‘sht qatlami bilan haqiqiy burger tajribasi.",
  },
  {
    id: "b3",
    title: "Spicy Burger",
    price: "27000",
    image: "/burger3.png",
    category: "Burger",
    description: "Achchiq sous va maxfiy ziravorlar bilan jonli ta’m.",
  },
  {
    id: "b4",
    title: "BBQ Burger",
    price: "30000",
    image: "/burger4.png",
    category: "Burger",
    description: "Barbekyu sousi va pishloq bilan boyitilgan burger.",
  },
  {
    id: "b5",
    title: "Chicken Burger",
    price: "26000",
    image: "/burger5.png",
    category: "Burger",
    description: "Tovuq go‘shti va yangi sabzavotlar bilan mazali kombinatsiya.",
  },
];

export default function MenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [liked, setLiked] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (category === "All") {
        const res = await fetch(
          "https://698d9ca0b79d1c928ed5ec22.mockapi.io/kfc"
        );
        const data = await res.json();

        const formatted: MenuItem[] = data.map((item: any) => ({
          id: item.id,
          title: item.title || item.name || "No title",
          price: item.price || "0",
          category: "All",
          image: item.image || "/placeholder.png",
          description: item.description || "Mazali taom sizni kutmoqda.",
        }));

        setItems(formatted);
      } else {
        setItems(localItems.filter((i) => i.category === category));
      }
    };

    fetchData();
  }, [category]);

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const formatPrice = (n: number) => n.toLocaleString("uz-UZ");

  const addToCart = (item: MenuItem, qty: number) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.id === item.id);
      if (exist) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + qty }
            : i
        );
      }
      return [...prev, { ...item, quantity: qty }];
    });
  };

  const updateQty = (id: string, type: "inc" | "dec") => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === id
            ? {
                ...i,
                quantity:
                  type === "inc"
                    ? i.quantity + 1
                    : i.quantity - 1,
              }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const total = cart.reduce(
    (sum, i) => sum + Number(i.price) * i.quantity,
    0
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 relative overflow-hidden">

      <div className="w-full md:w-64 bg-white shadow-lg p-6">
        <h2 className="text-lg font-bold mb-6">🍔 Menu</h2>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`block w-full text-left px-4 py-3 rounded-xl mb-2 transition ${
              category === cat
                ? "bg-red-100 text-red-600"
                : "hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex-1 p-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <input
            placeholder="Mahsulot qidirish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-6 py-4 rounded-full w-full md:w-1/2 shadow-sm focus:ring-2 focus:ring-red-600 transition"
          />

          <button
            onClick={() => setCartOpen(true)}
            className="relative"
          >
            <ShoppingBag size={28} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl shadow-xl p-6 flex flex-col items-center relative hover:shadow-2xl transition cursor-pointer"
            >
              <button
                onClick={() =>
                  setLiked((prev) =>
                    prev.includes(item.id)
                      ? prev.filter((i) => i !== item.id)
                      : [...prev, item.id]
                  )
                }
                className="absolute top-4 right-4"
              >
                <Heart
                  size={20}
                  className={
                    liked.includes(item.id)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-400"
                  }
                />
              </button>

              <Image
                src={item.image}
                alt={item.title}
                width={180}
                height={180}
                className="rounded-2xl object-cover mb-4"
                onClick={() => {
                  setSelectedItem(item);
                  setQuantity(1);
                }}
              />

              <h2 className="font-bold text-lg mb-2 text-center">
                {item.title}
              </h2>

              {item.description && (
                <p className="text-gray-500 text-center text-sm mb-3">
                  {item.description}
                </p>
              )}

              <span className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold">
                {formatPrice(Number(item.price))} UZS
              </span>
            </div>
          ))}
        </div>
      </div>

      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{selectedItem.title}</h2>
              <X
                onClick={() => setSelectedItem(null)}
                className="cursor-pointer"
              />
            </div>

            <Image
              src={selectedItem.image}
              alt={selectedItem.title}
              width={300}
              height={300}
              className="mx-auto object-contain rounded-xl mb-4"
            />

            {selectedItem.description && (
              <p className="text-gray-600 text-center mb-4">
                {selectedItem.description}
              </p>
            )}

            <div className="flex justify-center items-center gap-6 mb-4">
              <button
                onClick={() =>
                  setQuantity((q) => Math.max(1, q - 1))
                }
                className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
              >
                <Minus />
              </button>
              <span className="text-lg font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
              >
                <Plus />
              </button>
            </div>

            <button
              onClick={() => {
                addToCart(selectedItem, quantity);
                setSelectedItem(null);
              }}
              className="w-full bg-red-600 text-white py-3 rounded-2xl font-semibold hover:bg-red-700 transition"
            >
              Savatga qo‘shish • {formatPrice(Number(selectedItem.price) * quantity)} UZS
            </button>
          </div>
        </div>
      )}

      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="p-6 flex justify-between border-b">
          <h2 className="text-lg font-bold">Savatcha</h2>
          <X
            onClick={() => setCartOpen(false)}
            className="cursor-pointer"
          />
        </div>

        <div className="p-6 space-y-4 overflow-y-auto h-[70%]">
          {cart.length === 0 && <p>Savatcha bo‘sh</p>}
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-500">
                  {formatPrice(Number(item.price) * item.quantity)} UZS
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQty(item.id, "dec")}
                  className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                >
                  <Minus size={16} />
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQty(item.id, "inc")}
                  className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 border-t">
          <p className="font-bold mb-4">
            Jami: {formatPrice(total)} UZS
          </p>
          <button className="w-full bg-red-600 text-white py-3 rounded-2xl font-semibold hover:bg-red-700 transition">
            Buyurtma berish
          </button>
        </div>
      </div>
    </div>
  );
}