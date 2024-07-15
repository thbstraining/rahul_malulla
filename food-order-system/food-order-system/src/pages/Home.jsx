import React from "react";
import { Link } from "react-router-dom";
import RestaurantList from "../components/RestaurantList";

const Home = () => (
  <div className="bg-gray-100 min-h-screen">
    {/* Navigation Bar */}
    <header className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Food Ordering App
            </h1>
          </div>
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {/* Nav Items */}
                <Link
                  to="/"
                  className="text-gray-900 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/order"
                  className="text-gray-900 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    {/* Main Content */}
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-3xl mx-auto">
        <RestaurantList />
      </div>
    </main>
  </div>
);

export default Home;
