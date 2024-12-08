import React, { useState } from "react";
import Navbar from "./navbar";

const TicketBuyPage = () => {
  const [formData, setFormData] = useState({
    event: "",
    name: "",
    email: "",
    tickets: 1,
  });

  const events = [
    { id: 1, name: "Music Fest 2025" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Tickets purchased for ${formData.event}`);
  };

  return (
    <div>
      <Navbar />
      <div className="bg-purple-700 min-h-screen pt-16 md:pt-20 pb-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-50 text-center mb-16 mt-10">
            Buy Tickets
          </h2>
          <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md"
          >
            {/* Event Selection */}
            <div className="mb-6">
              <label htmlFor="event" className="block text-gray-700 font-semibold mb-2">
                Select Event
              </label>
              <select
                name="event"
                id="event"
                value={formData.event}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-purple-500 focus:outline-none"
                required
              >
                <option value="">Choose an event</option>
                {events.map((event) => (
                  <option key={event.id} value={event.name}>
                    {event.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Name Input */}
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-purple-500 focus:outline-none"
                required
              />
            </div>

            {/* Email Input */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-purple-500 focus:outline-none"
                required
              />
            </div>

            {/* Tickets Input */}
            <div className="mb-6">
              <label htmlFor="tickets" className="block text-gray-700 font-semibold mb-2">
                Number of Tickets
              </label>
              <input
                type="number"
                name="tickets"
                id="tickets"
                value={formData.tickets}
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-purple-500 focus:outline-none"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-purple-700 text-white px-6 py-2 rounded-md hover:bg-purple-800 transition"
              >
                Buy Tickets
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TicketBuyPage;