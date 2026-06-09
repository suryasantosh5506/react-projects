import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductContext from "../../Contexts/ProductContext/ProductContext";

const CheckOut = () => {
  const { cart, setCart } = useContext(ProductContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.address ||
      !formData.phone
    ) {
      alert("Please fill all fields");
      return;
    }

    setCart([]);
    navigate("/");
    alert("Order placed successfully 🎉");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="address"
            placeholder="Shipping Address"
            value={formData.address}
            onChange={handleChange}
            rows="4"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="bg-gray-100 rounded-lg p-4">
            <h2 className="text-xl font-semibold">Order Summary</h2>

            <p className="mt-2">Items: {cart.length}</p>

            <p className="text-2xl font-bold text-green-600 mt-2">
              Total: ${totalPrice.toFixed(2)}
            </p>
          </div>

          <button
            type="submit"
            disabled={cart.length === 0}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckOut;
