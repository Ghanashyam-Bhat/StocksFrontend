import React, { useState } from 'react';
import axios from 'axios';
import SignedInHeader from "../layout/signedInHeader";

const DataUploadForm = () => {
  const [file, setFile] = useState(null);
  const [selectedInterval, setSelectedInterval] = useState('monthly');
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleIntervalChange = (event) => {
    setSelectedInterval(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append('csvFile', file);
        formData.append('interval', selectedInterval);

        const response = await axios.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Handle the response from the server
        console.log('Upload successful', response.data);
        setUploadStatus('Upload successful');
      } catch (error) {
        console.error('Error uploading file', error);
        setUploadStatus('Error uploading file');
      }
    } else {
      setUploadStatus('Please select a file');
    }
  };

  return (
    <>
    <SignedInHeader/>
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col justify-center items-center">
      
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Data Upload</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="file" className="block text-sm font-medium text-gray-600">
              Upload CSV File:
            </label>
            <input type="file" id="file" accept=".csv" onChange={handleFileChange} className="mt-1 p-2 border rounded w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="interval" className="block text-sm font-medium text-gray-600">
              Select Interval:
            </label>
            <select
              id="interval"
              value={selectedInterval}
              onChange={handleIntervalChange}
              className="mt-1 p-2 border rounded w-full"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Upload and Submit
            </button>
          </div>
        </form>
        {uploadStatus && <p className="mt-4 text-green-600">{uploadStatus}</p>}
      </div>
    </div>
    </>
  );
};

export default DataUploadForm;
