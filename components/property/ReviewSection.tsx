import Image from "next/image";
import {ReviewsProps, ReviewSectionProps} from "@/interfaces"
import axios from "axios";
import { useState, useEffect } from "react";
//import avatar from "@/public/assets/images/avatar.jpg"

const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews, propertyId}) => {

  const [reviewss, setReviewss] = useState<ReviewsProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/properties/${propertyId}/reviews`);
        setReviewss(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [propertyId]);
  console.log("the reviews recieved from props are ", reviews )
  console.log("the reviews recieved from api are ", reviewss )
  if (loading) {
    return <p>Loading reviews...</p>;
  }
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold">Reviews</h3>
      {reviewss.map((review, index) => (
        <div key={index} className="border-b pb-4 mb-4">
          <div className="flex items-center">
            <Image src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full mr-4" />
            <div>
              <p className="font-bold">{review.name}</p>
              <p className="text-yellow-500">{review.rating} stars</p>
            </div>
          </div>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewSection;