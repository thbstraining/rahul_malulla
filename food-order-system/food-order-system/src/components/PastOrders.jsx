import React, { useEffect, useState, useCallback } from "react";
import axios from "../services/api";

const OrderItem = React.memo(({ item }) => {
  const imageUrl = `https://picsum.photos/seed/${encodeURIComponent(
    item.menu_item.name
  )}/100/100`;

  return (
    <li key={item.id} className="mb-4 flex items-start">
      <div className="flex-shrink-0">
        <img
          src={imageUrl}
          alt={item.menu_item.name}
          className="w-16 h-16 rounded-lg"
        />
      </div>
      <div className="ml-4">
        <p className="text-gray-700 font-semibold">{item.menu_item.name}</p>
        <p className="text-gray-600">{item.menu_item.description}</p>

        {item.additional_requests && (
          <p className="text-gray-600">
            Additional: {item.additional_requests}
          </p>
        )}
        <p className="text-gray-700">Price: ${item.menu_item.price}</p>
      </div>
    </li>
  );
});
OrderItem.displayName = "OrderItem";

const PastOrders = () => {
  const [pastOrders, setPastOrders] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);

  useEffect(() => {
    // Retrieve orderId from local storage
    const storedOrderId = localStorage.getItem("orderID");
    setOrderId(storedOrderId);

    const storedAmount = localStorage.getItem("total");
    setTotalAmount(storedAmount);

    if (storedOrderId) {
      // Fetch past orders using the retrieved orderId
      axios
        .get(`/orders/${storedOrderId}/`)
        .then((response) => {
          setPastOrders([response.data]); // Ensure response data is an array
          console.log(response.data);
        })
        .catch((error) => console.error("Error fetching past orders:", error));
    }
  }, []);

  const renderOrderItem = useCallback(
    (item) => <OrderItem key={item.id} item={item} />,
    []
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="flex flex-col min-h-screen">
        <div className="flex-grow max-w-4xl mx-auto mt-10 px-4">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Your Order Summary
          </h1>
          <ul>
            {pastOrders.map((order) => (
              <li
                key={order.id}
                className="mb-6 p-6 rounded-lg shadow-lg bg-white"
              >
                <h2 className="text-2xl font-bold mb-4">Order ID: {orderId}</h2>
                <p className="text-gray-700 mb-2">
                  <strong>Customer:</strong> {order.customer_name}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Address:</strong> {order.customer_address}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Phone:</strong> {order.customer_phone}
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Status:</strong> {order.status}
                </p>
                <h3 className="text-xl font-bold mb-2">Items:</h3>
                <ul className="mb-4">{order.items.map(renderOrderItem)}</ul>
                <p className="mt-5 text-xl font-bold">
                  Total Amount to pay: ${totalAmount}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};
PastOrders.displayName = "PastOrders";

export default PastOrders;
