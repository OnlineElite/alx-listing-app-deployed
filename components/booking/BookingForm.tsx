import axios from "axios";
import { useState } from "react";


const BookingForm = () => {

  const [address, setAddress] = useState({
    street : "",
    city : "",
    state : "",
    zipCode : "",
    country : "",
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    billingAddress: address,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/bookings", formData);
      alert("Booking confirmed!");
    } catch (error) {
      setError("Failed to submit booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="bg-white p-6 shadow-md rounded-lg">
    <h2 className="text-xl font-semibold">Contact Detail</h2>
    <form onSubmit={handleSubmit}>
      {/* Contact Information */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>First Name</label>
          <input value={formData.firstName} onChange={(e)=> {setFormData({...formData, firstName : e.target.value})}} type="text" className="border rounded-lg p-2 w-full mt-2" />
        </div>
        <div>
          <label>Last Name</label>
          <input value={formData.lastName} onChange={(e)=> {setFormData({...formData, lastName : e.target.value})}} type="text" className="border rounded-lg p-2 w-full mt-2" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label>Email</label>
          <input value={formData.email} onChange={(e)=> {setFormData({...formData, email : e.target.value})}} type="email" className="border rounded-lg p-2 w-full mt-2" />
        </div>
        <div>
          <label>Phone Number</label>
          <input value={formData.phoneNumber} onChange={(e)=> {setFormData({...formData, phoneNumber : e.target.value})}} type="text" className="border rounded-lg p-2 w-full mt-2" />
        </div>
      </div>

      {/* Payment Information */}
      <h2 className="text-xl font-semibold mt-6">Pay with</h2>
      <div className="mt-4">
        <label>Card Number</label>
        <input value={formData.cardNumber} onChange={(e)=> {setFormData({...formData, cardNumber : e.target.value})}} type="text" className="border rounded-lg p-2 w-full mt-2" />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label>Expiration Date</label>
          <input value={formData.expirationDate} onChange={(e)=> {setFormData({...formData, expirationDate : e.target.value})}} type="text" className="border rounded-lg p-2 w-full mt-2" />
        </div>
        <div>
          <label>CVV</label>
          <input value={formData.cvv} onChange={(e)=> {setFormData({...formData, cvv : e.target.value})}} type="text" className="border rounded-lg p-2 w-full mt-2" />
        </div>
      </div>

      {/* Billing Address */}
      <h2 className="text-xl font-semibold mt-6">Billing Address</h2>
      <div className="mt-4">
        <label>Street Address</label>
        <input value={address.street} onChange={(e)=> {setAddress({...address, street : e.target.value})}} type="text" className="border rounded-lg p-2 w-full mt-2" />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label>City</label>
          <input value={address.city} onChange={(e)=> {setAddress({...address, city : e.target.value})}} type="text" className="border rounded-lg p-2 w-full mt-2" />
        </div>
        <div>
          <label>State</label>
          <input value={address.state} onChange={(e)=> {setAddress({...address, state : e.target.value})}} type="text" className="border rounded-lg p-2 w-full mt-2" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label>Zip Code</label>
          <input value={address.zipCode} onChange={(e)=> {setAddress({...address, zipCode : e.target.value})}} type="text" className="border rounded-lg p-2 w-full mt-2" />
        </div>
        <div>
          <label>Country</label>
          <input value={address.country} onChange={(e)=> {setAddress({...address, country : e.target.value})}} type="text" className="border rounded-lg p-2 w-full mt-2" />
        </div>
      </div>

      {/* Submit Button */}
      <button type="submit" disabled={loading} className="mt-6 bg-green-500 text-white py-2 px-4 rounded-md w-full">
        {loading ? "Processing..." : "Confirm & Pay"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  </div>
  )
};

export default BookingForm;
