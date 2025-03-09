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
    <div className={`flex min-h-screen w-full flex-col items-center bg-gradient-to-b from-[#E6007A] to-[#000000] overflow-x-hidden ${isFullscreen ? 'relative' : ''}`}>
      {isFullscreen && (
        <div className="fixed inset-0 bg-gradient-to-b from-[#E6007A] to-[#000000] blur-lg" />
      )}
      <div className={`flex w-full flex-1 flex-col items-center justify-center p-4 transition-all duration-700 ease-in-out ${isFullscreen ? 'z-10' : ''}`}>
        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-6 transition-opacity duration-700 ${isFullscreen ? 'opacity-0' : 'opacity-100'}`}>
          Gaming on Polkadot
        </h1>

        <div 
          className={`relative transition-all duration-700 ease-in-out ${
            isFullscreen 
              ? 'w-[95vw] md:w-[90vw] lg:w-[85vw] max-w-[90vh] aspect-video' 
              : 'w-[90vw] md:w-[85vw] lg:w-[80vw] max-w-[80vh] aspect-video mb-8'  
          }`}
          onClick={handleVideoClick}
        >
          <div className="absolute inset-0 rounded-[min(4vw,2rem)] overflow-hidden">
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/video/Polkadot_Gaming.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        <div className={`flex w-full max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw] flex-col gap-4 transition-opacity duration-700 ${isFullscreen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <button
            onClick={() => router.push('/play')}
            className="w-full rounded-[min(4vw,2rem)] bg-white py-4 md:py-6 lg:py-8 text-center text-xl md:text-2xl lg:text-3xl font-semibold text-[#E6007A] transition-all hover:bg-opacity-90 active:scale-95"
          >
            Play on Polkadot
          </button>
          
          <button
            onClick={() => router.push('/build')}
            className="w-full rounded-[min(4vw,2rem)] border-4 border-white py-4 md:py-6 lg:py-8 text-center text-xl md:text-2xl lg:text-3xl font-semibold text-white transition-all hover:bg-white/10 active:scale-95"
          >
            Build on Polkadot
          </button>
        </div>
      </div>
    </div>
  );
}
