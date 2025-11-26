export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50 px-4">
      {/* Brand-colored loading spinner */}
      <div className="relative mb-8">
        <div className="animate-spin rounded-full h-30 w-30 border-4 border-gray-200 border-opacity-50"></div>
        <div className="absolute top-0 left-0 animate-spin rounded-full h-20 w-20 border-4 border-transparent border-t-red-500 border-r-red-500"></div>
        <div className="absolute top-0 left-0 animate-spin rounded-full h-20 w-20 border-4 border-transparent border-t-red-600 border-r-red-600" style={{animationDuration: '1.5s'}}></div>
      </div>
      
      {/* Loading text with brand styling */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Loading...</h2>
      <p className="text-gray-600 text-center max-w-md">
        Preparing amazing products for you
      </p>
      
      {/* Brand accent dots */}
      <div className="flex space-x-2 mt-6">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
      </div>
    </div>
  );
}
