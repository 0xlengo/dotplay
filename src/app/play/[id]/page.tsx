"use client";

import { use } from "react";
import { useRouter } from "next/navigation";

// Esta función se ejecutará en el servidor para obtener los datos del juego
// En un caso real, aquí consultarías una API o base de datos
function getGameData(id: string) {
  const games = {
    "1": {
      name: "Crypto Racing",
      desc: "Carreras de autos en el metaverso de Polkadot",
      longDesc: "Experimenta la adrenalina de las carreras en un mundo virtual construido sobre Polkadot. Compite contra otros jugadores, colecciona autos NFT únicos y gana recompensas en tokens."
    },
    "2": {
      name: "DOT Warriors",
      desc: "Batalla épica de NFTs en la blockchain",
      longDesc: "Forma tu equipo de guerreros NFT y compite en batallas épicas. Entrena a tus guerreros, mejora sus habilidades y domina la arena de combate en el ecosistema Polkadot."
    },
    "3": {
      name: "Polka Monsters",
      desc: "Colecciona y batalla con monstruos digitales",
      longDesc: "Explora un vasto mundo digital donde podrás capturar, entrenar y luchar con monstruos únicos. Cada monstruo es un NFT con características especiales y habilidades únicas."
    },
    "4": {
      name: "Chain Defender",
      desc: "Defiende tu nodo en este juego de estrategia",
      longDesc: "Protege la red Polkadot en este emocionante juego de estrategia. Construye defensas, mejora tu nodo y repele ataques mientras ganas recompensas por mantener la red segura."
    },
    "5": {
      name: "Meta Builder",
      desc: "Construye tu mundo en el metaverso de Polkadot",
      longDesc: "Crea y personaliza tu propio espacio en el metaverso. Diseña edificios, organiza eventos y conecta con otros jugadores en un mundo virtual descentralizado."
    },
    "6": {
      name: "DOT Runner",
      desc: "Corre y esquiva obstáculos en la blockchain",
      longDesc: "Un emocionante juego de carreras sin fin donde deberás esquivar obstáculos y recolectar tokens. Compite por los mejores puntajes y gana recompensas exclusivas."
    },
    "7": {
      name: "Crypto Pets",
      desc: "Cuida y entrena mascotas digitales únicas",
      longDesc: "Adopta mascotas virtuales únicas, cuídalas y entrénalas. Cada mascota es un NFT con su propia personalidad y características genéticas que puedes mejorar."
    },
    "8": {
      name: "Block Wars",
      desc: "Batallas estratégicas en tiempo real",
      longDesc: "Participa en intensas batallas estratégicas en tiempo real. Construye tu base, forma alianzas y conquista territorios en este emocionante juego de estrategia blockchain."
    }
  };
  
  return games[id as keyof typeof games] || null;
}

export default function GamePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const gameData = getGameData(resolvedParams.id);

  if (!gameData) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-gradient-to-b from-[#E6007A] to-[#000000]">
        <div className="flex-1 flex items-center justify-center">
          <p className="text-2xl text-white">Juego no encontrado</p>
        </div>
        <div className="p-4">
          <button
            onClick={() => router.push('/play')}
            className="w-full rounded-2xl bg-white py-6 text-center text-2xl font-semibold text-[#E6007A] transition-all hover:bg-opacity-90 active:scale-95"
          >
            Volver a juegos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-b from-[#E6007A] to-[#000000]">
      {/* Contenido principal con scroll */}
      <div className="flex-1 overflow-y-auto p-4">
        <h1 className="text-4xl font-bold text-white text-center mb-6">{gameData.name}</h1>
        
        {/* Reproductor de video */}
        <div className="aspect-video w-full rounded-2xl bg-black/20 mb-6">
          <div className="flex h-full items-center justify-center text-white/50 text-2xl">
            Video del juego
          </div>
        </div>

        {/* Descripción del juego */}
        <div className="w-full rounded-2xl bg-white/10 p-6">
          <p className="text-xl text-white leading-relaxed">
            {gameData.longDesc}
          </p>
        </div>
      </div>

      {/* Botones fijos en la parte inferior */}
      <div className="p-4 border-t border-white/10">
        <div className="flex flex-col gap-3">
          {/* Contenedor de QRs */}
          <div className="flex gap-3">
            {/* QR Descarga */}
            <div className="flex-1 rounded-2xl bg-white p-4 text-center">
              <div className="aspect-square w-full bg-black/10 mb-2 rounded-xl flex items-center justify-center text-lg">
                QR
              </div>
              <p className="text-[#E6007A] font-semibold">Descárgalo ya</p>
            </div>
            
            {/* QR Más información */}
            <div className="flex-1 rounded-2xl bg-white p-4 text-center">
              <div className="aspect-square w-full bg-black/10 mb-2 rounded-xl flex items-center justify-center text-lg">
                QR
              </div>
              <p className="text-[#E6007A] font-semibold">Más información</p>
            </div>
          </div>
          
          <button
            onClick={() => router.push('/play')}
            className="w-full rounded-2xl border-4 border-white py-6 text-center text-2xl font-semibold text-white transition-all hover:bg-white/10 active:scale-95"
          >
            Volver a juegos
          </button>
        </div>
      </div>
    </div>
  );
} 