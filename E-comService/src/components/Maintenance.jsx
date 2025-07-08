// src/pages/Maintenance.js
import React from "react";

const Maintenance = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        🚧 Under Maintenance
      </h1>
      <p className="text-gray-700 text-lg mb-6">
        Oops! We're making some exciting updates. <br />
        Please check back soon! 😄
      </p>
      <img
        src="https://cdni.iconscout.com/illustration/premium/thumb/website-under-maintenance-4046920-3369543.png"
        alt="Maintenance"
        className="w-72"
      />
    </div>
  );
};

export default Maintenance;
