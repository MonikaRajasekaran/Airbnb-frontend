import Header from '@/components/header';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import paymentlogo from '@@/images/paymentlogo.png';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Structure from '../../layout/basic';

const Payment = () => {
  const { roomID, bookingId, totalFees, customerDetails } = useSelector(
    (state) => state.payment
  );
  const Router = useRouter();

  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [loadingText, setLoadingText] = useState("Redirecting to Razorpay...");

  const amountInPaise = Math.round(totalFees * 100);

  // Redirect if data missing
  useEffect(() => {
    if (
      !roomID ||
      !bookingId ||
      !totalFees ||
      !customerDetails?.name ||
      !customerDetails?.email ||
      !customerDetails?.contact
    ) {
      Router.push('/');
    }
  }, [roomID, bookingId, totalFees, customerDetails, Router]);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
  }, []);

  // Auto trigger payment
  useEffect(() => {
    if (!razorpayLoaded) return;

    const triggerPayment = async () => {
      setLoadingText("Creating payment order...");

      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amountInPaise }),
      });

      const order = await response.json();

      if (!order.id) {
        setLoadingText("Failed to create order. Try again.");
        return;
      }

      setLoadingText("Opening Razorpay...");

      const options = {
        key: 'rzp_test_v9ZaUEel7kp4bo',
        amount: order.amount,
        currency: 'INR',
        name: 'BookNest Booking',
        description: 'Booking Payment',
        order_id: order.id,
        handler: function (response) {
          setLoadingText("Payment Successful 🎉");
          console.log("Payment success:", response);
        },
        prefill: {
          name: customerDetails.name,
          email: customerDetails.email,
          contact: customerDetails.contact,
        },
        theme: { color: '#ff385c' }, // BookNest pink
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    };

    triggerPayment();
  }, [razorpayLoaded]);

  return (
    <Structure>
<div className="flex justify-center items-center flex-grow px-4">
        <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full text-center animate-fadeIn">
          
          {/* Payment Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src={paymentlogo}
              alt="Payment Logo"
              className="w-36 h-auto"
            />
          </div>

          {/* Loading Animation */}
          <div className="flex flex-col items-center">
            <div className="loader mb-4"></div>

            <p className="text-md font-semibold text-gray-600">
              {loadingText}
            </p>

            <p className="text-sm text-gray-400 mt-2">
              Please do not refresh or close this tab.
            </p>
          </div>
        </div>
      </div>

      {/* CSS for loader */}
      <style jsx>{`
        .loader {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #ff385c;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Structure>
  );
};

export default Payment;
