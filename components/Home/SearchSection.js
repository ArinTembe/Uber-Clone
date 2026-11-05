"use client";
import React from 'react'
import Inputitems from './Inputitems'

function SearchSection({ onPickup, onDestination, onSearch }) {
  return (
    <div className= 'p-2 md:p-5 border-2 rounded-xl border-gray-200'>
      <p className= 'text-[20px] font-bold'>Get a ride</p>
      <Inputitems type="Pickup Location" onSelect={onPickup} />
      <Inputitems type="Where to?" onSelect={onDestination} />

      <button onClick={onSearch}
  className="p-3 bg-black w-full mt-5 text-white rounded-lg
             active:scale-95 transition duration-150">Search</button>
      
    </div>
    
  )
}

export default SearchSection