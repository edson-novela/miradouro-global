import Link from "next/link";

export default function CTABanner() {
  return (
    <div className="bg-gradient-to-r from-amber-500 to-amber-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Pronto para viver esta experiência?
        </h2>
        <p className="text-xl text-amber-100 mb-8 max-w-3xl mx-auto">
          Nossos especialistas estão prontos para personalizar esta viagem
          para você
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/reservar"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-amber-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all"
          >
            Reservar Agora
          </Link>
          <Link
            href="/contato"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-amber-600/20 hover:bg-amber-600/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400 transition-all"
          >
            Falar com Especialista
          </Link>
        </div>
      </div>
    </div>
  );
}