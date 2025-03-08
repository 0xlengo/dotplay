"use client";

import Link from "next/link";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useInactivityTimer } from "@/hooks/useInactivityTimer";

export default function PlayPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  
  useInactivityTimer();

  // Simulación de juegos - esto vendría de una API o base de datos
  const games = [
    { id: 1, name: "Pinkness Overdrive", desc: "Race through snowy mountains with a touch of pinkness.  Desktop browsers only" },
    { id: 2, name: "Pink Drop", desc: "Batalla épica de NFTs en la blockchain" },
    { id: 3, name: "Pink Mole", desc: "Colecciona y batalla con monstruos digitales" },
    { id: 4, name: "Pink Bullet", desc: "Defiende tu nodo en este juego de estrategia" },
    { 
      id: 5, 
      name: "Nitro Nation", 
      desc: "Race across the globe in Nitro Nation World Tour! Collect and drive some of the fastest cars in the world in this free to play drag racing mobile game.",
      logo: "/nitro_nation.webp",
      descImage: "/nitro_nation_desc.avif"
    },
    { id: 6, name: "NFL Rivals", desc: "Corre y esquiva obstáculos en la blockchain" },
    { id: 7, name: "FIFA Rivals", desc: "Corre y esquiva obstáculos en la blockchain" },
    { id: 8, name: "Pudgy Party", desc: "Cuida y entrena mascotas digitales únicas" },
    { id: 9, name: "Blankos", desc: "Batallas estratégicas en tiempo real" },
    { id: 10, name: "Exiled Racers", desc: "Batallas estratégicas en tiempo real" },
    { id: 11, name: "Evrloot", desc: "Batallas estratégicas en tiempo real" },
    { id: 12, name: "Big Ballz of Bayun", desc: "Batallas estratégicas en tiempo real" }
  ];

  // Obtener juegos para la página actual
  const gamesPerPage = 4;
  const startIndex = (currentPage - 1) * gamesPerPage;
  const currentGames = games.slice(startIndex, startIndex + gamesPerPage);
  const hasMoreGames = startIndex + gamesPerPage < games.length;
  const hasPreviousGames = currentPage > 1;

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gradient-to-b from-[#E6007A] to-[#000000]">
      {/* Contenido principal con scroll */}
      <div className="flex w-full max-w-4xl flex-1 flex-col p-4 pt-12">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Gaming en Polkadot 
        </h1>
        
        {/* Sección de juegos - usando grid para distribuir el espacio equitativamente */}
        <div className="grid flex-1 grid-rows-4 gap-4 mb-4">
          {currentGames.map((game) => (
            <Link
              key={game.id}
              href={`/play/${game.id}`}
              className="flex w-full rounded-3xl bg-black/20 overflow-hidden transition-transform active:scale-95 hover:bg-black/30"
            >
              {/* Lado izquierdo - Círculo o Imagen */}
              <div className="flex aspect-square items-center justify-center bg-white/5 relative">
                {game.descImage ? (
                  <div className="h-16 w-16 rounded-full bg-white/10"></div>
                ) : (
                  <div className="h-16 w-16 rounded-full bg-white/10"></div>
                )}
              </div>
              
              {/* Lado derecho - Logo o Título y Descripción */}
              <div className="flex flex-1 flex-col justify-center p-4">
                {game.logo ? (
                  <div className="h-8 w-80 relative mb-2">
                    <div className="h-16 w-16 rounded-full bg-white/10"></div>
                  </div>
                ) : (
                  <h3 className="mb-1 text-2xl font-bold text-white">{game.name}</h3>
                )}
                <p className="text-lg text-white/80 line-clamp-2">
                  {game.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Botones de navegación fijos en la parte inferior */}
      <div className="w-full border-t border-white/10">
        <div className="mx-auto max-w-4xl p-4">
          <div className="flex gap-3">
            <button
              onClick={() => router.push('/')}
              className="flex-1 rounded-3xl border-4 border-white py-6 text-center text-2xl font-semibold text-white transition-all hover:bg-white/10 active:scale-95"
            >
              Inicio
            </button>
            
            {hasPreviousGames ? (
              <button
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="flex-1 rounded-3xl border-4 border-white py-6 text-center text-2xl font-semibold text-white transition-all hover:bg-white/10 active:scale-95"
              >
                Volver
              </button>
            ) : hasMoreGames && (
              <button
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="flex-1 rounded-3xl bg-white py-6 text-center text-2xl font-semibold text-[#E6007A] transition-all hover:bg-opacity-90 active:scale-95"
              >
                Siguientes
              </button>
            )}
            
            {hasPreviousGames && hasMoreGames && (
              <button
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="flex-1 rounded-3xl bg-white py-6 text-center text-2xl font-semibold text-[#E6007A] transition-all hover:bg-opacity-90 active:scale-95"
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