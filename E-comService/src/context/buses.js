// src/context/buses.js

const indianStates = [
  // Major Cities
  "Delhi",
  "Mumbai",
  "Chennai",
  "Bangalore",
  "Kolkata",
  "Hyderabad",

  // North India
  "Jaipur",
  "Lucknow",
  "Chandigarh",
  "Dehradun",
  "Shimla",
  "Amritsar",
  "Jammu",
  "Srinagar",
  "Agra",
  "Varanasi",
  "Prayagraj",
  "Kanpur",

  // West India
  "Ahmedabad",
  "Pune",
  "Surat",
  "Nagpur",
  "Bhopal",
  "Indore",
  "Goa",
  "Vadodara",
  "Rajkot",
  "Nashik",
  "Aurangabad",

  // South India
  "Coimbatore",
  "Kochi",
  "Thiruvananthapuram",
  "Madurai",
  "Mysore",
  "Vijayawada",
  "Visakhapatnam",
  "Tirupati",
  "Mangalore",
  "Hubli",

  // East & Northeast
  "Patna",
  "Ranchi",
  "Bhubaneswar",
  "Guwahati",
  "Shillong",
  "Imphal",
  "Kohima",
  "Aizawl",
  "Gangtok",
  "Siliguri",

  // Central India
  "Raipur",
  "Bhilai",
  "Jabalpur",
  "Gwalior",
  "Ujjain",
];

const busOperators = [
  // National Operators
  "Volvo AC Sleeper",
  "Mercedes Benz AC",
  "Scania Multi-Axle",
  "Tata Marcopolo",
  "Bharat Benz",
  "Ashok Leyland",
  "Mahindra Cruzio",
  "Eicher Skyline",

  // Premium Private Operators
  "Parveen Travels AC",
  "VRL Luxury Bus",
  "Orange Travels",
  "Sharma Travels",
  "Blue Line AC",
  "Skyline Bus",
  "Golden Roadways",
  "Royal Express",
  "SRS Travels",
  "Kallada Travels",
  "Neeta Travels",
  "Kaveri Travels",
  "Diwakar Travels",
  "Raj National Express",
  "Patel Travels",
  "YBM Travels",

  // State Operators
  "UPSRTC AC Sleeper",
  "MSRTC Shivneri",
  "TSRTC Garuda",
  "KSRTC Rajahamsa",
  "Kerala RTC Scania",
  "APSRTC Garuda Plus",
  "TNSTC AC",
  "RSRTC Volvo",
  "GSRTC AC Sleeper",
  "HRTC Volvo",
  "JKSRTC Deluxe",

  // Budget Operators
  "City Travels",
  "Express Travels",
  "Star Travels",
  "Karnataka Travels",
  "Andhra Travels",
  "Tamil Nadu Travels",
  "Gujarat Travels",
  "Maharashtra Travels",
  "Rajdhani Express",
  "Shatabdi Travels",
  "Janata Travels",
  "Ganga Travels",
];

const travelTimes = [
  // Early Morning
  "12:00 AM",
  "1:00 AM",
  "2:00 AM",
  "3:00 AM",
  "4:00 AM",

  // Morning
  "5:00 AM",
  "5:30 AM",
  "6:00 AM",
  "6:30 AM",
  "7:00 AM",
  "7:30 AM",
  "8:00 AM",
  "8:30 AM",
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",

  // Afternoon
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",

  // Evening
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",

  // Night
  "10:00 PM",
  "10:30 PM",
  "11:00 PM",
  "11:30 PM",
];

const priceRange = [
  // Budget (Short Distance)
  300, 350, 400, 450, 500,

  // Standard (Medium Distance)
  550, 600, 650, 700, 750, 800, 850,

  // Premium (Long Distance)
  900, 950, 1000, 1050, 1100, 1150, 1200,

  // Luxury (Overnight/Sleeper)
  1250, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000,

  // Super Premium
  2200, 2400, 2600, 2800, 3000,
];

// Popular routes in India (from, to, approximate price multiplier)
const popularRoutes = [
  { from: "Delhi", to: "Jaipur", multiplier: 1 },
  { from: "Delhi", to: "Chandigarh", multiplier: 1.2 },
  { from: "Mumbai", to: "Pune", multiplier: 0.8 },
  { from: "Mumbai", to: "Goa", multiplier: 1.5 },
  { from: "Bangalore", to: "Chennai", multiplier: 1 },
  { from: "Bangalore", to: "Hyderabad", multiplier: 1.3 },
  { from: "Chennai", to: "Coimbatore", multiplier: 1.1 },
  { from: "Kolkata", to: "Bhubaneswar", multiplier: 1.2 },
  { from: "Hyderabad", to: "Vijayawada", multiplier: 0.9 },
  { from: "Ahmedabad", to: "Rajkot", multiplier: 0.7 },
  { from: "Patna", to: "Rajkot", multiplier: 0.7 },
];

