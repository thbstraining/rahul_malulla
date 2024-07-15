import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/api";

const Menu = () => {
  const { restaurantId } = useParams();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // Store restaurantId in local storage
    localStorage.setItem("restaurantId", restaurantId);

    axios
      .get(`/menu-items/?restaurant=${restaurantId}`)
      .then((response) => {
        setMenuItems(response.data);
      })
      .catch((error) => console.error("Error fetching menu items:", error));
  }, [restaurantId]);

  const addToOrder = (menuItem) => {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems.push(menuItem);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="flex flex-col min-h-screen">
        <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">
          Menu
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((menuItem) => (
            <li
              key={menuItem.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={`https://picsum.photos/seed/${menuItem.id}/400/200`}
                alt={menuItem.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-2xl font-bold mb-2 text-gray-800">
                {menuItem.name}
              </h3>
              <p className="text-gray-600 mb-4">Price: ${menuItem.price}</p>
              <button
                onClick={() => addToOrder(menuItem)}
                className="w-full py-2 px-4 bg-blue-500 text-white text-center rounded-md hover:bg-blue-600"
              >
                Add to Cart
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Menu;
