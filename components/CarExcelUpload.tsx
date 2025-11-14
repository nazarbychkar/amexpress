"use client";

import { useState } from "react";

export default function CarExcelUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/cars/bulk", {
      method: "POST",
      body: formData,
    });

    setLoading(false);

    if (res.ok) {
      alert("Cars imported successfully!");
    } else {
      const data = await res.json();
      alert("Error: " + data.message);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-3">Import Cars from Excel</h2>

      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4 border"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        {loading ? "Uploading..." : "Upload File"}
      </button>
    </div>
  );
}
