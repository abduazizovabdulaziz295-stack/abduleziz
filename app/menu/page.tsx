"use client";

import { useEffect, useState } from "react";
import { ShoppingBag, Plus, Minus, X, Search, ChevronRight, Loader, CheckCircle, ArrowLeft } from "lucide-react";

interface MenuItem {
id: string;
title: string;
price: number;
image: string;
category: string;
description: string;
badge?: string | null;
}

interface CartItem extends MenuItem {
quantity: number;
}

const CATEGORIES = ["Barchasi", "Burger", "Twister", "Tovuq", "Box Meal"];
const API_URL = "https://698d9ca0b79d1c928ed5ec22.mockapi.io/kfc";
const FALLBACK: Record<string, string> = {
Burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop",
Twister: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&h=400&fit=crop",
Tovuq: "https://images.unsplash.com/photo-1562967914-608f82629710?w=600&h=400&fit=crop",
"Box Meal": "https://images.unsplash.com/photo-1586816001966-79b736744398?w=600&h=400&fit=crop",
};

const fmt = (n: number) => n.toLocaleString("uz-UZ") + " UZS";

export default function MenuPage() {
const [cat, setCat] = useState("Barchasi");
const [items, setItems] = useState<MenuItem[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [search, setSearch] = useState("");
const [active, setActive] = useState<MenuItem | null>(null);
const [qty, setQty] = useState(1);
const [cart, setCart] = useState<CartItem[]>([]);
const [cartOpen, setCartOpen] = useState(false);
const [checkoutOpen, setCheckoutOpen] = useState(false);
const [name, setName] = useState("");
const [phone, setPhone] = useState("");
const [address, setAddress] = useState("");
const [placing, setPlacing] = useState(false);
const [success, setSuccess] = useState(false);

useEffect(() => {
try { const s = localStorage.getItem("kfc_cart"); if (s) setCart(JSON.parse(s)); } catch { /**/ }
}, []);

useEffect(() => {
try { localStorage.setItem("kfc_cart", JSON.stringify(cart)); } catch { /**/ }
}, [cart]);

useEffect(() => {
let cancelled = false;
const load = async () => {
setLoading(true);
setError("");
try {
const res = await fetch(API_URL);
if (!res.ok) throw new Error("Server xatolik");
const data = await res.json() as Record<string, unknown>[];
if (cancelled) return;
setItems(data.map((d) => ({
id: String(d.id ?? ""),
title: String(d.title ?? d.name ?? "Nomsiz"),
price: Number(d.price) || 0,
category: String(d.category ?? "Barchasi"),
description: String(d.description ?? "Mazali taom."),
image: String(d.image || FALLBACK[String(d.category ?? "")] || FALLBACK.Burger),
badge: null,
})));
} catch (e) {
if (!cancelled) setError(e instanceof Error ? e.message : "Xatolik");
} finally {
if (!cancelled) setLoading(false);
}
};
load();
return () => { cancelled = true; };
}, []);

const filtered = items.filter((i) =>
(cat === "Barchasi" || i.category === cat) &&
i.title.toLowerCase().includes(search.toLowerCase())
);

const addToCart = (item: MenuItem, q: number) =>
setCart((prev) => {
const ex = prev.find((i) => i.id === item.id);
if (ex) return prev.map((i) => i.id === item.id ? { ...i, quantity: Math.min(i.quantity + q, 10) } : i);
return [...prev, { ...item, quantity: q }];
});

const changeQty = (id: string, dir: 1 | -1) =>
setCart((prev) =>
prev.map((i) => i.id === id ? { ...i, quantity: i.quantity + dir } : i).filter((i) => i.quantity > 0)
);

const cartTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
const canOrder = name.trim().length > 0 && phone.trim().length > 0 && address.trim().length > 0;

const placeOrder = () => {
if (!canOrder) return;
setPlacing(true);
setTimeout(() => {
setPlacing(false);
setSuccess(true);
setCart([]);
setName("");
setPhone("");
setAddress("");
}, 2000);
};

return (
<div className="min-h-screen bg-gray-50">


<nav className="sticky top-0 z-30 bg-[#E4002B]">
<div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-9 h-9 bg-white rounded-full flex items-center justify-center">
<span className="text-[#E4002B] font-black text-xs">KFC</span>
</div>
<span className="text-white font-black text-lg tracking-tight hidden sm:block">Kentucky Fried Chicken</span>
</div>
<button onClick={() => setCartOpen(true)} className="flex items-center gap-2 bg-white text-[#E4002B] font-bold px-4 py-2 rounded-full text-sm hover:bg-red-50 transition">
<ShoppingBag size={16} />
Savat
{cartCount > 0 && (
<span className="bg-[#E4002B] text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">{cartCount}</span>
)}
</button>
</div>
</nav>



<div className="bg-[#E4002B] px-6 pt-8 pb-10">
<div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-6">
<div>
<p className="text-red-200 text-xs font-bold uppercase tracking-widest mb-2">Bizning Menyu</p>
<h1 className="text-white font-black text-4xl sm:text-5xl leading-none">
It&apos;s Finger<br />Lickin&apos; Good.
</h1>
</div>
<div className="relative w-full sm:w-64">
<Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
<input
value={search}
onChange={(e) => setSearch(e.target.value)}
placeholder="Qidirish..."
className="w-full pl-9 pr-4 py-3 rounded-xl text-sm bg-white outline-none shadow placeholder:text-gray-400"
/>
</div>
</div>
</div>


<div className="bg-white border-b border-gray-200 sticky top-16 z-20">
<div className="max-w-6xl mx-auto px-6 flex gap-1 py-3 overflow-x-auto no-scrollbar">
{CATEGORIES.map((c) => (
<button
key={c}
onClick={() => setCat(c)}
className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold transition ${cat === c ? "bg-[#E4002B] text-white" : "text-gray-500 hover:bg-gray-100"}`}
>
{c}
</button>
))}
</div>
</div>


<main className="max-w-6xl mx-auto px-6 py-8">
{loading && (
<div className="flex items-center justify-center py-24 gap-3 text-gray-400">
<Loader size={20} className="animate-spin text-[#E4002B]" />
<span className="font-semibold">Yuklanmoqda...</span>
</div>
)}
{error && (
<div className="text-center py-24">
<p className="text-4xl mb-3">⚠️</p>
<p className="font-bold text-red-500">{error}</p>
</div>
)}
{!loading && !error && (
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
{filtered.map((item) => (
<div
key={item.id}
onClick={() => { setActive(item); setQty(1); }}
className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
>
<div className="relative h-48 overflow-hidden bg-gray-100">
<img
src={item.image}
alt={item.title}
className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK.Burger; }}
/>


{item.badge && (
<span className="absolute top-3 left-3 bg-[#E4002B] text-white text-[10px] font-black uppercase tracking-wide px-2.5 py-1 rounded-full">{item.badge}</span>
)}
</div>
<div className="p-4 flex items-center justify-between gap-3">
<div className="min-w-0">
<h3 className="font-black text-gray-900 truncate">{item.title}</h3>
<p className="text-[#E4002B] font-bold text-sm mt-0.5">{fmt(item.price)}</p>
</div>
<div className="w-9 h-9 shrink-0 bg-[#E4002B] rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
<Plus size={16} />
</div>
</div>


</div>
))}
</div>
)}
{!loading && !error && filtered.length === 0 && (
<div className="text-center py-24 text-gray-400">
<p className="text-5xl mb-3">🍗</p>
<p className="font-bold">Hech narsa topilmadi</p>
</div>



)}
</main>


{active && (
<div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setActive(null)}>
<div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
<div className="relative h-52">
<img src={active.image} alt={active.title} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK.Burger; }} />
<button onClick={() => setActive(null)} className="absolute top-3 right-3 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow">
<X size={15} className="text-gray-700" />
</button>


</div>
<div className="p-6">
<h2 className="font-black text-2xl text-gray-900">{active.title}</h2>
<p className="text-gray-500 text-sm mt-1 mb-6">{active.description}</p>
<div className="flex items-center justify-between">
<div className="flex items-center gap-3">
<button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[#E4002B] transition">
<Minus size={14} />

</button>
<span className="font-black text-xl w-5 text-center">{qty}</span>
<button onClick={() => setQty((q) => Math.min(10, q + 1))} className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[#E4002B] transition">
<Plus size={14} />
</button>
</div>
<button onClick={() => { addToCart(active, qty); setActive(null); }} className="flex items-center gap-2 bg-[#E4002B] text-white font-black px-6 py-3 rounded-full hover:bg-red-700 transition active:scale-95">
Qo&apos;shish <ChevronRight size={16} />
</button>
</div>
<p className="text-right text-[#E4002B] font-black text-lg mt-4">{fmt(active.price * qty)}</p>
</div>
</div>
</div>
)}


{cartOpen && (
<div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm" onClick={() => setCartOpen(false)}>
<div className="bg-white w-full max-w-sm h-full flex flex-col shadow-2xl" onClick={(e) => e.stopPropagation()}>
<div className="bg-[#E4002B] px-6 py-5 flex items-center justify-between">
<h2 className="text-white font-black text-xl">Savat</h2>
<button onClick={() => setCartOpen(false)} className="text-white/80 hover:text-white"><X size={22} /></button>


</div>
<div className="flex-1 overflow-y-auto divide-y divide-gray-100 px-6">
{cart.length === 0 ? (
<div className="text-center py-20 text-gray-400">
<p className="text-5xl mb-3">🛒</p>
<p className="font-bold">Savat bo&apos;sh</p>



</div>
) : cart.map((item) => (
<div key={item.id} className="flex items-center gap-3 py-4">
<img src={item.image} alt={item.title} className="w-14 h-14 rounded-xl object-cover shrink-0" onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK.Burger; }} />
<div className="flex-1 min-w-0">
<p className="font-bold text-sm text-gray-900 truncate">{item.title}</p>
<p className="text-[#E4002B] font-bold text-sm">{fmt(item.price * item.quantity)}</p>
</div>

<div className="flex items-center gap-1.5 shrink-0">
<button onClick={() => changeQty(item.id, -1)} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"><Minus size={12} /></button>
<span className="font-black text-sm w-4 text-center">{item.quantity}</span>
<button onClick={() => changeQty(item.id, 1)} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"><Plus size={12} /></button>
</div>
</div>
))}
</div>
{cart.length > 0 && (
<div className="px-6 py-5 border-t border-gray-100">
<div className="flex justify-between items-center mb-4">
<span className="text-gray-500 font-semibold">Jami</span>
<span className="font-black text-xl">{fmt(cartTotal)}</span>
</div>
<button
onClick={() => { setCartOpen(false); setCheckoutOpen(true); }}
className="w-full bg-[#E4002B] text-white font-black py-4 rounded-2xl hover:bg-red-700 transition active:scale-95"
>
Buyurtma berish
</button>
</div>
)}
</div>
</div>
)}


{checkoutOpen && (
<div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm" onClick={() => { if (!placing) setCheckoutOpen(false); }}>
<div className="bg-white w-full max-w-sm h-full flex flex-col shadow-2xl" onClick={(e) => e.stopPropagation()}>


<div className="bg-[#E4002B] px-6 py-5 flex items-center gap-4">
<button onClick={() => { setCheckoutOpen(false); setCartOpen(true); }} className="text-white/80 hover:text-white">
<ArrowLeft size={22} />
</button>
<h2 className="text-white font-black text-xl">Buyurtma</h2>
</div>

{success ? (

<div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
<div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-5">
<CheckCircle size={40} className="text-green-500" />
</div>
<h3 className="font-black text-2xl text-gray-900 mb-2">Buyurtma qabul qilindi!</h3>
<p className="text-gray-500 text-sm mb-8">Yaqin orada kuryerimiz siz bilan bog&apos;lanadi. O&apos;rtacha vaqt: 25–35 daqiqa.</p>
<button
onClick={() => { setSuccess(false); setCheckoutOpen(false); }}
className="bg-[#E4002B] text-white font-black px-8 py-3 rounded-full hover:bg-red-700 transition"
>
Davom etish
</button>
</div>
) : (
<div className="flex-1 overflow-y-auto">


<div className="px-6 pt-6 pb-4 border-b border-gray-100">
<p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Buyurtma</p>
{cart.map((item) => (
<div key={item.id} className="flex justify-between items-center py-1.5">
<span className="text-sm text-gray-700 font-medium truncate pr-4">{item.title} <span className="text-gray-400">×{item.quantity}</span></span>
<span className="text-sm font-bold text-gray-900 shrink-0">{fmt(item.price * item.quantity)}</span>
</div>
))}
<div className="flex justify-between items-center pt-3 mt-2 border-t border-gray-100">
<span className="font-bold text-gray-900">Jami</span>
<span className="font-black text-[#E4002B] text-lg">{fmt(cartTotal)}</span>
</div>
</div>


<div className="px-6 py-5 flex flex-col gap-4">
<p className="text-xs font-bold uppercase tracking-widest text-gray-400">Yetkazib berish</p>

<div className="flex flex-col gap-1.5">
<label className="text-xs font-bold text-gray-500">Ismingiz</label>
<input
value={name}
onChange={(e) => setName(e.target.value)}
placeholder="Abdulaziz"
className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#E4002B] transition"
/>
</div>

<div className="flex flex-col gap-1.5">
<label className="text-xs font-bold text-gray-500">Telefon raqam</label>
<input
value={phone}
      onChange={(e) => setPhone(e.target.value)}
 placeholder="+998 90 000 00 00"
  type="tel"
       className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#E4002B] transition"
/>
</div>

<div className="flex flex-col gap-1.5">
<label className="text-xs font-bold text-gray-500">Manzil</label>
<input
value={address}
onChange={(e) => setAddress(e.target.value)}
placeholder="Ko'cha, uy raqami"
className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#E4002B] transition"
/>
</div>
</div>
</div>
)}


{!success && (
<div className="px-6 py-5 border-t border-gray-100">
<button
onClick={placeOrder}
disabled={!canOrder || placing}
className="w-full bg-[#E4002B] text-white font-black py-4 rounded-2xl hover:bg-red-700 transition active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
>
{placing ? (
<><Loader size={18} className="animate-spin" />Yuklanmoqda...</>
) : (
"Tasdiqlash"
)}
</button>
{!canOrder && (
<p className="text-center text-xs text-gray-400 mt-2">Barcha maydonlarni to&apos;ldiring</p>
)}
</div>
)}

</div>
</div>
)}

<style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}`}</style>
</div>
);
}