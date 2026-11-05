"use client";

import { APIProvider, Map } from "@vis.gl/react-google-maps";

function MapSection() {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
      <Map
        defaultCenter={{ lat: 20.5937, lng: 78.9629 }}
        defaultZoom={5}
        style={{ width: "100%", height: "500px" }}
      />
    </APIProvider>
  );
}

export default MapSection;