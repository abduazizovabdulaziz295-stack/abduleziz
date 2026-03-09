"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, RotateCcw, CheckCircle, Phone } from "lucide-react";

type Step = "phone" | "otp" | "success";

const COUNTRY_CODES = [
{ code: "+998", flag: "🇺🇿", label: "UZ" },
{ code: "+7",   flag: "🇷🇺", label: "RU" },
{ code: "+90",  flag: "🇹🇷", label: "TR" },
{ code: "+1",   flag: "🇺🇸", label: "US" },
];

export default function LoginPage() {
const router = useRouter();
const [step, setStep] = useState<Step>("phone");
const [countryCode, setCountryCode] = useState("+998");
const [phone, setPhone] = useState("");
const [otp, setOtp] = useState(["", "", "", ""]);
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);
const [resendTimer, setResendTimer] = useState(0);
const otpRefs = [
useRef<HTMLInputElement>(null),
useRef<HTMLInputElement>(null),
useRef<HTMLInputElement>(null),
useRef<HTMLInputElement>(null),
];


useEffect(() => {
if (resendTimer <= 0) return;
const t = setTimeout(() => setResendTimer(r => r - 1), 1000);
return () => clearTimeout(t);
}, [resendTimer]);


useEffect(() => {
if (step === "otp") {
setTimeout(() => otpRefs[0].current?.focus(), 100);
}
}, [step]);

const handleSendOtp = () => {
const digits = phone.replace(/\D/g, "");
if (digits.length < 7) { setError("Telefon raqamni to'liq kiriting"); return; }
setError("");
setLoading(true);
setTimeout(() => {
setLoading(false);
setStep("otp");
setResendTimer(59);
}, 1200);
};

const handleOtpChange = (val: string, idx: number) => {
if (!/^\d*$/.test(val)) return;
const next = [...otp];
next[idx] = val.slice(-1);
setOtp(next);
setError("");
if (val && idx < 3) otpRefs[idx + 1].current?.focus();
if (next.every(d => d !== "") && next.join("") !== "1234") {
setError("Noto'g'ri kod. To'g'ri kod: 1234");
}
};

const handleOtpKeyDown = (e: React.KeyboardEvent, idx: number) => {
if (e.key === "Backspace" && !otp[idx] && idx > 0) {
otpRefs[idx - 1].current?.focus();
}
};

const handleVerify = () => {
const code = otp.join("");
if (code.length < 4) { setError("4 xonali kodni kiriting"); return; }
if (code !== "1234") { setError("Noto'g'ri kod. To'g'ri kod: 1234"); return; }
setError("");
setLoading(true);
setTimeout(() => { setLoading(false); setStep("success"); }, 1000);
};

const handleResend = () => {
if (resendTimer > 0) return;
setOtp(["", "", "", ""]);
setError("");
setResendTimer(59);
otpRefs[0].current?.focus();
};

const fullPhone = `${countryCode} ${phone}`;

return (
<div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-body">
<style>{`
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;500;600;700&display=swap');
.font-display { font-family: 'Barlow Condensed', sans-serif; }
.font-body    { font-family: 'Barlow', sans-serif; }
@keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
@keyframes shake  { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-6px)} 40%,80%{transform:translateX(6px)} }
.anim-fadeup { animation: fadeUp 0.4s cubic-bezier(0.22,1,0.36,1) both; }
.anim-shake  { animation: shake 0.4s ease; }
.otp-input:focus { border-color: #E4002B; box-shadow: 0 0 0 3px rgba(228,0,43,0.12); }
`}</style>

<div className="w-full max-w-md">


<div className="bg-white rounded-3xl shadow-xl overflow-hidden">


<div className="bg-[#E4002B] px-8 py-7 relative overflow-hidden">
<div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "18px 18px" }} />
<div className="relative z-10 flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-9 h-9 bg-white rounded-full flex items-center justify-center">
<span className="text-[#E4002B] font-display font-black text-xs">KFC</span>
</div>
<span className="text-white font-display font-black text-lg tracking-tight">Kentucky Fried Chicken</span>
</div>
{step !== "phone" && step !== "success" && (
<button onClick={() => { setStep("phone"); setOtp(["","","",""]); setError(""); }} className="text-white/70 hover:text-white transition">
<ArrowLeft size={20} />
</button>
)}
</div>
</div>


<div className="px-8 py-8">


