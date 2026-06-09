import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-4 text-center">
        <p>© {new Date().getFullYear()} CartHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
