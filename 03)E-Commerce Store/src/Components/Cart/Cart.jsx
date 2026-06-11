import React, { useContext, useEffect } from "react";
import ProductContext from "../../Contexts/ProductContext/ProductContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, setCart, handleRemove } = useContext(ProductContext);

  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const updateQuantity = (id, quantity) => {
    setCart((prev) => {
      return prev.map((product) => {
        if (product.id === id) {
          return { ...product, quantity };
        }
      });
    });
  };

  const totalPrice = cart.reduce(
    (total, product) => total + product.price * Number(product.quantity),
    0,
  );

  const totalItems = cart.reduce(
    (total, product) => total + Number(product.quantity),
    0,
  );

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <h2 className="text-2xl text-gray-500">Your cart is empty</h2>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((product) => (
              <div
                key={product.id}
                className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-lg shadow"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-24 h-24 object-contain"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{product.title}</h3>

                  <p className="text-gray-500 capitalize">{product.category}</p>

                  <p className="text-green-600 font-bold text-lg">
                    ${product.price}
                  </p>
                </div>

                <select
                  value={product.quantity}
                  onChange={(e) =>
                    updateQuantity(product.id, Number(e.target.value))
                  }
                  className="border border-gray-300 rounded-lg px-4 py-2 mr-4 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {arr.map((i) => (
                    <option value={i} key={i}>
                      {i}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => handleRemove(product.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">
                Total Items: {totalItems}
              </h2>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-green-600">
                ${totalPrice.toFixed(2)}
              </h2>
            </div>
            <Link
              to="/checkout"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
