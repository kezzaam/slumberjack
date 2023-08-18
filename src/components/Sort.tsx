import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpShortWide } from "@fortawesome/free-solid-svg-icons"
import filterTags from '@/json/filtertags.json'

interface FilterOptions {
  [key: string]: string[]
}


// The available filter options.
const filterOptions: FilterOptions = filterTags

type SortProps = {
  handleSort: (option: string) => void
  handleCreateSortTags: (tags: string[]) => void
}


// sorting functionality.
export default function Sort({ handleSort, handleCreateSortTags }: SortProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string>("")

  
  // Toggles the dropdown visibility.
  
  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }

  
  // Handles the selection of a sorting option. 
  const handleOptionSelection = (option: string) => {
    setSelectedOption(option)
    setIsOpen(false)
    handleSort(option)
    handleCreateSortTags(getTagsForOption(option))
  }

  const sortOptions: string[] = ["Month", "Type", "Emotion", "Theme", "Moon"]

  // the sorting tags for a given option.
  // returns array of sorting tags.
  // TODO - add another dropdown for each category so user doesn't have to close heaps of tags

  const getTagsForOption = (option: string): string[] => {
    return filterOptions[option] || []
  }

  return (
    <div className="relative">
      <button
        className="flex items-center justify-between text-[--alabaster] bg-[--pastelindigo] hover:text-[--pastelgrey] rounded-r-md py-2 px-4 focus:outline-none"
        onClick={toggleDropdown}
      >
        <FontAwesomeIcon icon={faArrowUpShortWide} className="pr-2" />
        {selectedOption || "Sort"}
      </button>
      {isOpen && (
        <div className="absolute z-10 right-0 mt-2 bg-[--alabaster] border border-[--pastelindigo] rounded-md shadow-md">
          <ul className="py-1">
            {/* maps options and renders dropdown list items */}
            {sortOptions.map((option) => (
              <li
                key={option}
                className="px-4 py-2 hover:bg-[--pastelgrey] cursor-pointer"
                onClick={() => handleOptionSelection(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
