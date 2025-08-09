import { FiMapPin, FiStar, FiClock } from "react-icons/fi";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Destination } from "../../types/Destination";

export default function DestinationCard({
  destination,
  index,
}: {
  destination: Destination;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
        destination.isFeatured ? "ring-2 ring-amber-400" : ""
      }`}
    >
      {destination.isFeatured && (
        <div className="absolute top-3 left-3 z-10 w-28 h-6 bg-amber-500 flex items-center rounded-2xl justify-center shadow-lg">
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            DESTAQUE
          </span>
        </div>
      )}

      <Link href={`/destinos/${destination.slug}`} className="block h-full">
        <div className="relative h-64 overflow-hidden">
          {destination.mainImage ? (
            <>
              <Image
                src={destination.mainImage}
                alt={destination.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                priority={index < 4}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </>
          ) : (
            <div className="bg-gray-200 w-full h-full flex items-center justify-center">
              <span className="text-gray-500">Sem imagem</span>
            </div>
          )}

          {destination.categoryName && (
            <div className="absolute top-4 right-4 bg-white/90 text-amber-600 px-3 py-1 rounded-full text-xs font-bold shadow-md backdrop-blur-sm">
              {destination.categoryName}
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <div className="flex justify-between items-end">
              <div className="max-w-[70%]">
                <h3 className="text-xl font-bold whitespace-normal">
                  {destination.name}
                </h3>
                <div className="flex items-center text-sm mt-1">
                  <FiMapPin className="mr-1 flex-shrink-0" />
                  <span className="truncate">{destination.location}</span>
                </div>
              </div>
              <div className="flex items-center bg-amber-500/90 px-2 py-1 rounded-md backdrop-blur-sm">
                <FiStar className="mr-1 w-3 h-3" />
                <span className="font-bold text-[12px]">
                  {destination.rating}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5">
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 h-[40px]">
            {destination.description || "Descrição não disponível"}
          </p>

          <div className="flex justify-between items-center border-t border-gray-100 pt-4">
            <div className="flex items-center text-sm text-gray-500">
              <FiClock className="mr-1.5" />
              <span>
                {destination.capacity} {destination.capacity === 1 ? "capacidade" : "capacidades"}
              </span>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500">A partir de</div>
              <div className="text-lg font-bold text-amber-600">
                {destination.pricePerNight
                  ? `€${destination.pricePerNight}`
                  : "Sob consulta"}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}