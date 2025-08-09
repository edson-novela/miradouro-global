"use client";

import { useEffect, useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Newsletter from "@/components/home/Newsletter";
import DestinationHero from "@/components/destinos/DestinationHero";
import DestinationFilters from "@/components/destinos/DestinationFilters";
import DestinationGrid from "@/components/destinos/DestinationGrid";
import DestinationLoadingSkeleton from "@/components/destinos/DestinationLoadingSkeleton";
import DestinationNotFound from "@/components/destinos/DestinationNotFound";
import DestinationCTA from "@/components/destinos/DestinationCTA";
import DestinationError from "@/components/destinos/DestinationError";
import { useCallback } from "react";

import { Category } from "@/types/Category";
import { Destination } from "@/types/Destination";

export default function DestinosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<number | "all" | null>(null);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 1,
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      if (searchTerm) params.append("search", searchTerm);
      if (activeFilter && activeFilter !== "all")
        params.append("category", activeFilter.toString());
      params.append("page", pagination.page.toString());
      params.append("limit", pagination.limit.toString());

      const response = await fetch(
        `/api/destinations/all?${params.toString()}`
      );
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to fetch");

      setDestinations(data.data.destinations);
      setCategories(data.data.categories);
      setPagination((prev) => ({
        ...prev,
        total: data.data.pagination.total,
        totalPages: data.data.pagination.totalPages,
      }));
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
      setError("Falha ao carregar destinos. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  }, [searchTerm, activeFilter, pagination.page, pagination.limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const clearFilters = () => {
    setSearchTerm("");
    setActiveFilter(null);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-gray-50 flex items-center justify-center">
          <DestinationError error={error} retry={fetchData} />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        <DestinationHero loading={loading} count={pagination.total} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <DestinationFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            categories={categories}
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
          />

          {loading ? (
            <DestinationLoadingSkeleton />
          ) : destinations.length > 0 ? (
            <>
              <DestinationGrid destinations={destinations} />
              {/* Componente de paginação */}
              <div className="mt-8 flex justify-center">
                <div className="flex space-x-2">
                  {Array.from(
                    { length: pagination.totalPages },
                    (_, i) => i + 1
                  ).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-md ${
                        page === pagination.page
                          ? "bg-amber-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <DestinationNotFound clearFilters={clearFilters} />
          )}

          <DestinationCTA />
        </div>
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
}