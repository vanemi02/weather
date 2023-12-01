import { useEffect, useRef, useState } from 'react'
import LocationSearchBar from './components/LocationSearchBar/LocationSearchBar'
import type { weatherApiResponse, coord, weatherData } from './Types'
import DayOfWeatherCard from './components/DayOfWeatherCard/DayOfWeatherCard'
import { APIsecret } from "../secret.json"

function App() {
  const [coord, setCoord] = useState<coord>()
  const weatherApiResponse = useRef<weatherApiResponse>()
  const [DaysOfWeatherMap, setDaysOfWeatherMap] = useState<Map<Date, weatherData>[]>()
  let stagger = 0

  useEffect(() => {
    if (!coord) return

    try {
      fetch(`https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${coord.lat}&lon=${coord.lon}&appid=${APIsecret}`)
        .then(res => res.json())
        .then(jsonRes => {
          weatherApiResponse.current = jsonRes
          const newDaysOfWeatherMap: Map<Date, weatherData>[] = []
          let weatherMap = new Map()
          let previousDate = new Date(weatherApiResponse.current!.list[0].dt * 1000).getDate()
          for (const weatherDataPoint of weatherApiResponse.current!.list) {
            const { temp, humidity, pressure } = weatherDataPoint.main
            if (new Date(weatherDataPoint.dt * 1000).getDate() !== previousDate) {
              previousDate = new Date(weatherDataPoint.dt * 1000).getDate()
              newDaysOfWeatherMap.push(weatherMap)
              weatherMap = new Map()
            }
            weatherMap.set(new Date(weatherDataPoint.dt * 1000), { humidity: { value: humidity, unit: "%" }, pressure: { value: pressure, unit: "kPa" }, temp: { value: temp, unit: "°C" } })
          }
          setDaysOfWeatherMap(newDaysOfWeatherMap)
        })
    } catch (error) {
      window.alert("could fetch data from api")
    }
  }, [coord])

  return (
    <>
      <LocationSearchBar setCoord={setCoord} />
      {DaysOfWeatherMap?.length &&
        <ol>
          {DaysOfWeatherMap.map((weatherMap, i) => {
            stagger += 100
            return <li key={weatherMap.keys().next().value + coord?.lat + coord?.lon}><DayOfWeatherCard index={i} weatherMap={weatherMap} /></li>
          })}
        </ol>
      }
    </>
  )
}

export default App
