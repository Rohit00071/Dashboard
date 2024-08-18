import React, { Component } from "react";
import CardSection from "./components/CardSection";
import ChartSection from "./components/ChartSection";
import Header from "./components/Header";
import LoginSignup from "./components/LoginSignup";
import Portfolio from "./components/Portfolio";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      Id: "bitcoin",
      Data: {}, // This is for the main dashboard
      cryptoData: {}, // This is for portfolio
      isAuthenticated: false,
      showPortfolio: false,
      portfolio: [
        { id: "bitcoin", name: "Bitcoin", symbol: "btc", amount: 1.5 },
        { id: "ethereum", name: "Ethereum", symbol: "eth", amount: 10 },
        { id: "ripple", name: "Ripple", symbol: "xrp", amount: 500 },
      ], // Example portfolio, modify as needed
    };
  }

  fetchData = async () => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/${this.state.Id}`
      );
      const JsonData = await data.json();
      this.setState({ Data: JsonData }); // Update the state with the fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchPortfolioData = async () => {
    const cryptoData = {};

    for (let coin of this.state.portfolio) {
      let data = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coin.id}`
      );
      let JsonData = await data.json();
      cryptoData[coin.id] = JsonData;
    }

    this.setState({ cryptoData });
  };

  handleSubmit = async (event) => {
    await this.setState({ Id: event.target.value });
    this.fetchData();
  };

  handleAuth = (isAuthenticated) => {
    this.setState({ isAuthenticated });
    if (isAuthenticated) {
      this.fetchData();
      this.fetchPortfolioData();
    }
  };

  handleLogout = () => {
    this.setState({ isAuthenticated: false, showPortfolio: false });
  };

  viewPortfolio = () => {
    this.setState({ showPortfolio: true });
  };

  componentDidMount() {
    if (this.state.isAuthenticated) {
      this.fetchData();
      this.fetchPortfolioData();
      this.interval = setInterval(() => {
        this.fetchData();
        this.fetchPortfolioData();
      }, 2000);
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    return (
      <div>
        {this.state.isAuthenticated ? (
          <>
            <Header
              handle_Submit={this.handleSubmit}
              handleLogout={this.handleLogout}
              viewPortfolio={this.viewPortfolio}
            />
            {this.state.showPortfolio ? (
              <Portfolio
                portfolio={this.state.portfolio}
                cryptoData={this.state.cryptoData}
              />
            ) : (
              <>
                <CardSection
                  coinName={this.state.Data.name}
                  currentPrice={
                    this.state.Data.market_data
                      ? this.state.Data.market_data.current_price["usd"]
                      : ""
                  }
                  mCap24={
                    this.state.Data.market_data
                      ? this.state.Data.market_data
                          .market_cap_change_percentage_24h
                      : ""
                  }
                  ath={
                    this.state.Data.market_data
                      ? this.state.Data.market_data.ath.usd
                      : ""
                  }
                  atl={
                    this.state.Data.market_data
                      ? this.state.Data.market_data.atl.usd
                      : ""
                  }
                  sentiment={this.state.Data.sentiment_votes_up_percentage}
                  high24={
                    this.state.Data.market_data
                      ? this.state.Data.market_data.high_24h["usd"]
                      : ""
                  }
                  low24={
                    this.state.Data.market_data
                      ? this.state.Data.market_data.low_24h["usd"]
                      : ""
                  }
                />
                <ChartSection
                  Id={this.state.Id}
                  priceChange24={
                    this.state.Data.market_data
                      ? this.state.Data.market_data.price_change_24h_in_currency
                          .usd
                      : ""
                  }
                  MarketCap={
                    this.state.Data.market_data
                      ? this.state.Data.market_data.market_cap.usd
                      : ""
                  }
                  TotVol={
                    this.state.Data.market_data
                      ? this.state.Data.market_data.total_volume.usd
                      : ""
                  }
                  Circulating={
                    this.state.Data.market_data
                      ? this.state.Data.market_data.circulating_supply
                      : ""
                  }
                  twitterF={
                    this.state.Data.community_data
                      ? this.state.Data.community_data.twitter_followers
                      : ""
                  }
                />
              </>
            )}
          </>
        ) : (
          <LoginSignup onAuth={this.handleAuth} />
        )}
      </div>
    );
  }
}
