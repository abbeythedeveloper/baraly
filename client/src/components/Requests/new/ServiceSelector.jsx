import { SERVICES } from "../constants/services";
import ServiceCard from "../services/ServiceCard";

const ServiceSelector = ({ value, onChange }) => {
    return (
        <section className="rounded-2xl bg-white p-6 shadow-sm max-w-6xl">
            <h3 className="text-base font-semibold text-gray-900">
                Select Service Type
            </h3>

            <p className="mt-1 text-sm text-gray-500">
                Choose the type of service you need
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {SERVICES.map((service) => (
                    <ServiceCard
                        key={service.id}
                        icon={service.icon}
                        label={service.label}
                        gradient={service.gradient}
                        active={value === service.id}
                        onClick={() => onChange(service.id)}
                    />
                ))}
            </div>
        </section>
    );
}

export default ServiceSelector
