"use client";

import { useRouter } from "next/navigation";

export default function BuildPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gradient-to-b from-[#E6007A] to-[#000000]">
      {/* Contenido principal con scroll */}
      <div className="flex w-full max-w-4xl flex-1 flex-col p-4 pt-12">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Build</h1>
        
        {/* Contenido principal */}
        <div className="w-full rounded-3xl bg-white/10 p-6 mb-4">
          <h2 className="text-3xl font-bold text-white mb-6">DOT PLAY Clip</h2>
          <p className="text-xl text-white leading-relaxed mb-8">
            Financia tu proyecto y forma parte del ecosistema de gaming en Polkadot. 
            Obtén acceso a herramientas, recursos y soporte para desarrollar 
            juegos innovadores en la blockchain.
          </p>
          
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-white">Beneficios:</h3>
            <ul className="list-inside list-disc space-y-3 text-lg text-white">
              <li>Acceso a financiamiento para desarrollo</li>
              <li>Soporte técnico especializado</li>
              <li>Integración con el ecosistema Polkadot</li>
              <li>Herramientas y recursos exclusivos</li>
              <li>Comunidad de desarrolladores</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Botones fijos en la parte inferior */}
      <div className="w-full border-t border-white/10">
        <div className="mx-auto max-w-4xl p-4">
          <div className="flex flex-col gap-4">
            {/* Contenedor de QRs */}
            <div className="grid grid-cols-2 gap-4">
              {/* QR Aplicar */}
              <div className="rounded-3xl bg-white p-4 text-center">
                <div className="aspect-square w-full bg-black/10 mb-3 rounded-2xl flex items-center justify-center text-2xl">
                  QR
                </div>
                <p className="text-[#E6007A] text-lg font-semibold">Aplicar ahora</p>
              </div>
              
              {/* QR Más información */}
              <div className="rounded-3xl bg-white p-4 text-center">
                <div className="aspect-square w-full bg-black/10 mb-3 rounded-2xl flex items-center justify-center text-2xl">
                  QR
                </div>
                <p className="text-[#E6007A] text-lg font-semibold">Más información</p>
              </div>
            </div>
            
            <button
              onClick={() => router.push('/')}
              className="w-full rounded-3xl border-4 border-white py-6 text-center text-2xl font-semibold text-white transition-all hover:bg-white/10 active:scale-95"
            >
              Volver al Menú
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 