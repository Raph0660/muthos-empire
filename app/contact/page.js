export default function Contact() {
  return (
    <main className="max-w-3xl mx-auto py-20 px-6 font-serif text-center">
      <h1 className="text-4xl font-bold mb-6">Contactez-nous</h1>
      <p className="text-stone-600 mb-10 italic">Une question ? Une suggestion de recette ?</p>
      <div className="bg-stone-50 border border-stone-200 p-10 rounded-lg">
        <p className="text-xl mb-4">Envoyez un message à :</p>
        <a href="mailto:contact -at- tif-recettes.com" className="text-2xl font-bold text-stone-900 hover:text-stone-700 underline">
          ton-email@gmail.com
        </a>
      </div>
      <a href="/" className="mt-10 inline-block text-stone-500 underline">Retour au magazine</a>
    </main>
  );
}
