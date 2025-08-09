
interface TipsTabProps {
  travelTips: { id: string; tip: string }[];
}

export default function TipsTab({ travelTips }: TipsTabProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Dicas de Viagem
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {travelTips.map((tip, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-lg p-5"
          >
            <div className="flex items-center mb-3">
              <div className="bg-amber-100 text-amber-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                {index + 1}
              </div>
              <h3 className="font-medium text-gray-900">
                Dica {index + 1}
              </h3>
            </div>
            <p className="text-gray-600">{tip.tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}