"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useInactivityTimer } from "@/hooks/useInactivityTimer";
import Image from "next/image";

export default function BuildPage() {
  const router = useRouter();
  const [showQR, setShowQR] = useState<'apply' | 'info' | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isVideoError, setIsVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useInactivityTimer();

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      const forcePlay = async () => {
        try {
          await video.play();
        } catch (error) {
          console.error("Error al reproducir:", error);
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
        video.pause();
      };
    }
  }, []);

  const handleVideoError = () => {
    setIsVideoError(true);
  };

  const handleVideoClick = () => {
    if (videoRef.current?.muted) {
      videoRef.current.muted = false;
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gradient-to-b from-[#E6007A] to-[#000000] overflow-x-hidden">
      {/* Contenido principal con scroll */}
      <div className="flex w-full max-w-[1000px] h-[1000px] overflow-y-auto flex-1 flex-col p-4 pt-8">
        <div className="flex flex-col items-center max-w-4xl mx-auto w-full px-1">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-6">Build on Polkadot</h1>
          
          {/* Video */}
          <div className="w-full aspect-video rounded-[min(3vw,1.5rem)] overflow-hidden relative mb-4">
            <video
              ref={videoRef}
              className={`w-full h-full object-cover ${isVideoReady ? 'opacity-100' : 'opacity-0'}`}
              autoPlay
              loop
              playsInline
              muted
              preload="auto"
              src="/video/dotplay.webm"
              onError={handleVideoError}
              onClick={handleVideoClick}
            />
            {!isVideoReady && !isVideoError && (
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  <div className="text-white text-xl">Cargando video...</div>
                </div>
              </div>
            )}
            {isVideoError && (
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <div className="flex flex-col items-center gap-4">
                  <div className="text-white text-xl">Error loading video</div>
                  <button
                    onClick={() => {
                      if (videoRef.current) {
                        setIsVideoError(false);
                        videoRef.current.load();
                      }
                    }}
                    className="px-4 py-2 bg-white/20 rounded-lg text-white hover:bg-white/30 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Contenido principal */}
          <div className="w-full rounded-[min(3vw,1.5rem)] bg-white/10 p-4 md:p-6 mb-4">
            <p className="text-lg md:text-xl text-white leading-relaxed mb-6 md:mb-8">
              Pivotal hub for Polkadot, focused on mass market, creator centric genres within gaming. A New Superstars community!
            </p>
            
            <div className="space-y-4 text-white">
              Dot Play is led by industry veterans with over 20 years of experience in traditional finance, investing, and gaming. Our team combines deep expertise in Web3 and digital entertainment to drive innovation across platforms, empower creators, and bridges the gap between gaming and emerging technologies in an ever evolving digital landscape.
            </div>
          </div>

          {/* Botones de acción */}
          <div className="grid grid-cols-2 gap-4 mt-4 w-full">
            <button
              onClick={() => setShowQR('info')}
              className="w-full rounded-[min(3vw,1.5rem)] bg-white py-4 md:py-6 lg:py-8 text-center text-lg md:text-xl lg:text-2xl font-semibold text-[#E6007A] transition-all hover:bg-opacity-90 active:scale-95"
            >
              More Information
            </button>
            
            <button
              onClick={() => router.push('/')}
              className="w-full rounded-[min(3vw,1.5rem)] border-[0.3vh] border-white py-4 md:py-6 lg:py-8 text-center text-lg md:text-xl lg:text-2xl font-semibold text-white transition-all hover:bg-white/10 active:scale-95"
            >
              Back to Menu
            </button>
          </div>
        </div>
      </div>

      {/* Modal QR */}
      {showQR && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          onClick={() => setShowQR(null)}
        >
          <div 
            className="bg-white rounded-[min(3vw,1.5rem)] p-4 md:p-6 w-full max-w-xs"
            onClick={e => e.stopPropagation()}
          >
            <div className="aspect-square w-full relative mb-4 rounded-[min(2vw,1rem)] overflow-hidden">
              <Image
                src="/QR/info_dotplay.png"
                alt="QR Code"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-[#E6007A] text-center text-lg md:text-xl font-semibold">
              Scan for more information
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 