import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Offers",
    image:
      "https://www.copywritematters.com/wp-content/uploads/2022/02/bigstock-Guy-with-megaphone-and-white-b-41799547.jpg",
    route: null,
  },
  {
    name: "Mobiles & Tablets",
    image:
      "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/5f2ee7f883cdb774.png?q=100",
    route: "/smartphone",
  },
  {
    name: "Fashion",
    image:
      "https://imgs.search.brave.com/7G4SMlBYEYPrukMLZNwpvZ_98a5rly5dnpxvBhKrRvc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ydWtt/aW5pbTIuZmxpeGNh/cnQuY29tL2ZrLXAt/ZmxhcC8xMjgvMTI4/L2ltYWdlLzBkNzVi/MzRmN2Q4ZmJjYjMu/cG5nP3E9MTAw",
    route: "/fashions",
  },
  {
    name: "Electronics",
    image:
      "https://unconventionalblog.com/wp-content/uploads/2023/11/What-is-an-electronic-gadget.jpg",
    route: "/electronic",
  },
  {
    name: "Home & Furniture",
    image:
      "https://indigopaints.com/wp-content/uploads/2021/02/shutterstock_1105805627.webp",
    route: "/home&tv",
  },
  {
    name: "TVs & Appliances",
    image:
      "https://static-assets.business.amazon.com/assets/in/24th-jan/705_Website_Blog_Appliances_1450x664.jpg.transform/1450x664/image.jpg",
    route: "/home&tv",
  },
  {
    name: "Flight Bookings",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF_hv8MRQYluOdn720-5owg0gU6kCn4iPvfg&s",
    route: "/booking",
  },
  {
    name: "Beauty, Food..",
    image:
      "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/26481290/2024/2/5/92ef59e6-9b95-4690-a712-29c1c907e23e1707116898104-DukieKooky-Kids-Teddy-Bear-Soft-Toy-5441707116898074-11.jpg",
    route: null,
  },
  {
    name: "Grocery",
    image:
      "https://freepngimg.com/save/54009-grocery-picture-free-png-hq/900x600",
    route: "/grocery",
  },
];

const CategoryBar = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-25 left-0 w-full bg-white shadow-md z-40">
      <div className="flex justify-center">
        <div className="flex gap-8 overflow-x-auto scrollbar-hide px-4 py-3 w-full max-w-screen-xl">
          {categories.map((cat, index) => (
            <div
              key={index}
              className={`flex flex-col items-center text-sm cursor-pointer min-w-[80px] ${
                cat.route
                  ? "hover:text-blue-600"
                  : "text-gray-400 cursor-default"
              }`}
              onClick={() => {
                if (cat.route) navigate(cat.route);
              }}
            >
              <div className="h-14 w-14 flex items-center justify-center bg-gray-100 rounded-full overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-10 w-10 object-contain"
                />
              </div>
              <span className="mt-1 text-center">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
