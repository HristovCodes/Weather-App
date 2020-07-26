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
      city: "London",
    };
    this.handleChange = this.handleChange.bind(this);
    this.geoCode = this.geoCode.bind(this);
  }

  handleChange(value) {
    this.setState({ city: value });
  }

  async geoCode() {
    try {
      const loc = this.state.city;
      const key = "COlR5onLXsJ6oE1BvpkdrXcuIniiF-eV-3Btzzx49yQ";
      const response = await fetch(
        "https://geocode.search.hereapi.com/v1/geocode?q=" +
          loc +
          "&apiKey=" +
          key
      );
      const locData = await response.json();
      return locData;
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="Main">
        <Search onSearch={this.handleChange}></Search>
        <Forecast loc={this.geoCode} city={this.state.city}></Forecast>
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
    this.props.onSearch(e.target.value);
  }

  render() {
    return (
      <div className="Main">
        <input
          onChange={this.handleChange}
          placeholder="City name"
          type="text"
        ></input>
      </div>
    );
  }
}

//Container for image and text (degrees wind so on)
class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "",
      lng: "",
      temperature: "50",
      unit: "f",
    };
    this.changeUnit = this.changeUnit.bind(this);
  }

  async getLatLon() {
    const data = await this.props.loc();
    this.setState({
      lat: data.items[0].position.lat,
      lng: data.items[0].position.lng,
    });
  }

  changeUnit() {
    if (this.state.unit === "c") {
      this.setState({ unit: "f" });
    } else this.setState({ unit: "c" });
  }

  render() {
    const temperature =
      this.state.unit === "c"
        ? toCelsius(this.state.temperature)
        : this.state.temperature;
    return (
      <div className="Main">
        {this.props.city}
        <button onClick={this.changeUnit}>{this.state.unit}</button>
        <Image></Image>
        <Description></Description>
        <Details unit={this.state.unit} temperature={temperature}></Details>
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
    return <div className="Main"></div>;
  }
}

//This is list of details like degrees, wind, chance of rain so on
class Details extends React.Component {
  render() {
    const temperature = this.props.temperature;
    const unit = this.props.unit;
    return <div className="Main">Temperature: {temperature + " " + unit}</div>;
  }
}

function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}
export default App;
