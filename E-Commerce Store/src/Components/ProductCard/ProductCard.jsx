import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition duration-300">
      <div className="h-52 flex items-center justify-center">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-40 object-contain"
        />
      </div>

      <h3 className="font-semibold text-lg mt-4 line-clamp-2">
        {product.title}
      </h3>

      <p className="text-gray-500 mt-2 capitalize">{product.category}</p>

      <p className="text-2xl font-bold text-green-600 mt-3">${product.price}</p>

      <Link
        to={`/product/${product.id}`}
        className="block text-center w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
