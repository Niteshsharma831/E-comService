// import React from "react";
// import { useNavigate } from "react-router-dom";

// const categories = [
//   {
//     name: "Offers",
//     image:
//       "https://www.copywritematters.com/wp-content/uploads/2022/02/bigstock-Guy-with-megaphone-and-white-b-41799547.jpg",
//     route: null,
//   },
//   {
//     name: "Mobiles & Tablets",
//     image:
//       "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/5f2ee7f883cdb774.png?q=100",
//     route: "/smartphone",
//   },
//   {
//     name: "Fashion",
//     image:
//       "https://imgs.search.brave.com/7G4SMlBYEYPrukMLZNwpvZ_98a5rly5dnpxvBhKrRvc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ydWtt/aW5pbTIuZmxpeGNh/cnQuY29tL2ZrLXAt/ZmxhcC8xMjgvMTI4/L2ltYWdlLzBkNzVi/MzRmN2Q4ZmJjYjMu/cG5nP3E9MTAw",
//     route: "/fashions",
//   },
//   {
//     name: "Electronics",
//     image:
//       "https://unconventionalblog.com/wp-content/uploads/2023/11/What-is-an-electronic-gadget.jpg",
//     route: "/electronic",
//   },
//   {
//     name: "Home & Furniture",
//     image:
//       "https://indigopaints.com/wp-content/uploads/2021/02/shutterstock_1105805627.webp",
//     route: "/home&tv",
//   },
//   {
//     name: "TVs & Appliances",
//     image:
//       "https://static-assets.business.amazon.com/assets/in/24th-jan/705_Website_Blog_Appliances_1450x664.jpg.transform/1450x664/image.jpg",
//     route: "/home&tv",
//   },
//   {
//     name: "Flight Bookings",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF_hv8MRQYluOdn720-5owg0gU6kCn4iPvfg&s",
//     route: "/booking",
//   },
//   {
//     name: "Beauty, Food..",
//     image:
//       "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/26481290/2024/2/5/92ef59e6-9b95-4690-a712-29c1c907e23e1707116898104-DukieKooky-Kids-Teddy-Bear-Soft-Toy-5441707116898074-11.jpg",
//     route: null,
//   },
//   {
//     name: "Grocery",
//     image:
//       "https://freepngimg.com/save/54009-grocery-picture-free-png-hq/900x600",
//     route: "/grocery",
//   },
// ];

// const CategoryBar = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="w-full">
//       <div className="flex gap-4 sm:gap-6 md:gap-8 overflow-x-auto scrollbar-hide pb-2">
//         {categories.map((cat, index) => (
//           <div
//             key={index}
//             className={`flex flex-col items-center cursor-pointer flex-shrink-0 ${
//               cat.route
//                 ? "hover:text-blue-600 transition-colors"
//                 : "text-gray-400 cursor-default"
//             }`}
//             onClick={() => {
//               if (cat.route) navigate(cat.route);
//             }}
//           >
//             <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 flex items-center justify-center bg-gray-100 rounded-full overflow-hidden hover:bg-gray-200 transition-colors">
//               <img
//                 src={cat.image}
//                 alt={cat.name}
//                 className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 object-contain"
//               />
//             </div>
//             <span className="mt-1 text-center text-xs sm:text-sm font-medium whitespace-nowrap">
//               {cat.name}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryBar;

