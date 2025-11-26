

'use client'
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        const productsData = data.products || [];
        setProducts(productsData);
        setFilteredProducts(productsData);
        setCount(productsData.length);
      });
  }, []);

  // Filter products based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        (product.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (product.description?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (product.category?.toLowerCase() || '').includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <section className="min-h-screen bg-white text-gray-900 px-4 py-12">
      <div className="max-w-[1440px] mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-red-50 border border-red-200 rounded-full text-red-600 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            Products
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Discover Our
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
              Amazing Products
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of high-quality products designed to enhance your lifestyle.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto my-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search products by name, description, or category..."
                value={searchTerm}
                onChange={handleSearch}
                className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-500 transition-all duration-200"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            
            {/* Search Results Info */}
            <div className="mt-4 text-sm text-gray-600">
              {searchTerm ? (
                <span>
                  Showing {filteredProducts.length} of {products.length} products
                  {searchTerm && (
                    <span className="text-red-500 font-medium"> for "{searchTerm}"</span>
                  )}
                </span>
              ) : (
                <span>Total Products: {products.length}</span>
              )}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center text-gray-600 col-span-full py-12">
              {searchTerm ? (
                <div>
                  <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <p className="text-lg font-medium text-gray-900 mb-2">No products found</p>
                  <p className="text-gray-500">Try adjusting your search terms or browse all products</p>
                  <button
                    onClick={clearSearch}
                    className="mt-4 inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                <div>
                  <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p className="text-lg font-medium text-gray-900 mb-2">No products available</p>
                  <p className="text-gray-500">Check back later for new products</p>
                </div>
              )}
            </div>
          ) : (
            filteredProducts.map((product, index) => (
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
