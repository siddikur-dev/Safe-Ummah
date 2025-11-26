
'use client'
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

export default function FeaturesProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts((data.products || []).slice(0, 4)));
  }, []);

  return (
    <section className="py-16 px-4 bg-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-red-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-red-50 border border-red-200 rounded-full text-red-600 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            Featured
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our Featured
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
              Products
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products that stand out for their quality and innovation.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {products.length === 0 ? (
            <div className="text-center text-gray-600 col-span-full py-8">No featured products found.</div>
          ) : (
            products.map((product, index) => (
              <ProductCard 
                key={product._id} 
                product={product}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
