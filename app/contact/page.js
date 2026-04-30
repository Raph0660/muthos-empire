export default function Contact() {
  return (
    <main className="max-w-3xl mx-auto py-20 px-6 font-serif text-center">
      <h1 className="text-4xl font-bold mb-6">Nous Contacter</h1>
      <p className="text-stone-600 mb-10 italic">Une question ? Une proposition d'expertise ?</p>
      <div className="bg-stone-50 border border-stone-200 p-10 rounded-lg">
        <p className="text-xl mb-4">Envoyez un message à :</p>
        <a href="mailto:contact@muthos-empire.com" className="text-2xl font-bold text-stone-900 hover:text-stone-700 underline">
          contact@muthos-empire.com
        </a>
      </div>
      <a href="/" className="mt-10 inline-block text-stone-500 underline">Retour au Laboratoire</a>
    </main>
  );
}
