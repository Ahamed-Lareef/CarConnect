import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
  const location = useLocation();
  const bookingId = new URLSearchParams(location.search).get('bookingId');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bookingId }),
        });

        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        console.error(error);
        setMessage('Error verifying payment.');
      }
    };

    verifyPayment();
  }, [bookingId]);

  return (
    <div>
      <h1>Payment Status</h1>
      <p>{message}</p>
    </div>
  );
};

export default PaymentSuccess;
