import React, { useEffect, useState } from 'react'
import css from "./SearchSuggestion.module.css"

type Props = {
  search: string
  from: string[]
  onSelection: (selected: string) => void
}


export default function SearchSuggestion({search, from, onSelection}: Props) {
  let suggestions: string[] = []
  const limit = 8

  if (search) {
    for (const suggestion of from) {
      if (!suggestion.includes(search)) continue
      if (suggestions.length >= limit) break
      suggestions.push(suggestion)
    }
  }
  
  return (<div className={css.container}>
    {suggestions.map((suggestion) => <div onClick={() => onSelection(suggestion)} className={css.suggestion}>{suggestion}</div>)}
  </div>)
}