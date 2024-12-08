import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const NavbarAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black shadow fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-white text-xl font-bold">Event Ticketing System</div>
        <button
          className="text-white md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
        <div
          className={`md:flex md:items-center ${isOpen ? "block" : "hidden"}`}
        >
          <Link to="/" className="block text-white px-4 py-2 hover:bg-purple-700 md:inline">
            Home
          </Link>
          <Link to="/event" className="block text-white px-4 py-2 hover:bg-purple-700 md:inline">
            Customer
          </Link>
          <Link to="/add" className="block text-white px-4 py-2 hover:bg-purple-700 md:inline">
            Vendor
          </Link>
          <Link to="/admin" className="block text-white px-4 py-2 hover:bg-purple-700 md:inline">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

const AdminPanel = () => {
  const [config, setConfig] = useState({
    totalTickets: 1000,
    releaseRate: 50,
    retrievalRate: 30,
    maxCapacity: 5000,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConfig({ ...config, [name]: parseInt(value) || 0 });
  };

  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Tickets Sold",
        data: [150, 200, 300, 400, 350, 500],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <NavbarAdmin />
      <div className="bg-black min-h-screen pt-20 pb-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-50 text-center mb-16 mt-10">
            Admin Panel
          </h2>

          <div className="bg-white p-6 rounded-lg shadow-md mb-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Ticket Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="totalTickets" className="block text-gray-700 mb-2">
                  Total Number of Tickets
                </label>
                <input
                  type="number"
                  name="totalTickets"
                  id="totalTickets"
                  value={config.totalTickets}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label htmlFor="releaseRate" className="block text-gray-700 mb-2">
                  Ticket Release Rate
                </label>
                <input
                  type="number"
                  name="releaseRate"
                  id="releaseRate"
                  value={config.releaseRate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label htmlFor="retrievalRate" className="block text-gray-700 mb-2">
                  Customer Retrieval Rate
                </label>
                <input
                  type="number"
                  name="retrievalRate"
                  id="retrievalRate"
                  value={config.retrievalRate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label htmlFor="maxCapacity" className="block text-gray-700 mb-2">
                  Maximum Ticket Capacity
                </label>
                <input
                  type="number"
                  name="maxCapacity"
                  id="maxCapacity"
                  value={config.maxCapacity}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Number of Sales</h3>
            <Bar data={salesData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;