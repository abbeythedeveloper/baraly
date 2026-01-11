import React from 'react'
import { useAuth } from "../../contexts/authContext/UseAuth.jsx";

const PaymentDetails = ({ plan, tier, billingCycle }) => {
    const { currentUser } = useAuth();


    const handlePayment = () => {
        console.log("Payment handler not implemented yet");
    };

    if (!currentUser?.email) {
        return (
            <button
                disabled
                className="mt-6 w-full rounded-lg bg-gray-300 py-3"
            >
                Loading payment…
            </button>
        );
    }



    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm max-w-lg border-gray-200 border">
            <h3 className="text-lg font-semibold">Payment Details</h3>
            <p className="text-sm font-light text-gray-500">
                Secure Payment via Paystack
                For your security, card details are entered only on Paystack.
                Click “Complete Payment” to continue to Paystack’s secure checkout.
            </p>

            <form className="mt-6 space-y-4">
                <Input label="Cardholder Name" disabled />
                <Input label="Card Number" disabled />
                <div className="border-b border-gray-200 pb-7 grid grid-cols-2 gap-4">
                    <Input label="Expiry Date" disabled />
                    <Input label="CVV" disabled />
                </div>

                <Input label="Billing Email" value={currentUser.email} />
                <Input label="Billing Address" />

                <div className="grid grid-cols-2 gap-4">
                    <Input label="City" />
                    <Input label="ZIP Code" />
                </div>

                <button
                    type="button"
                    onClick={handlePayment}
                    className="mt-6 w-full cursor-pointer rounded-xl bg-linear-to-r from-emerald-500 to-emerald-900 py-3 text-white font-medium"
                >
                    {/* Complete Payment */}
                    Payment setUp coming soon.

                </button>
            </form>
        </div>
    );
};

const Input = ({ label, disabled = false, value }) => (
    <div>
        <label className="text-sm font-medium">{label}</label>
        <input
            disabled={disabled}
            value={value}
            readOnly={!!value}
            className={`mt-1 w-full rounded-lg border-gray-200 border px-3 py-2 text-sm ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-gray-50"
                }`}
        />
    </div>
);


export default PaymentDetails