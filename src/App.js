import React from "react";
import "./reset.css";
import "./Main.scss";

/*
api keys
weather: 10c5fbc8f53a296d3b3b5286da23dc96
geocode: COlR5onLXsJ6oE1BvpkdrXcuIniiF-eV-3Btzzx49yQ
*/

function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: "fetchin",
      city: "London",
    };
    this.handleChange = this.handleChange.bind(this);
    this.getWeather = this.getWeather.bind(this);
  }

  handleChange(value) {
    this.setState({ city: value });
  }

  async getWeather() {
    try {
      const loc = this.state.city;
      const geoLocKey = "COlR5onLXsJ6oE1BvpkdrXcuIniiF-eV-3Btzzx49yQ";
      const openWeatherKey = "10c5fbc8f53a296d3b3b5286da23dc96";
      const coordsResponse = await fetch(
        "https://geocode.search.hereapi.com/v1/geocode?q=" +
          loc +
          "&apiKey=" +
          geoLocKey,
        { mode: "cors" }
      );
      const coordsData = await coordsResponse.json();
      const weatherResponse = await fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          coordsData.items[0].position.lat +
          "&lon=" +
          coordsData.items[0].position.lng +
          "&units=imperial&exclude=minutely&appid=" +
          openWeatherKey,
        { mode: "cors" }
      );
      const weatherData = await weatherResponse.json();
      console.log(weatherData);
      this.setState({ temp: weatherData });
      return weatherData;
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    if (this.state.temp === "fetchin") {
      this.getWeather();
    }
    return (
      <div className="Main">
        <Search
          onSearch={this.getWeather}
          onChange={this.handleChange}
        ></Search>
        <Forecast data={this.state.temp} city={this.state.city}></Forecast>
      </div>
    );
  }
}

//Input box to search for city
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <div className="Main">
        <input
          onChange={this.handleChange}
          placeholder="City name"
          type="text"
        ></input>
        <button onClick={this.props.onSearch}>Search</button>
      </div>
    );
  }
}
//Container for image and text (degrees wind so on)
class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unit: "c",
    };
    this.changeUnit = this.changeUnit.bind(this);
  }

  changeUnit() {
    if (this.state.unit === "c") {
      this.setState({ unit: "f" });
    } else this.setState({ unit: "c" });
  }

  render() {
    let data = "";
    let desc = "";
    if (this.props.data !== "fetchin") {
      data = this.props.data;
      desc = this.props.data.current.weather[0].description;
    }
    return (
      <div className="Main">
        {this.props.city}
        <button onClick={this.changeUnit}>{this.state.unit}</button>
        <Image></Image>
        <Description desc={desc}></Description>
        <Details unit={this.state.unit} data={data}></Details>
      </div>
    );
  }
}

//Image pulled from giphy using the description of the weather
class Image extends React.Component {
  render() {
    return <div className="Main"></div>;
  }
}

//Description of weather (rainy, sunny so on)
class Description extends React.Component {
  render() {
    return <div className="Main">{this.props.desc}</div>;
  }
}

//This is list of details like degrees, wind, chance of rain so on
class Details extends React.Component {
  render() {
    if (this.props.data === "") {
      return <div className="Main">Fetchin</div>;
    } else {
      const temp =
        this.props.unit === "c"
          ? toCelsius(this.props.data.current.temp)
          : this.props.data.current.temp;
      return (
        <div className="Main">
          <p>Current temperature is: {temp}</p>
          <p>Current humidity is: {this.props.data.current.humidity} %</p>
          <p>Current wind speed is: {this.props.data.current.wind_speed} mph</p>
          <p>Current wind direction is: {this.props.data.current.wind_deg}°</p>
        </div>
      );
    }
  }
}

function toCelsius(fahrenheit) {
  return preciseRound(((fahrenheit - 32) * 5) / 9, 1);
}

function preciseRound(num, dec) {
  if (typeof num !== "number" || typeof dec !== "number") return false;

  var num_sign = num >= 0 ? 1 : -1;

  return (
    Math.round(num * Math.pow(10, dec) + num_sign * 0.0001) / Math.pow(10, dec)
  ).toFixed(dec);
}
export default App;
