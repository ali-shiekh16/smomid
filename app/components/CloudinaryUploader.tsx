'use client';

import React, { useState } from 'react';

interface CloudinaryUploaderProps {
  onImageUploaded: (url: string) => void;
  currentImage?: string;
}

export default function CloudinaryUploader({
  onImageUploaded,
  currentImage,
}: CloudinaryUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset states
    setError(null);
    setIsUploading(true);
    setUploadProgress(0);

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      setIsUploading(false);
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB');
      setIsUploading(false);
      return;
    }

    try {
      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append(
        'upload_preset',
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'smomid'
      );

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) return 90;
          return prev + 10;
        });
      }, 300);

      // Upload to Cloudinary
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      clearInterval(progressInterval);

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setUploadProgress(100);

      // Return the secure URL of the uploaded image
      onImageUploaded(data.secure_url);

      // Reset after a moment
      setTimeout(() => {
        setUploadProgress(0);
        setIsUploading(false);
      }, 1000);
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload image. Please try again.');
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className='w-full'>
      <div className='flex flex-col space-y-2'>
        {currentImage && (
          <div className='relative w-full h-40 mb-4 border rounded-md overflow-hidden'>
            <img
              src={currentImage}
              alt='Current image'
              className='object-cover w-full h-full'
            />
          </div>
        )}

        <div className='flex items-center space-x-3'>
          <label className='block'>
            <span className='sr-only'>Choose image</span>
            <input
              type='file'
              accept='image/*'
              onChange={handleFileChange}
              disabled={isUploading}
              className='block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100
              '
            />
          </label>
        </div>

        {isUploading && (
          <div className='w-full bg-gray-200 rounded-full h-2.5 mt-2'>
            <div
              className='bg-indigo-600 h-2.5 rounded-full'
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}

        {error && <p className='text-sm text-red-600 mt-1'>{error}</p>}

        <p className='text-xs text-gray-500 mt-1'>
          Supported formats: JPEG, PNG, WebP, AVIF. Max size: 5MB.
        </p>
      </div>
    </div>
  );
}
