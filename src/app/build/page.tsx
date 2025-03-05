"use client";

import { useRouter } from "next/navigation";

export default function BuildPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-b from-[#E6007A] to-[#000000]">
      {/* Contenido principal con scroll */}
      <div className="flex-1 overflow-y-auto p-4">
        <button
          onClick={() => router.push('/')}
          className="w-full rounded-2xl border-4 border-white py-6 text-center text-2xl font-semibold text-white transition-all hover:bg-white/10 active:scale-95 mb-6"
        >
          ← Volver al Menú
        </button>

        <h1 className="text-4xl font-bold text-white text-center mb-6">Build</h1>
        
        {/* Contenido principal */}
        <div className="w-full rounded-2xl bg-white/10 p-6 mb-6">
          <h2 className="text-4xl font-bold text-white mb-8">DOT PLAY Clip</h2>
          <p className="text-2xl text-white leading-relaxed mb-12">
            Financia tu proyecto y forma parte del ecosistema de gaming en Polkadot. 
            Obtén acceso a herramientas, recursos y soporte para desarrollar 
            juegos innovadores en la blockchain.
          </p>
          
          <div className="space-y-6">
            <h3 className="text-3xl font-semibold text-white">Beneficios:</h3>
            <ul className="list-inside list-disc space-y-4 text-xl text-white">
              <li>Acceso a financiamiento para desarrollo</li>
              <li>Soporte técnico especializado</li>
              <li>Integración con el ecosistema Polkadot</li>
              <li>Herramientas y recursos exclusivos</li>
              <li>Comunidad de desarrolladores</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Botón fijo en la parte inferior */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => router.push('/build/apply')}
          className="w-full rounded-2xl bg-white py-6 text-center text-2xl font-semibold text-[#E6007A] transition-all hover:bg-opacity-90 active:scale-95"
        >
          Aplicar ahora
        </button>
      </div>
    </div>
  );
} 