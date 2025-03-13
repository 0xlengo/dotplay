"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useInactivityTimer } from "@/hooks/useInactivityTimer";
import { Suspense } from "react";

interface Game {
  name: string;
  desc: string;
  longDesc: string;
  video?: string;
  descImage?: string;
}

// Esta función se ejecutará en el servidor para obtener los datos del juego
// En un caso real, aquí consultarías una API o base de datos
function getGameData(id: string): Game | null {
  const games: Record<string, Game> = {
    "1": {
      name: "Nitro Nation",
      desc: "",
      longDesc: "Taking car culture to the next level! Drag racing is just the start in this series centered around a moving festival where you live out your dream lifestyle with a community of passionate car enthusiast.",
      video: "/video/Nitro_Nation.mp4"
    },
    "2": {
      name: "NFL Rivals",
      desc: "",
      longDesc: "Own your dream team and guide your superstars to the end zone as you make history as the greatest NFL GM of all time.Become a GM and take your gameplay to the next level. With limited collections, exclusive designs and superior stats, these cards will give you the edge you need to dominate the competition",
      video: "/video/NFL_Rivals.mp4"
    },
    "3": {
      name: "FIFA Rivals",
      desc: "Cuida y entrena mascotas digitales únicas",
      longDesc: "In partnership with FIFA, the mobile version of the game set to revolutionize the 2026 Football World Cup in Canada, Mexico, and the United States is arriving this summer. Download FIFA Rivals for free and experience the excitement of global football like never before.",
      video: "/video/FIFA_Rivals.mp4"
    },
    "4": {
      name: "Pudgy Party",
      desc: "",
      longDesc: "Get ready for an exciting adventure with Pudgy Party, the new AAA mobile game from Pudgy Penguins and Mythical Games! Launching on iOS and Android in 2025, this game promises a universe of fun and connection. Accessible for both new and seasoned gamers, Pudgy Party offers engaging gameplay that will keep you entertained for hours.",
      video: "/video/Pudgy_Party.mp4"
    },
    "5": {
      name: "Blankos",
      desc: "",
      longDesc: "Blankos, a popular game with a thriving community, has migrated from Ethereum to Polkadot to achieve greater scalability, smoother operation, and lower fees for its users. The game is currently developing its mobile version, which is set for an imminent release. Additionally, Blankos already offers a variety of products and experiences for its followers. They have also introduced a Loyalty Program to reward and recognize their dedicated community!",
      video: "/video/Blankos.mp4"
    },
    "6": {
      name: "Pinkness Overdrive",
      desc: "Race through snowy mountains with a touch of pinkness",
      longDesc: "Experience the neon-soaked thrill of PINKness Overdrive, a high-octane racing game that plunges you into stunning, dynamic environments. Customize your ride with an array of performance upgrades and visual enhancements, then dive into a variety of game modes, from intense solo challenges to competitive multiplayer races.",
      video: "/video/Pinkness_Overdrive.mp4"
    },
    "7": {
      name: "Pink Drop",
      desc: "",
      longDesc: "What started as a way to try and bring some $PINKness back to Polkadot has fast become a thriving community full of enthusiasts, dreamers, and builders.",
      video: "/video/Pink_Drop.mp4"
    },
    "8": {
      name: "Pink a Mole",
      desc: "",
      longDesc: "Step into the vibrant world of PINK-A-MOLE, a delightful twist on the classic whack-a-mole game. With charming visuals and exciting gameplay, test your reflexes as you whack moles popping up from their holes.",
      descImage: "/pink_mole_desc.jpg"
    },
    "9": {
      name: "Pink Bullet",
      desc: "",
      longDesc: "Step into the action-packed world of PINK Bullet, a thrilling shooter game that tests your precision and reflexes. Navigate through dynamic environments, customize your weapons, and engage in various game modes, from solo missions to competitive multiplayer. Collect power-ups, follow an engaging storyline, and enjoy stunning graphics and an electrifying soundtrack. PINK Bullet promises an adrenaline-fueled adventure for all shooter enthusiasts.",
      descImage: "/pink_bullet_desc.jpg"
    },
    "10": {
      name: "Exiled Racers",
      desc: "",
      longDesc: "Compete in weekly Ghost Riders leagues, customize your Racecrafts and Pilots, and earn real rewards. Dive into a world of unique factions, evolving track challenges, and thrilling races!",
      video: "/video/Exiled_Racers.mp4"
    },
    "11": {
      name: "Evrloot",
      desc: "Batallas estratégicas en tiempo real",
      longDesc: "Step into the expansive universe of EVRLOOT, a cutting-edge play-to-earn game that seamlessly blends strategic gameplay with blockchain technology. This game offers an unparalleled experience for players seeking adventure, customization, and real rewards.",
      video: "/video/Evrloot.mp4"
    },
    "12": {
      name: "Big Ballz of Bayuns",
      desc: "Batallas estratégicas en tiempo real",
      longDesc: "Welcome to Ajuna Network, a decentralized gaming platform that delivers real value to gamers without compromising on gameplay. Ajuna Network empowers you to truly own your in-game assets, protect and control their functionality, and have a voice in the future of the games you love.",
      video: "/video/Big_Ballz_of_Bayuns.mp4"
    }
  };
  
  return games[id as keyof typeof games] || null;
}

