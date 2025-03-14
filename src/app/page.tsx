"use client";

import { useState, useRef, useEffect } from "react";
import { useInactivityTimer } from "@/hooks/useInactivityTimer";
import Link from "next/link";

export default function HomePage() {
  const [isFullscreen, setIsFullscreen] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useInactivityTimer(setIsFullscreen);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      const forcePlay = async () => {
        try {
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

      const handleLoadedData = () => {
        setIsVideoReady(true);
        forcePlay();
      };

      const handleLoadedMetadata = () => {
        setIsVideoReady(true);
      };

      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('canplay', handleLoadedData);
      
      // Si el video ya está cargado cuando se monta el componente
      if (video.readyState >= 2) {
        setIsVideoReady(true);
        forcePlay();
      }

      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('canplay', handleLoadedData);
      };
    }
  }, []);

  const handleVideoClick = () => {
    if (videoRef.current?.muted) {
      videoRef.current.muted = false;
    }
    setIsFullscreen(false);
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
            />
            {!isVideoReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  <div className="text-white text-xl">Cargando video...</div>
                </div>
              </div>
            )}
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
