import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#fdfbf7] flex items-center justify-center text-center px-6">
      <div className="max-w-md">
        <h1 className="font-serif text-5xl mb-6 tracking-widest uppercase">404</h1>
        <p className="font-serif italic text-stone-500 mb-10 text-xl">
          Cette recette est encore un secret bien gardé...
        </p>
        <Link href="/" className="px-10 py-3 border border-stone-900 uppercase text-[10px] font-bold tracking-widest hover:bg-stone-900 hover:text-[#fdfbf7] transition-all">
          Retourner au Magazine
        </Link>
      </div>
    </main>
  );
}
