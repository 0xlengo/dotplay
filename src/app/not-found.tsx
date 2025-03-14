import Link from 'next/link';

export default function NotFound() {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-[#E6007A] to-[#000000]">
        <div className="w-full max-w-5xl p-4">
          <h1 className="text-3xl text-white text-center mb-4">Page Not Found</h1>
          <p className="text-white/80 text-center mb-8">The page you are looking for does not exist.</p>
          <Link 
            href="/"
            className="block w-full rounded-3xl bg-white py-8 text-center text-2xl font-semibold text-[#E6007A] transition-all hover:bg-opacity-90 active:scale-95"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }