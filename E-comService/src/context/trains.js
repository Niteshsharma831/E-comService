// src/context/trains.js

const indianCities = [
  // Metropolitan Cities
  "Delhi",
  "Mumbai",
  "Chennai",
  "Kolkata",
  "Bangalore",
  "Hyderabad",

  // State Capitals
  "Lucknow",
  "Patna",
  "Jaipur",
  "Bhopal",
  "Chandigarh",
  "Dehradun",
  "Shimla",
  "Jammu",
  "Srinagar",
  "Thiruvananthapuram",
  "Panaji",
  "Amaravati",
  "Bhubaneswar",
  "Ranchi",
  "Raipur",
  "Gandhinagar",
  "Mumbai",
  "Dispur",
  "Shillong",
  "Kohima",
  "Imphal",
  "Aizawl",
  "Agartala",
  "Gangtok",
  "Port Blair",
  "Puducherry",

  // Major Railway Junctions
  "Kanpur",
  "Varanasi",
  "Allahabad",
  "Nagpur",
  "Indore",
  "Ahmedabad",
  "Surat",
  "Pune",
  "Coimbatore",
  "Madurai",
  "Vijayawada",
  "Visakhapatnam",
  "Mysore",
  "Mangalore",
  "Kochi",
  "Thrissur",
  "Guwahati",
  "Jabalpur",
  "Gwalior",
  "Bareilly",
  "Moradabad",
  "Howrah",
  "Secunderabad",
  "Vadodara",
  "Jhansi",
  "Bilaspur",
  "Dhanbad",
];

const trainTypes = [
  // Premium Trains
  { name: "Rajdhani Express", prefix: "Rajdhani", basePrice: 2200, seats: 120 },
  { name: "Shatabdi Express", prefix: "Shatabdi", basePrice: 1800, seats: 90 },
  { name: "Duronto Express", prefix: "Duronto", basePrice: 2000, seats: 100 },
  {
    name: "Vande Bharat Express",
    prefix: "Vande Bharat",
    basePrice: 2500,
    seats: 110,
  },
  { name: "Tejas Express", prefix: "Tejas", basePrice: 2100, seats: 95 },
  { name: "Gatimaan Express", prefix: "Gatimaan", basePrice: 2300, seats: 85 },
  { name: "Mahamana Express", prefix: "Mahamana", basePrice: 1700, seats: 105 },
  { name: "Humsafar Express", prefix: "Humsafar", basePrice: 1600, seats: 115 },

  // Mail/Express Trains
  { name: "Mail Express", prefix: "", basePrice: 1200, seats: 140 },
  { name: "Superfast Express", prefix: "SF", basePrice: 1400, seats: 130 },
  {
    name: "Intercity Express",
    prefix: "Intercity",
    basePrice: 900,
    seats: 150,
  },
  {
    name: "Jan Shatabdi Express",
    prefix: "Jan Shatabdi",
    basePrice: 1100,
    seats: 125,
  },
  {
    name: "Sampark Kranti Express",
    prefix: "Sampark Kranti",
    basePrice: 1300,
    seats: 135,
  },
  { name: "Udyan Express", prefix: "Udyan", basePrice: 1150, seats: 128 },
  {
    name: "Karnataka Express",
    prefix: "Karnataka",
    basePrice: 1350,
    seats: 132,
  },

  // Budget Trains
  {
    name: "Garib Rath Express",
    prefix: "Garib Rath",
    basePrice: 650,
    seats: 80,
  },
  { name: "Passenger Train", prefix: "Passenger", basePrice: 350, seats: 200 },
  { name: "MEMU", prefix: "MEMU", basePrice: 200, seats: 220 },
  { name: "DEMU", prefix: "DEMU", basePrice: 250, seats: 210 },
  { name: "Local Train", prefix: "Local", basePrice: 150, seats: 250 },

  // Special Trains
  { name: "Palace on Wheels", prefix: "Palace", basePrice: 50000, seats: 40 },
  {
    name: "Maharajas' Express",
    prefix: "Maharaja",
    basePrice: 45000,
    seats: 35,
  },
  {
    name: "Golden Chariot",
    prefix: "Golden Chariot",
    basePrice: 40000,
    seats: 38,
  },
  { name: "Deccan Odyssey", prefix: "Deccan", basePrice: 48000, seats: 36 },
];

const trainNumbers = [
  "12001",
  "12002",
  "12051",
  "12052",
  "12123",
  "12124",
  "12213",
  "12214",
  "12301",
  "12302",
  "12431",
  "12432",
  "12501",
  "12502",
  "12601",
  "12602",
  "12701",
  "12702",
  "12801",
  "12802",
  "12901",
  "12902",
  "13005",
  "13006",
  "13105",
  "13106",
  "13201",
  "13202",
  "13423",
  "13424",
  "14011",
  "14012",
];

