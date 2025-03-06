"use client";

import { use } from "react";
import { useRouter } from "next/navigation";

interface Game {
  name: string;
  desc: string;
  longDesc: string;
  video?: string;
}

// Esta función se ejecutará en el servidor para obtener los datos del juego
// En un caso real, aquí consultarías una API o base de datos
function getGameData(id: string): Game | null {
  const games: Record<string, Game> = {
    "1": {
      name: "Pinkness Overdrive",
      desc: "Race through snowy mountains with a touch of pinkness",
      longDesc: "Experimenta la adrenalina de las carreras en un mundo virtual construido sobre Polkadot. Compite contra otros jugadores, colecciona autos NFT únicos y gana recompensas en tokens.",
      video: "/video/Pinkness_Overdrive.mp4"
    },
    "2": {
      name: "Pink Drop",
      desc: "Batalla épica de NFTs en la blockchain",
      longDesc: "Forma tu equipo de guerreros NFT y compite en batallas épicas. Entrena a tus guerreros, mejora sus habilidades y domina la arena de combate en el ecosistema Polkadot.",
      video: "/video/Pink_Drop.mp4"
    },
    "3": {
      name: "Pink Mole",
      desc: "Colecciona y batalla con monstruos digitales",
      longDesc: "Explora un vasto mundo digital donde podrás capturar, entrenar y luchar con monstruos únicos. Cada monstruo es un NFT con características especiales y habilidades únicas.",
      video: "/video/Pink_Mole.mp4"
    },
    "4": {
      name: "Pink Bullet",
      desc: "Defiende tu nodo en este juego de estrategia",
      longDesc: "Protege la red Polkadot en este emocionante juego de estrategia. Construye defensas, mejora tu nodo y repele ataques mientras ganas recompensas por mantener la red segura.",
      video: "/video/Pink_Bullet.mp4"
    },
    "5": {
      name: "Nitro Nation",
      desc: "Construye tu mundo en el metaverso de Polkadot",
      longDesc: "Crea y personaliza tu propio espacio en el metaverso. Diseña edificios, organiza eventos y conecta con otros jugadores en un mundo virtual descentralizado.",
      video: "/video/Nitro_Nation.mp4"
    },
    "6": {
      name: "NFL Rivals",
      desc: "Corre y esquiva obstáculos en la blockchain",
      longDesc: "Un emocionante juego de carreras sin fin donde deberás esquivar obstáculos y recolectar tokens. Compite por los mejores puntajes y gana recompensas exclusivas.",
      video: "/video/NFL_Rivals.mp4"
    },
    "7": {
      name: "FIFA Rivals",
      desc: "Cuida y entrena mascotas digitales únicas",
      longDesc: "Adopta mascotas virtuales únicas, cuídalas y entrénalas. Cada mascota es un NFT con su propia personalidad y características genéticas que puedes mejorar.",
      video: "/video/FIFA_Rivals.mp4"
    },
    "8": {
      name: "Pudgy Party",
      desc: "Batallas estratégicas en tiempo real",
      longDesc: "Participa en intensas batallas estratégicas en tiempo real. Construye tu base, forma alianzas y conquista territorios en este emocionante juego de estrategia blockchain.",
      video: "/video/Pudgy_Party.mp4"
    },
    "9": {
      name: "Blankos",
      desc: "Batallas estratégicas en tiempo real",
      longDesc: "Participa en intensas batallas estratégicas en tiempo real. Construye tu base, forma alianzas y conquista territorios en este emocionante juego de estrategia blockchain.",
      video: "/video/Blankos.mp4"
    },
    "10": {
      name: "Exiled Racers",
      desc: "Batallas estratégicas en tiempo real",
      longDesc: "Participa en intensas batallas estratégicas en tiempo real. Construye tu base, forma alianzas y conquista territorios en este emocionante juego de estrategia blockchain.",
      video: "/video/Exiled_Racers.mp4"
    },
    "11": {
      name: "Evrloot",
      desc: "Batallas estratégicas en tiempo real",
      longDesc: "Participa en intensas batallas estratégicas en tiempo real. Construye tu base, forma alianzas y conquista territorios en este emocionante juego de estrategia blockchain.",
      video: "/video/Evrloot.mp4"
    },
    "12": {
      name: "Big Ballz of Bayuns",
      desc: "Batallas estratégicas en tiempo real",
      longDesc: "Participa en intensas batallas estratégicas en tiempo real. Construye tu base, forma alianzas y conquista territorios en este emocionante juego de estrategia blockchain.",
      video: "/video/Big_Ballz_of_Bayuns.mp4"
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
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-[#E6007A] to-[#000000]">
        <div className="w-full max-w-5xl p-4">
          <p className="text-3xl text-white text-center mb-8">Juego no encontrado</p>
          <button
            onClick={() => router.push('/play')}
            className="w-full rounded-3xl bg-white py-8 text-center text-3xl font-semibold text-[#E6007A] transition-all hover:bg-opacity-90 active:scale-95"
          >
            Volver a juegos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gradient-to-b from-[#E6007A] to-[#000000]">
      {/* Contenido principal con scroll */}
      <div className="flex w-full max-w-4xl flex-1 flex-col p-4 pt-12">
        <h1 className="text-4xl font-bold text-white text-center mb-8">{gameData.name}</h1>
        
        {/* Reproductor de video */}
        <div className="w-full aspect-video rounded-3xl overflow-hidden mb-6">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            {gameData.video && <source src={gameData.video} type="video/mp4" />}
          </video>
        </div>

        {/* Descripción del juego */}
        <div className="w-full rounded-3xl bg-white/10 p-6 mb-4">
          <p className="text-xl text-white leading-relaxed">
            {gameData.longDesc}
          </p>
        </div>
      </div>

      {/* Botones fijos en la parte inferior */}
      <div className="w-full border-t border-white/10">
        <div className="mx-auto max-w-4xl p-4">
          <div className="flex flex-col gap-3">
            {/* Contenedor de QRs */}
            <div className="grid grid-cols-2 gap-3">
              {/* QR Descarga */}
              <div className="rounded-2xl bg-white p-3 text-center">
                <div className="aspect-square w-full bg-black/10 mb-2 rounded-xl flex items-center justify-center text-xl">
                  QR
                </div>
                <p className="text-[#E6007A] text-base font-semibold">Descárgalo ya</p>
              </div>
              
              {/* QR Más información */}
              <div className="rounded-2xl bg-white p-3 text-center">
                <div className="aspect-square w-full bg-black/10 mb-2 rounded-xl flex items-center justify-center text-xl">
                  QR
                </div>
                <p className="text-[#E6007A] text-base font-semibold">Más información</p>
              </div>
            </div>
            
            <button
              onClick={() => router.push('/play')}
              className="w-full rounded-2xl border-2 border-white py-4 text-center text-xl font-semibold text-white transition-all hover:bg-white/10 active:scale-95"
            >
              Volver a juegos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 