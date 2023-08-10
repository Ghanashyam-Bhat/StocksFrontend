import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Header = () => {
  const history = useHistory()
  return (
    <nav className="bg-blue-500 p-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-white text-xl font-semibold">
          MyApp
        </Link>
        <div className="flex space-x-4">
          <Link
            to="/table"
            className="text-white hover:underline transition duration-300"
          >
            Table
          </Link>
          <Link
            to="/upload"
            className="text-white hover:underline transition duration-300"
          >
            Preferences
          </Link>
            <button
              onClick={async ()=>{
                const res = await axios.post('auth/logout/',{});
                if(res.status===201){
                  history.replace('/login');
                }
                else{
                  console.log("Failed to logout");
                }
              }}
              className="text-black hover:underline focus:outline-none transition duration-300"
            >
              Logout
            </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
