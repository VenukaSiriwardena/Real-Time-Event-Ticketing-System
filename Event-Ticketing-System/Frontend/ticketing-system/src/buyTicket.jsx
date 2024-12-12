import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from 'axios';

const TicketBuyPage = () => {
  const [formData, setFormData] = useState({
    event: "",
    name: "",
    email: "",
    tickets: 1,
  });
  const [purchaseStatus, setPurchaseStatus] = useState(null);
  const [totalTickets, setTotalTickets] = useState(0);

  const events = [
    { id: 1, name: "Music Fest 2025" },
    { id: 2, name: "Summer Concert Series" }
  ];

  useEffect(() => {
    const fetchTotalTickets = async () => {
      try {
        const response = await axios.get('http://localhost:3000/totalTickets');
        setTotalTickets(response.data.totalTickets);
      } catch (error) {
        console.error('Error fetching total tickets:', error);
      }
    };

    fetchTotalTickets();

    const eventSource = new EventSource('http://localhost:3000/events');
    eventSource.onmessage = () => {
      fetchTotalTickets();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const statusResponse = await axios.get('http://localhost:3000/systemStatus');
      if (!statusResponse.data.systemStatus) {
        setPurchaseStatus({
          success: false,
          message: "System didn't Start yet. Try again Later"
        });
        return;
      }

      const response = await axios.post('http://localhost:3000/buyTickets', {
        ticketQty: formData.tickets,
        customerId: formData.email // Assuming email is used as customerId
      });

      setPurchaseStatus({
        success: true,
        message: response.data.message
      });

      setFormData({
        event: "",
        name: "",
        email: "",
        tickets: 1
      });
    } catch (error) {
      setPurchaseStatus({
        success: false,
        message: 'Failed to purchase tickets. Please try again.'
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-purple-700 min-h-screen pt-16 md:pt-20 pb-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-50 text-center mb-16 mt-10">
            Buy Tickets
          </h2>

          {purchaseStatus && (
            <div className={`mb-4 p-4 rounded ${
              purchaseStatus.success
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            } text-center`}>
              {purchaseStatus.message}
            </div>
          )}

          <div className="text-center text-white mb-6">
            Total Tickets Available: {totalTickets}
          </div>

          <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md"
          >
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