import React from 'react';
import { Link } from 'react-router-dom';

const AuthHeader = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-white text-xl font-semibold">
          MyApp
        </Link>
        <div className="flex space-x-4">
          <Link
            to="/login"
            className="text-white hover:underline transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-white hover:underline transition duration-300"
          >
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AuthHeader;
