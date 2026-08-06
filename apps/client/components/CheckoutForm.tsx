"use client"

import { ShippingFormInputs } from "@repo/types"
import { PaymentElement, useCheckoutElements } from "@stripe/react-stripe-js/checkout"
import { ConfirmError } from "@stripe/stripe-js"
import { useState } from "react"

export default function CheckoutForm({ shippingForm }: { shippingForm: ShippingFormInputs }) {

    const checkoutState = useCheckoutElements()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<ConfirmError | null>(null)

    if (checkoutState.type !== "success") {
        return null;
    }

    const handleClick = async () => {
        setLoading(true);
        await checkoutState.checkout.updateEmail(shippingForm.email);
        await checkoutState.checkout.updateShippingAddress({
            name: "shipping_address",
            address: {
                line1: shippingForm.address,
                city: shippingForm.city,
                country: "US",
            }
        });

        const res = await checkoutState.checkout.confirm()
        if(res.type === "error") {
            setError(res.error)
        }
        setLoading(false);
    };

    return (
        <form>
            <PaymentElement options={{ layout: 'accordion' }} />
            <button disabled={checkoutState.checkout.canConfirm || loading} onClick={handleClick}>
                {loading ? "Processing..." : "Pay"}
            </button>
            {error && <div>{error.message}</div>}
        </form>
    )
}