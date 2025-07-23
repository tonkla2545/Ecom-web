import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { payment } from "../../api/stripe";
import useEcomStore from '../../store/ecom-store'
import CheckoutForm from "../../components/Checkoutform";

const stripePromise = loadStripe("pk_test_51RmqMHCNwQqwm3UokfVbwVCUdo9qD5lGjOpz88ldJX3g1cCgiZcTZd2R5jpG8rBbosXa0oq5tBTwZIX0i1fkIoYx00CuUEaxUg");


const Payment = () => {
    const token = useEcomStore((state) => state.token)
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        payment(token)
            .then((res) => {
                setClientSecret(res.data.clientSecret)
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const appearance = {
        theme: 'stripe',
    };
    // Enable the skeleton loader UI for optimal loading.
    const loader = 'auto';

    return (
        <div>
            {
                clientSecret && (
                    <Elements options={{clientSecret, appearance, loader}} stripe={stripePromise}>
                        <CheckoutForm/>
                    </Elements>
                )
            }
        </div>
    )
}

export default Payment
