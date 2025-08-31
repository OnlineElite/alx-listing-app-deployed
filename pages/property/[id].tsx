import { PROPERTYLISTINGSAMPLE } from "@/constants/index";
import { useRouter } from "next/router";
import { useState } from "react";
import BookingSection from "@/components/property/BookingSection";
import PropertyDetail from "@/components/property/PropertyDetail";
import ReviewSection from "@/components/property/ReviewSection";
//import Image from "next/image";
import Slider from "@/components/common/Slider";

export default function PropertyPage() {
  const router = useRouter();
  const { id } = router.query;
  const property = PROPERTYLISTINGSAMPLE.find((item) => item.name === id);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  if (!property) {
    return <p className="p-6 text-center text-red-600 font-semibold">Property not found</p>;
  }

  return (
    <div>
      <div className="container mx-auto px-4 py-6 ">
          {/* Image Grid */}
        <div className="">
          <Slider gallery={property.gallery} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content: Details & Reviews */}
          <div className="lg:col-span-2 space-y-6">
            <PropertyDetail property={property} />
            <ReviewSection reviews={property.reviews} />
          </div>

          {/* Sidebar: Booking */}
          <div className="lg:col-span-1 mt-6">
            <BookingSection
              price={property.price}
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

