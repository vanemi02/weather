import React, { useState, FocusEvent, useRef } from 'react'
import SearchSuggestion from './SearchSuggestion/SearchSuggestion'

type Props<T> = {
  suggestions?: T[]
  onValueChange: (value: string | T) => void
  placeholder?: string
  inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  onSelection?: (selected: T) => void
}

export default function SearchBar<T extends {suggestion: string}>({suggestions, onValueChange, placeholder, inputProps, onSelection}: Props<T>) {
  const [searchBarValue, setSearchBarValue] = useState("")
  const [isSuggestionHidden, setIsSuggestionHidden] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  
  function handleSelection(selected: T) {
    setIsSuggestionHidden(true)
    setSearchBarValue(selected.suggestion)
    onValueChange(selected)
    inputRef.current?.focus()
    
    if (!onSelection) return
    onSelection(selected)
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIsSuggestionHidden(false)
    setSearchBarValue(e.target.value)
    onValueChange(e.target.value)
  }

  function handleOnBlur(e: FocusEvent<HTMLDivElement, Element>): void {
    e.stopPropagation()
    if (e.relatedTarget) return
    setIsSuggestionHidden(true)
  }

  return (<div onBlur={handleOnBlur}>
    <input ref={inputRef} {...inputProps} placeholder={placeholder} onChange={handleInputChange} value={searchBarValue} type="search" />
    {suggestions && !isSuggestionHidden &&
      <SearchSuggestion onSelection={handleSelection} search={searchBarValue} from={suggestions} />
    }
  </div>)
}