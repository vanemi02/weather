import React, { useEffect } from 'react'
import SearchBar from './SearchBar'
import citiesImport from "../../city.list.json"
type Props = {}

type City = {
  id: number,
  name: string,
  state: string,
  country: string,
  coord: {
    lon: number,
    lat: number
  }
}

const cityNames = (citiesImport as City[]).map(city => city.name)

export default function LocationSearchBar({}: Props) {

  useEffect(() => {
    const cities: City[] = citiesImport as City[]
  })
  
  return (
    <SearchBar suggestions={cityNames}/>
  )
}