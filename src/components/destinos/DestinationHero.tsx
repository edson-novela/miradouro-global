import { motion } from "framer-motion";

export default function DestinationHero({
  loading,
  count,
}: {
  loading: boolean;
  count: number;
}) {
  return (
    <div className="relative h-80 md:h-96">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-800/90 to-amber-600/90"></div>
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Explore Nossos Destinos
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm text-white max-w-2xl"
        >
          {loading ? (
            <span className="inline-block w-48 h-6 bg-amber-400/50 rounded animate-pulse"></span>
          ) : (
            `${count} destinos incríveis para sua próxima aventura`
          )}
        </motion.p>
      </div>
    </div>
  );
}