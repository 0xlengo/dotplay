"use client";

import { useState, useRef, useEffect } from "react";
import { useInactivityTimer } from "@/hooks/useInactivityTimer";
import Link from "next/link";

export default function HomePage() {
  const [isFullscreen, setIsFullscreen] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useInactivityTimer(setIsFullscreen);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      const forcePlay = async () => {
        try {
          setIsVideoReady(true);
          await video.play();
        } catch (error) {
          console.error("Error al reproducir:", error);
          // Intentar reproducir nuevamente después de un breve retraso
          setTimeout(async () => {
            try {
              await video.play();
            } catch (e) {
              console.error("Segundo intento fallido:", e);
            }
          }, 1000);
        }
      };

      const handleCanPlay = () => {
        forcePlay();
      };

      video.addEventListener('canplay', handleCanPlay);
      
      if (video.readyState >= 3) {
        forcePlay();
      }

      return () => {
        video.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, []);

  const handleVideoClick = () => {
    setIsFullscreen(false);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gradient-to-b from-[#E6007A] to-[#000000] overflow-x-hidden">
      {isFullscreen && (
        <div className="fixed inset-0 bg-gradient-to-b from-[#E6007A] to-[#000000] blur-lg pointer-events-none" />
      )}
      <div className="flex w-full flex-1 flex-col items-center justify-center p-4 transition-all duration-700 ease-in-out z-10">
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
              ref={videoRef}
              className={`w-full h-full object-cover ${isVideoReady ? 'opacity-100' : 'opacity-0'}`}
              autoPlay
              loop
              playsInline
              muted
              preload="auto"
              src="/video/Polkadot_Gaming.webm"
              onClick={handleVideoClick}
            />
            {!isVideoReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <div className="text-white text-xl">Cargando video...</div>
              </div>
            )}
            
            {/* Botón de sonido */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMute();
              }}
              className="absolute top-4 right-4 p-4 rounded-full bg-black/50 hover:bg-black/70 transition-all z-20"
            >
              {isMuted ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                  <line x1="23" y1="9" x2="17" y2="15"/>
                  <line x1="17" y1="9" x2="23" y2="15"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className={`flex w-full max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw] flex-col gap-4 transition-opacity duration-700 ${isFullscreen ? 'opacity-0' : 'opacity-100'}`}>
          <Link
            href="/play"
            className="w-full rounded-[min(4vw,2rem)] bg-white py-4 md:py-6 lg:py-8 text-center text-xl md:text-2xl lg:text-3xl font-semibold text-[#E6007A] transition-all hover:bg-opacity-90 active:scale-95"
          >
            Play on Polkadot
          </Link>
          
          <Link
            href="/build"
            className="w-full rounded-[min(4vw,2rem)] border-4 border-white py-4 md:py-6 lg:py-8 text-center text-xl md:text-2xl lg:text-3xl font-semibold text-white transition-all hover:bg-white/10 active:scale-95"
          >
            Build on Polkadot
          </Link>
        </div>
      </div>
    </div>
  );
}
