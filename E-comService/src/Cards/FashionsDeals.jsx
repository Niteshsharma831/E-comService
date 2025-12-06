import React from "react";
import { useNavigate } from "react-router-dom"; // Import navigate

const Fashions = [
  {
    name: "Mens T-shirt",
    price: "Just ₹7,699",
    image:
      "https://rukminim2.flixcart.com/image/420/420/xif0q/t-shirt/e/d/c/xxl-mens-strip-polo-hs-black-red-tb-blue-original-imahfdzkrtqyqtzx.jpeg?q=60",
  },
  {
    name: "Mosquito Net",
    price: "Just ₹16,999",
    image:
      "https://rukminim2.flixcart.com/image/420/420/xif0q/mosquito-net/c/g/x/king-size-bed-polyester-double-bed-with-saviours-suitable-for-6-original-imahckr75wyz9zdf.jpeg?q=60",
  },
  {
    name: "Sleeper's",
    price: "From ₹17,999*",
    image:
      "https://rukminim2.flixcart.com/image/420/420/xif0q/shopsy-slipper-flip-flop/e/u/n/6-pk-ms-777-gr-pkkart-grey-original-imagw7aewnrgfswz.jpeg?q=60",
  },
  {
    name: "Mens Casula Shirt",
    price: "From ₹4000/m",
    image:
      "https://rukminim2.flixcart.com/image/420/420/xif0q/shopsy-shirt/z/r/w/m-hkv-007s-hkv-fashion-original-imah5xdgyfrae7u2.jpeg?q=60",
  },
  {
    name: "Party Wear Sari",
    price: "From ₹7,699",
    image:
      "https://rukminim2.flixcart.com/image/420/420/xif0q/sari/f/q/b/free-9-patti-prisha-unstitched-original-imahcza5f9xveuwt.jpeg?q=60",
  },

  {
    name: "Hand Towels Set",
    price: "From ₹34,999*",
    image:
      "https://rukminim2.flixcart.com/image/420/420/xif0q/bath-towel/y/c/d/striped-hand-towels-high-absrobent-set-of-10-12x18-inch-multi-original-imah58cngqurhegr.jpeg?q=60",
  },
  {
    name: "Party Wear Shoes",
    price: "From ₹34,999*",
    image:
      "https://static.wixstatic.com/media/1adc9b_00832800bf8845ee84a59da7418cd2a2~mv2.png/v1/fill/w_284,h_284,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1adc9b_00832800bf8845ee84a59da7418cd2a2~mv2.png",
  },
  {
    name: "",
    price: "Just ₹7,299",
    image:
      "https://www.myshoe.in/cdn/shop/files/6-puma039420501-puma-black-white-original-imagpaf6gpwy9ekt_afac8ac7-38ac-497d-95ea-a7d466f29f1c.webp?v=1747654248&width=1214",
  },
];

const FashionDeals = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/shop");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Fashions Top's Deal</h2>
      <div className="flex overflow-x-auto gap-6 scrollbar-hide px-4">
        {Fashions.map((item, index) => (
          <div
            key={index}
            onClick={handleClick} // 👈 redirect on click
            className="cursor-pointer min-w-[150px] flex-shrink-0 text-center hover:scale-105 transition transform duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-40 w-28 mx-auto object-contain mb-2"
            />
            <div className="font-medium">{item.name}</div>
            <div className="text-green-700 font-semibold">{item.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FashionDeals;
