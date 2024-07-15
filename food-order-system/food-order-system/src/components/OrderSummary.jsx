import React from "react";

const OrderSummary = ({
  cartItems,
  totalAmount,
  removeFromOrder,
  submitOrder,
}) => {
  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-5 text-center">Order Summary</h1>
      <ul>
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="mb-6 p-4 rounded-lg shadow-lg bg-white flex items-center justify-between"
          >
            <div>
              <h2 className="text-xl font-bold mb-2">{item.name}</h2>
              <p className="text-gray-700">Price: ${item.price}</p>
            </div>
            <button
              onClick={() => removeFromOrder(item)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-xl font-bold text-center">
        Total Amount: ${totalAmount.toFixed(2)}
      </p>
      <div className="flex justify-center mt-8">
        <button
          onClick={submitOrder}
          className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Submit Order
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
