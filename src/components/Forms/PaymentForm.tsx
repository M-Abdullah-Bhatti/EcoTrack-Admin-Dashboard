"use client";
import React, { useState, FormEvent } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import Toast from "../Toast/Toast";
import { StripeCardNumberElement } from "@stripe/stripe-js";
import RequestLoader from "../RequestLoader";
import { useAppSelector } from "@/lib/store";
import { useRouter } from "next/navigation";

interface ResponseData {
  success: boolean;
}

const PaymentForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const user = useAppSelector((state) => state.auth.currentUser);
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<any>("");
  const [showToast, setShowToast] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements) {
      console.log("Stripe.js has not loaded yet.");
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);

    if (!cardElement) {
      console.error("Card element not found");
      setToastMessage("Card element not available");
      setShowToast(true);
      return;
    }

    try {
      setLoading(true);

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement as StripeCardNumberElement,
      });

      if (error) {
        console.error("Error:", error);
        setToastMessage(error.message);
        setShowToast(true);
        setLoading(false);
        return;
      }

      console.log("PaymentMethod:", paymentMethod);

      const response = await axios.post<any>(
        `${baseUrl}/api/users/payment`,
        {
          paymentMethodId: paymentMethod?.id,
          amount: 10,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        },
      );

      if (response?.data?.client_secret) {
        // confirm the payment by the user
        const confirmPayment = await stripe?.confirmCardPayment(
          response?.data?.client_secret,
        );
        console.log("confirmPayment", confirmPayment);
        if (confirmPayment?.error) {
          console.log("error occ: ", confirmPayment.error.message);
        } else {
          setToastMessage("Payment successful!");
          setShowToast(true);

          const response = await axios.put(
            `${baseUrl}/api/users/credit`,
            {
              id: user?._id,
            },
            {
              headers: {
                Authorization: `Bearer ${user?.token}`,
              },
            },
          );

          console.log("response: ", response);
          router.push("/");
        }
      } else {
        setToastMessage("Payment failed, please try again.");
        setShowToast(true);
      }
    } catch (error: any) {
      console.error("Error processing payment:", error);
      setToastMessage("Payment processing error. Please try again.");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="paymentForm rounded-sm border border-stroke bg-white p-6.5 shadow-default"
    >
      <h2 className="payment-heading mb-5 font-medium text-black dark:text-white">
        Payment Information
      </h2>
      <p className="mb-4 text-black dark:text-white">
        Pay $10.00 USD to receive 2 bids.
      </p>
      <div className="space-y-4">
        <div className="StripeElementWrapper rounded-lg border-[1.5px] border-stroke bg-transparent p-3 text-black outline-none transition focus:border-primary">
          <CardNumberElement className="StripeElement w-full" />
        </div>
        <div className="StripeElementWrapper rounded-lg border-[1.5px] border-stroke bg-transparent p-3 text-black outline-none transition focus:border-primary">
          <CardExpiryElement className="StripeElement w-full" />
        </div>
        <div className="StripeElementWrapper rounded-lg border-[1.5px] border-stroke bg-transparent p-3 text-black outline-none transition focus:border-primary">
          <CardCvcElement className="StripeElement w-full" />
        </div>
      </div>
      <button
        type="submit"
        className="disabled:bg-gray-400 mt-6 flex w-[150px] items-center justify-center rounded bg-primary p-3  font-medium text-white hover:bg-opacity-90"
        disabled={loading}
      >
        {loading ? <RequestLoader /> : "Submit Payment"}
      </button>

      {showToast && (
        <Toast message={toastMessage} onClose={() => setShowToast(false)} />
      )}
    </form>
  );
};

export default PaymentForm;
