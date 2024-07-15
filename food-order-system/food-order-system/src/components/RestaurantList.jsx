import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../services/api";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios
      .get("/restaurants/")
      .then((response) => {
        setRestaurants(response.data);
      })
      .catch((error) => console.error("Error fetching restaurants:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        {/* <div className="max-w-6xl mx-auto py-4 px-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">
            Restaurant Finder
          </h1>
          <nav>
            <Link to="/" className="text-blue-500 hover:text-blue-700 mx-3">
              Home
            </Link>
            <Link
              to="/about"
              className="text-blue-500 hover:text-blue-700 mx-3"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-blue-500 hover:text-blue-700 mx-3"
            >
              Contact
            </Link>
          </nav>
        </div> */}
      </header>

      <main className="flex flex-col min-h-screen">
        <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">
          Restaurants
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {restaurants.map((restaurant) => (
            <li
              key={restaurant.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={`https://picsum.photos/seed/${restaurant.id}/400/200`}
                alt={restaurant.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-2xl font-bold mb-2 text-gray-800">
                {restaurant.name}
              </h3>
              <p className="text-gray-600 mb-2">
                Address: {restaurant.address}
              </p>
              <p className="text-gray-600 mb-4">Phone: {restaurant.phone}</p>
              <Link
                to={`/restaurants/${restaurant.id}`}
                className="inline-block w-full py-2 px-4 bg-blue-500 text-white text-center rounded-md hover:bg-blue-600"
              >
                View Menu
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <footer className="bg-white shadow-md mt-auto">
        <div className="max-w-6xl mx-auto py-6 px-4 flex justify-between items-center">
          <p className="text-gray-600">
            &copy; 2024 Restaurant Finder. All rights reserved.
          </p>
          <nav>
            <Link
              to="/privacy"
              className="text-blue-500 hover:text-blue-700 mx-3"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-blue-500 hover:text-blue-700 mx-3"
            >
              Terms of Service
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default RestaurantList;
