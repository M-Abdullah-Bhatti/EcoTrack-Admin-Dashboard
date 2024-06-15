"use client";
import PaymentForm from "@/components/Forms/PaymentForm";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";

const PUBLISHABLE_KEY =
  "pk_test_51KqjSfH5DTXndbM5FeV5p2pkow6DMx57X4bV7AOcUzZAt3J1LHxeOdOBLUshVyKzOaDeBGJqIRt5PDFcd5JA1VLY005qzetSFm";

const page = () => {
  return (
    <DefaultLayout>
      <Elements stripe={loadStripe(PUBLISHABLE_KEY)}>
        <PaymentForm />
      </Elements>
    </DefaultLayout>
  );
};

export default page;
