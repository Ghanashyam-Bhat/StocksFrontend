import React, { useState,useEffect } from 'react';
import SignedInHeader from "../layout/signedInHeader";
import axios from 'axios';

const StockTable = () => {
  // Dummy stock data for the dropdown
  const [stockSymbols,setStockSymbols] = useState([]);
  // Initial state
  const [selectedStock, setSelectedStock] = useState(stockSymbols[0]);

  // Dummy table data (replace with actual stock data)
  const [tableData,setTableData] = useState([]);

  useEffect(()=>{
    const res =  axios.get('display/list/');
    if (res.status===201){
      console.log(res);
    }
   
  },[])

  // Handle stock selection change
  const handleStockChange = (event) => {
    setSelectedStock(event.target.value);
  };

  return (
    <div>
      <SignedInHeader/>
      <h1 className="text-2xl font-semibold mb-4">Stock Information</h1>
      <div className="mb-4">
        <label htmlFor="stockSymbol" className="block text-sm font-medium text-gray-600">
          Select Stock Symbol:
        </label>
        <select
          id="stockSymbol"
          name="stockSymbol"
          value={selectedStock}
          onChange={handleStockChange}
          className="mt-1 p-2 border rounded"
        >
          {stockSymbols.map((symbol) => (
            <option key={symbol} value={symbol}>
              {symbol}
            </option>
          ))}
        </select>
      </div>
      <table className="w-full border-collapse border border-gray-400">
          <tr className="bg-blue-400">
            <th className="border p-2">SYMBOL</th>
            <th className="border p-2">DATE</th>
            <th className="border p-2">PREV CLOSE</th>
            <th className="border p-2">OPEN PRICE</th>
            <th className="border p-2">HIGH PRICE</th>
            <th className="border p-2">LOW CLOSE</th>
            <th className="border p-2">ADJ CLOSE</th>
            <th className="border p-2">VOLUME</th>
          </tr>
          {tableData.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-blue-100' : ''}>
              <td className="border p-2">{row.symbol}</td>
              <td className="border p-2">{row.date}</td>
              <td className="border p-2">{row.prevClose}</td>
              <td className="border p-2">{row.openPrice}</td>
              <td className="border p-2">{row.highPrice}</td>
              <td className="border p-2">{row.lowClose}</td>
              <td className="border p-2">{row.adjClose}</td>
              <td className="border p-2">{row.volume}</td>
            </tr>
          ))}
      </table>
    </div>
  );
};

export default StockTable;
