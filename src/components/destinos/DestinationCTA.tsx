import Link from "next/link";

export default function DestinationCTA() {
  return (
    <div className="mt-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-8 md:p-10 text-center overflow-hidden relative">
      <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-amber-400/20"></div>
      <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-amber-400/20"></div>
      <div className="relative z-10">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Não encontrou o que procura?
        </h3>
        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
          Nossos especialistas podem criar um roteiro personalizado para você.
        </p>
        <Link
          href="/contacto"
          className="inline-block bg-white text-amber-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium shadow-md transition-all hover:scale-105"
        >
          Fale com um especialista
        </Link>
      </div>
    </div>
  );
}