// src/pages/Logo.tsx
import React from "react";
import { Link } from "react-router-dom";
import gptLogo from "../assets/gpt-logo.png"; // adjust path if needed

const Logo: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <img src={gptLogo} alt="GPT Logo" className="w-40 h-40 mb-6" />
      <h1 className="text-3xl font-bold text-gray-800">Welcome to GPT Homepage</h1>
      <p className="mt-2 text-gray-600">
        This is your homepage built with React + TypeScript 🚀
      </p>

      {/* Example navigation */}
      <Link
        to="/app"
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Go to App
      </Link>
    </div>
  );
};

export default Logo;
