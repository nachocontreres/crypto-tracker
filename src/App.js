import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Coin from "./Coin";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);

  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search for a currency</h1>
        <form>
          <input
            type="text"
            className="coin-input"
            placeholder="Type a currency"
            onChange={handleChange}
          />
        </form>
      </div>
      <div className="coin-headers">
        <p>Coin</p>
        <p className="headers">Price</p>
        <p className="headers">Volume in 24 h</p>
        <p className="headers">24h Change</p>
        <p className="headers">Chap. market</p>
      </div>

      {filteredCoins.length ? (
        (document.getElementById("coin-result").style.visibility)
      ) : (
        <span id="records" className="records">
          No records
        </span>
      )}

      <div id="coin-result">
        {filteredCoins.map((coin) => {
          return (
            <Coin
              key={coin.id}
              name={coin.name}
              image={coin.image}
              symbol={coin.symbol}
              marketcap={coin.market_cap}
              price={coin.current_price}
              priceChange={coin.price_change_percentage_24h}
              volume={coin.total_volume}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
