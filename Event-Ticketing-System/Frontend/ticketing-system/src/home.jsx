import React from "react";
import Navbar from "./Navbar";

const HeroSection = () => {
  return (
    <div>
      <Navbar />
      <section className="relative bg-gradient-to-r from-purple-500 to-pink-500 text-white min-h-screen flex items-center">
        <div className="container mx-auto px-6 py-12 text-center md:text-left">
          <div className="grid md:grid-cols-2 items-center gap-6">
            {/* Text Content */}
            <div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Find & Book Tickets for Amazing Events!
              </h1>
              <p className="mt-6 text-lg md:text-xl">
                Discover concerts, festivals, and shows near you. Secure your
                spot and never miss out on the fun.
              </p>
              <div className="mt-8 flex justify-center md:justify-start space-x-4">
                <button className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-md hover:bg-gray-100">
                  Explore Events
                </button>
                <button className="px-6 py-3 bg-purple-700 font-semibold rounded-md hover:bg-purple-800">
                  Create Event
                </button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="hidden md:block">
              <img
                src="https://via.placeholder.com/500x400"
                alt="Event illustration"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white/10"></div>
      </section>
    </div>
  );
};

export default HeroSection;