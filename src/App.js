import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./components/Modal";
import "./App.css";

const STOCKS_URL = "http://localhost:5000/portfolio";
const sqlqueries_URL = "http://localhost:5000/sqlqueries";

function App() {
  const [stocks, setStocks] = useState([]);
  const [sqlQueries, setSqlQueries] = useState([]);

  useEffect(() => {
    fetchStocks();
    fetchSqlqueries();
  }, []);

  const fetchStocks = async () => {
    const result = await axios.get(STOCKS_URL);
    calcStockData(result.data);
    setStocks(result.data);
  };
  const fetchSqlqueries = async () => {
    const result = await axios.get(sqlqueries_URL);
    setSqlQueries(result.data);
  };
  const fetchSqlquery = async (queryid) => {
    const result = await axios.get(
      `http://localhost:5000/query/query${queryid}`
    );
    console.log("result.data", result.data);
    return result.data;
  };
  const calcStockData = (inputData) => {
    return inputData.map((item) => {
      console.log("item", item);
      item.stockValue = (item.quantity * item.close).toFixed(2);
      item.percChange = (
        ((item.close - item.purchase) / item.purchase) *
        100
      ).toFixed(2);
      item.weight = item.weight.toFixed(4);
      return item;
    });
  };
  //Popup Modal
  const [activeItemId, setActiveItemId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // const items = [
  //   { id: 1, name: "Item 1", description: "Details about item 1" },
  //   { id: 2, name: "Item 2", description: "Details about item 2" },
  //   { id: 3, name: "Item 3", description: "Details about item 3" },
  // ];
  const [activeItem, setActiveItem] = useState(null);
  // let activeItem = sqlQueries.find((item) => item.id === activeItemId);
  console.log("activeItem", activeItem);
  const openPopup = (itemId) => {
    setIsLoading(true);
    setActiveItemId(itemId);
    let selectedItem = sqlQueries.find((item) => item.id === itemId);
    fetchSqlquery(itemId).then((data) => {
      setIsLoading(false);
      console.log("query data", data);
      selectedItem.data = data;
      setActiveItem(selectedItem);
    });
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
              <td>{item.ticker}</td>
              <td>${item.close}</td>
              <td>{item.quantity}</td>
              <td>${item.purchase}</td>
              <td>${item.stockValue}</td>
              <td>{item.percChange}%</td>
              <td>{item.weight}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <ul>
          {sqlQueries.map((query) => (
            <li key={query.id}>
              <span>{query.title}</span>
              <button onClick={() => openPopup(query.id)}>View Details</button>
            </li>
          ))}
        </ul>
      </div>
      {activeItemId !== null && (
        <div className='popup'>
          {isLoading && <p className='loadingText'>loading</p>}
          {!isLoading && (
            <Modal
              onClose={closePopup}
              title={activeItem.title}
              description={activeItem.description}
              query={activeItem.query}
              data={activeItem.data}
              loading={isLoading}
            ></Modal>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
