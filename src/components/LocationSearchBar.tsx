import React, { MouseEventHandler, useEffect, useRef, useState } from 'react'
import SearchBar from './SearchBar'
import citiesImport from "../../city.list.json"
import type { coord, City } from "../Types"

type Props = {
  setCoord: (coord: coord) => void
}

const citySuggestions = (citiesImport as City[]).map(city => {
  return {
    suggestion: city.name,
    city
  }
})

export default function LocationSearchBar({ setCoord }: Props) {
  const searchBarValue = useRef<City | string>()

  function handleSearchButton(): void {
    if (!searchBarValue.current) return
    if (typeof searchBarValue.current === "string") {
      const foundCity = (citiesImport as City[]).find(city => city.name === searchBarValue.current)
      if (!foundCity) return
      setCoord(foundCity.coord)
    } else {
      setCoord(searchBarValue.current.coord)
    }
  }

  function handleSearchValue(value: typeof citySuggestions[number] | string) { // TODO prepsat na value a ne setValue
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

  return (<>
    <SearchBar placeholder='City' setValue={handleSearchValue} suggestions={citySuggestions} />
    <button onClick={handleSearchButton}>search</button>
    {navigator.geolocation &&
      <button onClick={handleGPSButton}>GPS</button>
    }
  </>)
}