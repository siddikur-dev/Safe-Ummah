import React from "react";

export default function CallToAction() {
  return (
                        <section className="relative w-full bg-gradient-to-br from-red-50 to-red-100 overflow-hidden py-20">
      

      <div className="max-w-[1440px] mx-auto relative z-10 px-4 lg:px-8">
        <div className="text-center">
                     {/* Badge */}
                       <div className="inline-flex items-center px-6 py-3 bg-red-500/10 backdrop-blur-sm border border-red-200 rounded-full text-red-700 text-sm font-medium mb-8">
              Limited Time Offer
            </div>
           
           {/* Main heading */}
           <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6 max-w-4xl mx-auto">
             Ready to Transform Your
             <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
               Shopping Experience?
             </span>
           </h2>
           
           {/* Description */}
           <p className="text-xl lg:text-2xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
             Join thousands of satisfied customers who have discovered amazing products at unbeatable prices. 
             Start exploring today and unlock exclusive deals!
           </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="/products"
              className="inline-flex items-center justify-center px-10 py-5 bg-white text-red-600 font-bold rounded-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 text-lg border-0 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 min-w-[200px]"
            >
              Shop Now
              <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            
                         <a
               href="/login"
               className="inline-flex items-center justify-center px-10 py-5 bg-red-500 text-white font-bold rounded-xl shadow-lg hover:bg-red-600 transition-all duration-300 text-lg border-0 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 min-w-[200px]"
             >
               Get Started
               <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
               </svg>
             </a>
          </div>
          
                     {/* Trust indicators */}
           <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
             <div className="flex items-center gap-2">
               <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
               </svg>
               <span className="font-medium">Secure Shopping</span>
             </div>
             <div className="flex items-center gap-2">
               <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
               </svg>
               <span className="font-medium">Fast Delivery</span>
             </div>
             <div className="flex items-center gap-2">
               <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
               </svg>
               <span className="font-medium">30-Day Returns</span>
             </div>
           </div>
        </div>
      </div>


    </section>
  );
}
