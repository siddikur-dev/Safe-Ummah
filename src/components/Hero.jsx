import React from "react";

export default function Hero() {
  return (
    <section className="relative w-full bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-8 left-10 w-72 h-72 bg-red-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between py-16 px-4 lg:px-8">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left mb-12 lg:mb-0 lg:pr-12">
            <div className="inline-flex items-center px-4 py-2 bg-red-50 border border-red-200 rounded-full text-red-600 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
              Welcome to Next Product
            </div>
            
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight mb-6">
              Discover Amazing
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
                Products
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed max-w-2xl lg:max-w-none">
              Experience the future of shopping with our curated collection of premium products. 
              Quality, innovation, and unbeatable prices await you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg border-0 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50"
              >
                Explore Products
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              
              {/* <a
                href="/dashboard"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-red-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg border-2 border-red-200 hover:border-red-300 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Dashboard
              </a> */}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">500+</div>
                <div className="text-gray-600">Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">10K+</div>
                <div className="text-gray-600">Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">24/7</div>
                <div className="text-gray-600">Support</div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Main product showcase */}
              <div className="relative w-80 h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-red-50 to-red-100 rounded-3xl shadow-2xl p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Premium Quality</h3>
                  <p className="text-gray-600">Handpicked products for you</p>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-2xl shadow-lg flex items-center justify-center animate-bounce">
                <span className="text-white font-bold text-2xl">★</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-400 rounded-2xl shadow-lg flex items-center justify-center animate-bounce" style={{animationDelay: '1s'}}>
                <span className="text-white font-bold text-xl">✓</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg className="w-full h-20" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="white" d="M0,0L48,10C96,20,192,40,288,50C384,60,480,60,576,50C672,40,768,20,864,20C960,20,1056,40,1152,50C1248,60,1344,60,1392,60L1440,60L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"/>
        </svg>
      </div>
    </section>
  );
}
