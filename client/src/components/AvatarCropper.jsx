// src/components/AvatarCropper.jsx
import React, { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../utils/cropUtils";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db, auth } from "../firebase/firebase.js";
import { doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

export default function AvatarCropper({ userDoc, onUpload }) {
    const [open, setOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [uploading, setUploading] = useState(false);

    const inputRef = useRef();

    // --- Handle file selection ---
    const onFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            return toast.error("Please select an image file.");
        }
        if (file.size > 2 * 1024 * 1024) {
            return toast.error("Max file size is 2MB.");
        }

        const reader = new FileReader();
        reader.onload = () => {
            setImageSrc(reader.result);
            setOpen(true);
        };
        reader.readAsDataURL(file);
    };

    // --- Crop event callback ---
    const onCropComplete = useCallback((croppedArea, croppedPixels) => {
        setCroppedAreaPixels(croppedPixels);
    }, []);

    // --- Upload cropped avatar ---
    const uploadCropped = async () => {
        if (!croppedAreaPixels || !imageSrc) {
            return toast.error("Nothing to crop.");
        }

        setUploading(true);

        try {
            const uid = auth.currentUser.uid;

            // Convert cropped image to blob
            const blob = await getCroppedImg(imageSrc, croppedAreaPixels, "image/jpeg", 0.9);

            // Create unique file path
            const filename = `avatars/${uid}_${uuidv4()}.jpg`;
            const storageRef = ref(storage, filename);

            // Upload file
            await uploadBytes(storageRef, blob, { contentType: "image/jpeg" });

            // Get URL & update Firestore
            const url = await getDownloadURL(storageRef);
            await updateDoc(doc(db, "users", uid), {
                avatar: url,
                updatedAt: new Date(),
            });

            // Update Firebase Auth profile
            await updateProfile(auth.currentUser, { photoURL: url });

            toast.success("Avatar updated successfully.");

            // Reset UI
            setOpen(false);
            setImageSrc(null);
            setCrop({ x: 0, y: 0 });
            setZoom(1);

            // Notify parent
            if (onUpload) onUpload();
        } catch (err) {
            console.error("Avatar upload error:", err);
            toast.error("Failed to upload avatar. Check storage rules or connection.");
        } finally {
            setUploading(false);
        }
    };

    // Helper: Get first initial
    const getInitial = (name) =>
        name?.trim()?.charAt(0)?.toUpperCase() || "U";

    return (
        <div>
            {/* Avatar + upload button */}
            <div className="flex items-center gap-4">
                {userDoc?.avatar ? (
                    <img
                        src={userDoc.avatar}
                        alt="avatar"
                        className="w-20 h-20 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-20 h-20 rounded-full bg-[#0DBF8C]/20 text-[#0DBF8C] flex items-center justify-center font-semibold text-xl">
                        {getInitial(userDoc?.name)}
                    </div>
                )}

                <div className="flex flex-col ">
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                        <span className="px-3 bg-[#FAFAFA] py-2 text-sm border-[#E4E4E7] border rounded-xl">
                            Change Photo
                        </span>
                        <input
                            ref={inputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={onFileChange}
                        />
                    </label>
                    <p className="text-xs text-gray-500 mt-1">JPG, PNG, GIF — Max 2MB</p>
                </div>
            </div>

            {/* Crop Modal */}
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />

                    <div className="relative bg-white rounded-md w-full max-w-3xl p-4">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-medium">Crop Avatar</h3>
                            <button onClick={() => setOpen(false)} className="text-gray-500">
                                Close
                            </button>
                        </div>

                        <div className="h-64 relative bg-gray-100">
                            <Cropper
                                image={imageSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                        </div>

                        <div className="flex items-center gap-3 mt-3">
                            <input
                                type="range"
                                min={1}
                                max={3}
                                step={0.01}
                                value={zoom}
                                onChange={(e) => setZoom(Number(e.target.value))}
                                className="w-full"
                            />

                            <button
                                className="px-4 py-2 bg-[#0DBF8C] text-white rounded-md disabled:opacity-50"
                                onClick={uploadCropped}
                                disabled={uploading}
                            >
                                {uploading ? "Uploading..." : "Upload"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
