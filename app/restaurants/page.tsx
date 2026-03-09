"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Phone, Home, List, CheckCircle, LogIn, Search, ArrowRight, Star, Clock, X } from "lucide-react";

interface Schedule { day: string; hours: string; }
interface Branch {
id: number;
name: string;
address: string;
phone: string;
map: string;
img: string;
description: string;
schedule: Schedule[];
stats: { orders: number; rating: number };
}

const DAYS = ["Yakshanba","Dushanba","Seshanba","Chorshanba","Payshanba","Juma","Shanba"];
const makeSchedule = (hours: string): Schedule[] => DAYS.map(day => ({ day, hours }));

const branches: Branch[] = [
{ id: 1, name: "KFC C1",              address: "21 O'zbekiston Ovozi ko'chasi, Toshkent",  phone: "+998781297000", map: "https://www.google.com/maps?q=41.311081,69.240562&output=embed",  img: "https://avatars.mds.yandex.net/get-altay/15042938/2a0000019a933592b5cb7d527d3cc3118c5a/XXXL",        description: "Eng zamonaviy KFC filiali, qulay joylashuvi va keng menyu bilan.",          stats: { orders: 12000, rating: 4.9 }, schedule: makeSchedule("10:00 - 22:45") },
{ id: 2, name: "KFC Chilonzor",       address: "52 Bunyodkor shoh ko'chasi, Toshkent",     phone: "+998781297001", map: "https://www.google.com/maps?q=41.285680,69.203464&output=embed", img: "https://avatars.mds.yandex.net/get-altay/1045589/2a00000167e9980d2c8fc26021c9b73130f6/XXXL",        description: "Chilonzor hududidagi eng mashhur restoran, tezkor xizmat va toza muhit.",  stats: { orders: 9800,  rating: 4.8 }, schedule: makeSchedule("10:00 - 22:45") },
{ id: 3, name: "KFC Chimgan",         address: "3 Temur Malik ko'chasi, Toshkent",         phone: "+998781297002", map: "https://www.google.com/maps?q=41.338524,69.334681&output=embed", img: "https://avatars.mds.yandex.net/get-altay/8133749/2a00000186d05a0932265d4b5abb9ae989f4/L_height", description: "Tabiat qoynida joylashgan, dam olish va mazali taomlar uchun ideal.",      stats: { orders: 4500,  rating: 4.7 }, schedule: makeSchedule("10:00 - 22:45") },
{ id: 4, name: "KFC Yunusobod",       address: "11 Yunusobod ko'chasi, Toshkent",          phone: "+998781297003", map: "https://www.google.com/maps?q=41.3541,69.2400&output=embed",    img: "https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=400&h=300&fit=crop",                  description: "Yunusobod hududidagi zamonaviy filial, qulay xizmat va tez yetkazish.",    stats: { orders: 6700,  rating: 4.6 }, schedule: makeSchedule("10:00 - 22:30") },
{ id: 5, name: "KFC Mirzo Ulug'bek", address: "5 Mirzo Ulug'bek ko'chasi, Toshkent",     phone: "+998781297004", map: "https://www.google.com/maps?q=41.3300,69.2800&output=embed",    img: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=400&h=300&fit=crop",               description: "Yangi ochilgan filial, tezkor xizmat va qulay muhit.",                     stats: { orders: 5200,  rating: 4.5 }, schedule: makeSchedule("10:00 - 22:45") },
{ id: 6, name: "KFC Shayxontohur",   address: "7 Shayxontohur ko'chasi, Toshkent",       phone: "+998781297005", map: "https://www.google.com/maps?q=41.3167,69.2000&output=embed",    img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",               description: "Shayxontohur filialida tez va sifatli xizmat kafolatlanadi.",               stats: { orders: 6100,  rating: 4.6 }, schedule: makeSchedule("10:00 - 22:00") },
{ id: 7, name: "KFC Olmazor",        address: "2 Olmazor ko'chasi, Toshkent",             phone: "+998781297006", map: "https://www.google.com/maps?q=41.3100,69.2500&output=embed",    img: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=400&h=300&fit=crop",               description: "Olmazor hududida mashhur filial, oilaviy muhit va keng joy.",               stats: { orders: 5800,  rating: 4.7 }, schedule: makeSchedule("10:00 - 22:45") },
];

function isOpen(branch: Branch): boolean {
const today = new Date().getDay();
const s = branch.schedule[today] ?? branch.schedule[0];
const [start, end] = s.hours.split(" - ").map(t => t.split(":").map(Number));
const now = new Date().getHours() * 60 + new Date().getMinutes();
return now >= start[0] * 60 + start[1] && now <= end[0] * 60 + end[1];
}

function fmt(n: number): string {
return n >= 1000 ? (n / 1000).toFixed(1).replace(".0","") + "K+" : String(n);
}

export default function RestaurantsPage() {
const router = useRouter();
const [active, setActive] = useState<Branch>(branches[0]);
const [search, setSearch] = useState("");
const [modalOpen, setModalOpen] = useState(false);

const filtered = branches.filter(b => b.name.toLowerCase().includes(search.toLowerCase()));

const navLinks = [
{ icon: <Home size={15} />,         label: "Bosh sahifa", route: "/" },
{ icon: <MapPin size={15} />,       label: "Restoranlar", route: "/restaurants" },
{ icon: <List size={15} />,         label: "Menyu",       route: "/menu" },
{ icon: <CheckCircle size={15} />,  label: "Halal",       route: "/halal" },
{ icon: <LogIn size={15} />,        label: "Login",       route: "/login" },
];

return (
<div className="min-h-screen bg-gray-50 font-body">
<style>{`
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,800&family=Barlow:wght@400;500;600;700&display=swap');
.font-display { font-family: 'Barlow Condensed', sans-serif; }
.font-body    { font-family: 'Barlow', sans-serif; }
.card-hover { transition: transform 0.25s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.25s ease; }
.card-hover:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(228,0,43,0.12); }
.no-scrollbar::-webkit-scrollbar { display:none; }
.no-scrollbar { -ms-overflow-style:none; scrollbar-width:none; }
@keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
.anim-fadeup { animation: fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both; }
`}</style>


<nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
<div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
<button onClick={() => router.push("/")} className="flex items-center gap-2.5">
<div className="w-8 h-8 bg-[#E4002B] rounded-full flex items-center justify-center">
<span className="text-white font-display font-black text-xs">KFC</span>
</div>
<span className="font-display font-black text-lg text-gray-900 tracking-tight hidden sm:block">Kentucky Fried Chicken</span>
</button>
<div className="hidden md:flex items-center gap-1">
{navLinks.map(item => (
<button key={item.label} onClick={() => router.push(item.route)} className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition font-body ${item.label === "Restoranlar" ? "bg-red-50 text-[#E4002B]" : "text-gray-600 hover:text-[#E4002B] hover:bg-red-50"}`}>
{item.icon}{item.label}
</button>
))}
</div>
</div>
</nav>


<div className="bg-[#E4002B] pt-28 pb-14 px-6 relative overflow-hidden" style={{ clipPath: "polygon(0 0,100% 0,100% 88%,0 100%)" }}>
<div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "20px 20px" }} />
<div className="relative z-10 max-w-7xl mx-auto">
<p className="text-red-200 text-xs font-bold uppercase tracking-widest mb-3 font-body">Toshkent bo&apos;ylab</p>
<h1 className="font-display font-black text-white text-6xl sm:text-7xl leading-none mb-4">
BIZNING<br />RESTORANLAR
</h1>
<p className="text-white/70 text-lg font-body max-w-md">Toshkentdagi {branches.length} ta filialdan birini tanlang va mazali taomdan bahramand bo&apos;ling.</p>
</div>
</div>


<div className="max-w-7xl mx-auto px-6 pb-16" style={{ marginTop: "-2rem" }}>
<div className="grid lg:grid-cols-5 gap-6">


<div className="lg:col-span-2 flex flex-col gap-4">


<div className="relative">
<Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
<input
value={search}
onChange={e => setSearch(e.target.value)}
placeholder="Filial qidirish..."
className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-white border border-gray-200 text-sm outline-none focus:border-[#E4002B] transition shadow-sm font-body"
/>
</div>


<div className="flex flex-col gap-3 overflow-y-auto no-scrollbar" style={{ maxHeight: "calc(100vh - 280px)" }}>
{filtered.map((branch, i) => {
const open = isOpen(branch);
return (
<div
key={branch.id}
onClick={() => { setActive(branch); setModalOpen(true); }}
className={`card-hover bg-white rounded-2xl border overflow-hidden cursor-pointer anim-fadeup ${active.id === branch.id ? "border-[#E4002B] shadow-md" : "border-gray-100 shadow-sm"}`}
style={{ animationDelay: `${i * 0.05}s` }}
>
<div className="flex gap-4 p-4">
<div className="w-24 h-20 rounded-xl overflow-hidden shrink-0 bg-gray-100">
<img src={branch.img} alt={branch.name} className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=200&h=160&fit=crop"; }} />
</div>
<div className="flex-1 min-w-0">
<div className="flex items-start justify-between gap-2 mb-1">
<h3 className="font-display font-black text-base text-gray-900 leading-tight">{branch.name}</h3>
<span className={`shrink-0 text-[10px] font-black uppercase tracking-wide px-2 py-0.5 rounded-full ${open ? "bg-green-100 text-green-700" : "bg-red-100 text-[#E4002B]"}`}>
{open ? "Ochiq" : "Yopiq"}
</span>
</div>
<p className="text-gray-500 text-xs leading-relaxed line-clamp-2 font-body">{branch.description}</p>
<div className="flex items-center gap-3 mt-2">
<span className="flex items-center gap-1 text-xs text-gray-400 font-body"><Star size={11} fill="#E4002B" stroke="none" className="text-[#E4002B]" />{branch.stats.rating}</span>
<span className="flex items-center gap-1 text-xs text-gray-400 font-body"><Clock size={11} />{branch.schedule[0].hours}</span>
</div>
</div>
</div>
</div>
);
})}
</div>
</div>


<div className="lg:col-span-3 flex flex-col gap-4">


<div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4 flex flex-wrap items-center justify-between gap-4">
<div>
<p className="font-display font-black text-xl text-gray-900">{active.name}</p>
<p className="text-gray-500 text-sm font-body">{active.address}</p>
</div>
<div className="flex items-center gap-4">
<div className="text-center">
<p className="font-display font-black text-2xl text-[#E4002B]">{fmt(active.stats.orders)}</p>
<p className="text-gray-400 text-xs font-body">Buyurtmalar</p>
</div>
<div className="w-px h-10 bg-gray-200" />
<div className="text-center">
<p className="font-display font-black text-2xl text-yellow-400">{active.stats.rating}</p>
<p className="text-gray-400 text-xs font-body">Reyting</p>
</div>
<div className="w-px h-10 bg-gray-200" />
<button onClick={() => setModalOpen(true)} className="flex items-center gap-2 bg-[#E4002B] text-white px-5 py-2.5 rounded-full font-display font-black text-sm hover:bg-red-700 transition">
Batafsil <ArrowRight size={14} />
</button>
</div>
</div>
<div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm" style={{ height: "calc(100vh - 360px)", minHeight: 400 }}>
<iframe src={active.map} className="w-full h-full" loading="lazy" title={active.name} />
</div>
</div>

</div>
</div>


{modalOpen && (
<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setModalOpen(false)}>
<div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl anim-fadeup" onClick={e => e.stopPropagation()}>


<div className="relative h-48 bg-gray-100">
<img src={active.img} alt={active.name} className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=600&h=300&fit=crop"; }} />
<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
<div className="absolute bottom-4 left-5">
<p className="font-display font-black text-white text-2xl leading-none">{active.name}</p>
<span className={`inline-block mt-1 text-[10px] font-black uppercase tracking-wide px-2.5 py-0.5 rounded-full ${isOpen(active) ? "bg-green-400 text-white" : "bg-white/20 text-white"}`}>
{isOpen(active) ? "Hozir Ochiq" : "Yopiq"}
</span>
</div>
<button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 bg-white/90 rounded-full w-8 h-8 flex items-center justify-center shadow">
<X size={15} className="text-gray-700" />
</button>
</div>

<div className="p-6">
<p className="text-gray-500 text-sm font-body mb-5">{active.description}</p>

<div className="flex flex-col gap-3 mb-5">
<div className="flex items-center gap-3">
<div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center shrink-0">
<MapPin size={15} className="text-[#E4002B]" />
</div>
<span className="text-gray-700 text-sm font-body">{active.address}</span>
</div>
<div className="flex items-center gap-3">
<div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center shrink-0">
<Phone size={15} className="text-[#E4002B]" />
</div>
<a href={`tel:${active.phone}`} className="text-[#E4002B] font-bold text-sm font-body hover:underline">{active.phone}</a>
</div>
</div>

<div className="bg-gray-50 rounded-2xl p-4 mb-5">
<p className="font-display font-black text-sm text-gray-900 mb-3">ISH SOATLARI</p>
<div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
{active.schedule.map((s, i) => {
const isToday = new Date().getDay() === i;
return (
<div key={s.day} className={`flex justify-between text-xs font-body ${isToday ? "text-[#E4002B] font-bold" : "text-gray-500"}`}>
<span>{s.day}</span>
<span>{s.hours}</span>
</div>
);
})}
</div>
</div>

{/* Stats */}
<div className="grid grid-cols-2 gap-3 mb-5">
<div className="bg-red-50 rounded-2xl p-4 text-center">
<p className="font-display font-black text-3xl text-[#E4002B]">{fmt(active.stats.orders)}</p>
<p className="text-gray-500 text-xs font-body mt-1">Jami buyurtmalar</p>
</div>
<div className="bg-yellow-50 rounded-2xl p-4 text-center">
<p className="font-display font-black text-3xl text-yellow-500">{active.stats.rating}</p>
<p className="text-gray-500 text-xs font-body mt-1">Mijozlar reytingi</p>
</div>
</div>

<div className="flex gap-3">
<a href={`tel:${active.phone}`} className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 py-3 rounded-2xl font-display font-black text-sm hover:border-[#E4002B] hover:text-[#E4002B] transition">
<Phone size={15} /> Qo&apos;ng&apos;iroq
</a>
<button onClick={() => { setModalOpen(false); router.push("/menu"); }} className="flex-1 flex items-center justify-center gap-2 bg-[#E4002B] text-white py-3 rounded-2xl font-display font-black text-sm hover:bg-red-700 transition">
Buyurtma <ArrowRight size={15} />
</button>
</div>
</div>
</div>
</div>
)}

</div>
);
}