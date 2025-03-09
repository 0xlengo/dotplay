"use client";

import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useInactivityTimer } from "@/hooks/useInactivityTimer";

export default function PlayPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  
  useInactivityTimer();

  // Simulación de juegos - esto vendría de una API o base de datos
  const games = [
    { id: 1, name: "Nitro Nation", desc: "Race across the globe in Nitro Nation World Tour! Collect and drive some of the fastest cars in the world in this free to play drag racing mobile game.", logo: "/nitro_nation.webp", descImage: "/nitro_nation_desc.avif"},
    { id: 2, name: "NFL Rivals", desc: "Corre y esquiva obstáculos en la blockchain", logo: "/nfl_rivals.svg", descImage: "/nfl_rivals_desc.avif" },
    { id: 3, name: "FIFA Rivals", desc: "Corre y esquiva obstáculos en la blockchain", logo: "/fifa_rivals.svg", descImage: "/fifa_rivals_desc.webp" },
    { id: 4, name: "Pudgy Party", desc: "Cuida y entrena mascotas digitales únicas", logo: "/pudgy_party.svg", descImage: "/pudgy_party_desc.avif" },
    { id: 5, name: "Blankos", desc: "Batallas estratégicas en tiempo real", logo: "/blankos.svg", descImage: "/blankos_desc.avif" },
    { id: 6, name: "Pinkness Overdrive", desc: "Race through snowy mountains with a touch of pinkness.  Desktop browsers only", logo: "/pinkness_overdrive.webp", descImage: "/pinkness_overdrive_desc.jpg" },
    { id: 7, name: "Pink Drop", desc: "Batalla épica de NFTs en la blockchain", logo: "/pink_drop.webp", descImage: "/pink_drop_desc.jpg" },
    { id: 8, name: "Pink Mole", desc: "Colecciona y batalla con monstruos digitales", logo: "/pink_mole.webp", descImage: "/pink_mole_desc.jpg" },
    { id: 9, name: "Pink Bullet", desc: "Defiende tu nodo en este juego de estrategia", logo: "/pink_bullet.webp", descImage: "/pink_bullet_desc.jpg" },
    { id: 10, name: "Exiled Racers", desc: "Batallas estratégicas en tiempo real", logo: "/exiled_racers.png", descImage: "/exiled_racers_desc.jpg"  },
    { id: 11, name: "Evrloot", desc: "Batallas estratégicas en tiempo real", logo: "/evrloot.svg", descImage: "/evrloot_desc.jpg"  },
    { id: 12, name: "Big Ballz of Bayun", desc: "Batallas estratégicas en tiempo real", logo: "/big_ballz_of_bayuns.webp", descImage: "/big_ballz_of_bayuns_desc.avif" }
  ];

  // Obtener juegos para la página actual
  const gamesPerPage = 4;
  const startIndex = (currentPage - 1) * gamesPerPage;
  const currentGames = games.slice(startIndex, startIndex + gamesPerPage);
  const hasMoreGames = startIndex + gamesPerPage < games.length;
  const hasPreviousGames = currentPage > 1;

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gradient-to-b from-[#E6007A] to-[#000000] overflow-x-hidden">
      {/* Contenido principal con scroll */}
      <div className="flex w-full max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw] flex-1 flex-col p-4 pt-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-6">
          Gaming en Polkadot 
        </h1>
        
        {/* Sección de juegos */}
        <div className="grid flex-1 grid-rows-4 gap-3 mb-4">
          {currentGames.map((game) => (
            <Link
              key={game.id}
              href={`/play/${game.id}`}
              className="flex w-full rounded-[min(3vw,1.5rem)] bg-black/20 overflow-hidden transition-transform active:scale-95 hover:bg-black/30"
            >
              {/* Lado izquierdo - Círculo o Imagen */}
              <div className="flex aspect-square items-center justify-center bg-white/5 relative min-w-[15vh] max-w-[20vh]">
                {game.descImage ? (
                  <Image
                    src={game.descImage}
                    alt={`${game.name} preview`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 15vh, 20vh"
                  />
                ) : (
                  <div className="h-[min(15vh,4rem)] w-[min(15vh,4rem)] rounded-full bg-white/10"></div>
                )}
              </div>
              
              {/* Lado derecho - Logo o Título y Descripción */}
              <div className="flex flex-1 flex-col justify-center p-3 md:p-4">
                {game.logo ? (
                  <div className="h-[min(8vh,2.5rem)] w-[min(40vh,15rem)] relative mb-2">
                    <Image
                      src={game.logo}
                      alt={game.name}
                      fill
                      className="object-contain object-left"
                      sizes="(max-width: 768px) 40vh, 60vh"
                    />
                  </div>
                ) : (
                  <h3 className="mb-1 text-lg md:text-xl lg:text-2xl font-bold text-white">{game.name}</h3>
                )}
                <p className="text-base md:text-lg text-white/80 line-clamp-2">
                  {game.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Botones de navegación */}
      <div className="w-full border-t border-white/10">
        <div className="mx-auto w-full max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw] p-4">
          <div className="flex gap-3">
            <button
              onClick={() => router.push('/')}
              className="flex-1 rounded-[min(3vw,1.5rem)] border-[0.3vh] border-white py-3 md:py-4 lg:py-6 text-center text-lg md:text-xl lg:text-2xl font-semibold text-white transition-all hover:bg-white/10 active:scale-95"
            >
              Inicio
            </button>
            
            {hasPreviousGames ? (
              <button
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="flex-1 rounded-[min(3vw,1.5rem)] border-[0.3vh] border-white py-3 md:py-4 lg:py-6 text-center text-lg md:text-xl lg:text-2xl font-semibold text-white transition-all hover:bg-white/10 active:scale-95"
              >
                Volver
              </button>
            ) : hasMoreGames && (
              <button
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="flex-1 rounded-[min(3vw,1.5rem)] bg-white py-3 md:py-4 lg:py-6 text-center text-lg md:text-xl lg:text-2xl font-semibold text-[#E6007A] transition-all hover:bg-opacity-90 active:scale-95"
              >
                Siguientes
              </button>
            )}
            
            {hasPreviousGames && hasMoreGames && (
              <button
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="flex-1 rounded-[min(3vw,1.5rem)] bg-white py-3 md:py-4 lg:py-6 text-center text-lg md:text-xl lg:text-2xl font-semibold text-[#E6007A] transition-all hover:bg-opacity-90 active:scale-95"
              >
                Siguientes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 