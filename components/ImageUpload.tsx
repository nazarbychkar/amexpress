"use client"; // needed for React state/hooks
import { useState } from "react";
import myImage from "@/../sale-banner.png";
import Image from "next/image";

export default function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Example upload handler (you would implement actual server upload)
  const handleUpload = async () => {
    if (!selectedImage) return;
    // Example: send image to server API
    const formData = new FormData();
    formData.append("image", selectedImage);

    const res = await fetch("/api/upload-image", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Image uploaded successfully!");
      setSelectedImage(null);
      setPreviewSrc(null);
    } else {
      alert("Upload failed");
    }
  };

  return (
    <div className="mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Update Banner Image</h2>
      <div className="mb-4">
        <Image
          src={previewSrc || myImage}
          alt="Banner"
          width={600}
          height={200}
          className="rounded"
        />
      </div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button
        onClick={handleUpload}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Upload
      </button>
    </div>
  );
}
