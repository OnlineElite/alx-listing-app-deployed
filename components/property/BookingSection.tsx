import { BookingSectionProps } from "@/interfaces";
import Link from "next/link";

const BookingSection: React.FC<BookingSectionProps> = ({price, checkIn, checkOut, setCheckIn, setCheckOut }) => {
  // Calculate number of nights
  const getNights = () => {
    if (!checkIn || !checkOut) return 0;
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return nights > 0 ? nights : 0;
  };

  const total = getNights() * price;

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h3 className="text-xl font-semibold">${price}/night</h3>
      <div className="mt-4">
        <label>Check-in</label>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="border p-2 w-full mt-2"
        />
      </div>
      <div className="mt-4">
        <label>Check-out</label>
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="border p-2 w-full mt-2"
        />
      </div>
      {/* Total payment */}
      <div className="mt-4">
        <p>
          Total payment: <strong>${total > 0 ? total : 0}</strong>
        </p>
      </div>

      {/* Reserve button */}
      <Link href={"/booking"} className="no-underline">
        <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md">
          Reserve now
        </button>
      </Link>
    </div>
  );
};

export default BookingSection;
