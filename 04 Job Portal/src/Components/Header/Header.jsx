import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-slate-800 shadow-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="text-2xl font-bold text-white">
          JobPortal
        </NavLink>

        <div className="flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-medium transition ${
                isActive ? "text-cyan-400" : "text-white hover:text-cyan-400"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/jobs"
            className={({ isActive }) =>
              `font-medium transition ${
                isActive ? "text-cyan-400" : "text-white hover:text-cyan-400"
              }`
            }
          >
            Jobs
          </NavLink>

          <NavLink
            to="/saved-jobs"
            className={({ isActive }) =>
              `font-medium transition ${
                isActive ? "text-cyan-400" : "text-white hover:text-cyan-400"
              }`
            }
          >
            Saved Jobs
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
