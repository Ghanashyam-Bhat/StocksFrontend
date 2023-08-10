import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SignedOutHeader from "../layout/signedOutHeader";
const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmationError, setConfirmationError] = useState('');
  const history = useHistory();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Password validation
    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters');
    } else {
      setPasswordError('');
    }

    // Check password confirmation
    if (confirmPassword !== newPassword) {
      setConfirmationError('Passwords do not match');
    } else {
      setConfirmationError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    // Check password confirmation
    if (newConfirmPassword !== password) {
      setConfirmationError('Passwords do not match');
    } else {
      setConfirmationError('');
    }
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    // Handle signup logic here
    if (!passwordError && !confirmationError) {
      const res = await axios.post('auth/signup/',{
        email:email,
        password:password
      })
      if(res.status===201){
        console.log('Signup successful:', email);
        history.replace('/table');
      }
      throw new Error("Failed to Login");
      
    } else {
      console.log('Signup failed due to validation errors');
    }
  };

  return (
    <>
    <SignedOutHeader/>

    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      
      <h1 className="text-2xl font-semibold mb-4">Signup</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
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
            value={password}
            onChange={handlePasswordChange}
            className={`mt-1 p-2 border rounded w-full ${passwordError ? 'border-red-500' : ''}`}
            required
          />
          {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className={`mt-1 p-2 border rounded w-full ${confirmationError ? 'border-red-500' : ''}`}
            required
          />
          {confirmationError && <p className="text-red-500 text-xs mt-1">{confirmationError}</p>}
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Signup
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default SignupPage;
