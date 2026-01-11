import { useRef, useState } from "react";
import { ATTACHMENT_CONFIG } from "../../../config/requestAttachments.config"

const AttachmentsSection = ({ service }) => {
    const inputRef = useRef(null);
    const [files, setFiles] = useState([]);

    const config = ATTACHMENT_CONFIG[service] ?? ATTACHMENT_CONFIG.graphics

    const handleFiles = (fileList) => {
        const incoming = Array.from(fileList).map((file) => ({
            id: crypto.randomUUID(),
            name: file.name,
        }));
        setFiles((prev) => [...prev, ...incoming]);
    };

    const removeFile = (id) => {
        setFiles((prev) => prev.filter((f) => f.id !== id));
    };

    return (
        <div className="mt-8 rounded-2xl bg-white p-6 space-y-4">
            {/* Header */}
            <h4 className="text-sm font-medium text-gray-900 mb-2">
                {config.title}
            </h4>

            <p className="mt-1 text-xs text-gray-500">
                {config.helper}
            </p>

            {/* Dropzone */}
            <div
                onClick={() => inputRef.current?.click()}
                className="
                    rounded-xl
                    border-2
                    border-dashed
                    border-gray-400
                    bg-white
                    p-10
                    text-center
                    hover:bg-emerald-50/40
                    hover:border-emerald-300
                    transition
                "
            >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
                    <svg
                        className="h-9 w-9 text-gray-400 "
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 16v-8m0 0l-3 3m3-3l3 3M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1"
                        />
                    </svg>
                </div>

                <p className="text-sm text-gray-600">
                    Drag and drop files or click to browse
                </p>

                <p className="mt-1 text-xs text-gray-400">
                    {config.hint}
                </p>

                <button
                    type="button"
                    className="
                        mt-4
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-gray-300
                        bg-[#F7F7F8]
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-gray-600
                        hover:bg-emerald-50
                        cursor-pointer
                        hover:text-emerald-400
                        hover:border-emerald-400
                    "
                >
                    <span className="text-xl leading-none">+</span>
                    Add File
                </button>

                <input
                    ref={inputRef}
                    type="file"
                    multiple
                    hidden
                    onChange={(e) => handleFiles(e.target.files)}
                />
            </div>

            {/* File list */}
            {files.length > 0 && (
                <div className="mt-4 space-y-2">
                    {files.map((file) => (
                        <div
                            key={file.id}
                            className="
                                flex
                                items-center
                                justify-between
                                rounded-lg
                                border
                                bg-white
                                px-4
                                py-3
                                text-sm
                            "
                        >
                            <span className="text-gray-700 truncate">
                                {file.name}
                            </span>

                            <button
                                type="button"
                                onClick={() => removeFile(file.id)}
                                className="
                                    text-gray-400
                                    hover:text-gray-700
                                    text-xl
                                    leading-none
                                "
                                aria-label="Remove file"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AttachmentsSection