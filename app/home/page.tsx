"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  img: string;
  name: string;
  price: number;
  qty?: number;
}

export default function HomePage() {
  const router = useRouter();
  const [cart, setCart] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const burgers: Product[] = [
    { id: 1, img: "/4418.jpg", name: "Classic Box", price: 35000 },
    { id: 2, img: "/Big sanders.jpg", name: "Cheese Burger", price: 38000 },
    { id: 3, img: "/chiken burg.jpg", name: "Chicken Burger", price: 36000 },
    { id: 4, img: "/medium_5556.jpg", name: "Double Burger", price: 45000 },
  ];

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Product) => {
    setCart((prev) => {
      const exist = prev.find((x) => x.id === item.id);
      if (exist)
        return prev.map((x) =>
          x.id === item.id ? { ...x, qty: (x.qty || 1) + 1 } : x
        );
      return [...prev, { ...item, qty: 1 }];
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-600 to-yellow-400 text-white overflow-x-hidden">

  
      <div className="fixed bottom-6 left-6 bg-black/70 backdrop-blur-lg px-6 py-3 rounded-full shadow-xl z-50 float">
        🔥 20% Chegirma Bugun!
      </div>

   
      <section className="h-screen flex items-center justify-center text-center relative overflow-hidden">

        <div className="absolute w-[600px] h-[600px] bg-yellow-400 blur-[150px] opacity-30 rounded-full top-0 left-0"></div>
        <div className="absolute w-[600px] h-[600px] bg-red-600 blur-[150px] opacity-30 rounded-full bottom-0 right-0"></div>

        <div className="relative z-10 max-w-4xl">
          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight drop-shadow-2xl">
            FastFood <span className="text-yellow-300">KFC</span> Tajribasi
          </h1>

          <p className="mt-6 text-xl text-white/90">
            Sifat, tezlik va halol xizmatni bir joyda his qiling.
          </p>

          <div className="mt-10 flex justify-center gap-6">
            <button
              onClick={() => router.push("/menu")}
              className="bg-white text-red-600 px-10 py-4 rounded-full font-semibold hover:scale-105 transition shadow-2xl"
            >
              Buyurtma berish
            </button>

            <button
              onClick={() => router.push("/about")}
              className="border border-white px-10 py-4 rounded-full hover:bg-white hover:text-red-600 transition"
            >
              Batafsil
            </button>
          </div>
        </div>
      </section>

     
      <section className="py-24 bg-white text-black rounded-t-[60px]">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12">

          {[
            { title: "Tez yetkazish", desc: "30 daqiqa ichida" },
            { title: "Premium sifat", desc: "Eng yaxshi ingredientlar" },
            { title: "24/7 xizmat", desc: "Har doim siz bilan" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/70 backdrop-blur-lg p-10 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-3 transition"
            >
              <h3 className="text-2xl font-bold">{item.title}</h3>
              <p className="mt-4 text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

    
      <section className="py-24 bg-gray-100 text-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Tavsiya etiladi
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {burgers.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl shadow-xl p-6 text-center hover:scale-105 transition duration-300 hover:shadow-2xl"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="mx-auto hover:scale-110 transition duration-500"
                />
                <h3 className="mt-6 font-bold text-lg">{item.name}</h3>
                <p className="text-red-600 font-extrabold mt-2 text-lg">
                  {item.price.toLocaleString()} so‘m
                </p>
                <button
                  onClick={() => addToCart(item)}
                  className="mt-6 w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-3 rounded-full hover:opacity-90 transition shadow-lg"
                >
                  Korzinkaga qo‘shish
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-32 bg-black text-center">
        <h2 className="text-5xl font-bold mb-8">
          NIMA TANLAYSAN?
        </h2>
        <button
          onClick={() => router.push("/menu")}
          className="bg-red-600 px-14 py-5 rounded-full text-lg font-semibold hover:bg-red-700 transition shadow-2xl"
        >
          Hoziroq Buyurtma Ber
        </button>
      </section>

     
      <footer className="bg-gray-900 text-gray-400 py-14 text-center">
        <h3 className="text-xl text-white font-bold">FastFood Premium</h3>
        <p className="mt-4">Toshkent, O‘zbekiston</p>
        <p className="mt-6 text-gray-600">
          © 2026 Barcha huquqlar himoyalangan
          ofical
        </p>
      </footer>
    </div>
  );
}