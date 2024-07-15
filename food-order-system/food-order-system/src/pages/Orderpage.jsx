import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "../services/api";
import OrderSummary from "../components/OrderSummary";

const OrderPage = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [error, setError] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  // Load order items from localStorage on component mount
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setOrderItems(storedItems);

    // Calculate total amount
    const amount = storedItems.reduce(
      (acc, item) => acc + parseFloat(item.price),
      0
    );
    setTotalAmount(amount);
    localStorage.setItem("total", amount);
  }, []);

  const removeFromOrder = (itemToRemove) => {
    const updatedItems = orderItems.filter(
      (item) => item.id !== itemToRemove.id
    );
    setOrderItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  const submitOrder = () => {
    // Validate customer information
    if (!customerName || !customerAddress || !customerPhone) {
      setError("Please enter customer details.");
      return;
    }

    // Prepare items array
    const items = orderItems.map((item) => ({
      menu_item: {
        id: item.id, // Assuming item.id corresponds to menu_item.id
        name: item.name,
        description: item.description || "", // Provide default empty string if description is null/undefined
        price: parseFloat(item.price).toFixed(2), // Format price to two decimal places
        restaurant: item.restaurant, // Assuming item.restaurant corresponds to menu_item.restaurant
      },
    }));

    // Prepare order data to send to backend
    const orderData = {
      customer_name: customerName,
      customer_address: customerAddress,
      customer_phone: customerPhone,
      status: "pending", // Set initial status to pending
      items: items,
      restaurant: localStorage.getItem("restaurantId"), // Assuming restaurant ID will be set manually for now
    };

    // Send order data to backend API
    axios
      .post("http://127.0.0.1:8000/api/orders/", orderData)
      .then((response) => {
        localStorage.setItem("orderID", response.data.id);
        console.log("Order submitted successfully:", response.data);
        setSubmitted(true); // Set submitted to true to trigger navigation
        localStorage.removeItem("cartItems"); // Clear localStorage
      })
      .catch((error) => {
        console.error("Error submitting order:", error);
        setError("Failed to submit order. Please try again later.");
      });
  };

  // Redirect to PastOrdersPage after submission
  if (submitted) {
    return <Navigate to="/past-orders" />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md py-4">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">Cart page</h1>
          <nav>
            <a href="/" className="text-blue-500 hover:text-blue-700 mx-3">
              Home
            </a>
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto mt-10 px-4">
        <OrderSummary
          cartItems={orderItems}
          totalAmount={totalAmount}
          removeFromOrder={removeFromOrder}
          submitOrder={submitOrder}
        />
        {/* Customer information form */}
        <div className="mt-8">
          <form className="space-y-4">
            <div>
              <label
                htmlFor="customerName"
                className="block text-sm font-medium text-gray-700"
              >
                Customer Name:
              </label>
              <input
                type="text"
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="customerAddress"
                className="block text-sm font-medium text-gray-700"
              >
                Customer Address:
              </label>
              <input
                type="text"
                id="customerAddress"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="customerPhone"
                className="block text-sm font-medium text-gray-700"
              >
                Customer Phone:
              </label>
              <input
                type="text"
                id="customerPhone"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
      </main>

      <footer className="bg-white shadow-md py-4 mt-auto">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <p className="text-gray-600">
            &copy; 2024 Restaurant Menu. All rights reserved.
          </p>
          <nav>
            <a
              href="/privacy"
              className="text-blue-500 hover:text-blue-700 mx-3"
            >
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
};

export default OrderPage;
