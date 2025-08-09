import { Destination } from "@/types/Destination"; // Assuming types.ts is in a 'types' directory

interface InclusionsTabProps {
  destination: Destination;
}

export default function InclusionsTab({ destination }: InclusionsTabProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          O que está incluído
        </h3>
        <ul className="space-y-3">
          {destination.amenities.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="bg-green-100 text-green-600 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
              <span className="text-gray-600">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          O que não está incluído
        </h3>
        <ul className="space-y-3">
          {destination.amenities.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="bg-red-100 text-red-600 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
              <span className="text-gray-600">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
