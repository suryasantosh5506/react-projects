import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-6 text-white">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="text-2xl font-bold">JobPortal</h2>

        <p className="mt-2 text-gray-400">Find your dream job with ease.</p>

        <p className="mt-4 text-sm text-gray-500">
          © {new Date().getFullYear()} JobPortal. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