const departureTimes = [
  // Early Morning
  "12:00 AM",
  "12:30 AM",
  "1:00 AM",
  "1:30 AM",
  "2:00 AM",
  "2:30 AM",
  "3:00 AM",
  "3:30 AM",
  "4:00 AM",
  "4:30 AM",

  // Morning
  "5:00 AM",
  "5:15 AM",
  "5:30 AM",
  "5:45 AM",
  "6:00 AM",
  "6:15 AM",
  "6:30 AM",
  "6:45 AM",
  "7:00 AM",
  "7:15 AM",
  "7:30 AM",
  "7:45 AM",
  "8:00 AM",
  "8:15 AM",
  "8:30 AM",
  "8:45 AM",
  "9:00 AM",
  "9:15 AM",
  "9:30 AM",
  "9:45 AM",
  "10:00 AM",
  "10:15 AM",
  "10:30 AM",
  "10:45 AM",
  "11:00 AM",
  "11:15 AM",
  "11:30 AM",
  "11:45 AM",

  // Afternoon
  "12:00 PM",
  "12:15 PM",
  "12:30 PM",
  "12:45 PM",
  "1:00 PM",
  "1:15 PM",
  "1:30 PM",
  "1:45 PM",
  "2:00 PM",
  "2:15 PM",
  "2:30 PM",
  "2:45 PM",
  "3:00 PM",
  "3:15 PM",
  "3:30 PM",
  "3:45 PM",
  "4:00 PM",
  "4:15 PM",
  "4:30 PM",
  "4:45 PM",

  // Evening
  "5:00 PM",
  "5:15 PM",
  "5:30 PM",
  "5:45 PM",
  "6:00 PM",
  "6:15 PM",
  "6:30 PM",
  "6:45 PM",
  "7:00 PM",
  "7:15 PM",
  "7:30 PM",
  "7:45 PM",
  "8:00 PM",
  "8:15 PM",
  "8:30 PM",
  "8:45 PM",
  "9:00 PM",
  "9:15 PM",
  "9:30 PM",
  "9:45 PM",

  // Night
  "10:00 PM",
  "10:15 PM",
  "10:30 PM",
  "10:45 PM",
  "11:00 PM",
  "11:15 PM",
  "11:30 PM",
  "11:45 PM",
];

// Popular train routes with base prices
const popularRoutes = [
  { from: "Delhi", to: "Mumbai", distance: 1400, baseMultiplier: 1.2 },
  { from: "Delhi", to: "Kolkata", distance: 1500, baseMultiplier: 1.3 },
  { from: "Delhi", to: "Chennai", distance: 2200, baseMultiplier: 1.5 },
  { from: "Mumbai", to: "Chennai", distance: 1300, baseMultiplier: 1.1 },
  { from: "Mumbai", to: "Kolkata", distance: 2000, baseMultiplier: 1.4 },
  { from: "Chennai", to: "Kolkata", distance: 1700, baseMultiplier: 1.2 },
  { from: "Delhi", to: "Bangalore", distance: 2100, baseMultiplier: 1.4 },
  { from: "Mumbai", to: "Hyderabad", distance: 700, baseMultiplier: 0.9 },
  { from: "Chennai", to: "Hyderabad", distance: 800, baseMultiplier: 0.95 },
  { from: "Kolkata", to: "Patna", distance: 550, baseMultiplier: 0.8 },
  { from: "Delhi", to: "Jaipur", distance: 300, baseMultiplier: 0.7 },
  { from: "Mumbai", to: "Pune", distance: 180, baseMultiplier: 0.6 },
  { from: "Bangalore", to: "Chennai", distance: 350, baseMultiplier: 0.75 },
  { from: "Delhi", to: "Lucknow", distance: 500, baseMultiplier: 0.8 },
  { from: "Hyderabad", to: "Bangalore", distance: 570, baseMultiplier: 0.85 },
  { from: "Kolkata", to: "Bhubaneswar", distance: 440, baseMultiplier: 0.75 },
  { from: "Ahmedabad", to: "Mumbai", distance: 530, baseMultiplier: 0.85 },
  { from: "Jaipur", to: "Mumbai", distance: 1100, baseMultiplier: 1.1 },
  { from: "Chennai", to: "Coimbatore", distance: 500, baseMultiplier: 0.8 },
  { from: "Delhi", to: "Chandigarh", distance: 250, baseMultiplier: 0.65 },
];

const trains = [];

