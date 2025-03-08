"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useInactivityTimer } from "@/hooks/useInactivityTimer";

export default function HomePage() {
  const router = useRouter();
  const [isFullscreen, setIsFullscreen] = useState(true);

  useInactivityTimer(setIsFullscreen);

  const handleVideoClick = () => {
    setIsFullscreen(false);
  };

  return (
    <div className={`flex min-h-screen w-full flex-col items-center bg-gradient-to-b from-[#E6007A] to-[#000000] ${isFullscreen ? 'relative' : ''}`}>
      {isFullscreen && (
        <div className="fixed inset-0 bg-gradient-to-b from-[#E6007A] to-[#000000] blur-lg" />
      )}
      <div className={`flex w-full flex-1 flex-col items-center justify-center p-4 transition-all duration-700 ease-in-out ${isFullscreen ? 'z-10' : ''}`}>
        <h1 className={`text-6xl font-bold text-white text-center mb-8 transition-opacity duration-700 ${isFullscreen ? 'opacity-0' : 'opacity-100'}`}>
          Gaming on Polkadot
        </h1>

        <div 
          className={`relative transition-all duration-700 ease-in-out ${
            isFullscreen 
              ? 'w-full max-w-5xl aspect-video' 
              : 'w-[85%] pb-[55%] mb-12'  
          }`}
          onClick={handleVideoClick}
        >
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              //muted 
              muted
              playsInline
            >
              <source src="/video/Polkadot_Gaming.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        <div className={`flex w-full max-w-4xl flex-col gap-4 transition-opacity duration-700 ${isFullscreen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
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
