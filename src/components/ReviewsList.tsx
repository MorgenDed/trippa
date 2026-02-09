import { Star, User } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  text: string;
}

const DUMMY_REVIEWS: Review[] = [
  {
    id: 1,
    author: "Anouk J.",
    rating: 5,
    date: "2024-03-15",
    text: "Geweldige ervaring! Alles was goed geregeld en we hebben genoten."
  },
  {
    id: 2,
    author: "Peter de Vries",
    rating: 4,
    date: "2024-03-10",
    text: "Leuk dagje uit, maar het was wel erg druk. Tickets via Trippa werkten perfect."
  },
  {
    id: 3,
    author: "Sanne M.",
    rating: 5,
    date: "2024-02-28",
    text: "Super deal gescoord! Zeker voor herhaling vatbaar."
  },
  {
    id: 4,
    author: "Mark T.",
    rating: 4,
    date: "2024-02-15",
    text: "Goede prijs-kwaliteitverhouding. Parkeren was wel lastig."
  }
];

export function ReviewsList() {
  const t = useTranslations('DealPage');

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mt-8">
      <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Star className="text-tripper-pink" size={20} />
        {t('reviews')}
      </h3>

      <div className="space-y-6">
        {DUMMY_REVIEWS.map((review) => (
          <div key={review.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="bg-gray-100 p-2 rounded-full">
                  <User size={16} className="text-gray-500" />
                </div>
                <span className="font-medium text-gray-900">{review.author}</span>
              </div>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
            <div className="flex mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}
                />
              ))}
            </div>
            <p className="text-gray-600 text-sm">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
