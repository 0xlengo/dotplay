"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gradient-to-b from-[#E6007A] to-[#000000]">
      <div className="flex w-full max-w-4xl flex-1 flex-col items-center justify-center p-4">
        {/* Logo Polkadot */}
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Pokadot Ecosystem 
        </h1>

        {/* Video en loop */}
        <div className="relative w-full pb-[56.25%] rounded-3xl overflow-hidden mb-12">
          <video
            className="absolute inset-0 w-full h-full"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/video/Polkadot_Gaming.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Botones */}
        <div className="flex w-full flex-col gap-4">
          <button
            onClick={() => router.push('/play')}
            className="w-full rounded-3xl bg-white py-8 text-center text-3xl font-semibold text-[#E6007A] transition-all hover:bg-opacity-90 active:scale-95"
          >
            Play on Polkadot
          </button>
          
          <button
            onClick={() => router.push('/build')}
            className="w-full rounded-3xl border-4 border-white py-8 text-center text-3xl font-semibold text-white transition-all hover:bg-white/10 active:scale-95"
          >
            Build on Polkadot
          </button>
        </div>
      </div>
    </div>
  );
}
