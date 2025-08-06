import React, { useState } from 'react'
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;


export default function JournalUpload({ onUpload }) {
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);

const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      // console.log('Uploaded image URL:', data.secure_url);
      onUpload(data.secure_url);
    } else {
      throw new Error(data.error.message || 'Upload failed');
    }
  } catch (err) {
    console.error('Upload error:', err.message);
    alert('Image upload failed.');
  }
};

  return (
   <div className="image-upload-container">
  <h2>Upload Image to Journal</h2>
  <input type="file" accept="image/*" onChange={handleImageUpload} />

  {uploading && <p className="uploading">Uploading...</p>}

  {imageUrl && (
    <div className="uploaded-image-preview">
      <p>Uploaded Image:</p>
      <img src={imageUrl} alt="Uploaded" />
    </div>
  )}
</div>

  );
}
