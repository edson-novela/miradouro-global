"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { FiMapPin, FiStar } from "react-icons/fi";
import { useEffect, useState } from "react";


interface Destination {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  location: string;
  pricePerNight: number;
  rating: number;
  isFeatured: boolean;
  mainImageUrl: string;
}

/*interface d {
  d: Destination[];
}*/

export default function Destinations() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Removed unused setData state
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchDestinations = async () => {
    try {
      setLoading(true);
      setError(null);
      // setData(null); // Removed as setData is not used

      const res = await fetch("/api/destinations/home");
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Erro desconhecido");
      }

      const data = json.data;

      interface ApiDestination {
        id: string;
        name: string;
        slug: string;
        description?: string;
        shortDescription?: string;
        location: string;
        pricePerNight: number | string;
        rating: number | string | null;
        isFeatured: boolean;
        mainImageUrl?: string;
      }

      setDestinations(
        ((data || []) as ApiDestination[]).map((d: ApiDestination): Destination => ({
          id: d.id,
          name: d.name,
          slug: d.slug,
          description: d.description ?? "",
          shortDescription: d.description ?? "",
          location: d.location,
          pricePerNight: typeof d.pricePerNight === "string" ? Number(d.pricePerNight) : d.pricePerNight,
          rating: d.rating !== null ? Number(d.rating) : 0,
          isFeatured: d.isFeatured,
          mainImageUrl: d.mainImageUrl ?? "",
        }))
      );
    } catch (err: unknown) {
      console.error("Error fetching destinations:", err);
      setError("Failed to load destinations");
    } finally {
      setLoading(false);
    }
  };

  fetchDestinations();
}, []);


  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-18 px-6 text-center">
        <p>Carregando destinos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-18 px-6 text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-18 px-6">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={container}
        className="mb-16"
      >
        <motion.h2
          variants={item}
          className="text-3xl md:text-4xl font-bold text-amber-600 mb-2"
        >
          Destinos Populares
        </motion.h2>
        <motion.p variants={item} className="text-sm text-gray-600">
          Explore nossos destinos mais procurados e planeje sua próxima aventura
        </motion.p>
      </motion.div>

      {destinations.length === 0 ? (
        <motion.p variants={item} className="text-center text-gray-500">
          Nenhum destino encontrado
        </motion.p>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-between"
        >
          {destinations.map((destination) => (
            <motion.div
              key={destination.id}
              variants={item}
              whileHover={{ y: -10 }}
              className={`bg-white rounded-md overflow-hidden shadow-lg ${
                destination.isFeatured ? "ring-2 ring-amber-400" : ""
              }`}
            >
              <div className="relative h-48 overflow-hidden">
                {destination.mainImageUrl && (
                  <Image
                    src={destination.mainImageUrl}
                    alt={destination.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    priority={destination.isFeatured}
                  />
                )}
                {destination.isFeatured && (
                  <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Destaque
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-between p-4">
                <div className="flex justify-between items-center mb-2">
                  <Link
                    href={`/destinos/${destination.slug}`}
                    className="text-base font-bold hover:text-amber-600 transition-colors"
                  >
                    {destination.name}
                  </Link>
                  <div className="flex items-center text-amber-500">
                    <FiStar className="text-sm mr-1" />
                    <span className="text-sm">
                      {destination.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
                <p className="text-gray-500 mb-4 text-sm line-clamp-2">
                  {destination.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-amber-600">
                    {destination.pricePerNight.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "EUR",
                    })}
                    <span className="text-xs font-normal text-gray-500">
                      /noite
                    </span>
                  </span>
                  <Link
                    href={`/destinos/${destination.slug}`}
                    className="text-amber-600 text-sm hover:text-amber-800 font-medium flex items-center transition-colors"
                  >
                    <FiMapPin className="mr-1" />
                    Explorar
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      <motion.div variants={item} className="text-center mt-24">
        <Link
          href="/destinos"
          className="inline-block bg-amber-600 text-white px-8 py-3 rounded-full hover:bg-amber-700 transition-colors"
        >
          Ver Todos os Destinos
        </Link>
      </motion.div>
    </div>
  );
}