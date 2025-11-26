'use client'
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductCard({ product, isHighlighted = false }) {
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter();

  // Validate image URL and provide fallback
  const getValidImageUrl = () => {
    if (!product.image || product.image.trim() === '') {
      return '/placeholder-product.jpg';
    }
    
    // Check if it's a valid URL
    try {
      new URL(product.image);
      return product.image;
    } catch {
      // If it's not a valid URL, check if it's a valid path
      if (product.image.startsWith('/')) {
        return product.image;
      }
      return '/placeholder-product.jpg';
    }
  };

  const handleViewDetails = () => {
    router.push(`/products/${product._id}`);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleQuickView = () => {
    // TODO: Implement quick view functionality
    console.log('Quick view:', product.name);
  };

  const handleCompare = () => {
    // TODO: Implement compare functionality
    console.log('Compare:', product.name);
  };

  return (
    <div className={`relative bg-white rounded-lg shadow-lg overflow-hidden group transition-all duration-300 hover:ring-2 hover:ring-red-500 ${
      isHighlighted ? 'ring-2 ring-red-500' : ''
    }`}>
      {/* Product Image Container */}
      <div className="relative overflow-hidden">
        <Image
          src={getValidImageUrl()}
          alt={product.name || 'Product'}
          width={300}
          height={300}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          unoptimized={!getValidImageUrl().startsWith('/')}
        />
        
        {/* Interactive Icons Overlay */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            onClick={handleLike}
            className={`w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md transition-all duration-200 hover:bg-red-50 ${
              isLiked ? 'text-red-500' : 'text-red-500'
            }`}
          >
            <svg className="w-4 h-4" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4">
        {/* Category */}
        <p className="text-red-500 text-sm font-medium mb-2 text-center">
          {product.category || 'Electronics'}
        </p>
        
        {/* Product Name */}
        <h3 className="text-gray-900 font-semibold text-lg mb-2 line-clamp-2 text-center">
          {product.name}
        </h3>
        
        {/* Price */}
        <p className="text-gray-900 font-bold text-xl mb-3 text-center">
          ${product.price || '0.00'}
        </p>
        
        {/* Rating */}
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-5 h-5 ${
                  star <= (product.rating || 4) ? 'text-yellow-400' : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-gray-600 text-sm ml-2">
            ({product.rating || 4}/5)
          </span>
        </div>
        
        {/* View Details Button */}
        <button
          onClick={handleViewDetails}
          className="w-full bg-base-100 border-2 border-red-500 text-black font-semibold py-2 px-4 rounded-lg hover:bg-red-600 hover:border-red-600 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-center"
        >
          VIEW DETAILS
        </button>
      </div>
    </div>
  );
}