import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Offers",
    image:
      "https://www.copywritematters.com/wp-content/uploads/2022/02/bigstock-Guy-with-megaphone-and-white-b-41799547.jpg",
    route: null,
    color: "bg-gradient-to-br from-yellow-50 to-orange-50",
  },
  {
    name: "Mobiles",
    image:
      "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/5f2ee7f883cdb774.png?q=100",
    route: "/smartphone",
    color: "bg-gradient-to-br from-blue-50 to-cyan-50",
  },
  {
    name: "Fashion",
    image:
      "https://imgs.search.brave.com/7G4SMlBYEYPrukMLZNwpvZ_98a5rly5dnpxvBhKrRvc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ydWtt/aW5pbTIuZmxpeGNh/cnQuY29tL2ZrLXAt/ZmxhcC8xMjgvMTI4/L2ltYWdlLzBkNzVi/MzRmN2Q4ZmJjYjMu/cG5nP3E9MTAw",
    route: "/fashions",
    color: "bg-gradient-to-br from-pink-50 to-rose-50",
  },
  {
    name: "Electronics",
    image:
      "https://unconventionalblog.com/wp-content/uploads/2023/11/What-is-an-electronic-gadget.jpg",
    route: "/electronic",
    color: "bg-gradient-to-br from-purple-50 to-violet-50",
  },
  {
    name: "Home",
    image:
      "https://indigopaints.com/wp-content/uploads/2021/02/shutterstock_1105805627.webp",
    route: "/home&tv",
    color: "bg-gradient-to-br from-emerald-50 to-teal-50",
  },
  {
    name: "TVs",
    image:
      "https://static-assets.business.amazon.com/assets/in/24th-jan/705_Website_Blog_Appliances_1450x664.jpg.transform/1450x664/image.jpg",
    route: "/home&tv",
    color: "bg-gradient-to-br from-orange-50 to-amber-50",
  },
  {
    name: "Flight",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF_hv8MRQYluOdn720-5owg0gU6kCn4iPvfg&s",
    route: "/booking",
    color: "bg-gradient-to-br from-indigo-50 to-blue-50",
  },
  {
    name: "Beauty & Food",
    image:
      "https://assets.myntassets.com/w_412,q_60,dpr_2,fl-progressive/assets/images/26481290/2024/2/5/92ef59e6-9b95-4690-a712-29c1c907e23e1707116898104-DukieKooky-Kids-Teddy-Bear-Soft-Toy-5441707116898074-11.jpg",
    route: null,
    color: "bg-gradient-to-br from-red-50 to-pink-50",
  },
  {
    name: "Grocery",
    image:
      "https://freepngimg.com/save/54009-grocery-picture-free-png-hq/900x600",
    route: "/grocery",
    color: "bg-gradient-to-br from-green-50 to-emerald-50",
  },
];

const CategoryBar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Scrollable Container */}
      <div className="relative">
        <div className="flex gap-2 sm:gap-3 md:gap-4 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {categories.map((cat, index) => (
            <div
              key={index}
              className={`flex-shrink-0 ${
                cat.route ? "cursor-pointer" : "cursor-default"
              }`}
              onClick={() => {
                if (cat.route) navigate(cat.route);
              }}
            >
              {/* Card Container - Auto adjusts based on screen */}
              <div
                className={`${
                  cat.color
                } rounded-xl p-2 sm:p-3 shadow-sm hover:shadow-md transition-all duration-200 ${
                  cat.route ? "hover:opacity-90" : "opacity-70"
                }`}
              >
                {/* Image Container */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-1 sm:mb-2">
                  <div className="absolute inset-0 bg-white/80 rounded-lg p-1.5 sm:p-2 flex items-center justify-center">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Coming Soon Badge */}
                  {!cat.route && (
                    <div className="absolute -top-1 -right-1 bg-gray-500 text-white text-[10px] px-1 rounded-full">
                      Soon
                    </div>
                  )}
                </div>

                {/* Category Name */}
                <p
                  className={`text-center text-xs sm:text-sm font-medium ${
                    cat.route ? "text-gray-800" : "text-gray-500"
                  }`}
                >
                  {cat.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Gradient Fade for Mobile */}
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 w-6 bg-gradient-to-l from-white to-transparent md:hidden"></div>
        <div className="pointer-events-none absolute top-0 left-0 bottom-0 w-6 bg-gradient-to-r from-white to-transparent md:hidden"></div>
      </div>

      {/* Mobile Scroll Indicator */}
      <div className="md:hidden text-center mt-1 pt-1">
        <div className="inline-flex items-center gap-1 text-[10px] text-gray-400">
          <span>Scroll</span>
          <span className="text-gray-300">→</span>
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
