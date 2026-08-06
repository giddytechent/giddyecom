"use client"

import { loadStripe } from '@stripe/stripe-js';
import { CheckoutElementsProvider } from '@stripe/react-stripe-js/checkout';
import CheckoutForm from './CheckoutForm';

import { ShippingFormInputs } from '@repo/types';
import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import useCartStore from './stores/cartStores';
import { CartItemsType } from '@repo/types';


const stripe = loadStripe('pk_test_51SH1V69Dvzlw8hgLdXloL5wcxzQVXJBIPkAYHdS9lGob0O3tZbjQ8nHyQx8aOyTJxYZayVd0awj8iMVtDTj2q4L800jmvYVQpB');

const clientSecret = async (cart:CartItemsType, token: string) => {
    return fetch(`${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/create-checkout-session`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ cart })
    })
        .then((response) => response.json())
        .then((json) => json.client_secret);
}

const StripePaymentForm = ({ shippingForm }: { shippingForm: ShippingFormInputs }) => {
    const {cart} = useCartStore();

    const { getToken } = useAuth();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        getToken().then(token => setToken(token));
    }, [])

    if (!token) {
        return <p>Loading...</p>;
    }

    return (
        <CheckoutElementsProvider
            stripe={stripe}
            options={{ clientSecret: clientSecret(cart,token) }}
        >
            <CheckoutForm shippingForm={shippingForm} />
        </CheckoutElementsProvider>
    )
}

export default StripePaymentForm