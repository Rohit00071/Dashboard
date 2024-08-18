import React from "react";
import Card from "./Card";
import ChartSection from "./ChartSection";

export default function Portfolio({ portfolio, cryptoData }) {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Portfolio</h2>
      {portfolio.length > 0 ? (
        <div>
          {portfolio.map((coin, index) => {
            const coinData = cryptoData[coin.id];
            return (
              <div key={index} style={{ marginBottom: "20px" }}>
                <Card
                  coinName={coinData.name}
                  amount={coin.amount}
                  currentPrice={
                    coinData.market_data
                      ? coinData.market_data.current_price.usd
                      : ""
                  }
                  totalValue={
                    coinData.market_data
                      ? coin.amount * coinData.market_data.current_price.usd
                      : ""
                  }
                />
                <ChartSection
                  Id={coin.id}
                  priceChange24={
                    coinData.market_data
                      ? coinData.market_data.price_change_24h_in_currency.usd
                      : ""
                  }
                  MarketCap={
                    coinData.market_data
                      ? coinData.market_data.market_cap.usd
                      : ""
                  }
                  TotVol={
                    coinData.market_data
                      ? coinData.market_data.total_volume.usd
                      : ""
                  }
                  Circulating={
                    coinData.market_data
                      ? coinData.market_data.circulating_supply
                      : ""
                  }
                  twitterF={
                    coinData.community_data
                      ? coinData.community_data.twitter_followers
                      : ""
                  }
                />
              </div>
            );
          })}
        </div>
      ) : (
        <p>No assets in your portfolio.</p>
      )}
    </div>
  );
}
