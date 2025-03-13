import Link from "next/link";

export default function GameSummaryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E6007A] to-[#000000] p-8">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8">
          <Link
            href="/play"
            className="text-white hover:text-white/80"
          >
            ← Back to Games
          </Link>
        </nav>

        <main className="flex flex-col items-center gap-12">
          <h1 className="text-3xl font-bold text-white">Game Summary</h1>
          
          {/* Video Player */}
          <div className="aspect-video w-full max-w-4xl rounded-xl bg-black/20">
            <div className="flex h-full items-center justify-center text-white/50">
              Video Player
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-4">
            <button className="rounded-lg bg-white/10 p-4 text-white hover:bg-white/20">
              <span className="sr-only">Previous</span>
              ←
            </button>
            <button className="rounded-lg bg-white/10 p-4 text-white hover:bg-white/20">
              <span className="sr-only">Next</span>
              →
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}