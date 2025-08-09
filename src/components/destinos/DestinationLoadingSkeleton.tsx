import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function DestinationLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg">
          <Skeleton height={240} className="w-full" />
          <div className="p-5">
            <Skeleton count={2} className="mb-3" />
            <div className="flex justify-between">
              <Skeleton width={80} />
              <Skeleton width={60} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}