export default function Contact() {
  return (
    <main className="max-w-3xl mx-auto py-20 px-6 font-serif text-center">
      <h1 className="text-4xl font-bold mb-6 text-[#1a1a1a]">Nous Contacter</h1>
      <p className="text-stone-600 mb-10 italic">
        Une question sur un équipement ? Une demande de partenariat ou d'expertise ?
      </p>
      
      <div className="bg-stone-50 border border-stone-200 p-10 rounded-lg">
        <p className="text-xl mb-4 font-sans text-stone-500 uppercase tracking-widest text-sm font-bold">
          Direction Éditoriale
        </p>
        {/* Remplace par ton adresse définitive après achat du domaine */}
        <a href="mailto:contact@ideescasa.fr" className="text-2xl font-bold text-stone-900 hover:text-stone-700 underline break-all">
          contact@ideescasa.fr
        </a>
      </div>
      
      <p className="mt-8 text-stone-400 text-sm font-sans">
        Notre équipe s'efforce de répondre à toutes les sollicitations techniques sous 48h.
      </p>

      <a href="/" className="mt-12 inline-block text-stone-500 underline font-sans text-sm">
        Retour à l'accueil
      </a>
    </main>
  );
}
