"use client";
import { useEffect } from "react";
import {
  Map,
  useMap,
  useMapsLibrary,
  AdvancedMarker,
} from "@vis.gl/react-google-maps";

function Route({ origin, destination, onRouteInfo }) {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");

  useEffect(() => {
    if (!map || !routesLibrary || !origin || !destination) return;

    let lines = [];

    async function drawRoute() {
      try {
        const result = await routesLibrary.Route.computeRoutes({
          origin: origin,
          destination: destination,
          travelMode: "DRIVING",
          fields: ["path", "distanceMeters", "durationMillis"],
        });

        const route = result.routes[0];
        console.log("sending route info up");

        onRouteInfo?.({
          distanceKm: route.distanceMeters / 1000,
          durationMin: route.durationMillis / 60000,
        });

        lines = route.createPolylines();
        lines.forEach((line) => {
          line.setOptions({ strokeColor: "#2563eb", strokeOpacity: 1, strokeWeight: 5 });
          line.setMap(map);
        });
      } catch (err) {
        console.error("Route error:", err);
      }
    }

    drawRoute();

    return () => lines.forEach((line) => line.setMap(null));
  }, [map, routesLibrary, origin, destination]);

  return null;
}

function GoogleMapSection({ origin, destination, onRouteInfo }) {
  return (
    <Map
      mapId="AIzaSyBiIXRWZ877Ujy0Ny0Lb0Jj9K4Y1hEXWNQ"
      defaultCenter={{ lat: 18.5204, lng: 73.8567 }}
      defaultZoom={12}
      disableDefaultUI={true}
      style={{ width: "100%", height: "500px" }}
    >
      {origin && (
        <AdvancedMarker position={origin}>
          <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white"></div>
          </div>
        </AdvancedMarker>
      )}

      {destination && (
        <AdvancedMarker position={destination}>
          <div className="w-5 h-5 bg-black flex items-center justify-center">
            <div className="w-2 h-2 bg-white"></div>
          </div>
        </AdvancedMarker>
      )}

      <Route origin={origin} destination={destination} onRouteInfo={onRouteInfo} />
    </Map>
  );
}

export default GoogleMapSection;