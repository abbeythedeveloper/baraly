import { useState, useEffect } from "react";
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    onSnapshot,
    doc,
    query,
    where,
    orderBy,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default function useCalendarEvents(userId) {
    const [events, setEvents] = useState([]);

    // -----------------------------
    // Realtime listener (SINGLE source of truth)
    // -----------------------------
    useEffect(() => {
        if (!userId) return;

        const q = query(
            collection(db, "calendarEvents"),
            where("userId", "==", userId),
            orderBy("date", "asc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((docSnap) => ({
                id: docSnap.id,      // ✅ Firestore DOCUMENT ID (critical fix)
                ...docSnap.data(),
            }));
            setEvents(data);
        });

        return () => unsubscribe();
    }, [userId]);

    // -----------------------------
    // Date normalizer (single format: YYYY-MM-DD)
    // -----------------------------
    const normalizeDate = (value) => {
        if (!value) return "";

        // dd/mm/yyyy → yyyy-mm-dd
        if (value.includes("/")) {
            const [dd, mm, yyyy] = value.split("/");
            return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
        }

        // Any JS-date-compatible input
        const date = new Date(value);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    // -----------------------------
    // CREATE
    // -----------------------------
    const addEvent = async (data) => {
        const payload = {
            ...data,
            userId,                       // ownership
            createdAt: Date.now(),
            date: normalizeDate(data.date),
        };

        await addDoc(collection(db, "calendarEvents"), payload);
    };

    // -----------------------------
    // UPDATE (USES DOCUMENT ID — FIXED)
    // -----------------------------
    const editEvent = async (id, updates) => {
        const ref = doc(db, "calendarEvents", id);

        const payload = {
            ...updates,
            date: updates.date
                ? normalizeDate(updates.date)
                : undefined,
        };

        // remove undefined fields (Firestore-safe)
        Object.keys(payload).forEach(
            (key) => payload[key] === undefined && delete payload[key]
        );

        await updateDoc(ref, payload);
    };

    // -----------------------------
    // DELETE
    // -----------------------------
    const deleteEvent = async (id) => {
        const ref = doc(db, "calendarEvents", id);
        await deleteDoc(ref);
    };

    return {
        events,
        addEvent,
        editEvent,
        deleteEvent,
    };
}

