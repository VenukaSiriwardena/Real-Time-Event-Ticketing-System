import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from 'axios';

const TicketAddPage = () => {
  const [formData, setFormData] = useState({
    event: "",
    name: "",
    vendorId: "",
    addTicketQty: 1,
  });
  const [purchaseStatus, setPurchaseStatus] = useState({
    status: null,
    message: ""
  });

  const events = [
    { id: 1, name: "Music Fest 2025" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous status
    setPurchaseStatus({ status: null, message: "" });

    // Validate form data
    if (!formData.event || !formData.name || !formData.vendorId || formData.addTicketQty < 1) {
      setPurchaseStatus({
        status: 'error',
        message: 'Please fill in all fields correctly.'
      });
      return;
    }

    try {
      const statusResponse = await axios.get('http://localhost:3000/systemStatus');
      if (!statusResponse.data.systemStatus) {
        setPurchaseStatus({
          status: 'error',
          message: 'System is stopped. Cannot add tickets.'
        });
        return;
      }

      const response = await axios.post('http://localhost:3000/addTickets', {
        addTicketQty: formData.addTicketQty,
        vendorId: formData.vendorId
      });

      setPurchaseStatus({
        status: 'success',
        message: response.data.message
      });

      // Clear form after successful ticket addition
      setFormData({
        event: "",
        name: "",
        vendorId: "",
        addTicketQty: 1
      });
    } catch (error) {
      setPurchaseStatus({
        status: 'error',
        message: 'Failed to add tickets. Please try again.'
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-black min-h-screen pt-16 md:pt-20 pb-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-50 text-center mb-16 mt-10">
            Add Tickets
          </h2>

          {/* Status Notification */}
          {purchaseStatus.status && (
            <div className={`
              mb-4 p-4 rounded text-center
              ${purchaseStatus.status === 'success'
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'}
            `}>
              {purchaseStatus.message}
            </div>
          )}

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

            {/* Vendor Name Input */}
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                Vendor Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter vendor name"
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-purple-500 focus:outline-none"
                required
              />
            </div>

            {/* Vendor ID Input */}
            <div className="mb-6">
              <label htmlFor="vendorId" className="block text-gray-700 font-semibold mb-2">
                Vendor ID
              </label>
              <input
                type="text"
                name="vendorId"
                id="vendorId"
                value={formData.vendorId}
                onChange={handleChange}
                placeholder="Enter vendor ID"
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-purple-500 focus:outline-none"
                required
              />
            </div>

            {/* Tickets Input */}
            <div className="mb-6">
              <label htmlFor="addTicketQty" className="block text-gray-700 font-semibold mb-2">
                Number of Tickets to Add
              </label>
              <input
                type="number"
                name="addTicketQty"
                id="addTicketQty"
                value={formData.addTicketQty}
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
                Add Tickets
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TicketAddPage;