import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/authContext/UseAuth";
import ServiceSelector from "../new/ServiceSelector";
import RequestDetails from "../new/RequestDetails";
import ServiceDetailsRenderer from "../new/ServiceDetailsRenderer";
import AttachmentsSection from "../new/AttachmentsSection";
import AdditionalNotes from "../new/AdditionalNotes";
import RequestActions from "../new/RequestActions";

const NewRequestView = () => {
    const { userData } = useAuth();
    const userId = userData?.uid;



    return (
        <div className="space-y-6 max-w-6xl">
            <ServiceSelector
            />

            <div className="space-y-6 bg-white rounded-xl">
                <RequestDetails
                />

                <ServiceDetailsRenderer
                />

                <AttachmentsSection
                />

                <AdditionalNotes
                />

                <RequestActions
                />
            </div>
        </div>
    );
};

export default NewRequestView;
