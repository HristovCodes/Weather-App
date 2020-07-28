import React from "react";
import "./reset.css";
import "./Main.scss";
import { findRenderedDOMComponentWithTag } from "react-dom/test-utils";

const imgs = {
  clouds:
    "https://images.unsplash.com/photo-1534088568595-a066f410bcda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=389&q=80",
  thunderstorm:
    "https://images.unsplash.com/photo-1564343921985-91ced954364a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  rain:
    "https://images.unsplash.com/photo-1501999635878-71cb5379c2d8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80",
  snow:
    "https://images.unsplash.com/photo-1477601263568-180e2c6d046e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
  clear:
    "https://images.unsplash.com/photo-1501693763903-1ff86bcf3af9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=752&q=80",
};

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
      img: "",
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
      const icon = weatherData.current.weather[0].icon;
      this.setState({
        img: "http://openweathermap.org/img/wn/" + icon + "@2x.png",
      });
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
        <Forecast data={this.state.temp} img={this.state.img}></Forecast>
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
        {data.timezone}
        <button onClick={this.changeUnit}>{this.state.unit}</button>
        <Image desc={desc} img={this.props.img}></Image>
        <Details unit={this.state.unit} data={data} desc={desc}></Details>
      </div>
    );
  }
}

//Image pulled from giphy using the description of the weather
class Image extends React.Component {
  render() {
    return (
      <div className="Main">
        <img src={this.props.img} alt={this.props.desc}></img>
      </div>
    );
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
          <p>Weather Description: {this.props.desc}</p>
          <p>Temperature: {temp}</p>
          <p>Humidity: {this.props.data.current.humidity} %</p>
          <p>Wind Speed: {this.props.data.current.wind_speed} mph</p>
          <p>Wind Direction: {this.props.data.current.wind_deg}°</p>
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
