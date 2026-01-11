import React from 'react'
import BackButton from './BackButton.jsx'
import OrderSummary from './OrderSummary.jsx'
import PaymentDetails from './PaymentDetails.jsx'
import { resolvePrice } from "../../utils/priceResolver";
import { formatPrice } from "../../utils/formatPrice";

const CheckoutLayout = ({ plan, tier, billingCycle, region }) => {
    const priceData = resolvePrice(
        tier.basePrice[billingCycle],
        region
    );

    const displayPrice = formatPrice(
        priceData.display.amount,
        priceData.display.code
    );
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-6xl px-6 py-10">
                <BackButton />

                <div className="mt-6 flex gap-6">
                    <OrderSummary
                        plan={plan}
                        tier={tier}
                        billingCycle={billingCycle}
                        region={region}
                        displayPrice={displayPrice}
                    />

                    <PaymentDetails
                        plan={plan}
                        tier={tier}
                        billingCycle={billingCycle}
                        region={region}
                    />
                </div>
            </div>
        </div>

    )
}

export default CheckoutLayout