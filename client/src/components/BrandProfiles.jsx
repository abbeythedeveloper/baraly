// src/components/BrandProfiles.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase.js";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

export default function BrandProfiles({ currentBrand, uid }) {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Example: fetch brands where owner == uid
        const fetch = async () => {
            try {
                const q = query(collection(db, "brands"), where("owner", "==", uid));
                const snaps = await getDocs(q);
                setBrands(snaps.docs.map(d => ({ id: d.id, ...d.data() })));
            } catch (err) {
                console.error("brand fetch:", err);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [uid]);

    const createBrand = async () => {
        const name = prompt("New brand name");
        if (!name) return;
        try {
            const docRef = await addDoc(collection(db, "brands"), {
                name,
                owner: uid,
                createdAt: new Date()
            });
            setBrands((s) => [{ id: docRef.id, name, owner: uid }, ...s]);
        } catch (err) {
            console.error(err);
            alert("Could not create brand");
        }
    };

    return (
        <div className="bg-white border rounded-xl p-4 shadow-sm">
            <h3 className="text-sm font-medium mb-3">Brand Profiles</h3>
            <p className="text-xs text-gray-500 mb-3">Switch between your brands</p>

            <div className="space-y-2">
                {loading && <div className="text-xs text-gray-400">Loading brands…</div>}
                {brands.map((b) => (
                    <div key={b.id} className={`flex items-center justify-between p-2 rounded-md border ${b.name === currentBrand ? "bg-[#0DBF8C]/10 border-[#0DBF8C]" : "bg-white"}`}>
                        <div className="text-sm">{b.name}</div>
                        {b.name === currentBrand && <span className="text-xs bg-[#0DBF8C] text-white px-2 py-0.5 rounded-full">Active</span>}
                    </div>
                ))}

                <button onClick={createBrand} className="w-full text-sm border rounded-md px-3 py-2 mt-2">+ Create New Brand</button>
            </div>
        </div>
    );
}
