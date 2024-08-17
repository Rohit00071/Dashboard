import React, { Component } from "react";
import CardSection from "./components/CardSection";
import ChartSection from "./components/ChartSection";
import Header from "./components/Header";
import LoginSignup from "./components/LoginSignup";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      Id: "bitcoin",
      Data: {},
      isAuthenticated: false,
    };
  }

  fetchData = async () => {
    let data = await fetch(
      "https://api.coingecko.com/api/v3/coins/" + this.state.Id
    );
    let JsonData = await data.json();
    this.setState({ Data: JsonData });
  };

  handleSubmit = async (event) => {
    await this.setState({ Id: event.target.value });
    this.fetchData();
  };

  handleAuth = (isAuthenticated) => {
    this.setState({ isAuthenticated });
  };

  componentDidMount() {
    if (this.state.isAuthenticated) {
      this.fetchData();
      this.interval = setInterval(() => this.fetchData(), 2000);
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
            <Header handle_Submit={this.handleSubmit} />
            <CardSection
              coinName={this.state.Data.name}
              currentPrice={
                this.state.Data.market_data
                  ? this.state.Data.market_data.current_price["usd"]
                  : ""
              }
              mCap24={
                this.state.Data.market_data
                  ? this.state.Data.market_data.market_cap_change_percentage_24h
                  : ""
              }
              ath={
                this.state.Data.market_data
                  ? this.state.Data.market_data.ath.usd
                  : ""
              }
              atl={
                this.state.Data.market_data
                  ? this.state.Data.market_data.ath.usd
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
                  ? this.state.Data.market_data.price_change_24h_in_currency.usd
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
                  ? this.state.Data.market_data["circulating_supply"]
                  : ""
              }
              twitterF={
                this.state.Data.community_data
                  ? this.state.Data.community_data.twitter_followers
                  : ""
              }
            />
          </>
        ) : (
          <LoginSignup onAuth={this.handleAuth} />
        )}
      </div>
    );
  }
}
