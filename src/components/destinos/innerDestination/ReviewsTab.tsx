import { FiStar } from "react-icons/fi";

interface ReviewsTabProps {
  reviews: { id: string; user_id: string; title: string; comment: string; rating: number, created_at: string }[];
}

export default function ReviewsTab({ reviews }: ReviewsTabProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Avaliações de Viajantes
      </h2>
      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-gray-200 pb-6"
          >
            <div className="flex items-start mb-4">
              <div>
                <h3 className="font-bold text-gray-900">
                  {review.user_id}
                </h3>
                <div className="flex items-center mt-1">
                  <div className="flex items-center text-amber-500 mr-3">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`${
                          i < Math.floor(review.rating)
                            ? "fill-current"
                            : ""
                        } ${
                          i === Math.floor(review.rating) &&
                          review.rating % 1 > 0
                            ? "text-amber-300"
                            : ""
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-500 text-sm">
                    {review.created_at
                      ? new Date(review.created_at).toLocaleDateString()
                      : "Data não disponível"}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}