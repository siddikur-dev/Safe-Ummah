
import { notFound } from "next/navigation";
import clientPromise from "@/lib/dbconnect";
import { ObjectId } from "mongodb";
import Image from "next/image";

export default async function ProductDetailsPage({ params }) {
  const { id } = params;
  let product = null;
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    product = await db.collection("products").findOne({ _id: new ObjectId(id) });
  } catch (e) {
    // ignore
  }
  if (!product) return notFound();

  return (
    <section className="min-h-screen bg-white text-gray-900 px-4 py-12">
      <div className="max-w-[1440px] mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Details</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover amazing products tailored just for you. From electronics to gaming, we have everything you need.
          </p>
        </div>

        {/* Product Details Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image Section */}
            <div className="p-8">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="w-full h-auto object-cover rounded-lg"
                  priority
                />
              </div>
            </div>

            {/* Product Information Section */}
            <div className="p-8 flex flex-col justify-center">
              {/* Category */}
              <p className="text-red-500 text-sm font-medium mb-3 uppercase tracking-wide">
                {product.category || 'Electronics'}
              </p>

              {/* Product Title */}
              <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h2>

              {/* Product Description */}
              <div className="mb-6">
                <p className="text-gray-600 text-base leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <p className="text-3xl font-bold text-gray-900">
                  ${product.price || '0.00'}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-6 h-6 ${
                        star <= (product.rating || 4) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600 text-sm ml-3">
                  ({product.rating || 4}/5)
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-red-500 border-2 border-red-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-600 hover:border-red-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-center">
                  ADD TO CART
                </button>
                <button className="flex-1 bg-white border-2 border-red-500 text-red-500 font-semibold py-2 px-6 rounded-lg hover:bg-red-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-center">
                  BUY NOW
                </button>
              </div>

              {/* Product ID */}
              <p className="text-xs text-gray-400 mt-6">
                Product ID: {product._id.toString()}
              </p>
            </div>
          </div>
        </div>

        {/* Back to Products Link */}
        <div className="text-center mt-8">
          <a 
            href="/products" 
            className="inline-flex items-center text-red-500 hover:text-red-600 font-medium transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Products
          </a>
        </div>
      </div>
    </section>
  );
}
