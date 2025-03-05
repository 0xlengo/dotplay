import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-between bg-gradient-to-b from-[#E6007A] to-[#000000] p-4">
      <main className="flex w-full flex-1 flex-col items-center justify-center gap-16 py-8">
        {/* Logo o título principal */}
        <h1 className="text-6xl font-bold text-white">DOT PLAY</h1>
        
        {/* Video en loop */}
        <div className="relative h-[40vh] w-full max-w-4xl rounded-2xl bg-black/20">
          {/* Aquí irá el componente de video */}
          <div className="absolute inset-0 flex items-center justify-center text-white/50 text-2xl">
            Video en loop
          </div>
        </div>

        {/* Botones principales */}
        <div className="flex w-full flex-col gap-8 px-4">
          <Link
            href="/play"
            className="w-full rounded-2xl bg-white py-8 text-center text-2xl font-semibold text-[#E6007A] transition-all hover:bg-opacity-90 active:scale-95"
          >
            Play on Polkadot
          </Link>
          
          <Link
            href="/build"
            className="w-full rounded-2xl border-4 border-white py-8 text-center text-2xl font-semibold text-white transition-all hover:bg-white/10 active:scale-95"
          >
            Build on Polkadot
          </Link>
        </div>
      </main>
    </div>
  );
}
