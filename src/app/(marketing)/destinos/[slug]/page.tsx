"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import { Destination } from "@/types/Destination";
import DestinationHero from "@/components/destinos/innerDestination/DestinationHero";
import ThumbnailGallery from "@/components/destinos/innerDestination/ThumbnailGallery";
import DestinationTabs from "@/components/destinos/innerDestination/DestinationTabs";
import AboutTab from "@/components/destinos/innerDestination/AboutTab";
import TabContent from "@/components/destinos/innerDestination/TabContent";
import ItineraryTab from "@/components/destinos/innerDestination/ItineraryTab";
import ReviewsTab from "@/components/destinos/innerDestination/ReviewsTab";
import TipsTab from "@/components/destinos/innerDestination/TipsTab";
import InclusionsTab from "@/components/destinos/innerDestination/InclusionsTab";
import BookingCard from "@/components/destinos/innerDestination/BookingCard";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function DestinationPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [activeTab, setActiveTab] = useState("sobre");
  const [selectedImage, setSelectedImage] = useState(0);
  const [itinerary, setItinerary] = useState<
    { day: number; title: string; description: string; activities: string[] }[]>([]);
  const [travelTips, setTravelTips] = useState<
    { id: string; tip: string }[]
  >([]);
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<{ url: string; altText?: string }[]>([]);
  const [reviews, setReviews] = useState<
    { id: string; user_id: string; title: string; comment: string; rating: number; created_at: string }[]
  >([]);

  useEffect(() => {
    async function fetchDestinationData() {
      if (!slug) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/destinations/detailed?slug=${slug}`);

        if (!response.ok) {
          throw new Error(`Erro ao buscar dados: ${response.statusText}`);
        }

        // Corrigido: Agora o estado armazena diretamente o objeto do destino
        const fetchedDestination = await response.json();
        setDestination(fetchedDestination);
        setImages(fetchedDestination.images || []);
        setReviews(fetchedDestination.reviews || []);
        setItinerary(fetchedDestination.itinerary || []);
        setTravelTips(fetchedDestination.travelTips || []);
      } catch (e) {
        setError("Não foi possível carregar os detalhes do destino.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchDestinationData();
  }, [slug]);

  // Exibir estados de UI (loading, erro, não encontrado)
  if (loading)
    return (
      <div className="container mx-auto p-4 text-center">
        <p>Carregando...</p>
      </div>
    );
  if (error)
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  if (!destination) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-3xl font-bold">Destino não encontrado</h1>
        <Link href="/destinos" className="text-blue-500 hover:underline">
          Voltar para a lista de destinos
        </Link>
      </div>
    );
  }

  // 6. Renderizar os dados do destino
  return (
    <div>
      <Header />
      <DestinationHero
        destination={destination}
        images={images}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />

      <ThumbnailGallery
        destination={destination}
        images={images}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-2/3">
            <DestinationTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <div className="mb-12">
              <TabContent activeTab={activeTab}>
                {activeTab === "sobre" && (
                  <AboutTab destination={destination} />
                )}
                {activeTab === "roteiro" && (
                  <ItineraryTab itinerary={itinerary} />
                )}
                {activeTab === "incluso" && (
                  <InclusionsTab destination={destination} />
                )}
                {activeTab === "dicas" && <TipsTab travelTips={travelTips} />}
                {activeTab === "avaliacoes" && (
                  <ReviewsTab reviews={reviews} />
                )}
              </TabContent>
            </div>
          </div>
          <div className="lg:w-1/3">
            <BookingCard destination={destination} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
