"use client";

import Image from "next/image";

export default function HalalPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">
          HALOL SERTIFIKATLARI KFC UZBEKISTON RESTORANLARIDA
        </h1>

        <div className="bg-green-700 rounded-3xl p-10 flex items-center justify-center mb-10">
          <div className="relative w-full h-64">
            <Image
              src="/4310.png"
              alt="Halal Certificate"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="text-lg text-gray-700 leading-8 space-y-6">
          <p>
            KFC brendining O‘zbekiston Respublikasida franchayzing kompaniyasi
            bo‘lgan «International FoodChain» MCHJ nomidan to‘liq mas’uliyatni
            bo‘ynimizga olgan holda shuni ma’lum qilamizki, restoranlarimizda
            tayyorlangan barcha taomlar xalqaro «Halol» standartlariga to‘liq
            muvofiq va barcha standartlarga amal qilinayotgani qat’iy
            tekshiruvlardan o‘tkazilgandan keyin «Halol» Xalqaro
            Standartlashtirish va Sertifikatlashtirish Markazi tomonidan
            berilgan sertifikatlar ham buning tasdig‘idir.
          </p>

          <p>
            Markaz haqida batafsil ma’lumot havola orqali:{" "}
            <a
              href="https://halalcenter.ru/"
              target="_blank"
              className="text-red-600 underline"
            >
              https://halalcenter.ru/
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}