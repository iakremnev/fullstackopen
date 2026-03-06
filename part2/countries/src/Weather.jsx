import { useState } from "react"
import weatherService from "./services/weather"
import { useEffect } from "react"

const Weather = ({ city, geoLocation }) => {
    console.log(`Weather for`, city, geoLocation)

    const [weatherData, setWeatherData] = useState(null)

    useEffect(() => {
        console.log("Calling effect hook for weather service")
      const [latitude, longitude] = geoLocation
      weatherService
          .getCurrentConditions({ latitude, longitude })
          .then(data => setWeatherData(data))
          .catch(error => {
              console.log(`Weather data is not available in ${city}`)
          })
    }, [city, geoLocation])

    if (weatherData === null) {
        return (
            <div>
                <h2>Weather in {city}</h2>
                <i>Weather data is not available</i>
            </div>
        )
    }
    return (
        <div>
            <h2>Weather in {city}</h2>
            <p>Temperature {weatherData.temperature.degrees} &deg;C</p>
            <img src={`${weatherData.weatherCondition.iconBaseUri}.png`} alt={weatherData.weatherCondition.description.text} />
            <p>Wind {weatherData.wind.speed.value} km/h</p>
        </div>
    )
}

export default Weather
