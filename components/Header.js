import React from 'react'
import Image from "next/image"
import { UserButton } from "@clerk/nextjs";
function Header() {
     const HeaderMenu = [
        {
        id: 1,
        name: "Ride",
        icon: '/taxi.jpg'
    },
     {
        id: 2,
        name: "Package",
        icon: '/box.jpg'
    }
]
    return (
  
   
        <div  className="flex justify-between items-center p-5 pb-3 pl-10 border-b-[4px] border-gray-200" >
            <div className='flex gap-24 items-center'>
            <img src ="/Uber logo.png"
            width={70}
            height={50}
            alt = 'logo'
            className = "object-fill"/>
            <div className='flex gap-6 items-center'>
                {HeaderMenu.map((item) => (
                    <div key = {item.id} className =' flex gap-2 items-center'>
                        <Image src={item.icon}
                        width={25}
                        height={25}
                        alt ={item.name}/>
                        <h2 className= 'text-[14px] font-medium '>{item.name}</h2>

                    </div>
                ))}
            </div>

            </div>
            <UserButton />
        </div>
     
  )
}

export default Header;