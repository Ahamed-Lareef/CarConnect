import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

// Replace with your actual Stripe publishable key
const stripePromise = loadStripe('your-publishable-stripe-key-here');

const Payment = () => {
  const location = useLocation();
  const bookingId = new URLSearchParams(location.search).get('bookingId');
  const [serviceDetails, setServiceDetails] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(`/api/bookings/${bookingId}`);
        const data = await response.json();
        setServiceDetails(data);
      } catch (error) {
        console.error(error);
        alert('Failed to fetch booking details');
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  if (!serviceDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Payment for {serviceDetails.serviceType}</h1>
      <p>Amount: LKR {serviceDetails.amount}</p>

      <Elements stripe={stripePromise}>
        <CheckoutForm serviceDetails={serviceDetails} />
      </Elements>
    </div>
  );
};

export default Payment;
