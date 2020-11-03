import React from "react";
import { weatherAPIKey } from './.myenv.js';

class Weather extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        weather: {
            temperature: null,
            pressure: null,
            speed: null,
            direction: null,
            description: null ,
            location: null
        },
        lat: null,
        lon: null
      }
    }

    cb = res => {
      const { latitude: lat, longitude: lon } = res.coords;
      this.setState({ lat },
        () => this.setState({ lon },
          async () => {
            const url = "http://api.openweathermap.org/data/2.5/weather";
            const loc = `?lat=${lat}&lon=${lon}`;
            const key = `&appid=${weatherAPIKey}`;
            // const key = `&appid=${process.env.REACT_APP_OWM_KEY}`
            // console.log(key);
            const weatherObj = await (await fetch(url + loc + key)).json();
            const temperature = (weatherObj.main.temp - 273.16) * 1.8 + 32;
            const location = weatherObj.name;
            const pressure = weatherObj.main.pressure;
            const speed = weatherObj.wind.speed;
            const direction = weatherObj.wind.deg;
            const description = weatherObj.weather[0].description;
            const weather = { temperature, pressure, speed, direction, description, location};
            this.setState({ weather });
          }
        )
      )
    }

    componentDidMount() {
      navigator.geolocation.getCurrentPosition(res => this.cb(res));
    }

    render() {
      return (
        <>
          <h1>Weather in {`${this.state.weather.location}`}</h1>
          <div className='weather-container' >
            <ul>
              <li>Temperature (deg F): {Math.floor(100*this.state.weather.temperature)/100} </li>
              <li>Pressure (hPa): {this.state.weather.pressure}</li>
              <li>Wind Speed (m/s): {this.state.weather.speed}</li>
              <li>Direction (degrees from N): {this.state.weather.direction}</li>
              <li>Description: {this.state.weather.description}</li>
            </ul>
          </div>
        </>
      )
    }
}

export default Weather;
