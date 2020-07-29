import React from "react";
import "./styles/reset.css";
import "./styles/Main.scss";
import "./styles/Loading.scss";

function App() {
  return <Main />;
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: "",
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
          "&units=imperial&exclude=minutely,daily,hourly&appid=" +
          openWeatherKey,
        { mode: "cors" }
      );
      const weatherData = await weatherResponse.json();
      const icon = weatherData.current.weather[0].icon;
      this.setState({
        img: "http://openweathermap.org/img/wn/" + icon + "@2x.png",
        weather: weatherData,
      });
      return weatherData;
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    if (this.state.weather === "") {
      this.getWeather();
    }
    return (
      <div className="Main">
        <Search
          onSearch={this.getWeather}
          onChange={this.handleChange}
        ></Search>
        <Forecast data={this.state.weather} img={this.state.img}></Forecast>
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
      <div className="Search">
        <input
          className="Input"
          onChange={this.handleChange}
          placeholder="City name"
          type="text"
        ></input>
        <button className="Button" onClick={this.props.onSearch}>
          Search
        </button>
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
      document.getElementById("Switch").classList.replace("c", "f");
      this.setState({ unit: "f" });
    } else {
      this.setState({ unit: "c" });
      document.getElementById("Switch").classList.replace("f", "c");
    }
  }

  render() {
    let data = "";
    let desc = "";
    if (this.props.data !== "") {
      data = this.props.data;
      desc = this.props.data.current.weather[0].description;
    }
    return (
      <div className="Forecast">
        <p className="Timezone">{data.timezone}</p>
        <button className="Switch c" id="Switch" onClick={this.changeUnit}>
          {this.state.unit}
        </button>
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
      <div className="Image">
        <img src={this.props.img} alt={this.props.desc}></img>
      </div>
    );
  }
}

//This is list of details like degrees, wind, chance of rain so on
class Details extends React.Component {
  render() {
    if (this.props.data === "") {
      return (
        <div className="Description">
          <div className="Loading">Loading&#8230;</div>
        </div>
      );
    } else {
      const temp =
        this.props.unit === "c"
          ? toCelsius(this.props.data.current.temp)
          : this.props.data.current.temp;
      return (
        <div className="Description">
          <p>
            <span>Weather Description:</span> {this.props.desc}
          </p>
          <p>
            <span>Temperature:</span> {temp + " " + this.props.unit}
          </p>
          <p>
            <span>Humidity:</span> {this.props.data.current.humidity} %
          </p>
          <p>
            <span>Wind Speed:</span> {this.props.data.current.wind_speed} mph
          </p>
          <p>
            <span>Wind Direction:</span> {this.props.data.current.wind_deg}°
          </p>
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
