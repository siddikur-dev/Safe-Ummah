"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function AddProductPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading") return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
  
  if (!session) return null;

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    console.log("Submitting form..."); // Debug log
    
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        user: session?.user ? {
          name: session.user.name,
          email: session.user.email,
          image: session.user.image
        } : undefined
      })
    });
    
    setLoading(false);
    console.log("Response status:", res.status); // Debug log
    
    if (res.ok) {
      console.log("Success! Showing toast..."); // Debug log
      setForm({ name: "", description: "", price: "", image: "", category: "" });
      toast.success("Product added successfully!");
    } else {
      console.log("Failed! Showing error toast..."); // Debug log
      toast.error("Failed to add product.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Toast Container - Root Level */}
      <Toaster position="top-center" />
      
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-red-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-red-50 border border-red-200 rounded-full text-red-600 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            Dashboard
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Add New
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
              Product
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create and add new products to your store. Fill in the details below to get started.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 w-full max-w-2xl">
          <form className="w-full space-y-6" onSubmit={handleSubmit}>
            {/* Product Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input 
                id="name"
                name="name" 
                value={form.name} 
                onChange={handleChange} 
                placeholder="Enter product name" 
                required 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-500 transition-all duration-200" 
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select 
                id="category"
                name="category" 
                value={form.category} 
                onChange={handleChange} 
                required 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 bg-white transition-all duration-200"
              >
                <option value="">Select a category</option>
                <option value="Electronics">Electronics</option>
                <option value="Sports">Sports</option>
                <option value="Books">Books</option>
                <option value="Automotive">Automotive</option>
                <option value="Toys & Games">Toys & Games</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea 
                id="description"
                name="description" 
                value={form.description} 
                onChange={handleChange} 
                placeholder="Describe your product..." 
                required 
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-500 resize-none transition-all duration-200" 
              />
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Price *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input 
                  id="price"
                  type="number" 
                  name="price" 
                  value={form.price} 
                  onChange={handleChange} 
                  placeholder="0.00" 
                  required 
                  min="0"
                  step="0.01"
                  className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-500 transition-all duration-200" 
                />
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Image URL *
              </label>
              <input 
                id="image"
                name="image" 
                value={form.image} 
                onChange={handleChange} 
                placeholder="https://example.com/image.jpg" 
                required 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder-gray-500 transition-all duration-200" 
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-red-500 border-2 border-red-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-600 hover:border-red-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 disabled:bg-red-400 disabled:border-red-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Adding Product...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Product
                </div>
              )}
            </button>
          </form>

          {/* Back to Dashboard */}
          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <a 
              href="/" 
              className="inline-flex items-center text-red-500 hover:text-red-600 font-medium transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
