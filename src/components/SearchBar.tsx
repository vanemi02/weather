import React, { useState } from 'react'
import SearchSuggestion from './SearchSuggestion'

type Props = {
  suggestions?: string[]
}

export default function SearchBar({suggestions}: Props) {
  const [searchBarValue, setSearchBarValue] = useState("")
  const [isSuggestionHidden, setIsSuggestionHidden] = useState(false)
  
  function handleSelection(selected: string) {
    setIsSuggestionHidden(true)
    setSearchBarValue(selected)
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchBarValue(e.target.value)
    setIsSuggestionHidden(false)
  }
  
  return (<>
    <input onChange={handleInputChange} value={searchBarValue} type="text" />
    {suggestions && !isSuggestionHidden &&
      <SearchSuggestion onSelection={handleSelection} search={searchBarValue} from={suggestions} />
    }
  </>)
}