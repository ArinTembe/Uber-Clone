"use client";
import { useState, useEffect } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import Image from "next/image";

function Inputitems({ type, onSelect }) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const places = useMapsLibrary("places");

  // Runs every time the user types
  useEffect(() => {
    
    if (!places || inputValue.length < 2) {
      setSuggestions([]);
      return;
    }

    async function getSuggestions() {
      const result =
        await places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input: inputValue,
          includedRegionCodes: ["in"], 
        });
      setSuggestions(result.suggestions);
    }

    getSuggestions();
  }, [inputValue, places]);

  async function handleSelect(suggestion) {
  setInputValue(suggestion.placePrediction.text.text);
  setShowSuggestions(false);
  setSuggestions([]);

  const place = suggestion.placePrediction.toPlace();
  await place.fetchFields({ fields: ["location"] });

  onSelect({ lat: place.location.lat(), lng: place.location.lng() });
}

  return (
    <div className="relative">
      <div className="bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4">
        <Image
          src={type == "Pickup Location" ? "/pickup-dot.png" : "/destination-square.png"}
          alt={type}
          width={15}
          height={15}
        />
        <input
          type="text"
          placeholder={type == "Pickup Location" ? "Pickup Location" : "Where to?"}
          className="outline-none bg-transparent w-full"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowSuggestions(true);
          }}
        />
      </div>

      {/* Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full bg-white shadow-lg rounded-lg mt-1">
          {suggestions.map((item) => (
            <div
              key={item.placePrediction.placeId}
              onClick={() => handleSelect(item)}
              className="flex items-center gap-3 p-3 cursor-pointer hover:bg-slate-100"
            >
              <Image src="/location-pin.png" alt="pin" width={20} height={20} />
              <p className="text-sm">{item.placePrediction.text.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Inputitems;