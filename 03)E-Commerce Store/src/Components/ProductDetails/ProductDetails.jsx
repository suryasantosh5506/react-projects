import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import ProductContext from "../../Contexts/ProductContext/ProductContext";

const ProductDetails = () => {
  const product = useLoaderData();
  const { cart, setCart, handleAdd, handleRemove } = useContext(ProductContext);
  const [quantity, setQuantity] = useState(1);

  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const presentIncart = (id) => {
    const exists = cart.some((item) => item.id === id);
    return exists;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6 grid md:grid-cols-2 gap-8">
        <div className="flex justify-center items-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full max-w-md object-contain"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

          <p className="text-gray-600 mb-4">{product.description}</p>

          <p className="text-lg mb-2">
            <span className="font-semibold">Category:</span> {product.category}
          </p>

          <p className="text-lg mb-2">
            <span className="font-semibold">Brand:</span> {product.brand}
          </p>

          <p className="text-lg mb-2">
            <span className="font-semibold">Rating:</span> ⭐ {product.rating}
          </p>

          <p className="text-lg mb-2">
            <span className="font-semibold">Stock:</span> {product.stock}
          </p>

          <h2 className="text-4xl font-bold text-green-600 my-6">
            ${product.price}
          </h2>

          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border border-gray-300 rounded-lg px-4 py-2 mr-4 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {arr.map((i) => (
              <option value={i} key={i}>
                {i}
              </option>
            ))}
          </select>

          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            onClick={() =>
              presentIncart(product.id)
                ? handleRemove(product.id)
                : handleAdd(product, quantity)
            }
          >
            {presentIncart(product.id) ? "Remove From Cart" : "Add To Cart"}
          </button>
        </div>
      </div>

      {product.reviews && product.reviews.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

          <div className="space-y-4">
            {product.reviews.map((review, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{review.reviewerName}</h3>

                  <span className="text-yellow-500">
                    {"⭐".repeat(review.rating)}
                  </span>
                </div>

                <p className="text-gray-600">{review.comment}</p>

                <p className="text-sm text-gray-400 mt-2">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