const buses = [];

// Function to get popular route price
const getPopularRoutePrice = (from, to, basePrice) => {
  const route = popularRoutes.find(
    (r) => (r.from === from && r.to === to) || (r.from === to && r.to === from)
  );
  return route ? Math.round(basePrice * route.multiplier) : basePrice;
};

// Generate 250 buses
for (let i = 1; i <= 250; i++) {
  const fromIndex = Math.floor(Math.random() * indianStates.length);
  let toIndex;
  do {
    toIndex = Math.floor(Math.random() * indianStates.length);
  } while (toIndex === fromIndex);

  const fromCity = indianStates[fromIndex];
  const toCity = indianStates[toIndex];
  const basePrice = priceRange[Math.floor(Math.random() * priceRange.length)];
  const finalPrice = getPopularRoutePrice(fromCity, toCity, basePrice);

  // Generate random seats with some buses having low availability
  let seats;
  if (i % 10 === 0) {
    seats = Math.floor(Math.random() * 5) + 1; // 1-5 seats (almost full)
  } else if (i % 7 === 0) {
    seats = Math.floor(Math.random() * 10) + 3; // 3-12 seats (filling up)
  } else {
    seats = Math.floor(Math.random() * 30) + 10; // 10-40 seats
  }

  buses.push({
    id: i,
    name: busOperators[Math.floor(Math.random() * busOperators.length)],
    from: fromCity,
    to: toCity,
    time: travelTimes[Math.floor(Math.random() * travelTimes.length)],
    seats: seats,
    price: finalPrice,
    // Additional realistic fields
    duration: `${Math.floor(Math.random() * 10) + 4} hours`, // 4-14 hours
    busType: Math.random() > 0.5 ? "AC Sleeper" : "AC Seater",
    amenities: getRandomAmenities(),
    rating: (Math.random() * 1.5 + 3.5).toFixed(1), // 3.5 to 5.0
    reviews: Math.floor(Math.random() * 500) + 50,
  });
}

// Function to generate random amenities
function getRandomAmenities() {
  const allAmenities = [
    "AC",
    "WiFi",
    "Charging Port",
    "Blanket",
    "Water Bottle",
    "Snacks",
    "Entertainment",
    "Reading Light",
    "GPS",
    "Emergency Kit",
  ];

  const count = Math.floor(Math.random() * 4) + 3; // 3-6 amenities
  const shuffled = [...allAmenities].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Add some duplicate popular routes (same from-to, different times/operators)
const duplicateRoutes = [
  // Delhi to Jaipur (multiple options)
  { from: "Delhi", to: "Jaipur", count: 8 },
  { from: "Jaipur", to: "Delhi", count: 8 },
  { from: "Mumbai", to: "Pune", count: 10 },
  { from: "Bangalore", to: "Chennai", count: 8 },
  { from: "Chennai", to: "Bangalore", count: 8 },
  { from: "Delhi", to: "Chandigarh", count: 6 },
  { from: "Mumbai", to: "Goa", count: 6 },
  { from: "Kolkata", to: "Bhubaneswar", count: 5 },
  { from: "Hyderabad", to: "Bangalore", count: 7 },
];

let currentId = buses.length + 1;

duplicateRoutes.forEach((route) => {
  for (let j = 0; j < route.count; j++) {
    const timeIndex = Math.floor(Math.random() * travelTimes.length);
    const priceAdj = getPopularRoutePrice(
      route.from,
      route.to,
      priceRange[Math.floor(Math.random() * priceRange.length)]
    );

    buses.push({
      id: currentId++,
      name: busOperators[Math.floor(Math.random() * busOperators.length)],
      from: route.from,
      to: route.to,
      time: travelTimes[timeIndex],
      seats: Math.floor(Math.random() * 25) + 5,
      price: priceAdj,
      duration: `${Math.floor(Math.random() * 8) + 3} hours`,
      busType: Math.random() > 0.5 ? "AC Sleeper" : "AC Seater",
      amenities: getRandomAmenities(),
      rating: (Math.random() * 1.5 + 3.5).toFixed(1),
      reviews: Math.floor(Math.random() * 500) + 50,
    });
  }
});

console.log(`Total buses generated: ${buses.length}`);

export default buses;
