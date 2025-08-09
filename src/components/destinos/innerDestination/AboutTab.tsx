import { Destination } from "./../../../types/Destination";

interface AboutTabProps {
  destination: Destination;
}


export default function AboutTab({ destination }: AboutTabProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Sobre {destination.name}
      </h2>
      <p className="text-gray-600 mb-6 leading-relaxed">
        {destination.description}
      </p>

      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Destaques Imperdíveis
      </h3>
      <ul className="space-y-3 mb-8">
        {destination.highlights.map((highlight, index) => (
          <li key={index} className="flex items-start">
            <span className="text-amber-500 mr-3 mt-1">•</span>
            <span className="text-gray-600">{highlight}</span>
          </li>
        ))}
      </ul>

      {/*<div className="bg-amber-50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          Melhor Época para Visitar
        </h3>
        <p className="text-gray-700 font-medium mb-1">
          {destination.bestTime.months}
        </p>
        <p className="text-gray-600">{destination.bestTime.description}</p>
      </div>*/}
    </div>
  );
}