// Generate 200+ trains
for (let i = 1; i <= 200; i++) {
  const fromIndex = Math.floor(Math.random() * indianCities.length);
  let toIndex;
  do {
    toIndex = Math.floor(Math.random() * indianCities.length);
  } while (toIndex === fromIndex);

  const fromCity = indianCities[fromIndex];
  const toCity = indianCities[toIndex];

  const trainType = trainTypes[Math.floor(Math.random() * trainTypes.length)];
  const trainNumber =
    trainNumbers[Math.floor(Math.random() * trainNumbers.length)];

  // Calculate price based on route distance and train type
  const route = popularRoutes.find(
    (r) =>
      (r.from === fromCity && r.to === toCity) ||
      (r.from === toCity && r.to === fromCity)
  );

  let priceMultiplier = route ? route.baseMultiplier : 1;
  let basePrice = trainType.basePrice;

  // Adjust price based on route popularity and distance
  const calculatedPrice = Math.round(basePrice * priceMultiplier);

  // Add variation to prices
  const finalPrice = calculatedPrice + Math.floor(Math.random() * 200) - 100;

  // Generate seat availability
  let seats;
  if (i % 15 === 0) {
    seats = Math.floor(Math.random() * 15) + 5; // 5-20 seats (almost full)
  } else if (i % 8 === 0) {
    seats = Math.floor(Math.random() * 30) + 10; // 10-40 seats (filling up)
  } else {
    seats = trainType.seats - Math.floor(Math.random() * 40);
  }

  // Ensure seats are positive
  seats = Math.max(10, seats);

  // Generate train name with number
  const trainName = trainType.prefix
    ? `${trainType.prefix} ${trainNumber}`
    : `${trainNumber} ${trainType.name}`;

  trains.push({
    id: i,
    name: trainName,
    number: trainNumber,
    from: fromCity,
    to: toCity,
    time: departureTimes[Math.floor(Math.random() * departureTimes.length)],
    seats: seats,
    price: Math.max(200, finalPrice), // Minimum price ₹200
    trainType: trainType.name,
    duration: `${Math.floor(Math.random() * 24) + 4}h ${Math.floor(
      Math.random() * 60
    )}m`, // 4-28 hours
    classes: getRandomClasses(trainType.name),
    runningDays: getRunningDays(),
    rating: (Math.random() * 1.5 + 3.5).toFixed(1), // 3.5 to 5.0
    amenities: getTrainAmenities(trainType.name),
  });
}

// Add specific popular trains
const specialTrains = [
  {
    id: 201,
    name: "Rajdhani Express 12951",
    number: "12951",
    from: "Delhi",
    to: "Mumbai",
    time: "4:35 PM",
    seats: 45,
    price: 2350,
    trainType: "Rajdhani Express",
    duration: "16h 5m",
    classes: ["1AC", "2AC", "3AC", "Sleeper"],
    runningDays: "Daily",
    rating: "4.5",
    amenities: [
      "Catering",
      "Bedroll",
      "WiFi",
      "Charging Ports",
      "Reading Light",
    ],
  },
  {
    id: 202,
    name: "Shatabdi Express 12009",
    number: "12009",
    from: "Delhi",
    to: "Amritsar",
    time: "7:20 AM",
    seats: 32,
    price: 1650,
    trainType: "Shatabdi Express",
    duration: "6h 10m",
    classes: ["CC", "EC"],
    runningDays: "Daily",
    rating: "4.4",
    amenities: ["Breakfast", "Lunch", "Newspaper", "Water Bottle", "WiFi"],
  },
  {
    id: 203,
    name: "Vande Bharat 22222",
    number: "22222",
    from: "Delhi",
    to: "Varanasi",
    time: "6:00 AM",
    seats: 28,
    price: 2850,
    trainType: "Vande Bharat Express",
    duration: "8h 15m",
    classes: ["CC", "EC"],
    runningDays: "Daily",
    rating: "4.8",
    amenities: [
      "WiFi",
      "Infotainment",
      "Bio-toilets",
      "Rotating Seats",
      "Catering",
    ],
  },
  {
    id: 204,
    name: "Duronto Express 12213",
    number: "12213",
    from: "Mumbai",
    to: "Delhi",
    time: "11:00 PM",
    seats: 65,
    price: 2100,
    trainType: "Duronto Express",
    duration: "15h 45m",
    classes: ["1AC", "2AC", "3AC"],
    runningDays: "Daily",
    rating: "4.3",
    amenities: ["Catering", "Bedroll", "WiFi", "Charging Ports"],
  },
  {
    id: 205,
    name: "Garib Rath 12201",
    number: "12201",
    from: "Mumbai",
    to: "Surat",
    time: "6:15 AM",
    seats: 120,
    price: 680,
    trainType: "Garib Rath Express",
    duration: "3h 20m",
    classes: ["3AC"],
    runningDays: "Daily",
    rating: "3.9",
    amenities: ["Charging Ports", "Water"],
  },
];

