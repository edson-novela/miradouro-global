"use client";

import Image from "next/image";
import { Destination } from "./../../../types/Destination"; // Assuming types.ts is in a 'types' directory

interface ThumbnailGalleryProps {
  destination: Destination;
  images: { url: string; altText?: string }[];
  selectedImage: number;
  setSelectedImage: (index: number) => void;
}

export default function ThumbnailGallery({
  destination,
  images,
  selectedImage,
  setSelectedImage,
}: ThumbnailGalleryProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 z-20 relative">
      <div className="flex space-x-3 overflow-x-auto p-2 scrollbar-hide">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`flex-shrink-0 w-30 h-24 md:w-34 md:h-24 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
              selectedImage === index
                ? "border-amber-400 scale-105"
                : "border-white"
            }`}
            aria-label={`Visualizar imagem ${index + 1}`}
          >
            <Image
              src={image.url}
              alt={`${destination.name} ${index + 1}`}
              width={196}
              height={164}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
