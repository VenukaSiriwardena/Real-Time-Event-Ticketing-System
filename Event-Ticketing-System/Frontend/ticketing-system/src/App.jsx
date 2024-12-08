import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Correct imports
import Home from "./home";
import BuyTicket from "./buyTicket";
import EventSection from "./eventSection";
import AddTicket from "./addTickets";
import Admin from "./admin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<BuyTicket />} />
        <Route path="/event" element={<EventSection />} />
        <Route path="/add" element={<AddTicket />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;