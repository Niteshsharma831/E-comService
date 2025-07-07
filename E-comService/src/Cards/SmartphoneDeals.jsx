import React from "react";
import { Link } from "react-router-dom"; // ✅ Import Link

const smartphones = [
  {
    name: "Realme C61",
    price: "Just ₹7,699",
    image:
      "https://rukminim2.flixcart.com/image/240/240/xif0q/mobile/x/v/z/-original-imah28xpzzwz4fwg.jpeg?q=60",
  },
  {
    name: "Poco M6 Plus",
    price: "Just ₹16,999",
    image:
      "https://rukminim2.flixcart.com/image/240/240/xif0q/mobile/9/b/n/-original-imah3afnqj84usyy.jpeg?q=60",
  },
  {
    name: "Nothing Phone 2 pro",
    price: "From ₹17,999*",
    image:
      "https://rukminim2.flixcart.com/image/240/240/xif0q/mobile/w/w/h/-original-imahc7ezhz9qxm6d.jpeg?q=60",
  },
  {
    name: "Vivo T4 Ultra",
    price: "From ₹4000/m",
    image:
      "https://rukminim2.flixcart.com/image/240/240/xif0q/mobile/s/v/h/-original-imahd57g62dfepkh.jpeg?q=60",
  },
  {
    name: "POCO C75 5G",
    price: "From ₹7,699",
    image:
      "https://rukminim2.flixcart.com/image/240/240/xif0q/mobile/t/k/h/-original-imah7jsppzwb9qb3.jpeg?q=60",
  },
  {
    name: "Motorola G05",
    price: "Just ₹7,299",
    image:
      "https://rukminim2.flixcart.com/image/240/240/xif0q/mobile/j/a/b/-original-imah83eztbdcsknu.jpeg?q=60",
  },
  {
    name: "Galaxy S24 FE",
    price: "From ₹34,999*",
    image:
      "https://rukminim2.flixcart.com/image/240/240/xif0q/mobile/m/3/k/-original-imahbqxnuhznhsj4.jpeg?q=60",
  },
  {
    name: "Iphone 15 Pro Max",
    price: "From ₹34,999*",
    image:
      "https://rukminim2.flixcart.com/image/240/240/xif0q/mobile/q/n/s/-original-imah4jyfrgsbebg9.jpeg?q=60",
  },
];

const SmartphoneDeals = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Best Deals on Smartphones</h2>
      <div className="relative">
        <div className="flex overflow-x-auto scrollbar-hide gap-6 px-4 touch-auto">
          {smartphones.map((item, index) => (
            <Link
              key={index}
              to="smartphone" 
              className="min-w-[150px] flex-shrink-0 text-center hover:scale-105 transition transform duration-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-40 w-28 mx-auto object-contain mb-2 cursor-pointer"
              />
              <div className="font-medium">{item.name}</div>
              <div className="text-green-700 font-semibold">{item.price}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmartphoneDeals;
