import { PROPERTYLISTINGSAMPLE } from "@/constants/index";
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import { PropertyProps } from "@/interfaces";
import BookingSection from "@/components/property/BookingSection";
import PropertyDetail from "@/components/property/PropertyDetail";
import ReviewSection from "@/components/property/ReviewSection";
//import Image from "next/image";
import Slider from "@/components/common/Slider";

export default function PropertyPage() {
  const router = useRouter();
  const { id } = router.query;
  const Property = PROPERTYLISTINGSAMPLE.find(
    (item: PropertyProps) => item.name === id
  );

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [property, setProperty] = useState<PropertyProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      try {
        const response = await axios.get(`/api/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!Property) {
    return (
      <p className="p-6 text-center text-red-600 font-semibold">
        Property not found
      </p>
    );
  }

  return (
    <div>
      <div className="container mx-auto px-4 py-6 ">
        {/* Image Grid */}
        <div className="">
          <Slider gallery={property ? property.gallery : Property.gallery} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content: Details & Reviews */}
          <div className="lg:col-span-2 space-y-6">
            <PropertyDetail property={property ? property : Property} />
            <ReviewSection
              reviews={property ? property.reviews : Property.reviews}
              propertyId={ property ? property.id : Property.id} 
            />
          </div>

          {/* Sidebar: Booking */}
          <div className="lg:col-span-1 mt-6">
            <BookingSection
              price={property? property.price : Property.price}
              checkIn={checkIn}
              checkOut={checkOut}
              setCheckIn={setCheckIn}
              setCheckOut={setCheckOut}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
