import React from 'react'
import type { weatherData } from "../../Types"
import css from "./WeatherDataPoint.module.css"

type Props = {
  weatherDataPoint: {
    date: Date
  } & weatherData
  display: keyof weatherData
}

export default function WeatherDataPoint({ weatherDataPoint, display }: Props) {
  const time = `${weatherDataPoint.date.getHours()}:${weatherDataPoint.date.getMinutes().toString().padStart(2, "0")}`
  
  return (
    <div className={css.container}>
      <div>{weatherDataPoint[display].value}{weatherDataPoint[display].unit}</div>
      <div>{weatherDataPoint.date.toLocaleTimeString(undefined, {hour: 'numeric', minute: '2-digit'})}</div>
    </div>
  )
}