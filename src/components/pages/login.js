import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SignedOutHeader from "../layout/signedOutHeader";
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      setError('');
      const res = await axios.post('auth/login/',{
        email:email,
        password:password
      })
      if(res.status===201){
        history.replace('/table');
      }
      throw new Error("Failed to Login");
      
    } catch (error) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <SignedOutHeader/>
    <div className="flex h-screen bg-gray-200">
      <div className="m-auto p-8 bg-white rounded shadow w-full max-w-md">
        <h1 className="text-3xl font-semibold mb-4">Login</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div>
            <button
              type="button"
              onClick={handleLogin}
              disabled={isLoading}
              className={`bg-blue-500 text-white px-4 py-2 rounded focus:outline-none ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
              }`}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default LoginPage;
