import React, { useEffect, useState } from 'react'
import css from "./SearchSuggestion.module.css"

type Props<T> = {
  search: string
  from: T[]
  onSelection: (selected: T) => void
}

export default function SearchSuggestion<T extends {suggestion: string}>({search, from, onSelection}: Props<T>) {
  let filteredObjects: T[] = []
  const limit = 8

  if (search) {
    for (const object of from) {
      if (!object.suggestion.includes(search)) continue
      if (filteredObjects.length >= limit) break
      filteredObjects.push(object)
    }
  }
  
  return (<div className={css.container}>
    {filteredObjects.map((object) => <div onClick={() => onSelection(object)} className={css.suggestion}>{object.suggestion}</div>)}
  </div>)
}