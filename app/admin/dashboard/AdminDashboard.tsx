"use client";
import React, { useRef, useState } from "react";
import { FileText, Link as LinkIcon } from "lucide-react";

interface Upload {
  id: string;
  name: string;
  timestamp: string;
  type: "file" | "link";
}

const AdminDashboard = () => {
  const [uploads, setUploads] = useState<Upload[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDelete = (id: string) => {
    setUploads((prev) => prev.filter((upload) => upload.id !== id));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const newUpload: Upload = {
      id: Date.now().toString(),
      name: file.name,
      timestamp: "Just now",
      type: "file",
    };

    setUploads((prev) => [...prev, newUpload]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleLinkUpload = () => {
    const url = prompt("Paste the link to upload:");
    if (!url) return;

    const newUpload: Upload = {
      id: Date.now().toString(),
      name: url,
      timestamp: "Just now",
      type: "link",
    };

    setUploads((prev) => [...prev, newUpload]);
  };

  return (
    <div className="min-h-screen bg-pink-50 p-4">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        style={{ display: "none" }}
      />

      {/* Banner */}
      <div
        className="relative rounded-xl overflow-hidden p-6 mb-6 h-48 flex items-center justify-between bg-cover bg-center"
        style={{ backgroundImage: "url('/images/banner.png')" }}
      >
        <div className="absolute inset-0 bg-black/30 z-0" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between w-full">
          <div>
            <h1 className="text-5xl font-bold text-white">Welcome to Mastodon GPT</h1>
            <p className="text-md text-white mt-1">Subtitle</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-md shadow hover:bg-gray-100"
            >
              Upload Attachment
            </button>
            <button
              onClick={handleLinkUpload}
              className="px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-md shadow hover:bg-gray-100"
            >
              Upload Link
            </button>
          </div>
        </div>
      </div>

      {/* Upload list */}
      <div className="bg-white rounded-xl shadow p-4">
        {uploads.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No documents uploaded yet.</p>
        ) : (
          uploads.map((upload) => (
            <div
              key={upload.id}
              className="flex items-center justify-between border-b py-4 last:border-none"
            >
              <div className="flex items-center gap-4">
                <div className="bg-red-100 p-3 rounded-full">
                  {upload.type === "file" ? (
                    <FileText className="text-red-600" />
                  ) : (
                    <LinkIcon className="text-blue-600" />
                  )}
                </div>
                <div>
                  <p className="text-gray-800 font-medium">{upload.name}</p>
                  <p className="text-gray-500 text-sm">Uploaded {upload.timestamp}</p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(upload.id)}
                className="px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 text-sm"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
