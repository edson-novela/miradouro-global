import DestinationCard from "./DestinationCard";
import { Destination } from "../../types/Destination";

export default function DestinationGrid({
  destinations,
}: {
  destinations: Destination[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
      {destinations.map((destination, index) => (
        <DestinationCard
          key={destination.id}
          destination={destination}
          index={index}
        />
      ))}
    </div>
  );
}
