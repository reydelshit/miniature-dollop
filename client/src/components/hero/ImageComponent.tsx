import React from 'react';

interface ImageComponentProps {
  buffer: {
    type: string; // This can be 'Buffer' or any other type, in this case 'Buffer'
    data: number[]; // Array of bytes
  };
  alt?: string;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ buffer, alt }) => {
  // Convert Buffer data to Base64
  const bufferToBase64 = (data: number[]) => {
    const binary = String.fromCharCode(...data);
    return btoa(binary);
  };

  // Convert Buffer to Base64 and create the data URL
  const base64String = bufferToBase64(buffer.data);
  const imageSrc = `data:image/png;base64,${base64String}`;

  return (
    <img className="h-[15rem] w-full object-cover" src={imageSrc} alt={alt} />
  );
};

export default ImageComponent;
