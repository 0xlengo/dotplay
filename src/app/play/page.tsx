"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PlayPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  
  // Simulación de juegos - esto vendría de una API o base de datos
  const games = [
    { id: 1, name: "Crypto Racing", desc: "Carreras de autos en el metaverso de Polkadot" },
    { id: 2, name: "DOT Warriors", desc: "Batalla épica de NFTs en la blockchain" },
    { id: 3, name: "Polka Monsters", desc: "Colecciona y batalla con monstruos digitales" },
    { id: 4, name: "Chain Defender", desc: "Defiende tu nodo en este juego de estrategia" },
    { id: 5, name: "Meta Builder", desc: "Construye tu mundo en el metaverso de Polkadot" },
    { id: 6, name: "DOT Runner", desc: "Corre y esquiva obstáculos en la blockchain" },
    { id: 7, name: "Crypto Pets", desc: "Cuida y entrena mascotas digitales únicas" },
    { id: 8, name: "Block Wars", desc: "Batallas estratégicas en tiempo real" }
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
      <div className="flex w-full max-w-5xl flex-1 flex-col p-4 pt-12">
        <h1 className="text-5xl font-bold text-white text-center mb-12">
          Gaming en Polkadot {currentPage === 2 ? '(5-8)' : '(1-4)'}
        </h1>
        
        {/* Sección de juegos */}
        <div className="flex flex-1 flex-col gap-6">
          {currentGames.map((game) => (
            <Link
              key={game.id}
              href={`/play/${game.id}`}
              className="flex h-[18vh] w-full rounded-3xl bg-black/20 overflow-hidden transition-transform active:scale-95 hover:bg-black/30"
            >
              {/* Lado izquierdo - Imagen */}
              <div className="flex w-1/3 items-center justify-center bg-white/5">
                <div className="h-24 w-24 rounded-full bg-white/10"></div>
              </div>
              
              {/* Lado derecho - Descripción */}
              <div className="flex flex-1 flex-col justify-center p-6">
                <h3 className="mb-3 text-3xl font-bold text-white">{game.name}</h3>
                <p className="text-xl text-white/80 line-clamp-2">
                  {game.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Botones de navegación fijos en la parte inferior */}
      <div className="w-full border-t border-white/10">
        <div className="mx-auto max-w-5xl p-4">
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <button
                onClick={() => router.push('/')}
                className="flex-1 rounded-3xl border-4 border-white py-8 text-center text-3xl font-semibold text-white transition-all hover:bg-white/10 active:scale-95"
              >
                Inicio
              </button>
              
              {hasPreviousGames ? (
                <button
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className="flex-1 rounded-3xl border-4 border-white py-8 text-center text-3xl font-semibold text-white transition-all hover:bg-white/10 active:scale-95"
                >
                  Volver
                </button>
              ) : hasMoreGames && (
                <button
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="flex-1 rounded-3xl bg-white py-8 text-center text-3xl font-semibold text-[#E6007A] transition-all hover:bg-opacity-90 active:scale-95"
                >
                  Siguientes
                </button>
              )}
            </div>
            
            {hasPreviousGames && hasMoreGames && (
              <button
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="w-full rounded-3xl bg-white py-8 text-center text-3xl font-semibold text-[#E6007A] transition-all hover:bg-opacity-90 active:scale-95"
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