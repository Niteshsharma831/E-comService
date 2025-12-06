// src/context/flights.js

const indianCities = [
  "Delhi",
  "Mumbai",
  "Chennai",
  "Bangalore",
  "Kolkata",
  "Hyderabad",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Chandigarh",
  "Goa",
  "Visakhapatnam",
  "Bhubaneswar",
  "Thiruvananthapuram",
  "Coimbatore",
  "Mysore",
  "Vijayawada",
];

const internationalCities = [
  "Dubai",
  "Singapore",
  "London",
  "New York",
  "Paris",
  "Sydney",
  "Tokyo",
  "Doha",
  "Bangkok",
  "Kuala Lumpur",
];

const airlines = [
  "Indigo",
  "Air India",
  "Vistara",
  "SpiceJet",
  "GoAir",
  "Akasa Air",
  "AirAsia",
  "Emirates",
  "Qatar Airways",
  "British Airways",
  "Singapore Airlines",
  "Lufthansa",
];

const travelTimes = [
  "12:00 AM",
  "1:00 AM",
  "2:00 AM",
  "3:00 AM",
  "4:00 AM",
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
  "10:00 PM",
  "10:30 PM",
  "11:00 PM",
  "11:30 PM",
];

const flights = [];

function getRandomFlightNumber(airline) {
  const code = airline.slice(0, 2).toUpperCase();
  const number = Math.floor(Math.random() * 900 + 100); // 100-999
  return `${airline} ${code}-${number}`;
}

function generateFlightId() {
  return Math.floor(Math.random() * 1000000);
}

function generateDuration(fromCity, toCity) {
  // rough estimate: domestic 1-5h, international 6-14h
  const international =
    internationalCities.includes(fromCity) ||
    internationalCities.includes(toCity);
  return international
    ? `${Math.floor(Math.random() * 9) + 6}h ${Math.floor(Math.random() * 60)}m`
    : `${Math.floor(Math.random() * 4) + 1}h ${Math.floor(
        Math.random() * 60
      )}m`;
}

function generatePrice(fromCity, toCity) {
  const base =
    internationalCities.includes(fromCity) ||
    internationalCities.includes(toCity)
      ? Math.floor(Math.random() * 20000) + 8000 // 8k-28k INR for intl
      : Math.floor(Math.random() * 7000) + 2500; // 2.5k-9.5k INR for domestic
  return base;
}

function generateSeats() {
  return Math.floor(Math.random() * 80) + 20; // 20-100 seats
}

// Generate domestic flights
indianCities.forEach((from) => {
  indianCities.forEach((to) => {
    if (from !== to) {
      const numFlights = Math.floor(Math.random() * 2) + 2; // 2-3 flights per route
      for (let i = 0; i < numFlights; i++) {
        const airline = airlines[Math.floor(Math.random() * 6)]; // domestic carriers
        flights.push({
          id: generateFlightId(),
          name: getRandomFlightNumber(airline),
          from,
          to,
          time: travelTimes[Math.floor(Math.random() * travelTimes.length)],
          seats: generateSeats(),
          price: generatePrice(from, to),
          duration: generateDuration(from, to),
          rating: (Math.random() * 1.5 + 3.5).toFixed(1), // 3.5-5
          reviews: Math.floor(Math.random() * 500) + 50,
        });
      }
    }
  });
});

// Generate international flights (from India → Intl & Intl → India)
indianCities.forEach((indiaCity) => {
  internationalCities.forEach((intCity) => {
    const numFlights = Math.floor(Math.random() * 2) + 1; // 1-2 per route
    for (let i = 0; i < numFlights; i++) {
      // India → Intl
      let airline = airlines[Math.floor(Math.random() * airlines.length)];
      flights.push({
        id: generateFlightId(),
        name: getRandomFlightNumber(airline),
        from: indiaCity,
        to: intCity,
        time: travelTimes[Math.floor(Math.random() * travelTimes.length)],
        seats: generateSeats(),
        price: generatePrice(indiaCity, intCity),
        duration: generateDuration(indiaCity, intCity),
        rating: (Math.random() * 1.5 + 3.5).toFixed(1),
        reviews: Math.floor(Math.random() * 500) + 50,
      });

      // Intl → India
      airline = airlines[Math.floor(Math.random() * airlines.length)];
      flights.push({
        id: generateFlightId(),
        name: getRandomFlightNumber(airline),
        from: intCity,
        to: indiaCity,
        time: travelTimes[Math.floor(Math.random() * travelTimes.length)],
        seats: generateSeats(),
        price: generatePrice(intCity, indiaCity),
        duration: generateDuration(intCity, indiaCity),
        rating: (Math.random() * 1.5 + 3.5).toFixed(1),
        reviews: Math.floor(Math.random() * 500) + 50,
      });
    }
  });
});

console.log(`Total flights generated: ${flights.length}`);

export default flights;
