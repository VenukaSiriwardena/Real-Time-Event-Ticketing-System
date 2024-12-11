import React from "react";
import Navbar from "./Navbar";

const EventSection = () => {
  const events = [
    {
      id: 1,
      title: "Music Fest 2025",
      date: "May 11, 2025",
      location: "Central Park, NY",
      description: "Join us for a day filled with music, food, and fun!",
      image: "https://via.placeholder.com/400x200",
    },
  ];

  return (
    <div className="w-full">
      <Navbar />
      {/* Adjust for fixed navbar */}
      <div className="bg-purple-800 pt-16 md:pt-20 pb-12 min-h-screen">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-50 text-center mb-16 mt-10">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{event.date}</p>
                  <p className="text-gray-600">{event.location}</p>
                  <p className="text-gray-700 mt-4">{event.description}</p>
                  <a href="/buy">
                    <button className="mt-4 bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition">
                      Buy Tickets
                    </button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSection;