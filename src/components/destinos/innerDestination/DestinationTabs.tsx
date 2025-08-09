"use client";

interface DestinationTabsProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

export default function DestinationTabs({
  activeTab,
  setActiveTab,
}: DestinationTabsProps) {
  const tabs = [
    { id: "sobre", label: "Sobre" },
    { id: "roteiro", label: "Roteiro" },
    { id: "incluso", label: "Incluso" },
    { id: "dicas", label: "Dicas" },
    { id: "avaliacoes", label: "Avaliações" },
  ];

  return (
    <div className="border-b border-gray-200 mb-8">
      <nav className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-amber-500 text-amber-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}