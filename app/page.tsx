"use client";
import { useState } from "react";
import SearchSection from "@/components/Home/SearchSection";
import GoogleMapSection from "@/components/Home/GoogleMapSection";
import CarList from "@/utils/CarListData";
import { APIProvider } from "@vis.gl/react-google-maps";
import ChatBot from "@/app/api/chat/chat";

type Location = { lat: number; lng: number };
type RouteInfo = { distanceKm: number; durationMin: number };

export default function Home() {
  const [pickup, setPickup] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);
  const [showCars, setShowCars] = useState(false);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ""}>
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <SearchSection
            onPickup={(loc: Location) => {
              setPickup(loc);
              setShowCars(false);
            }}
            onDestination={(loc: Location) => {
              setDestination(loc);
              setShowCars(false);
            }}
            onSearch={() => setShowCars(true)}
          />

          {showCars && routeInfo && (
            <CarList
              distanceKm={routeInfo.distanceKm}
              durationMin={routeInfo.durationMin}
            />
          )}
        </div>

        <div className="col-span-2">
          <GoogleMapSection
            origin={pickup}
            destination={destination}
            onRouteInfo={setRouteInfo}
          />
        </div>
      </div>
        
      <ChatBot />
    
    </APIProvider>
  );
}