function GamePageContent({ id }: { id: string }) {
  const router = useRouter();
  const gameData = getGameData(id);
  const [showQR, setShowQR] = useState<'download' | 'info' | null>(null);
  const [platform, setPlatform] = useState<'ios' | 'android' | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isVideoError, setIsVideoError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useInactivityTimer();

  useEffect(() => {
    if (videoRef.current && gameData?.video) {
      const video = videoRef.current;
      
      const handleLoadedData = () => {
        setIsVideoReady(true);
        video.play().catch(() => {
          // Si falla el autoplay, simplemente continuamos mostrando el video
          setIsVideoReady(true);
        });
      };

      video.addEventListener('loadeddata', handleLoadedData);
      
      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
        video.pause();
      };
    }
  }, [gameData?.video]);

  const handleVideoError = () => {
    setIsVideoError(true);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  // Función para obtener la ruta del QR según el ID y tipo
  const getQRPath = (id: string, type: 'download' | 'info') => {
    const qrMappings: Record<string, { download: string | string[], info: string }> = {
      "1": { // Nitro Nation
        download: ["and_nitronation.png", "ios_nitronation.png"],
        info: "info_nitronation.png"
      },
      "2": { // NFL Rivals
        download: ["and_NFL.png", "ios_NFL.png"],
        info: "info_NFL.png"
      },
      "3": { // FIFA Rivals
        download: "d_FIFA.png",
        info: "info_FIFA.png"
      },
      "4": { // Pudgy Party
        download: "d_pudgy.png",
        info: "info_pudgy.png"
      },
      "5": { // Blankos
        download: "d_blankos.png",
        info: "info_blankos.png"
      },
      "6": { // Pinkness Overdrive
        download: "d_pinkoverdrive.png",
        info: "info_pinkoverdrive.png"
      },
      "7": { // Pink Drop
        download: "d_pinkdrop.png",
        info: "info_pinkdrop.png"
      },
      "8": { // Pink Mole
        download: "d_pinkmole.png",
        info: "info_pinkmole.png"
      },
      "9": { // Pink Bullet
        download: "d_pinkbullet.png",
        info: "info_pinkbullet.png"
      },
      "10": { // Exiled Racers
        download: "d_exiled.png",
        info: "info_exiled.png"
      },
      "11": { // Evrloot
        download: "d_EVrloot.png",
        info: "info_Evrloot.png"
      },
      "12": { // Big Ballz of Bayuns
        download: "d_Big_Ballz_of_Bayuns.png",
        info: "info_Big_Ballz_of_Bayuns.png"
      }
    };

    const mapping = qrMappings[id];
    if (!mapping) return null;

    if (type === 'download') {
      if (Array.isArray(mapping.download)) {
        return platform === 'ios' ? `/QR/${mapping.download[1]}` : `/QR/${mapping.download[0]}`;
      }
      return `/QR/${mapping.download}`;
    }
    return `/QR/${mapping.info}`;
  };

  const handleQRClick = (type: 'download' | 'info') => {
    if (type === 'download' && (id === "1" || id === "2")) {
      setPlatform('android');
    }
    setShowQR(type);
  };

  if (!gameData) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-[#E6007A] to-[#000000]">
        <div className="w-full max-w-5xl p-4">
          <p className="text-3xl text-white text-center mb-8">Game not found</p>
          <button
            onClick={() => router.push('/play')}
            className="w-full rounded-3xl bg-white py-8 text-center text-3xl font-semibold text-[#E6007A] transition-all hover:bg-opacity-90 active:scale-95"
          >
            Back to Games
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gradient-to-b from-[#E6007A] to-[#000000] py-4">
      <div className="w-full max-w-4xl px-1 flex flex-col gap-2">
        <div className="text-center pt-4 pb-2">
          <h1 className="text-5xl font-bold text-white ">{gameData.name}</h1>
          {/* <p className="text-2xl text-white/80">{gameData.desc}</p> */}
        </div>
        
        {/* Reproductor de video o imagen */}
        <div className="w-full aspect-video rounded-3xl overflow-hidden relative">
          {gameData.descImage ? (
            <div className="relative w-full h-full">
              <Image
                src={gameData.descImage}
                alt={`${gameData.name} descripción`}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-contain"
                priority
              />
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                className={`w-full h-full object-cover ${isVideoReady ? 'opacity-100' : 'opacity-0'}`}
                autoPlay
                loop
                playsInline
                muted
                preload="auto"
                src={gameData.video || ''}
                onError={handleVideoError}
              />
              {!isVideoReady && !isVideoError && (
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    <div className="text-white text-xl">Loading video...</div>
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
              
              {/* Botón de sonido */}
              {isVideoReady && !isVideoError && (
                <button
                  onClick={toggleMute}
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
              )}
            </>
          )}
        </div>

        {/* Descripción del juego */}
        <div className="w-full rounded-3xl bg-white/10 p-6">
          <p className="text-xl text-white leading-relaxed">
            {gameData.longDesc}
          </p>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col gap-4 mt-2">
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleQRClick('download')}
              className="w-full rounded-3xl bg-white py-8 text-center text-2xl font-semibold text-[#E6007A] transition-all hover:bg-opacity-90 active:scale-95"
            >
              Download Game
            </button>
            
            <button
              onClick={() => handleQRClick('info')}
              className="w-full rounded-3xl bg-white py-8 text-center text-2xl font-semibold text-[#E6007A] transition-all hover:bg-opacity-90 active:scale-95"
            >
              More Information
            </button>
          </div>
          
          <button
            onClick={() => router.push('/play')}
            className="w-full rounded-3xl border-4 border-white py-8 text-center text-2xl font-semibold text-white transition-all hover:bg-white/10 active:scale-95"
          >
            Back to Games
          </button>
        </div>
      </div>

      {/* Modal QR */}
      {showQR && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          onClick={() => {
            setShowQR(null);
            setPlatform(null);
          }}
        >
          <div 
            className="bg-white rounded-3xl p-6 w-full max-w-xs"
            onClick={e => e.stopPropagation()}
          >
            {(id === "1" || id === "2") && showQR === 'download' ? (
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={() => setPlatform('android')}
                  className={`w-full py-3 rounded-xl transition-all ${
                    platform === 'android' ? 'bg-[#E6007A] text-white' : 'bg-gray-100 text-[#E6007A]'
                  }`}
                >
                  Android
                </button>
                <button
                  onClick={() => setPlatform('ios')}
                  className={`w-full py-3 rounded-xl transition-all ${
                    platform === 'ios' ? 'bg-[#E6007A] text-white' : 'bg-gray-100 text-[#E6007A]'
                  }`}
                >
                  iOS
                </button>
                {platform && (
                  <div className="aspect-square w-full relative mt-2 rounded-2xl overflow-hidden">
                    <Image
                      src={getQRPath(id, showQR) || ''}
                      alt="QR Code"
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
            ) : (
              <>
                {getQRPath(id, showQR) ? (
                  <div className="aspect-square w-full relative mb-4 rounded-2xl overflow-hidden">
                    <Image
                      src={getQRPath(id, showQR) || ''}
                      alt="QR Code"
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="aspect-square w-full bg-black/10 mb-4 rounded-2xl flex items-center justify-center text-2xl">
                    QR
                  </div>
                )}
              </>
            )}
            <p className="text-[#E6007A] text-center text-xl font-semibold">
              {showQR === 'download' ? 'Scan to download' : 'Scan for more information'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function GamePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  
  return (
    <Suspense fallback={
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-[#E6007A] to-[#000000]">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    }>
      <GamePageContent id={resolvedParams.id} />
    </Suspense>
  );
} 