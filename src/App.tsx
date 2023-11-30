import { useEffect, useRef, useState } from 'react'
import LocationSearchBar from './components/LocationSearchBar'
import type { weatherApiResponse, coord, weatherData } from './Types'
import DayOfWeatherCard from './components/DayOfWeatherCard/DayOfWeatherCard'

//TODO README

function App() {
  const [coord, setCoord] = useState<coord>()
  const weatherApiResponse = useRef<weatherApiResponse>()
  const [DaysOfWeatherMap, setDaysOfWeatherMap] = useState<Map<Date, weatherData>[]>()
  const APIsecret = "a0aac2b9d48313e5f75ccde2316be732" // TODO predelat

  useEffect(() => {
    if (!coord) return

    fetch(`https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${coord.lat}&lon=${coord.lon}&appid=${APIsecret}`)
      .then(res => res.json())
      .then(jsonRes => {
        weatherApiResponse.current = jsonRes
        const newDaysOfWeatherMap: Map<Date, weatherData>[] = []
        let weatherMap = new Map()
        let previousDate = new Date(weatherApiResponse.current!.list[0].dt*1000).getDate()
        for (const weatherDataPoint of weatherApiResponse.current!.list) {
          const {temp, humidity, pressure} =  weatherDataPoint.main
          if (new Date(weatherDataPoint.dt*1000).getDate() !== previousDate) {
            previousDate = new Date(weatherDataPoint.dt*1000).getDate()
            newDaysOfWeatherMap.push(weatherMap)
            weatherMap = new Map()
          }
          weatherMap.set(new Date(weatherDataPoint.dt*1000), {humidity: {value: humidity, unit: "%"}, pressure: {value: pressure, unit: "kPa"}, temp: {value: temp, unit: "C"}})
        }
        setDaysOfWeatherMap(newDaysOfWeatherMap)
      })
  }, [coord])

  return (
    <>
      <LocationSearchBar setCoord={setCoord} />
      {DaysOfWeatherMap?.length &&
        DaysOfWeatherMap.map(weatherMap => <DayOfWeatherCard weatherMap={weatherMap} />) 
      }
    </>
  )
}

export default App
