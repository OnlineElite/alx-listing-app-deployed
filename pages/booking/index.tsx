import BookingForm from "@/components/booking/BookingForm";
import CancellationPolicy from "@/components/booking/CancellationPolicy";
import OrderSummary from "@/components/booking/OrderSummary";

export default function BookingPage() {
  const bookingDetails = {
    propertyName: "Villa Arrecife Beach House",
    price: 7500,
    bookingFee: 65,
    totalNights: 3,
    startDate: "24 August 2024",
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Summary (Top on mobile, Right on desktop) */}
        <div className="order-1 lg:order-2">
          <OrderSummary bookingDetails={bookingDetails} />
        </div>

        {/* Booking Form + Cancellation Policy (Below on mobile, Left on desktop) */}
        <div className="order-2 lg:order-1">
          <BookingForm />
          <CancellationPolicy />
        </div>
      </div>
    </div>
  );
}