// Add duplicates for popular routes
const duplicateTrains = [
  { from: "Delhi", to: "Mumbai", count: 12 },
  { from: "Delhi", to: "Kolkata", count: 8 },
  { from: "Mumbai", to: "Chennai", count: 10 },
  { from: "Delhi", to: "Bangalore", count: 6 },
  { from: "Mumbai", to: "Pune", count: 15 },
  { from: "Delhi", to: "Jaipur", count: 10 },
  { from: "Bangalore", to: "Chennai", count: 12 },
  { from: "Kolkata", to: "Patna", count: 8 },
];

let currentId = trains.length + specialTrains.length + 1;

duplicateTrains.forEach((route) => {
  for (let j = 0; j < route.count; j++) {
    const trainType = trainTypes[Math.floor(Math.random() * 15)]; // First 15 types
    const trainNumber =
      trainNumbers[Math.floor(Math.random() * trainNumbers.length)];
    const routeInfo = popularRoutes.find(
      (r) => r.from === route.from && r.to === route.to
    );

    const basePrice =
      trainType.basePrice * (routeInfo ? routeInfo.baseMultiplier : 1);
    const price = Math.round(basePrice + Math.floor(Math.random() * 300) - 150);

    trains.push({
      id: currentId++,
      name: trainType.prefix
        ? `${trainType.prefix} ${trainNumber}`
        : `${trainNumber} ${trainType.name}`,
      number: trainNumber,
      from: route.from,
      to: route.to,
      time: departureTimes[Math.floor(Math.random() * departureTimes.length)],
      seats: Math.floor(Math.random() * 50) + 20,
      price: Math.max(300, price),
      trainType: trainType.name,
      duration: `${Math.floor(Math.random() * 10) + 6}h ${Math.floor(
        Math.random() * 60
      )}m`,
      classes: getRandomClasses(trainType.name),
      runningDays: getRunningDays(),
      rating: (Math.random() * 1.5 + 3.5).toFixed(1),
      amenities: getTrainAmenities(trainType.name),
    });
  }
});

// Helper functions
function getRandomClasses(trainType) {
  const allClasses = {
    premium: ["1AC", "2AC", "3AC", "CC", "EC"],
    express: ["2AC", "3AC", "Sleeper", "CC"],
    budget: ["3AC", "Sleeper", "General"],
    local: ["General"],
  };

  let classes = [];
  if (trainType.includes("Rajdhani") || trainType.includes("Vande Bharat")) {
    classes = allClasses.premium.slice(0, 3 + Math.floor(Math.random() * 2));
  } else if (trainType.includes("Shatabdi") || trainType.includes("Tejas")) {
    classes = ["CC", "EC"];
  } else if (trainType.includes("Garib Rath")) {
    classes = ["3AC"];
  } else if (trainType.includes("Passenger") || trainType.includes("Local")) {
    classes = ["General"];
  } else {
    classes = allClasses.express.slice(0, 2 + Math.floor(Math.random() * 2));
  }

  return classes;
}

function getRunningDays() {
  const patterns = [
    "Daily",
    "Except Sunday",
    "Monday, Wednesday, Friday",
    "Tuesday, Thursday, Saturday",
    "Weekends Only",
  ];
  return patterns[Math.floor(Math.random() * patterns.length)];
}

function getTrainAmenities(trainType) {
  const premiumAmenities = [
    "WiFi",
    "Catering",
    "Bedroll",
    "Infotainment",
    "Charging Ports",
    "Reading Light",
    "Newspaper",
  ];
  const standardAmenities = ["Charging Ports", "Water", "Reading Light"];
  const basicAmenities = ["Water"];

  if (
    trainType.includes("Rajdhani") ||
    trainType.includes("Vande Bharat") ||
    trainType.includes("Shatabdi")
  ) {
    return premiumAmenities.slice(0, 4 + Math.floor(Math.random() * 3));
  } else if (trainType.includes("Express") || trainType.includes("Duronto")) {
    return standardAmenities
      .concat(["Catering"])
      .slice(0, 3 + Math.floor(Math.random() * 2));
  } else {
    return basicAmenities;
  }
}

// Add special trains to the main array
trains.push(...specialTrains);

// Shuffle the trains array for randomness
trains.sort(() => Math.random() - 0.5);

console.log(`Total trains generated: ${trains.length}`);

export default trains;
