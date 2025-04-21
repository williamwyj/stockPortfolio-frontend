import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./components/Modal";

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
  //Popup Modal
  const [activeItemId, setActiveItemId] = useState(null);

  const items = [
    { id: 1, name: "Item 1", description: "Details about item 1" },
    { id: 2, name: "Item 2", description: "Details about item 2" },
    { id: 3, name: "Item 3", description: "Details about item 3" },
  ];

  const activeItem = items.find((item) => item.id === activeItemId);

  const openPopup = (itemId) => {
    setActiveItemId(itemId);
  };

  const closePopup = () => {
    setActiveItemId(null);
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
      <div>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <span>{item.name}</span>
              <button onClick={() => openPopup(item.id)}>View Details</button>
            </li>
          ))}
        </ul>
        {activeItemId !== null && (
          <div>
            <Modal
              onClose={closePopup}
              name={activeItem.name}
              description={activeItem.description}
            ></Modal>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
