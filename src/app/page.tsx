import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-[#E6007A] to-[#000000] p-4">
      <div className="flex w-full max-w-5xl flex-col items-center gap-16">
        {/* Logo o título principal */}
        <h1 className="text-7xl font-bold text-white">DOT PLAY</h1>
        
        {/* Video en loop */}
        <div className="relative w-full rounded-3xl bg-black/20 overflow-hidden">
          <div className="aspect-video w-full">
            <div className="absolute inset-0 flex items-center justify-center text-white/50 text-3xl">
              Video en loop
            </div>
          </div>
        </div>

        {/* Botones principales */}
        <div className="flex w-full flex-col gap-6">
          <Link
            href="/play"
            className="w-full rounded-3xl bg-white py-8 text-center text-3xl font-semibold text-[#E6007A] transition-all hover:bg-opacity-90 active:scale-95"
          >
            Play on Polkadot
          </Link>
          
          <Link
            href="/build"
            className="w-full rounded-3xl border-4 border-white py-8 text-center text-3xl font-semibold text-white transition-all hover:bg-white/10 active:scale-95"
          >
            Build on Polkadot
          </Link>
        </div>
      </div>
    </div>
  );
}
