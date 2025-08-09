import { FiSearch, FiFilter, FiX, FiChevronDown } from "react-icons/fi";
import { useState } from "react";
import type { Category } from "./../../types/Category";

export default function DestinationFilters({
  searchTerm,
  setSearchTerm,
  activeFilter,
  setActiveFilter,
  categories,
  setMobileFiltersOpen,
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeFilter: number | "all" | null;
  setActiveFilter: (filter: number | "all" | null) => void;
  categories: Category[];
  mobileFiltersOpen: boolean;
  setMobileFiltersOpen: (open: boolean) => void;
}) {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const getActiveFilterName = () => {
    if (activeFilter === "all") return "Todos";
    if (activeFilter === null) return "Todas Categorias";
    const category = categories.find((c) => c.id === activeFilter.toString());
    return category ? category.name : "Categoria desconhecida";
  };

  const clearFilters = () => {
    setSearchTerm("");
    setActiveFilter(null);
  };

  return (
    <div className="mb-12 z-50">
      <div className="flex flex-col md:flex-row gap-4 mb-6 z-50">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Pesquisar destinos por nome ou localização..."
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <FiX className="text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg bg-white shadow-sm text-gray-700 hover:bg-gray-50"
          onClick={() => setMobileFiltersOpen(true)}
        >
          <FiFilter />
          Filtros
        </button>

        <div className="hidden md:block relative">
          <button
            type="button"
            className="inline-flex justify-between items-center w-full md:w-64 px-4 py-3 border border-gray-300 rounded-lg bg-white shadow-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
            onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
          >
            <span>{getActiveFilterName()}</span>
            <FiChevronDown
              className={`transition-transform ${
                isCategoryDropdownOpen ? "transform rotate-180" : ""
              }`}
            />
          </button>
          {isCategoryDropdownOpen && (
            <div className="absolute z-50 mt-1 w-full md:w-64 bg-white rounded-md shadow-lg overflow-hidden">
              <div className="py-1 max-h-60 overflow-auto">
                <button
                  onClick={() => {
                    setActiveFilter("all");
                    setIsCategoryDropdownOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    activeFilter === "all"
                      ? "bg-amber-100 text-amber-800"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Todos
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveFilter(parseInt(category.id, 10));
                      setIsCategoryDropdownOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      activeFilter === category.id
                        ? "bg-amber-100 text-amber-800"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {(searchTerm || activeFilter) && (
        <div className="flex items-center justify-between mb-4 bg-amber-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">Filtros ativos:</span>
            {searchTerm && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                Pesquisa: {searchTerm}
                <button
                  onClick={() => setSearchTerm("")}
                  className="ml-1.5 inline-flex text-amber-500 hover:text-amber-700"
                >
                  <FiX className="h-3 w-3" />
                </button>
              </span>
            )}
            {activeFilter && activeFilter !== "all" && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                Categoria: {getActiveFilterName()}
                <button
                  onClick={() => setActiveFilter(null)}
                  className="ml-1.5 inline-flex text-amber-500 hover:text-amber-700"
                >
                  <FiX className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
          <button
            onClick={clearFilters}
            className="text-sm text-amber-600 hover:text-amber-800 font-medium"
          >
            Limpar todos
          </button>
        </div>
      )}
    </div>
  );
}