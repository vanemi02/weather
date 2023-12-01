import React, { CSSProperties, useState } from 'react'
import type { weatherData } from "../../Types"
import css from "./DayOfWeatherCard.module.css"
import WeatherDataPoint from '../WeatherDataPoint/WeatherDataPoint'

type Props = {
  weatherMap: Map<Date, weatherData>
  index?: number
}

function minMax(number: number, min: number, max: number) {
  if (number > max) {
    return max
  } else if (number < min) {
    return min
  }
  return number
}

function mapNumber(number: number, fromMin: number, fromMax: number, toMin: number, toMax: number) {
  const range = Math.abs(fromMax - fromMin)
  const newNumber = minMax(number, fromMin, fromMax)
  return (((newNumber - fromMin) / range) * (toMax - toMin)) + toMin
}

export default function DayOfWeatherCard({ weatherMap, index }: Props) {
  const stagger = (index ?? 0) * 100
  const [weatherDisplay, setWeatherDisplay] = useState<keyof weatherData>("temp")
  const weatherDataPoints = [...weatherMap.entries()] as [Date, weatherData][]
  const weatherDataPointsComponents = []
  const firstDataPointDate = weatherDataPoints[0][0]
  const firstDataPoint = weatherDataPoints[0][1]
  const lastDataPoint = weatherDataPoints[weatherDataPoints.length - 1][1]
  const dayName = firstDataPointDate.toLocaleDateString(undefined, { weekday: "long" })
  const dayAndMonth = firstDataPointDate.toLocaleDateString(undefined, { day: '2-digit', month: '2-digit' })

  for (const [date, weatherData] of weatherMap) {
    weatherDataPointsComponents.push(<WeatherDataPoint key={Math.random()} display={weatherDisplay} weatherDataPoint={{ date, ...weatherData }} />)
  }

  function genGradient(): CSSProperties {
    const min = -5
    const max = 30
    const warm = [242, 223, 14]
    const cold = [14, 135, 242]
    const alpha = "var(--backround-opacity)"
    const gradientFrom = `rgba(${
      mapNumber(firstDataPoint.temp.value, min, max, cold[0], warm[0])
    },
    ${
      mapNumber(firstDataPoint.temp.value, min, max, cold[1], warm[1])
    },
    ${
      mapNumber(firstDataPoint.temp.value, min, max, cold[2], warm[2])
    }, ${alpha})`
    const gradientTo = `rgba(${
      mapNumber(lastDataPoint.temp.value, min, max, cold[0], warm[0])
    },
    ${
      mapNumber(lastDataPoint.temp.value, min, max, cold[1], warm[1])
    },
    ${
      mapNumber(lastDataPoint.temp.value, min, max, cold[2], warm[2])
    }, ${alpha})`
    
    return {
      background: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo})`
    }
  }

  return (<>
    <div style={{...genGradient(), animationDelay: stagger + "ms"}} className={css.card}>
      <div className={css.cardTop}>
        <div>
          <div className={css.day}>{dayName}</div>
          <div className={css.date}>{dayAndMonth}</div>
        </div>
        <div>
          <button
            className={weatherDisplay === "temp" ? css.activeButton : ""}
            onClick={() => setWeatherDisplay("temp")}
            title="temperature"
          >
            <i className="fa-solid fa-temperature-three-quarters"></i>
          </button>
          <button
            className={weatherDisplay === "pressure" ? css.activeButton : ""}
            onClick={() => setWeatherDisplay("pressure")}
            title="pressure"
          >
            <i className="fa-solid fa-gauge-high"></i>
          </button>
          <button
            className={weatherDisplay === "humidity" ? css.activeButton : ""}
            onClick={() => setWeatherDisplay("humidity")}
            title="humidity"
          >
            <i className="fa-solid fa-droplet"></i>
          </button>
        </div>
      </div>
      <div className={css.datapointContainer}>
        {weatherDataPointsComponents}
      </div>
    </div>
  </>)
}