import { FiX } from "react-icons/fi";

export default function DestinationError({
  error,
  retry,
}: {
  error: string;
  retry: () => void;
}) {

  retry = retry || (() => window.location.reload());
  
  return (
    <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-md">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
        <FiX className="h-6 w-6 text-red-600" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Erro ao carregar
      </h3>
      <p className="text-gray-500 mb-6">{error}</p>
      <button
        onClick={retry}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
      >
        Tentar novamente
      </button>
    </div>
  );
}
