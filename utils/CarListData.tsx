"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  distanceKm: number;
  durationMin: number;
  onSelect?: (car: { name: string; fare: number }) => void;
};

const cars = [
  { name: "Bike", image: "/bike.png", description: "Quick rides for one, beat the traffic", seats: 1, base: 20, perKm: 6, maxKm: 40 },
  { name: "Auto", image: "/uber auto.png", description: "Affordable auto rickshaw rides", seats: 3, base: 30, perKm: 10, maxKm: 50 },
  { name: "Mini", image: "/mini.png", description: "Comfy hatchbacks at everyday prices",seats: 4, base: 50, perKm: 13, maxKm: 300 },
  { name: "Sedan", image: "/sedan.png",description: "Spacious sedans with extra comfort", seats: 4, base: 70, perKm: 16, maxKm: 500 },
  { name: "XL", image: "/uber xl.png",description: "Extra space for groups and luggage" ,seats: 6, base: 100, perKm: 20, maxKm: 1000 },
];

function getRecommended(km: number) {
  if (km <= 3) return "Bike";
  if (km <= 8) return "Auto";
  if (km <= 20) return "Mini";
  return "Sedan";
}

export default function CarList({ distanceKm, durationMin, onSelect }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const recommended = getRecommended(distanceKm);
  const router = useRouter();
const selectedCar = cars.find((c) => c.name === selected);
const selectedFare = selectedCar
  ? Math.round(selectedCar.base + selectedCar.perKm * distanceKm)
  : 0;

function handleRequest() {
  if (!selectedCar) return;
  router.push(`/payment?amount=${selectedFare}&car=${selectedCar.name}`);
}

  return (
    <div className="mt-5 p-3 border-2 rounded-xl border-gray-200">
      <p className="font-bold text-lg">Choose a ride</p>
      <p className="text-sm text-gray-500 mb-3">
        {distanceKm.toFixed(1)} km · {Math.round(durationMin)} min
      </p>

      {cars
        .filter((car) => distanceKm <= car.maxKm)
        .map((car) => {
          const fare = Math.round(car.base + car.perKm * distanceKm);
          return (
            <div
              key={car.name}
              onClick={() => {
                setSelected(car.name);
                onSelect?.({ name: car.name, fare });
              }}
              className={`flex justify-between items-center p-3 rounded-lg cursor-pointer mb-2 border-2 ${
                selected === car.name ? "border-black" : "border-transparent bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <Image src={car.image} alt={car.name} width={70} height={45} />
                <div>
                  <p className="font-semibold">
                    {car.name}{" "}
                    {car.name === recommended && (
                      <span className="text-xs bg-black text-white px-2 py-0.5 rounded-full ml-1">
                        Recommended
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-black">
                  {car.seats} seats · {car.description}
                  </p>
                  
                </div>
              </div>

              <p className="font-bold">₹{fare}</p>
            </div>
          );
        })}
        <div className= "flex justify-between fixed bottom-5 bg-white p-3 shadow-xl w-full md:w-[30%] border-[1px] items-center rounded-lg">
          <h2>Make Payment</h2>
          <button   onClick={handleRequest}
          disabled={!selected}
           className={`p-3 text-white rounded-lg text-center active:scale-95 transition duration-150 ${
            selected ? "bg-black" : "bg-gray-400 cursor-not-allowed"
            }`}> {selected ? `Request ${selected}` : "Request Ride"}</button>
        </div>
    </div>
  );
}