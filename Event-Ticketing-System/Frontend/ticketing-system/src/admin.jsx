import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const NavbarAdmin = () => (
  <nav className="bg-black shadow fixed top-0 left-0 w-full z-10">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      <div className="text-white text-xl font-bold">Event Ticketing System</div>
    </div>
  </nav>
);

const AdminPanel = () => {
  const [config, setConfig] = useState({
    totalTickets: 1000,
    releaseRate: 50,
    retrievalRate: 30,
    maxCapacity: 5000,
    retrievalInterval: 5,
    vendorReleaseInterval: 15,
  });

  const [systemStatus, setSystemStatus] = useState(false);
  const [socket, setSocket] = useState(null);
  const [configResponse, setConfigResponse] = useState(null);

  useEffect(() => {
    // Establish WebSocket connection
    const ws = new WebSocket('ws://localhost:5000');

    ws.onopen = () => {
      console.log('WebSocket connection established');
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'CONFIGURATION_RESPONSE') {
        setConfigResponse({
          status: data.status,
          message: data.message
        });

        // Clear response after 3 seconds
        setTimeout(() => {
          setConfigResponse(null);
        }, 3000);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Cleanup on component unmount
    return () => {
      ws.close();
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConfig({ ...config, [name]: parseInt(value, 10) || 0 });
  };

  const handleSubmit = () => {
    if (socket) {
      socket.send(JSON.stringify({
        type: 'UPDATE_CONFIGURATION',
        config: config
      }));
    } else {
      console.error('WebSocket not connected');
    }
  };

  const toggleSystemStatus = () => {
    setSystemStatus(!systemStatus);
  };

  const salesData = {
    labels: ["Tickets Sold", "Tickets Remaining"],
    datasets: [
      {
        data: [600, 400],
        backgroundColor: ["#4CAF50", "#FFC107"],
        borderColor: ["#4CAF50", "#FFC107"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
  };

  return (
    <div>
      <NavbarAdmin />
      <div className="bg-black min-h-screen pt-20 pb-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-50 text-center mb-16">
            Admin Panel
          </h2>

          {/* Configuration Response */}
          {configResponse && (
            <div className={`mb-4 p-4 rounded ${
              configResponse.status === 'success' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
            }`}>
              {configResponse.message}
            </div>
          )}

          {/* Configuration Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Ticket Configuration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Total Tickets", name: "totalTickets" },
                { label: "Ticket Release Rate", name: "releaseRate" },
                { label: "Customer Retrieval Rate", name: "retrievalRate" },
                { label: "Maximum Ticket Capacity", name: "maxCapacity" },
                { label: "Customer Retrieval Interval (mins)", name: "retrievalInterval" },
                { label: "Vendor Release Interval (mins)", name: "vendorReleaseInterval" },
              ].map((field) => (
                <div key={field.name}>
                  <label htmlFor={field.name} className="block text-gray-700 mb-2">
                    {field.label}
                  </label>
                  <input
                    type="number"
                    name={field.name}
                    id={field.name}
                    value={config[field.name]}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={handleSubmit}
              className="mt-6 bg-purple-700 text-white px-6 py-2 rounded-md hover:bg-purple-800 transition"
            >
              Submit Configuration
            </button>
          </div>

          {/* System Status Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">System Status</h3>
            <button
              onClick={toggleSystemStatus}
              className={`w-full py-2 px-4 rounded-md text-white font-bold ${
                systemStatus ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {systemStatus ? "Stop System" : "Start System"}
            </button>
            <p className="text-gray-700 mt-4">
              Current Status: {" "}
              <span className={`font-bold ${systemStatus ? "text-red-600" : "text-green-600"}`}>
                {systemStatus ? "Running" : "Stopped"}
              </span>
            </p>
          </div>

          {/* Sales Chart Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Number of Sales</h3>
            <div className="w-1/2 mx-auto" style={{ height: "200px" }}>
              <Pie data={salesData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;