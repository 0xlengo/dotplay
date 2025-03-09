"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useInactivityTimer } from "@/hooks/useInactivityTimer";

export default function BuildPage() {
  const router = useRouter();
  const [showQR, setShowQR] = useState<'apply' | 'info' | null>(null);
  
  useInactivityTimer();

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gradient-to-b from-[#E6007A] to-[#000000] overflow-x-hidden">
      {/* Contenido principal con scroll */}
      <div className="flex w-full max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw] flex-1 flex-col p-4 pt-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-6">Build</h1>
        
        {/* Contenido principal */}
        <div className="w-full rounded-[min(3vw,1.5rem)] bg-white/10 p-4 md:p-6 mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">DOT PLAY Clip</h2>
          <p className="text-lg md:text-xl text-white leading-relaxed mb-6 md:mb-8">
            Financia tu proyecto y forma parte del ecosistema de gaming en Polkadot. 
            Obtén acceso a herramientas, recursos y soporte para desarrollar 
            juegos innovadores en la blockchain.
          </p>
          
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-semibold text-white">Beneficios:</h3>
            <ul className="list-inside list-disc space-y-2 md:space-y-3 text-base md:text-lg text-white">
              <li>Acceso a financiamiento para desarrollo</li>
              <li>Soporte técnico especializado</li>
              <li>Integración con el ecosistema Polkadot</li>
              <li>Herramientas y recursos exclusivos</li>
              <li>Comunidad de desarrolladores</li>
            </ul>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col gap-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setShowQR('apply')}
              className="w-full rounded-[min(3vw,1.5rem)] bg-white py-4 md:py-6 lg:py-8 text-center text-lg md:text-xl lg:text-2xl font-semibold text-[#E6007A] transition-all hover:bg-opacity-90 active:scale-95"
            >
              Aplicar ahora
            </button>
            
            <button
              onClick={() => setShowQR('info')}
              className="w-full rounded-[min(3vw,1.5rem)] bg-white py-4 md:py-6 lg:py-8 text-center text-lg md:text-xl lg:text-2xl font-semibold text-[#E6007A] transition-all hover:bg-opacity-90 active:scale-95"
            >
              Más Información
            </button>
          </div>
          
          <button
            onClick={() => router.push('/')}
            className="w-full rounded-[min(3vw,1.5rem)] border-[0.3vh] border-white py-4 md:py-6 lg:py-8 text-center text-lg md:text-xl lg:text-2xl font-semibold text-white transition-all hover:bg-white/10 active:scale-95"
          >
            Volver al Menú
          </button>
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
            <div className="aspect-square w-full bg-black/10 mb-4 rounded-[min(2vw,1rem)] flex items-center justify-center text-2xl">
              QR
            </div>
            <p className="text-[#E6007A] text-center text-lg md:text-xl font-semibold">
              {showQR === 'apply' ? 'Escanea para aplicar' : 'Escanea para más información'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 