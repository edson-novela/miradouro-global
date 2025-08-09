"use client";

import { FiStar, FiMapPin, FiArrowLeft, FiHeart, FiShare2 } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Destination } from "../../../types/Destination";

interface DestinationHeroProps {
  destination: Destination;
  images: { url: string; altText?: string }[];
  selectedImage: number;
  setSelectedImage: (index: number) => void;
}

export default function DestinationHero({
  destination,
  images,
  selectedImage,
  setSelectedImage,
}: DestinationHeroProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const shareOptions = [
    { name: "Facebook", icon: "/images/social/facebook.svg" },
    { name: "WhatsApp", icon: "/images/social/whatsapp.svg" },
    { name: "Email", icon: "/images/social/email.svg" },
    { name: "Copiar link", icon: "/images/social/link.svg" },
  ];

  return (
    <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
      <Image
        src={images[selectedImage].url}
        alt={images[selectedImage].altText || destination.name}
        fill
        className="object-cover object-center"
        priority
        quality={100}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

      {/* Overlay de Navegação */}
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <button
          onClick={() =>
            setSelectedImage(
              selectedImage === 0 ? images.length - 1 : selectedImage - 1
            )
          }
          className="p-3 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors z-20"
          aria-label="Imagem anterior"
        >
          <FiArrowLeft className="h-6 w-6" />
        </button>
        <button
          onClick={() =>
            setSelectedImage(
              selectedImage === images.length - 1 ? 0 : selectedImage + 1
            )
          }
          className="p-3 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors z-20"
          aria-label="Próxima imagem"
        >
          <FiArrowLeft className="h-6 w-6 transform rotate-180" />
        </button>
      </div>

      {/* Header */}
      <header className="absolute top-14 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link
              href="/destinos"
              className="flex items-center text-white hover:text-amber-300 transition-colors backdrop-blur-sm bg-black/20 rounded-full px-4 py-2 cursor-pointer"
            >
              <FiArrowLeft className="mr-2" />
              <span className="font-medium">Voltar</span>
            </Link>

            <div className="flex space-x-3">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-2 rounded-full backdrop-blur-sm bg-black/20 text-white hover:text-amber-300 transition-colors"
                aria-label={
                  isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
                }
              >
                <FiHeart
                  className={`h-5 w-5 ${
                    isFavorite ? "fill-amber-400 text-amber-400" : ""
                  }`}
                />
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowShareOptions(!showShareOptions)}
                  className="p-2 rounded-full backdrop-blur-sm bg-black/20 text-white hover:text-amber-300 transition-colors"
                  aria-label="Compartilhar"
                >
                  <FiShare2 className="h-5 w-5" />
                </button>

                <AnimatePresence>
                  {showShareOptions && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-20 overflow-hidden"
                    >
                      {shareOptions.map((option) => (
                        <button
                          key={option.name}
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          <Image
                            src={option.icon}
                            alt={option.name}
                            width={20}
                            height={20}
                            className="mr-3"
                          />
                          <span>{option.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col justify-center pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-2 mb-3">
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white">
                <FiStar className="text-amber-300 mr-1" />
                <span className="font-medium">{destination.rating}</span>
              </div>
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white">
                {destination.slug}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
              {destination.name}
            </h1>

            <div className="flex items-center text-white/90 mb-6">
              <FiMapPin className="mr-2 text-amber-300" />
              <span>{destination.location}</span>
            </div>

            <p className="text-white/90 max-w-2xl">
              {destination.shortDescription}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}