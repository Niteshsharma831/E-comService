// src/pages/Booking.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import buses from "../context/buses";
import trains from "../context/trains";
import flights from "../context/flights";

import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
  FaClock,
  FaChair,
  FaRupeeSign,
  FaExchangeAlt,
  FaUserPlus,
  FaInfoCircle,
} from "react-icons/fa";

// Small logos for tabs
const getLogo = (type) => {
  if (type === "bus") return "https://img.icons8.com/color/48/000000/bus.png";
  if (type === "train")
    return "https://img.icons8.com/color/48/000000/train.png";
  if (type === "flight")
    return "https://img.icons8.com/color/48/000000/airplane.png";
};

// Rectangular banner image for search side
const getBannerImage = (type) => {
  if (type === "bus")
    return "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop";
  if (type === "train")
    return "https://images.unsplash.com/photo-1484271201072-03bfd82a56f6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  if (type === "flight")
    return "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&auto=format&fit=crop";
};

const allCities = Array.from(
  new Set([
    ...buses.flatMap((b) => [b.from, b.to]),
    ...trains.flatMap((t) => [t.from, t.to]),
    ...flights.flatMap((f) => [f.from, f.to]),
  ])
).sort();

const Booking = () => {
  const [activeTab, setActiveTab] = useState("bus");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(new Date());
  const [passengerCount, setPassengerCount] = useState(1);
  const [customPassengerCount, setCustomPassengerCount] = useState("");
  const [showCustomPassengerInput, setShowCustomPassengerInput] =
    useState(false);
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [passengerDetails, setPassengerDetails] = useState([]);

  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);

  const handleSearch = () => {
    let data = [];
    if (activeTab === "bus") data = buses;
    if (activeTab === "train") data = trains;
    if (activeTab === "flight") data = flights;

    const filtered = data.filter(
      (item) =>
        (item.from.toLowerCase() === from.toLowerCase() &&
          item.to.toLowerCase() === to.toLowerCase()) ||
        (item.from.toLowerCase() === to.toLowerCase() &&
          item.to.toLowerCase() === from.toLowerCase())
    );

    setResults(filtered);
  };

  const handleInputChange = (value, type) => {
    const suggestions = allCities.filter((city) =>
      city.toLowerCase().startsWith(value.toLowerCase())
    );

    if (type === "from") {
      setFrom(value);
      setFromSuggestions(suggestions.slice(0, 5));
    } else {
      setTo(value);
      setToSuggestions(suggestions.slice(0, 5));
    }
  };

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handlePassengerChange = (e) => {
    const value = e.target.value;
    setPassengerCount(value);
    if (value > 5) {
      setShowCustomPassengerInput(true);
      setCustomPassengerCount(value);
    } else {
      setShowCustomPassengerInput(false);
      setCustomPassengerCount("");
    }
  };

  const handleCustomPassengerSubmit = () => {
    if (customPassengerCount && customPassengerCount > 5) {
      setPassengerCount(customPassengerCount);
    }
    setShowCustomPassengerInput(false);
  };

  const handleBookNow = (item) => {
    setSelected(item);

    // Initialize passenger details array
    const totalPassengers = parseInt(passengerCount);
    const details = [];
    for (let i = 1; i <= totalPassengers; i++) {
      details.push({
        id: i,
        name: "",
        age: "",
        gender: "Male",
      });
    }
    setPassengerDetails(details);

    setBookingStep(1);
    setShowModal(true);
  };

  const handlePassengerDetailChange = (index, field, value) => {
    const updatedDetails = [...passengerDetails];
    updatedDetails[index][field] = value;
    setPassengerDetails(updatedDetails);
  };

  const handleBookingConfirmation = () => {
    // Check if all passenger details are filled
    const isAllFilled = passengerDetails.every(
      (passenger) => passenger.name.trim() && passenger.age.trim()
    );

    if (!isAllFilled) {
      alert("Please fill all passenger details before confirming!");
      return;
    }

    // Show server busy message
    alert(
      "⚠️ Server is currently busy or under maintenance. Please try again after some time."
    );
    setShowModal(false);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setBookingStep(1);
    setPassengerDetails([]);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-8 px-4 md:px-10 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-center text-blue-800 font-bold mb-2">
          Book Your Journey
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Find and book buses, trains, and flights across India
        </p>

        {/* Transport Tabs with logos */}
        <div className="flex justify-center gap-3 md:gap-6 mb-8 flex-wrap">
          {["bus", "train", "flight"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 md:px-6 py-2 md:py-3 rounded-full flex items-center gap-2 shadow-lg font-semibold transition-all duration-300 text-base md:text-lg transform hover:scale-105 ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-blue-300"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <img
                src={getLogo(tab)}
                alt={tab}
                className="w-5 h-5 md:w-6 md:h-6"
              />
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Search Side */}
          <div className="lg:w-1/3 bg-white p-5 md:p-6 rounded-2xl shadow-xl flex-shrink-0">
            {/* Rectangular banner */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-xl overflow-hidden mb-6"
            >
              <img
                src={getBannerImage(activeTab)}
                alt={`${activeTab} banner`}
                className="w-full h-40 md:h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <h2 className="absolute bottom-4 left-4 text-white font-bold text-xl md:text-2xl lg:text-3xl drop-shadow-lg">
                {activeTab.toUpperCase()} Ticket Booking
              </h2>
            </motion.div>

            <div className="space-y-5 relative">
              {/* From */}
              <div className="relative">
                <label className="font-semibold text-gray-700 mb-1 block">
                  From
                </label>
                <div className="flex items-center bg-gray-100 px-4 py-3 rounded-lg gap-3 border border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">
                  <FaMapMarkerAlt className="text-blue-600 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Enter Departure City"
                    className="bg-transparent w-full outline-none placeholder-gray-500"
                    value={from}
                    onChange={(e) => handleInputChange(e.target.value, "from")}
                  />
                </div>
                <AnimatePresence>
                  {fromSuggestions.length > 0 && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute z-10 bg-white w-full shadow-lg rounded-lg max-h-48 overflow-y-auto mt-1 border border-gray-200"
                    >
                      {fromSuggestions.map((city, idx) => (
                        <li
                          key={idx}
                          className="px-4 py-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                          onClick={() => {
                            setFrom(city);
                            setFromSuggestions([]);
                          }}
                        >
                          {city}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              {/* Swap */}
              <div className="flex justify-center">
                <button
                  onClick={handleSwap}
                  className="bg-blue-100 p-3 rounded-full hover:bg-blue-200 text-blue-700 transition-colors"
                  title="Swap locations"
                >
                  <FaExchangeAlt />
                </button>
              </div>

              {/* To */}
              <div className="relative">
                <label className="font-semibold text-gray-700 mb-1 block">
                  To
                </label>
                <div className="flex items-center bg-gray-100 px-4 py-3 rounded-lg gap-3 border border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">
                  <FaMapMarkerAlt className="text-blue-600 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Enter Destination City"
                    className="bg-transparent w-full outline-none placeholder-gray-500"
                    value={to}
                    onChange={(e) => handleInputChange(e.target.value, "to")}
                  />
                </div>
                <AnimatePresence>
                  {toSuggestions.length > 0 && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute z-10 bg-white w-full shadow-lg rounded-lg max-h-48 overflow-y-auto mt-1 border border-gray-200"
                    >
                      {toSuggestions.map((city, idx) => (
                        <li
                          key={idx}
                          className="px-4 py-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                          onClick={() => {
                            setTo(city);
                            setToSuggestions([]);
                          }}
                        >
                          {city}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              {/* Date */}
              <div>
                <label className="font-semibold text-gray-700 mb-1 block">
                  Journey Date
                </label>
                <div className="flex items-center bg-gray-100 px-4 py-3 rounded-lg gap-3 border border-gray-300">
                  <FaCalendarAlt className="text-blue-600 flex-shrink-0" />
                  <DatePicker
                    selected={date}
                    onChange={(d) => setDate(d)}
                    className="bg-transparent outline-none w-full"
                    minDate={new Date()}
                  />
                </div>
              </div>

              {/* Passengers */}
              <div className="space-y-3">
                <label className="font-semibold text-gray-700 mb-1 block flex items-center gap-2">
                  <FaUser /> Passengers
                </label>

                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center bg-gray-100 px-4 py-3 rounded-lg gap-3 border border-gray-300">
                      <FaUserPlus className="text-blue-600 flex-shrink-0" />
                      <select
                        className="bg-transparent outline-none w-full appearance-none"
                        value={passengerCount}
                        onChange={handlePassengerChange}
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option value={num} key={num}>
                            {num} Passenger{num > 1 ? "s" : ""}
                          </option>
                        ))}
                        <option value="more">More than 5</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Custom Passenger Input */}
                <AnimatePresence>
                  {showCustomPassengerInput && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-800 mb-2 flex items-center gap-2">
                          <FaInfoCircle /> For more than 5 passengers, enter
                          number manually:
                        </p>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            min="6"
                            max="20"
                            placeholder="Enter number (6-20)"
                            className="flex-1 px-3 py-2 rounded border border-blue-300 outline-none focus:ring-2 focus:ring-blue-200"
                            value={customPassengerCount}
                            onChange={(e) =>
                              setCustomPassengerCount(e.target.value)
                            }
                          />
                          <button
                            onClick={handleCustomPassengerSubmit}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                          >
                            OK
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSearch}
              className="w-full mt-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl text-lg font-semibold shadow-lg transition-all duration-300"
            >
              Search {activeTab.toUpperCase()} Tickets
            </motion.button>
          </div>

          {/* Results Section */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-5 flex items-center gap-2">
                <span className="text-blue-600">Available Options</span>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {results.length} found
                </span>
              </h3>

              {results.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-600 text-lg mb-4">
                    No results found for your search...
                  </p>
                  <p className="text-gray-500">
                    Try selecting different cities or dates
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
                  {results.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{
                        scale: 1.01,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gradient-to-r from-white to-gray-50 p-4 md:p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200"
                    >
                      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                        <div className="w-full md:w-40 h-32 md:h-36 rounded-xl overflow-hidden flex-shrink-0">
                          <img
                            src={getBannerImage(activeTab)}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                            <div>
                              <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                                {item.name}
                              </h4>
                              <p className="text-lg text-gray-700 mb-3">
                                {item.from} → {item.to}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl md:text-3xl font-bold text-blue-700 flex items-center justify-end gap-1">
                                <FaRupeeSign className="text-xl" />
                                {item.price}
                                <span className="text-sm text-gray-500 font-normal">
                                  /person
                                </span>
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                            <div className="flex items-center gap-2 text-gray-700 bg-gray-100 px-3 py-2 rounded-lg">
                              <FaClock className="text-blue-600 flex-shrink-0" />
                              <span className="font-medium">Time:</span>
                              <span className="ml-auto font-semibold">
                                {item.time}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700 bg-gray-100 px-3 py-2 rounded-lg">
                              <FaChair className="text-green-600 flex-shrink-0" />
                              <span className="font-medium">Seats:</span>
                              <span
                                className={`ml-auto font-semibold ${
                                  item.seats < 10
                                    ? "text-red-600"
                                    : "text-green-600"
                                }`}
                              >
                                {item.seats} available
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700 bg-gray-100 px-3 py-2 rounded-lg">
                              <FaUser className="text-purple-600 flex-shrink-0" />
                              <span className="font-medium">Type:</span>
                              <span className="ml-auto font-semibold">
                                {activeTab.toUpperCase()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="md:flex md:items-center">
                          <button
                            onClick={() => handleBookNow(item)}
                            className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 text-lg"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showModal && selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
            onClick={handleModalClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-5 text-white">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">
                    {bookingStep === 1
                      ? "Passenger Details"
                      : "Confirm Booking"}
                  </h2>
                  <button
                    onClick={handleModalClose}
                    className="text-white hover:text-gray-200 text-2xl"
                  >
                    ×
                  </button>
                </div>
                <div className="flex gap-2 mt-3">
                  <div
                    className={`h-2 flex-1 rounded-full ${
                      bookingStep >= 1 ? "bg-white" : "bg-white/50"
                    }`}
                  ></div>
                  <div
                    className={`h-2 flex-1 rounded-full ${
                      bookingStep >= 2 ? "bg-white" : "bg-white/50"
                    }`}
                  ></div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-5 md:p-6 max-h-[70vh] overflow-y-auto">
                {bookingStep === 1 ? (
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <p className="font-semibold text-blue-800 mb-2">
                        Booking Summary
                      </p>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-gray-600">Service:</span>
                          <span className="font-semibold ml-2">
                            {selected.name}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Route:</span>
                          <span className="font-semibold ml-2">
                            {selected.from} → {selected.to}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Date:</span>
                          <span className="font-semibold ml-2">
                            {date.toDateString()}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Passengers:</span>
                          <span className="font-semibold ml-2">
                            {passengerCount}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Enter Passenger Details ({passengerDetails.length}{" "}
                        passenger{passengerDetails.length > 1 ? "s" : ""})
                      </h3>
                      <div className="space-y-4">
                        {passengerDetails.map((passenger, index) => (
                          <motion.div
                            key={passenger.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                          >
                            <p className="font-medium text-gray-700 mb-3">
                              Passenger {index + 1}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Full Name
                                </label>
                                <input
                                  type="text"
                                  placeholder="Enter full name"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none"
                                  value={passenger.name}
                                  onChange={(e) =>
                                    handlePassengerDetailChange(
                                      index,
                                      "name",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Age
                                </label>
                                <input
                                  type="number"
                                  min="1"
                                  max="100"
                                  placeholder="Age"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none"
                                  value={passenger.age}
                                  onChange={(e) =>
                                    handlePassengerDetailChange(
                                      index,
                                      "age",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Gender
                                </label>
                                <select
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none"
                                  value={passenger.gender}
                                  onChange={(e) =>
                                    handlePassengerDetailChange(
                                      index,
                                      "gender",
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                  <option value="Other">Other</option>
                                </select>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <p className="font-semibold text-green-800 mb-2 text-center">
                        Review Your Booking
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Total Passengers:</span>
                        <span className="font-bold">{passengerCount}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Price per person:</span>
                        <span className="font-bold">₹{selected.price}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="font-semibold text-lg">
                          Total Amount:
                        </span>
                        <span className="font-bold text-2xl text-blue-700">
                          ₹{selected.price * passengerCount}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-100 p-5 border-t border-gray-200">
                <div className="flex justify-between">
                  {bookingStep === 1 ? (
                    <>
                      <button
                        onClick={handleModalClose}
                        className="px-5 py-2.5 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-semibold transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => setBookingStep(2)}
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                      >
                        Next: Review Booking
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setBookingStep(1)}
                        className="px-5 py-2.5 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-semibold transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleBookingConfirmation}
                        className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg font-semibold transition-colors"
                      >
                        Confirm Booking
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Booking;
