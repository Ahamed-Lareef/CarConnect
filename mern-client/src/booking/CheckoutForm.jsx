import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ serviceDetails }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    // Get the CardElement for payment details
    const cardElement = elements.getElement(CardElement);

    try {
      // Create a payment intent on the backend
      const paymentResponse = await fetch('/api/payments/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: serviceDetails.amount,
          bookingId: serviceDetails._id, // Pass the bookingId to associate with the payment
        }),
      });

      const { clientSecret } = await paymentResponse.json(); // Get clientSecret

      // Confirm the payment with the clientSecret and CardElement
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: serviceDetails.customerName, // Use customer's name or other details here
          },
        },
      });

      if (stripeError) {
        setError(stripeError.message);
      } else if (paymentIntent.status === 'succeeded') {
        alert('Payment successful!');
        // Optionally redirect to a success page
        window.location.href = '/paymentSuccess';
      }
    } catch (err) {
      console.error(err);
      setError('Error processing payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Card Details</label>
        <CardElement />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default CheckoutForm;
