
import { SignUp } from "@clerk/nextjs";
import { Suspense } from "react";
import Image from "next/image";

export default function Page() {
  return (
    <Suspense>
      <Image
        src="/Uber background 2.png"
        alt="Uber background"
        width={500}
        height={500}
        className="object-contain h-full w-full"/>
        <div className="absolute top-20 right-5">
      <SignUp />
      </div>
    </Suspense>
  );
}
