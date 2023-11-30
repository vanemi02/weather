import React, { useState } from 'react'
import type { weatherData } from "../../Types"
import css from "./DayOfWeatherCard.module.css"
import WeatherDataPoint from '../WeatherDataPoint/WeatherDataPoint'

type Props = {
  weatherMap: Map<Date, weatherData>
}

export default function DayOfWeatherCard({ weatherMap }: Props) {
  const [weatherDisplay, setWeatherDisplay] = useState<keyof weatherData>("temp")
  const weatherDataPoints = []
  const firstDataPointDate = weatherMap.keys().next().value as Date
  const dayName = firstDataPointDate.toLocaleDateString(undefined, { weekday: "long" })
  const dayAndMonth = firstDataPointDate.toLocaleDateString(undefined, { day: '2-digit', month: '2-digit' })

  for (const [date, weatherData] of weatherMap) {
    weatherDataPoints.push(<WeatherDataPoint display={weatherDisplay} weatherDataPoint={{ date, ...weatherData }} />)
  }

  return (<>
    <div className={css.card}>
      <div className={css.cardTop}>
        <div>
          <div className={css.day}>{dayName}</div>
          <div className={css.date}>{dayAndMonth}</div>
        </div>
        <div>
          <button onClick={() => setWeatherDisplay("temp")}>T</button>
          <button onClick={() => setWeatherDisplay("pressure")}>P</button>
          <button onClick={() => setWeatherDisplay("humidity")}>H</button>
        </div>
      </div>
      <div className={css.datapointContainer}>
        {weatherDataPoints}
      </div>
    </div>
  </>)
}