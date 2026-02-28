"use client";

import { useState } from "react";
import { MapPin, Phone } from "lucide-react";

interface Branch {
  id: number;
  name: string;
  address: string;
  phone: string;
  map: string;
  img: string;
  description: string;
}

const branches: Branch[] = [
  {
    id: 1,
    name: "KFC C1",
    address: "21 O'zbekiston Ovozi ko'chasi, Toshkent, Uzbekistan",
    phone: "+998 (78) 129-70-00",
    map: "https://www.google.com/maps?q=41.311081,69.240562&output=embed",
    img: "/kfc-c1.jpg",
    description: "Eng zamonaviy KFC filiali, qulay joylashuvi va keng menyu bilan.",
  },
  {
    id: 2,
    name: "KFC Chilonzor",
    address: "52 Bunyodkor shoh ko'chasi, Toshkent, Uzbekistan",
    phone: "+998 (78) 129-70-00",
    map: "https://www.google.com/maps?q=41.285680,69.203464&output=embed",
    img: "/kfc-chilonzor.jpg",
    description: "Chilonzor hududidagi eng mashhur restoran, tezkor xizmat va toza muhit.",
  },
  {
    id: 3,
    name: "KFC Chimgan",
    address: "3 Temur Malik ko'chasi, Toshkent, Uzbekistan",
    phone: "+998 (78) 129-70-00",
    map: "https://www.google.com/maps?q=41.338524,69.334681&output=embed",
    img: "/kfc-chimgan.jpg",
    description: "Tabiat qoynida joylashgan, dam olish va mazali taomlar uchun ideal filial.",
  },
];

export default function RestaurantsPage() {
  const [active, setActive] = useState(branches[0]);

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-center py-8">
        Restoranlar
      </h1>

      <div className="flex flex-col lg:flex-row gap-8 px-6 lg:px-10 pb-10">
        <div className="w-full lg:w-1/2 bg-white rounded-3xl shadow-xl overflow-y-auto max-h-[700px]">
          {branches.map((branch) => (
            <div
              key={branch.id}
              onClick={() => setActive(branch)}
              className={`p-6 lg:p-8 border-b cursor-pointer transition flex flex-col lg:flex-row gap-4 ${
                active.id === branch.id
                  ? "bg-gray-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex-shrink-0 w-full lg:w-48 h-32 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={branch.img}
                  alt={branch.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold">{branch.name}</h2>
                  <span className="bg-green-500 text-white px-4 py-1 rounded-xl font-semibold text-sm">
                    OCHIQ
                  </span>
                </div>

                <p className="mt-2 text-gray-600 text-sm lg:text-base">
                  {branch.description}
                </p>

                <div className="mt-4 space-y-2 text-gray-600">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-600 text-white p-2 rounded-full">
                      <MapPin size={16} />
                    </div>
                    <p className="text-sm lg:text-base">{branch.address}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-red-600 text-white p-2 rounded-full">
                      <Phone size={16} />
                    </div>
                    <p className="text-sm lg:text-base">{branch.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-1/2 rounded-3xl overflow-hidden shadow-xl">
          <iframe
            src={active.map}
            className="w-full h-[700px]"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}