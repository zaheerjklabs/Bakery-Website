import React, { useState } from 'react';
import { Cake } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackText?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackText,
  className = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (hasError || !src) {
    return (
      <div
        className={`bg-[#FFF0F2] flex flex-col items-center justify-center p-4 text-[#E85D7D] ${className}`}
        aria-label={alt}
      >
        <Cake className="w-8 h-8 mb-2 opacity-80" strokeWidth={1.5} />
        <span className="text-xs font-medium text-center text-[#777078]">
          {fallbackText || alt || 'Artisanal Cake'}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-[#FFF5F7] animate-pulse flex items-center justify-center">
          <Cake className="w-6 h-6 text-[#F8B4C4] animate-spin" strokeWidth={1.5} />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        {...props}
      />
    </div>
  );
};
