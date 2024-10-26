"use client"

import { useQuery } from "@tanstack/react-query";
import { getPaymentStatus } from "./actions";

const ThankYou = () => {

    const {} = useQuery({
        queryKey: ["get-payment-status"],
        queryFn: async () => await getPaymentStatus(),
    })
    return (
        <div>
            <h1>Thank you for your purchase!</h1>
            <p>
                You will receive an email confirmation shortly.
            </p>
        </div>
    );
}

export default ThankYou;