{step === "phone" && (
<div className="anim-fadeup flex flex-col gap-5">
<div>
<h1 className="font-display font-black text-3xl text-gray-900 leading-none">TIZIMGA KIRISH</h1>
<p className="text-gray-500 text-sm mt-1 font-body">Telefon raqamingizni kiriting</p>
</div>


<div className="flex gap-2">
<select
value={countryCode}
onChange={e => setCountryCode(e.target.value)}
className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-3.5 text-sm font-medium outline-none focus:border-[#E4002B] transition cursor-pointer font-body"
>
{COUNTRY_CODES.map(c => (
<option key={c.code} value={c.code}>{c.flag} {c.code}</option>
))}
</select>
<input
type="tel"
placeholder="90 123 45 67"
value={phone}
onChange={e => { setPhone(e.target.value); setError(""); }}
onKeyDown={e => e.key === "Enter" && handleSendOtp()}
className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-[#E4002B] transition font-body"
/>
</div>

{error && <p className="text-[#E4002B] text-xs font-medium font-body">{error}</p>}

<button
onClick={handleSendOtp}
disabled={loading}
className="w-full flex items-center justify-center gap-2 bg-[#E4002B] text-white py-4 rounded-2xl font-display font-black text-lg hover:bg-red-700 transition disabled:opacity-50"
>
{loading ? (
<span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
) : (
<>Davom etish <ArrowRight size={18} /></>
)}
</button>

<div className="flex items-center gap-3">
<div className="flex-1 h-px bg-gray-200" />
<span className="text-gray-400 text-xs font-body">yoki</span>
<div className="flex-1 h-px bg-gray-200" />
</div>


<div className="flex flex-col gap-2">
<button onClick={() => alert("Google login")} className="flex items-center justify-center gap-3 border border-gray-200 rounded-2xl py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition font-body">
<svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
Google bilan kirish
</button>
<button onClick={() => alert("Email login")} className="flex items-center justify-center gap-3 border border-gray-200 rounded-2xl py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition font-body">
<svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
Email bilan kirish
</button>
</div>

</div>
)}


{step === "otp" && (
<div className="anim-fadeup flex flex-col gap-5">
<div>
<h1 className="font-display font-black text-3xl text-gray-900 leading-none">KODNI KIRITING</h1>
<p className="text-gray-500 text-sm mt-1 font-body">
<span className="text-gray-700 font-semibold">{fullPhone}</span> raqamiga yuborilgan 4 xonali kodni kiriting
</p>
</div>


<div className={`flex justify-center gap-3 ${error ? "anim-shake" : ""}`}>
{otp.map((val, i) => (
<input
key={i}
ref={otpRefs[i]}
type="text"
inputMode="numeric"
maxLength={1}
value={val}
onChange={e => handleOtpChange(e.target.value, i)}
onKeyDown={e => handleOtpKeyDown(e, i)}
className={`otp-input w-16 h-16 text-center text-2xl font-black rounded-2xl border-2 outline-none transition font-display ${val ? "border-[#E4002B] bg-red-50 text-[#E4002B]" : "border-gray-200 bg-gray-50 text-gray-900"}`}
/>
))}
</div>

{error && <p className="text-[#E4002B] text-xs font-medium text-center font-body">{error}</p>}

<div className="bg-yellow-50 border border-yellow-100 rounded-xl px-4 py-3 text-center">
<p className="text-yellow-700 text-xs font-body">Test uchun kod: <span className="font-black">1234</span></p>
</div>

<button
onClick={handleVerify}
disabled={loading || otp.some(d => !d)}
className="w-full flex items-center justify-center gap-2 bg-[#E4002B] text-white py-4 rounded-2xl font-display font-black text-lg hover:bg-red-700 transition disabled:opacity-40"
>
{loading ? (
<span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
) : (
<>Tasdiqlash <ArrowRight size={18} /></>
)}
</button>


<div className="text-center">
{resendTimer > 0 ? (
<p className="text-gray-400 text-sm font-body">
Qayta yuborish <span className="font-bold text-gray-600">00:{String(resendTimer).padStart(2,"0")}</span>
</p>
) : (
<button onClick={handleResend} className="flex items-center gap-1.5 text-[#E4002B] text-sm font-semibold mx-auto hover:underline font-body">
<RotateCcw size={14} /> Kodni qayta yuborish
</button>
)}
</div>

</div>
)}


{step === "success" && (
<div className="anim-fadeup flex flex-col items-center gap-5 py-4 text-center">
<div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
<CheckCircle size={40} className="text-green-500" />
</div>
<div>
<h1 className="font-display font-black text-3xl text-gray-900 leading-none">XUSH KELIBSIZ!</h1>
<p className="text-gray-500 text-sm mt-2 font-body">
<span className="font-semibold text-gray-700">{fullPhone}</span> raqami bilan muvaffaqiyatli kirdingiz.
</p>
</div>
<div className="bg-gray-50 rounded-2xl px-6 py-4 w-full">
<div className="flex items-center gap-3">
<div className="w-10 h-10 bg-[#E4002B] rounded-full flex items-center justify-center shrink-0">
<Phone size={16} className="text-white" />
</div>
<div className="text-left">
<p className="text-xs text-gray-400 font-body">Telefon raqam</p>
<p className="text-sm font-bold text-gray-900 font-body">{fullPhone}</p>
</div>
</div>
</div>
<button
onClick={() => router.push("/")}
className="w-full flex items-center justify-center gap-2 bg-[#E4002B] text-white py-4 rounded-2xl font-display font-black text-lg hover:bg-red-700 transition"
>
Bosh sahifaga <ArrowRight size={18} />
</button>
</div>
)}

</div>
</div>


<p className="text-center text-gray-400 text-xs mt-5 font-body">
Davom etish orqali siz <span className="underline cursor-pointer hover:text-gray-600">Foydalanish shartlari</span> va <span className="underline cursor-pointer hover:text-gray-600">Maxfiylik siyosati</span> ga rozilik bildirasiz.
</p>

</div>
</div>
);
}