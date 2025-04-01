import { useEffect, useState } from "react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/bookings");
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  // Cancel Booking
  const handleCancel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      await fetch(`http://localhost:5000/api/bookings/${id}`, { method: "DELETE" });
      fetchBookings();
    }
  };

  // Update Booking
  const handleUpdate = async (id) => {
    if (!newDate || !newTime) {
      alert("Please provide both date and time.");
      return;
    }
  
    const updatedData = {
      appointmentDate: newDate,
      time: newTime,
    };
  
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Booking updated successfully!");
        setEditingBooking(null); // Close the update form
        fetchBookings(); // Refresh the list of bookings
      } else {
        alert(data.message || "Failed to update the booking.");
      }
    } catch (error) {
      console.error("Error updating booking:", error);
      alert("Error updating booking.");
    }
  };
  
  
  

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500 text-center">No bookings found.</p>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="p-6 border rounded-md shadow-md bg-white">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">{booking.name} - {booking.vehicleType}</p>
                  <p className="text-gray-600">{booking.vehicleNumber}</p>
                  <p className="text-sm text-gray-500">{booking.email} | {booking.contact}</p>
                  <p className="mt-2"><strong>Wash Type:</strong> {booking.washType}</p>
                  <p><strong>Service Type:</strong> {booking.serviceType}</p>
                  <p><strong>Appointment:</strong> {booking.appointmentDate} at {booking.time}</p>
                  
                  {/* Status with Color */}
                  <p className="mt-2">
                    <strong>Status:</strong>
                    <span
                      className={`ml-2 px-2 py-1 rounded ${
                        booking.status === "Completed" ? "bg-green-500 text-white" :
                        booking.status === "Pending" ? "bg-yellow-500 text-black" :
                        "bg-red-500 text-white"
                      }`}
                    >
                      {booking.status || "Pending"}
                    </span>
                  </p>
                  
                  {booking.serviceType === "mobile" && <p><strong>Location:</strong> {booking.location}</p>}
                </div>

                <div className="flex flex-col gap-2">
                  {/* Cancel Button */}
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Cancel
                  </button>

                  {/* Update Button */}
                  <button
                    onClick={() => setEditingBooking(booking._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Update
                  </button>
                </div>
              </div>

              {/* Update Form */}
              {editingBooking === booking._id && (
                <div className="mt-4 bg-gray-100 p-4 rounded-md">
                  <h3 className="text-lg font-semibold mb-2">Update Booking</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="date"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="p-2 border rounded-md w-full"
                    />
                    <input
                      type="time"
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      className="p-2 border rounded-md w-full"
                    />
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleUpdate(booking._id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingBooking(null)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    >
                      Cancel
                    </button>
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
