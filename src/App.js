import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/portfolio";

function App() {
  const [stocks, setStocks] = useState([]);
  useEffect(() => {
    fetchStocks();
    console.log("stocks", stocks);
  }, []);

  const fetchStocks = async () => {
    const result = await axios.get(API_URL);
    calcStockData(result.data);
    setStocks(result.data);
  };
  const calcStockData = (inputData) => {
    return inputData.map((item) => {
      console.log("item", item);
      item.stockValue = (item.Quantity * item.Close).toFixed(2);
      item.percChange = (
        ((item.Close - item.Purchase) / item.Purchase) *
        100
      ).toFixed(2);
      item.Weight = item.Weight.toFixed(4);
      return item;
    });
  };
  return (
    <div className='App'>
      <table>
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Share Price</th>
            <th>Quantity</th>
            <th>Cost per share</th>
            <th>Current Value</th>
            <th>Percentage Change</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((item, index) => (
            <tr key={index}>
              <td>{item.Ticker}</td>
              <td>${item.Close}</td>
              <td>{item.Quantity}</td>
              <td>${item.Purchase}</td>
              <td>${item.stockValue}</td>
              <td>{item.percChange}%</td>
              <td>{item.Weight}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
