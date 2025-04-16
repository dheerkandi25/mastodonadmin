"use client";
import React, { useState } from "react";

const AdminDashboard = () => {
  const [uploads, setUploads] = useState<{ id: string; name: string }[]>([]);
  const [error, setError] = useState("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const accessToken = localStorage.getItem("adminAccessToken");

    if (!accessToken) {
      setError("Access token not found. Please log in again.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:5000/app/addFile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("File upload failed.");
      }

      const data = await response.json();
      setUploads((prev) => [...prev, { id: data.id, name: file.name }]);
    } catch (err: any) {
      setError(err.message || "An error occurred during file upload.");
    }
  };

  const handleLinkUpload = async () => {
    const url = prompt("Paste the link to upload:");
    if (!url) return;

    const accessToken = localStorage.getItem("adminAccessToken");

    if (!accessToken) {
      setError("Access token not found. Please log in again.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/app/addweburl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ "url":url }),
      });

      if (!response.ok) {
        throw new Error("Link upload failed.");
      }

      const data = await response.json();
      setUploads((prev) => [...prev, { id: data.id, name: url }]);
    } catch (err: any) {
      setError(err.message || "An error occurred during link upload.");
    }
  };

  const handleDelete = async (id: string) => {
    const accessToken = localStorage.getItem("adminAccessToken");

    if (!accessToken) {
      setError("Access token not found. Please log in again.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/app/deleteLinks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ "id":id }),
      });

      if (!response.ok) {
        throw new Error("Delete failed.");
      }

      setUploads((prev) => prev.filter((upload) => upload.id !== id));
    } catch (err: any) {
      setError(err.message || "An error occurred during deletion.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-center text-2xl font-bold text-gray-700 mb-6">
        Welcome to Mastodon GPT
      </h1>
      <div className="text-center mb-6">
        <button
          onClick={() => document.getElementById("fileInput")?.click()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-4"
        >
          Upload Attachment
        </button>
        <input
          id="fileInput"
          type="file"
          className="hidden"
          onChange={handleFileUpload}
        />
        <button
          onClick={handleLinkUpload}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Upload Link
        </button>
      </div>
      {error && <p className="text-center text-red-500 mb-4">{error}</p>}
      <div className="max-w-3xl mx-auto">
        {uploads.map((upload) => (
          <div
            key={upload.id}
            className="flex justify-between items-center p-4 border border-gray-300 rounded-md bg-white mb-4"
          >
            <span className="text-gray-700">{upload.name}</span>
            <button
              onClick={() => handleDelete(upload.id)}
              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;