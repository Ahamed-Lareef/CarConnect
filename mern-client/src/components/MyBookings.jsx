import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [updatedBooking, setUpdatedBooking] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Extract email from query parameters
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");

  useEffect(() => {
    if (email) {
      fetchBookings(email);
    } else {
      setError("No email provided.");
      setLoading(false);
    }
  }, [email]);

  const fetchBookings = async (email) => {
    try {
      const response = await fetch(`http://localhost:5000/api/bookings?email=${email}`);
      const data = await response.json();
      if (response.ok) {
        setBookings(data);
      } else {
        setError(data.message || "Failed to fetch bookings.");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError("Error fetching bookings.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/${id}`, { method: "DELETE" });
      if (response.ok) {
        setBookings(bookings.filter(booking => booking._id !== id));
      } else {
        alert("Failed to cancel booking.");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const handleEditClick = (booking) => {
    setEditingBooking(booking._id);
    setUpdatedBooking({ ...booking });
  };

  const handleChange = (e) => {
    setUpdatedBooking({ ...updatedBooking, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!updatedBooking.appointmentDate || !updatedBooking.time) {
      alert("Please provide both date and time.");
      return;
    }

    const { _id, ...bookingToUpdate } = updatedBooking;

    try {
      const response = await fetch(`http://localhost:5000/api/bookings/${editingBooking}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingToUpdate),
      });

      if (response.ok) {
        alert("Booking updated successfully!");
        setBookings(bookings.map(booking => booking._id === editingBooking ? updatedBooking : booking));
        setEditingBooking(null);
      } else {
        alert("Failed to update booking.");
      }
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">My Bookings</h2>
      {loading ? <p className="text-center text-gray-500">Loading...</p> : 
        error ? <p className="text-red-500 text-center">{error}</p> : 
        bookings.length === 0 ? <p className="text-gray-500 text-center">No bookings found.</p> : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="p-6 border rounded-md shadow-md bg-white">
              {editingBooking === booking._id ? (
                <div className="bg-gray-100 p-4 rounded-md">
                  <h3 className="text-lg font-semibold mb-2">Update Booking</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="name" value={updatedBooking.name} onChange={handleChange} className="p-2 border rounded-md w-full" />
                    <input type="date" name="appointmentDate" value={updatedBooking.appointmentDate} onChange={handleChange} className="p-2 border rounded-md w-full" />
                    <input type="time" name="time" value={updatedBooking.time} onChange={handleChange} className="p-2 border rounded-md w-full" />
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Save</button>
                    <button onClick={() => setEditingBooking(null)} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">Cancel</button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-lg font-semibold">{booking.name}</p>
                  <p><strong>Appointment:</strong> {booking.appointmentDate} at {booking.time}</p>
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => handleCancel(booking._id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Cancel</button>
                    <button onClick={() => handleEditClick(booking)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Update</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;