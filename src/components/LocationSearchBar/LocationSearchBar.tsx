import React, { FormEvent, MouseEventHandler, useEffect, useRef, useState } from 'react'
import SearchBar from '../SearchBar'
import citiesImport from "../../../city.list.json"
import type { coord, City } from "../../Types"
import css from "./LocationSearchBar.module.css"

type Props = {
  setCoord: (coord: coord) => void
}

function getCityId(city: City) {
  return city.state ? `${city.name} (${city.country}, ${city.state})` : `${city.name} (${city.country})`
}

const citySuggestions = (citiesImport as City[]).map(city => {
  return {
    suggestion: getCityId(city),
    city
  }
})

export default function LocationSearchBar({ setCoord }: Props) {
  const searchBarValue = useRef<City | string>()

  function handleOnSubmit(e?: FormEvent<HTMLFormElement>): void {
    e?.preventDefault()
    if (!searchBarValue.current) return
    if (typeof searchBarValue.current === "string") {
      const foundCity = (citiesImport as City[]).find(city => getCityId(city) === searchBarValue.current)
      if (!foundCity) return
      setCoord(foundCity.coord)
    } else {
      setCoord(searchBarValue.current.coord)
    }
  }


  function handleOnSearchValueChange(value: typeof citySuggestions[number] | string) {
    if (typeof value === "string") {
      searchBarValue.current = value
    } else {
      searchBarValue.current = value.city
    }
  }

  function handleGPSButton(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoord({ lat: position.coords.latitude, lon: position.coords.longitude })
    })
  }

  return (
    <div className={css.wrapper}>
      <search>
        <form className={css.container} onSubmit={handleOnSubmit}>
          <SearchBar onSelection={() => handleOnSubmit()} inputProps={{ className: css.textInput }} placeholder='City' onValueChange={handleOnSearchValueChange} suggestions={citySuggestions} />
          <button type='submit' className={css.searchButton}><i className="fa-solid fa-magnifying-glass"></i></button>
          {navigator.geolocation &&
            <button className={css.gpsButton} onClick={handleGPSButton}><i className="fa-solid fa-location-dot"></i></button>
          }
        </form>
      </search>
    </div>
  )
}