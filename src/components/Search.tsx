import React, { useState, ChangeEvent, KeyboardEvent } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

interface SearchProps {
  handleSearch: (value: string) => void
  handleCreateTag: (tag: string) => void
}


// Component for search functionality
// TODO add in functionality to handleSearch
 
export default function Search({ handleSearch, handleCreateTag }: SearchProps): JSX.Element {
  // State for the search term
  const [searchTerm, setSearchTerm] = useState<string>("")

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Handle key down event
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCreateTag(searchTerm)
      setSearchTerm("")
    }
  }

  // Handle button click
  const handleClick = () => {
    handleCreateTag(searchTerm)
    setSearchTerm("")
  }

  return (
    <>
      {/* Search button */}
      <button onClick={handleClick} className="bg-transparent">
        <i className="mx-2 hover:text-[--heatherindigo]">
          <FontAwesomeIcon icon={faSearch} />
        </i>
      </button>

      {/* Search input */}
      <input
        type="text"
        className="w-full border-[--pastelindigo] bg-transparent"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </>
  )
}
