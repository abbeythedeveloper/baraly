import React from "react";

const PaymentMethod = ({ method, onUpdate }) => {
    return (
        <section className="mt-6 rounded-3xl border border-gray-200 bg-white p-6">
            <h3 className="text-sm font-semibold text-gray-900">Payment Method</h3>
            <p className="text-xs text-gray-500 mb-4">
                Manage your payment methods
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl bg-gray-50 px-4 py-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                        💳
                    </div>
                    <div>
                        <p className="text-xs font-medium text-gray-900">
                            {method.label}
                        </p>
                        <p className="text-[11px] text-gray-500">
                            Expires {method.expires}
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onUpdate}
                    className="rounded-full bg-white px-4 py-2 text-xs font-medium text-gray-700 border border-gray-200 hover:bg-gray-50"
                >
                    Update
                </button>
            </div>
        </section>
    );
};

export default PaymentMethod;
