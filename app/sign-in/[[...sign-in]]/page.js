
import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";
import Image from "next/image";
import CarList from "@/components/Home/CarList";


export default function Page() {
  return (
    <Suspense>
      <Image
              src="/Uber background 2.png"
              alt="Uber background"
              width={900}
              height={800}
              className="object-contain h-full w-full"/>
               <div className="absolute top-20 right-5">
      <SignIn />
      </div>
    </Suspense>
  );
}
