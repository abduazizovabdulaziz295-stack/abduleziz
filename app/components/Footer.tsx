import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-20 border-t">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 text-sm text-gray-700">
        <div className="space-y-4">
          <Image src="/kfc logo.svg" alt="KFC" width={80} height={80} />
          <p className="font-semibold">+998 (78) 129 70 00</p>
          <div className="flex gap-4">
            <span>Facebook</span>
            <span>Instagram</span>
            <span>Telegram</span>
          </div>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-black">Maʼlumot</p>
          <p>Tarix</p>
          <p>11 tarkibiy mahsulotlar!</p>
          <p>Allergenlar & To'yimli</p>
          <p>Doʻkonlar</p>
          <p>HALAL</p>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-black">Yordam kerakmi?</p>
          <p>Biz bilan boglanish</p>
          <p>KFCga ishga qabul qilish</p>
          <p>Shartlar va shartlar</p>
          <p> UZ</p>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-black">Hisob</p>
          <p>Tizimga kirish</p>
          <p>Ro‘yhatdan o‘tish</p>
          <p>Parolimni unutdim</p>
          <p>maxfiylikni mustahkamlash </p>
        </div>
      </div>

      <div className="border-t py-6  text-center text-xs text-gray-500">
        © KFC UZ 2026
      </div>
    </footer>
  );
}
