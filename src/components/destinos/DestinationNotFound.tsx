import { FiSearch } from "react-icons/fi";

export default function DestinationNotFound({
  clearFilters,
}: {
  clearFilters: () => void;
}) {
  return (
    <div className="text-center py-16 bg-white rounded-xl shadow-sm">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-amber-100 mb-4">
        <FiSearch className="h-6 w-6 text-amber-600" />
      </div>
      <h3 className="text-xl font-medium text-gray-900 mb-2">
        Nenhum destino encontrado
      </h3>
      <p className="text-gray-500 max-w-md mx-auto mb-6">
        Não encontramos destinos que correspondam aos seus critérios de
        pesquisa.
      </p>
      <button
        onClick={clearFilters}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
      >
        Limpar filtros
      </button>
    </div>
  );
}