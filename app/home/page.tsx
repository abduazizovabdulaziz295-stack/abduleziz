"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, X, Minus, Plus, Home, MapPin, List, CheckCircle, LogIn, ArrowRight, Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Product {
id: number;
img: string;
name: string;
price: number;
category: string;
qty?: number;
}

const allProducts: Product[] = [
{ id: 1, img: "/4418.jpg",          name: "Classic Box",     price: 35000, category: "Box" },
{ id: 2, img: "/Big sanders.jpg",   name: "Cheese Burger",   price: 38000, category: "Burger" },
{ id: 3, img: "/chiken burg.jpg",   name: "Chicken Burger",  price: 36000, category: "Chicken" },
{ id: 4, img: "/medium_5556.jpg",   name: "Double Burger",   price: 45000, category: "Burger" },
{ id: 5, img: "/combo1.jpg",        name: "Family Combo",    price: 90000, category: "Combo" },
{ id: 6, img: "/chicken_combo.jpg", name: "Chicken Combo",   price: 75000, category: "Combo" },
];

const categories = ["All", "Burger", "Chicken", "Box", "Combo"];

const testimonials = [
{ name: "Ali Karimov",    text: "Fast delivery va taomlar juda mazali! Har doim KFC-ni tanliman.",      rating: 5, tag: "Doimiy mijoz" },
{ name: "Malika Yusupova", text: "KFC doimo sifatli va tez xizmat qiladi. Tavsiya qilaman!",            rating: 5, tag: "Verified" },
{ name: "Jasur Toshmatov", text: "Oilaviy buyurtma uchun ideal joy. Family Combo juda yoqdi!",          rating: 5, tag: "Family" },
];

const stats = [
{ value: "25,000+", label: "Dunyo bo'ylab filiallar" },
{ value: "150+",    label: "Mamlakatlar" },
{ value: "1930",    label: "Asos solingan yil" },
{ value: "4M+",     label: "Kunlik mehmonlar" },
];

const fmt = (n: number) => n.toLocaleString("uz-UZ") + " so'm";

