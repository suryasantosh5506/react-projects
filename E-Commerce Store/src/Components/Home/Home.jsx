import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";
import ProductContext from "../../Contexts/ProductContext/ProductContext";
import ProductCard from "./../ProductCard/ProductCard";

const Home = () => {
  const productdata = useLoaderData();
  const { products, setProducts, category, setCategory } =
    useContext(ProductContext);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const cart = useContext(ProductContext);

  useEffect(() => {
    setProducts(productdata);
  }, [productdata]);

  let filteredProducts = productdata.filter((product) => {
    const matchesCategory = category === "" || product.category === category;

    const matchesSearch =
      query === "" ||
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.brand?.toLowerCase().includes(query.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handlesearch = () => {
    if (search.trim() === "") return;
    setQuery(search);
  };

  const categories = [
    ...new Set(productdata.map((product) => product.category)),
  ];

  if (sortBy === "price-low-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.rating - a.rating,
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">CartHub</h1>

        <div className="flex justify-center gap-3 mb-8">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handlesearch}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        <div className="flex justify-end mb-6">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm"
          >
            <option value="">All Categories</option>

            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm"
          >
            <option value="">Sort By</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link to={`/product/${product.id}`}>
              {" "}
              <ProductCard key={product.id} product={product} />{" "}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
