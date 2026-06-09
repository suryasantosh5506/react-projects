import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import ProductContext from "../../Contexts/ProductContext/ProductContext";

const Header = () => {
  const { cart } = useContext(ProductContext);
  const totalItems = cart.reduce(
    (total, item) => total + Number(item.quantity),
    0,
  );
  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <NavLink to="/" className="text-2xl font-bold text-blue-400">
          CartHub
        </NavLink>

        <nav className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-semibold"
                : "hover:text-blue-400 transition"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-semibold flex items-center gap-2"
                : "hover:text-blue-400 transition flex items-center gap-2"
            }
          >
            Cart
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
              {totalItems}
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
