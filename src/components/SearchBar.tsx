import React, { useState } from 'react'
import SearchSuggestion from './SearchSuggestion/SearchSuggestion'

type Props<T> = {
  suggestions?: T[]
  setValue: (value: string | T) => void
  placeholder?: string
}

export default function SearchBar<T extends {suggestion: string}>({suggestions, setValue, placeholder}: Props<T>) {
  const [searchBarValue, setSearchBarValue] = useState("")
  const [isSuggestionHidden, setIsSuggestionHidden] = useState(false)
  
  function handleSelection(selected: T) {
    setIsSuggestionHidden(true)
    setSearchBarValue(selected.suggestion)
    setValue(selected)
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchBarValue(e.target.value)
    setValue(e.target.value)
    setIsSuggestionHidden(false)
  }
  
  return (<>
    <input placeholder={placeholder} onChange={handleInputChange} value={searchBarValue} type="text" />
    {suggestions && !isSuggestionHidden &&
      <SearchSuggestion onSelection={handleSelection} search={searchBarValue} from={suggestions} />
    }
  </>)
}