export default function HomePage() {
const router = useRouter();
const [cart, setCart] = useState<Product[]>([]);
const [category, setCategory] = useState("All");
const [cartOpen, setCartOpen] = useState(false);
const [testimonialIdx, setTestimonialIdx] = useState(0);
const [visible, setVisible] = useState(false);
const heroRef = useRef<HTMLDivElement>(null);

useEffect(() => {
try { const s = localStorage.getItem("kfc_home_cart"); if (s) setCart(JSON.parse(s)); } catch { /**/ }
setTimeout(() => setVisible(true), 100);
}, []);

useEffect(() => {
try { localStorage.setItem("kfc_home_cart", JSON.stringify(cart)); } catch { /**/ }
}, [cart]);

useEffect(() => {
const t = setInterval(() => setTestimonialIdx(i => (i + 1) % testimonials.length), 4000);
return () => clearInterval(t);
}, []);

const filtered = category === "All" ? allProducts : allProducts.filter(p => p.category === category);

const addToCart = (product: Product) => {
setCart(prev => {
const ex = prev.find(p => p.id === product.id);
if (ex) return prev.map(p => p.id === product.id ? { ...p, qty: Math.min((p.qty || 0) + 1, 10) } : p);
return [...prev, { ...product, qty: 1 }];
});
};

const changeQty = (id: number, dir: 1 | -1) =>
setCart(prev =>
prev.map(p => p.id === id ? { ...p, qty: (p.qty || 0) + dir } : p).filter(p => (p.qty || 0) > 0)
);

const cartTotal = cart.reduce((s, p) => s + (p.qty || 0) * p.price, 0);
const cartCount = cart.reduce((s, p) => s + (p.qty || 0), 0);

return (
<div className="min-h-screen bg-white overflow-x-hidden">
<style>{`
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,800&family=Barlow:wght@400;500;600&display=swap');
.font-display { font-family: 'Barlow Condensed', sans-serif; }
.font-body { font-family: 'Barlow', sans-serif; }
@keyframes fadeUp { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@keyframes slideRight { from { opacity:0; transform:translateX(-40px); } to { opacity:1; transform:translateX(0); } }
@keyframes scaleIn { from { opacity:0; transform:scale(0.92); } to { opacity:1; transform:scale(1); } }
.anim-fadeup { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both; }
.anim-fadein { animation: fadeIn 0.6s ease both; }
.anim-scaleIn { animation: scaleIn 0.5s cubic-bezier(0.22,1,0.36,1) both; }
.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.2s; }
.delay-3 { animation-delay: 0.35s; }
.delay-4 { animation-delay: 0.5s; }
.delay-5 { animation-delay: 0.65s; }
.card-hover { transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease; }
.card-hover:hover { transform: translateY(-6px); box-shadow: 0 24px 48px rgba(228,0,43,0.15); }
.no-scrollbar::-webkit-scrollbar { display:none; }
.no-scrollbar { -ms-overflow-style:none; scrollbar-width:none; }
.diagonal-cut { clip-path: polygon(0 0, 100% 0, 100% 88%, 0 100%); }
.diagonal-cut-rev { clip-path: polygon(0 5%, 100% 0, 100% 100%, 0 100%); }
`}</style>


<nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 font-body">
<div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
<button onClick={() => router.push("/")} className="flex items-center gap-2.5">
<div className="w-8 h-8 bg-[#E4002B] rounded-full flex items-center justify-center">
<span className="text-white font-display font-black text-xs tracking-tight">KFC</span>
</div>
<span className="font-display font-black text-lg text-gray-900 tracking-tight hidden sm:block">Kentucky Fried Chicken</span>
</button>
<div className="hidden md:flex items-center gap-1">
{[
{ icon: <Home size={15} />, label: "Bosh sahifa", route: "/" },
{ icon: <MapPin size={15} />, label: "Restoranlar", route: "/restaurants" },
{ icon: <List size={15} />, label: "Menyu", route: "/menu" },
{ icon: <CheckCircle size={15} />, label: "Halal", route: "/halal" },
].map(item => (
<button key={item.label} onClick={() => router.push(item.route)} className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-[#E4002B] hover:bg-red-50 transition font-body">
{item.icon}{item.label}
</button>
))}
</div>
<div className="flex items-center gap-3">
<button onClick={() => router.push("/login")} className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#E4002B] transition font-body">
<LogIn size={15} />Kirish
</button>
<button onClick={() => setCartOpen(true)} className="relative flex items-center gap-2 bg-[#E4002B] text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-red-700 transition font-body">
<ShoppingBag size={16} />
<span className="hidden sm:inline">Savat</span>
{cartCount > 0 && (
<span className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-[#E4002B] text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">{cartCount}</span>
)}
</button>
</div>
</div>
</nav>


<section ref={heroRef} className="diagonal-cut bg-[#E4002B] min-h-screen flex items-center pt-16 relative overflow-hidden">

<div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
<div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-red-900/40 to-transparent" />
<div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

<div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center py-20">

<div className={visible ? "anim-fadeup" : "opacity-0"}>
<div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
<span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
<span className="text-white/90 text-xs font-bold uppercase tracking-widest font-body">Yangi Menyu 2026</span>
</div>
<h1 className="font-display font-black text-white leading-none tracking-tight">
<span className="block text-6xl sm:text-7xl lg:text-8xl">IT&apos;S</span>
<span className="block text-6xl sm:text-7xl lg:text-8xl text-yellow-400">FINGER</span>
<span className="block text-6xl sm:text-7xl lg:text-8xl">LICKIN&apos;</span>
<span className="block text-6xl sm:text-7xl lg:text-8xl italic text-white/80">GOOD.</span>
</h1>
<p className="mt-6 text-white/75 text-lg max-w-md font-body leading-relaxed">
Sifat, tezlik va halol xizmatni bir joyda his qiling. 25,000+ filialdan Toshkentdagi manzilingizga.
</p>
<div className="mt-8 flex flex-wrap gap-3">
<button onClick={() => router.push("/menu")} className="flex items-center gap-2 bg-white text-[#E4002B] px-8 py-4 rounded-full font-display font-black text-lg hover:bg-yellow-400 transition shadow-2xl">
Buyurtma berish <ArrowRight size={18} />
</button>
<button onClick={() => setCartOpen(true)} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full font-display font-bold text-lg hover:bg-white/20 transition">
<ShoppingBag size={18} /> Savat {cartCount > 0 && `(${cartCount})`}
</button>
</div>
</div>

{/* Stats card */}
<div className={`grid grid-cols-2 gap-4 ${visible ? "anim-scaleIn delay-3" : "opacity-0"}`}>
{stats.map((s, i) => (
<div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition">
<div className="font-display font-black text-4xl text-yellow-400">{s.value}</div>
<div className="text-white/70 text-sm mt-1 font-body">{s.label}</div>
</div>
))}
</div>
</div>
</section>

<section className="py-20 bg-white">
<div className="max-w-7xl mx-auto px-6">
<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
<div>
<p className="text-[#E4002B] text-xs font-bold uppercase tracking-widest mb-2 font-body">Bizning Taomlar</p>
<h2 className="font-display font-black text-5xl text-gray-900 leading-none">MASHHUR TAOMLAR</h2>
</div>
<div className="flex gap-2 flex-wrap">
{categories.map(c => (
<button key={c} onClick={() => setCategory(c)} className={`px-5 py-2 rounded-full text-sm font-bold transition font-body ${category === c ? "bg-[#E4002B] text-white shadow-lg shadow-red-200" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
{c}
</button>
))}
</div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
{filtered.map((p, i) => (
<div key={p.id} className={`card-hover bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm cursor-pointer group anim-scaleIn delay-${Math.min(i + 1, 5)}`}>
<div className="relative h-52 bg-gray-50 overflow-hidden">
<img
src={p.img}
alt={p.name}
className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop"; }}
/>
<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
</div>
<div className="p-5">
<h3 className="font-display font-black text-xl text-gray-900">{p.name}</h3>
<div className="flex items-center justify-between mt-3">
<span className="text-[#E4002B] font-display font-black text-xl">{fmt(p.price)}</span>
<button
onClick={() => addToCart(p)}
className="flex items-center gap-2 bg-[#E4002B] text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-red-700 transition active:scale-95 font-body"
>
<Plus size={14} /> Qo&apos;shish
</button>
</div>
</div>
</div>
))}
</div>
</div>
</section>

<section className="diagonal-cut-rev bg-gray-900 py-24 relative overflow-hidden">
<div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(-45deg, #E4002B 0, #E4002B 1px, transparent 0, transparent 50%)", backgroundSize: "24px 24px" }} />
<div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
<p className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-4 font-body">Maxsus Taklif</p>
<h2 className="font-display font-black text-white text-6xl sm:text-7xl leading-none mb-6">
BUGUN<br /><span className="text-[#E4002B]">10% CHEGIRMA</span>
</h2>
<p className="text-gray-400 text-lg mb-8 font-body">Buyurtma berishda <span className="text-white font-bold">KFC10</span> promo kodni qo&apos;llang va tejang.</p>
<button onClick={() => router.push("/menu")} className="inline-flex items-center gap-2 bg-[#E4002B] text-white px-10 py-4 rounded-full font-display font-black text-xl hover:bg-red-700 transition shadow-2xl shadow-red-900/50">
Hoziroq Buyurtma Ber <ArrowRight size={20} />
</button>
</div>
</section>


<section className="py-24 bg-white">
<div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
<div>
<p className="text-[#E4002B] text-xs font-bold uppercase tracking-widest mb-3 font-body">Tarix</p>
<h2 className="font-display font-black text-5xl text-gray-900 leading-none mb-6">COLONEL<br />SANDERS</h2>
<p className="text-gray-500 leading-relaxed mb-4 font-body">KFC 1930-yillarda AQShning Kentucky shtatida Harland Sanders tomonidan asos solingan. Uning maxsus 11 ta ziravorli retsepti butun dunyoni zabt etdi.</p>
<p className="text-gray-500 leading-relaxed font-body">1952-yilda franchayzing boshlangan va bugungi kunda brend 150 dan ortiq mamlakatlarda, 25,000+ filial orqali faoliyat yuritadi.</p>
<button onClick={() => router.push("/about")} className="mt-8 inline-flex items-center gap-2 border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-full font-display font-black text-lg hover:bg-gray-900 hover:text-white transition">
Batafsil <ArrowRight size={18} />
</button>
</div>
<div className="grid grid-cols-2 gap-4">
{[
{ year: "1930", label: "Birinchi restoran", color: "bg-[#E4002B]" },
{ year: "1952", label: "Franchayzing boshlandi", color: "bg-gray-900" },
{ year: "1960", label: "Xalqaro kengayish", color: "bg-[#E4002B]" },
{ year: "2026", label: "25,000+ filial", color: "bg-gray-900" },
].map((item, i) => (
<div key={i} className={`${item.color} rounded-3xl p-6 text-white`}>
<div className="font-display font-black text-4xl">{item.year}</div>
<div className="text-white/70 text-sm mt-1 font-body">{item.label}</div>
</div>
))}
</div>
</div>
</section>


<section className="py-24 bg-gray-50">
<div className="max-w-4xl mx-auto px-6 text-center">
<p className="text-[#E4002B] text-xs font-bold uppercase tracking-widest mb-3 font-body">Mijozlar Fikri</p>
<h2 className="font-display font-black text-5xl text-gray-900 leading-none mb-16">NIMA DEYISHADI?</h2>

<div className="relative bg-white rounded-3xl p-10 shadow-xl border border-gray-100 min-h-52 flex flex-col items-center justify-center">
<div className="flex gap-1 mb-5">
{[...Array(testimonials[testimonialIdx].rating)].map((_, i) => (
<Star key={i} size={18} fill="#E4002B" stroke="none" />
))}
</div>
<p className="text-gray-700 text-xl leading-relaxed italic mb-5 font-body max-w-xl">
&ldquo;{testimonials[testimonialIdx].text}&rdquo;
</p>
<div>
<p className="font-display font-black text-lg text-gray-900">{testimonials[testimonialIdx].name}</p>
<span className="inline-block mt-1 bg-red-50 text-[#E4002B] text-xs font-bold px-3 py-1 rounded-full font-body">{testimonials[testimonialIdx].tag}</span>
</div>

<button onClick={() => setTestimonialIdx(i => (i - 1 + testimonials.length) % testimonials.length)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition">
<ChevronLeft size={18} />
</button>
<button onClick={() => setTestimonialIdx(i => (i + 1) % testimonials.length)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition">
<ChevronRight size={18} />
</button>
</div>

<div className="flex justify-center gap-2 mt-6">
{testimonials.map((_, i) => (
<button key={i} onClick={() => setTestimonialIdx(i)} className={`h-2 rounded-full transition-all ${i === testimonialIdx ? "bg-[#E4002B] w-6" : "bg-gray-300 w-2"}`} />
))}
</div>
</div>
</section>
<section className="bg-[#E4002B] py-28 relative overflow-hidden">
<div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
<div className="relative z-10 text-center px-6">
<h2 className="font-display font-black text-white text-6xl sm:text-7xl leading-none mb-4">
NIMA<br />TANLAYSAN?
</h2>
<p className="text-white/70 text-lg mb-10 font-body">Minglab mijozlar bilan qo&apos;shiling. Bugun buyurtma bering.</p>
<button onClick={() => router.push("/menu")} className="inline-flex items-center gap-3 bg-white text-[#E4002B] px-12 py-5 rounded-full font-display font-black text-xl hover:bg-yellow-400 transition shadow-2xl">
Hoziroq Buyurtma Ber <ArrowRight size={22} />
</button>
</div>
</section>


<footer className="bg-gray-950 text-gray-500 py-14 font-body">
<div className="max-w-7xl mx-auto px-6">
<div className="flex flex-col sm:flex-row justify-between items-start gap-8 pb-10 border-b border-gray-800">
<div>
<div className="flex items-center gap-2 mb-3">
<div className="w-8 h-8 bg-[#E4002B] rounded-full flex items-center justify-center">
<span className="text-white font-display font-black text-xs">KFC</span>
</div>
<span className="text-white font-display font-black text-lg">Kentucky Fried Chicken</span>
</div>
<p className="text-sm">Toshkent, O&apos;zbekiston</p>
</div>
<div className="flex gap-8 text-sm">
{[
{ label: "Menyu",       route: "/menu" },
{ label: "Restoranlar", route: "/restaurants" },
{ label: "Halal",       route: "/halal" },
{ label: "Login",       route: "/login" },
].map(item => (
<button key={item.label} onClick={() => router.push(item.route)} className="hover:text-white transition">{item.label}</button>
))}
</div>
</div>
<p className="pt-8 text-sm text-center text-gray-600">© 2026 KFC Uzbekistan. Barcha huquqlar himoyalangan.</p>
</div>
</footer>


{cartOpen && (
<div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm" onClick={() => setCartOpen(false)}>
<div className="bg-white w-full max-w-sm h-full flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
<div className="bg-[#E4002B] px-6 py-5 flex items-center justify-between">
<h2 className="text-white font-display font-black text-xl">Savat</h2>
<button onClick={() => setCartOpen(false)} className="text-white/80 hover:text-white"><X size={22} /></button>
</div>
<div className="flex-1 overflow-y-auto divide-y divide-gray-100 px-6 no-scrollbar">
{cart.length === 0 ? (
<div className="text-center py-20 text-gray-400">
<p className="text-5xl mb-3">🛒</p>
<p className="font-bold font-body">Savat bo&apos;sh</p>
</div>
) : cart.map(item => (
<div key={item.id} className="flex items-center gap-3 py-4">
<img src={item.img} alt={item.name} className="w-14 h-14 rounded-2xl object-cover shrink-0 bg-gray-100" onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop"; }} />
<div className="flex-1 min-w-0">
<p className="font-bold text-sm text-gray-900 truncate font-body">{item.name}</p>
<p className="text-[#E4002B] font-bold text-sm font-body">{fmt(item.price * (item.qty || 0))}</p>
</div>
<div className="flex items-center gap-1.5 shrink-0">
<button onClick={() => changeQty(item.id, -1)} className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"><Minus size={12} /></button>
<span className="font-black text-sm w-4 text-center font-body">{item.qty}</span>
<button onClick={() => changeQty(item.id, 1)} className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"><Plus size={12} /></button>
</div>
</div>
))}
</div>
{cart.length > 0 && (
<div className="px-6 py-5 border-t border-gray-100">
<div className="flex justify-between items-center mb-4">
<span className="text-gray-500 font-semibold font-body">Jami</span>
<span className="font-display font-black text-xl text-gray-900">{fmt(cartTotal)}</span>
</div>
<button onClick={() => { setCartOpen(false); router.push("/menu"); }} className="w-full bg-[#E4002B] text-white font-display font-black text-lg py-4 rounded-2xl hover:bg-red-700 transition active:scale-95">
Buyurtma berish
</button>
</div>
)}
</div>
</div>
)}

</div>
);
}