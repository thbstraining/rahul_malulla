import React from "react";
import PastOrders from "../components/PastOrders";

const PastOrdersPage = () => (
  <div className="min-h-screen bg-gray-100">
    <header className="bg-white shadow-md py-4">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-600">Order Page</h1>
        <nav>
          <a href="/" className="text-blue-500 hover:text-blue-700 mx-3">
            Home
          </a>
        </nav>
      </div>
    </header>

    <main className="flex-grow max-w-6xl mx-auto mt-10 px-4">
      <PastOrders />
    </main>

    <footer className="bg-white shadow-md py-6 px-4 w-full mt-auto">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <p className="text-gray-600">
          &copy; 2024 Restaurant Menu. All rights reserved.
        </p>
        <nav>
          <a href="/privacy" className="text-blue-500 hover:text-blue-700 mx-3">
            Privacy Policy
          </a>
          <a href="/terms" className="text-blue-500 hover:text-blue-700 mx-3">
            Terms of Service
          </a>
        </nav>
      </div>
    </footer>
  </div>
);

export default PastOrdersPage;
