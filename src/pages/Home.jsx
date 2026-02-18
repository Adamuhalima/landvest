import React from "react";
function Home() {
  return (
    <div className="">
      {/* Navbar */}
      

      {/* Hero Section */}
      <section className="">
        <div className="text-center">
          <h1 className="">
            Invest in Premium
            <span className="text-sky-400"> Land Properties</span>
          </h1>
          <p className="text-lg md:text-xl text-center text-gray-300 mb-8 max-w-3xl mx-auto">
            Discover verified land opportunities with secure transactions and transparent processes. Start building your real estate portfolio today.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-sky-400 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-sky-500 transition-colors">
              Browse Properties
            </button>
            <button className="border-2 border-sky-400 text-sky-400 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-sky-400 hover:text-gray-900 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-24 py-20">
        <h2 className="font-heading text-4xl font-bold text-white text-center mb-12">
          Why Choose LandVest?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-gray-800 p-8 rounded-lg hover:bg-gray-750 transition-colors">
            <div className="text-sky-400 text-4xl mb-4 bg-yellow">🏆</div>
            <h3 className="font-heading text-2xl font-bold text-white mb-3">
              Verified Properties
            </h3>
            <p className="text-gray-300">
              All land properties are thoroughly verified and documented for your peace of mind.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-800 p-8 rounded-lg hover:bg-gray-750 transition-colors">
            <div className="text-sky-400 text-4xl mb-4">🔒</div>
            <h3 className="text-pink-500 font-bold">
              Secure Transactions
            </h3>
            <p className="text-gray-300">
              Your investments are protected with secure payment gateways and legal documentation.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-800 p-8 rounded-lg hover:bg-gray-750 transition-colors">
            <div className="text-sky-400 text-4xl mb-4">📈</div>
            <h3 className="font-heading text-2xl font-bold text-white mb-3">
              Growth Potential
            </h3>
            <p className="text-gray-300">
              Access prime locations with high appreciation potential for maximum returns.
            </p>
          </div>
        </div>
      </section>
      {/* Properties Section */}
<section className="max-w-7xl mx-auto px-6 lg:px-24 py-20">
  <h2 className="font-heading text-4xl font-bold text-white text-center mb-12">
    Featured Properties
  </h2>
  {/* Add property cards here */}
</section>
    </div>
  );
}

export default Home;