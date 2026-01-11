import React from "react";

const BillingHistory = ({ invoices }) => {
    return (
        <section className="mt-12 rounded-3xl border border-gray-200 bg-white p-6">
            <h3 className="text-sm font-semibold text-gray-900">Billing History</h3>
            <p className="text-xs text-gray-500 mb-4">View your past invoices</p>

            <div className="space-y-3">
                {invoices.map((invoice) => (
                    <div
                        key={invoice.id}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl bg-gray-50 px-4 py-3"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-200">
                                ▢
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-900">
                                    {invoice.title}
                                </p>
                                <p className="text-[11px] text-gray-500">{invoice.date}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-semibold text-gray-900">
                                ${invoice.amount}
                            </p>
                            <span className="mt-1 inline-block rounded-full bg-emerald-50 px-2 py-[2px] text-[10px] font-semibold text-emerald-700">
                                {invoice.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BillingHistory;
