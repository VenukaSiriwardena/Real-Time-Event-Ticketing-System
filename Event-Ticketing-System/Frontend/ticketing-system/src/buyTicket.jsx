import React, { useState, useEffect, useCallback } from "react";
import Navbar from "./Navbar";

const TicketBuyPage = () => {
  const [formData, setFormData] = useState({
    event: "",
    name: "",
    email: "",
    tickets: 1,
  });
  const [websocket, setWebSocket] = useState(null);
  const [purchaseStatus, setPurchaseStatus] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');

  const events = [
    { id: 1, name: "Music Fest 2025" },
    { id: 2, name: "Summer Concert Series" }
  ];

  const connectWebSocket = useCallback(() => {
    if (websocket) {
      websocket.close();
    }

    const ws = new WebSocket('ws://localhost:5000');

    ws.onopen = () => {
      console.log('WebSocket connection established');
      setWebSocket(ws);
      setConnectionStatus('Connected');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        if (data.type === 'PURCHASE_RESPONSE') {
          setPurchaseStatus({
            success: data.status === 'success',
            message: data.message
          });
        }
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setConnectionStatus('Connection failed');
      setPurchaseStatus({
        success: false,
        message: 'Connection error. Please try again.'
      });
    };

    ws.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
      setWebSocket(null);
      setConnectionStatus('Disconnected');
      
      setTimeout(connectWebSocket, 3000);
    };
  }, []);

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (websocket) {
        websocket.close();
      }
    };
  }, [connectWebSocket]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!websocket || websocket.readyState !== WebSocket.OPEN) {
      setPurchaseStatus({
        success: false,
        message: 'WebSocket not connected. Reconnecting...'
      });
      connectWebSocket();
      return;
    }

    websocket.send(JSON.stringify({
      type: 'PURCHASE_TICKET',
      event: formData.event,
      name: formData.name,
      email: formData.email,
      ticketQty: formData.tickets
    }));
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
                disabled={connectionStatus !== 'Connected'}
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