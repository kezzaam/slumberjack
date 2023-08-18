import React, { useState } from 'react'
import Search from './Search'
import Sort from './Sort'
import FilterTags from './FilterTags'


// Component combining search and sort 

export default function SearchAndSort() {
  // State for the search term
  const [searchTerm, setSearchTerm] = useState<string>("")
  // State for the tags
  const [tags, setTags] = useState<string[]>([])

  // Handle search input change
  const handleSearch = (value: string) => {
    setSearchTerm(value)
    // TODO integrate with DreamList
  }

  // Handle creating a new tag
  const handleCreateTag = (tag: string) => {
    setTags((prevTags) => [...prevTags, tag])
  }

  // Handle creating sort tags
  const handleCreateSortTags = (tags: string[]) => {
    setTags((prevTags) => [...prevTags, ...tags])
  }

  // Handle removing a tag
  const handleRemoveTag = (tag: string) => {
    setTags((prevTags) => prevTags.filter((t) => t !== tag))
  }

  // Handle sorting logic
  const handleSort = (option: string) => {
    // TODO add logic and integrate with DreamList
  }

  return (
    <>
      {/* Search and sort container */}
      <div className="flex items-center justify-between bg-[--alabaster] rounded-md">
        {/* Search component */}
        <Search handleSearch={handleSearch} handleCreateTag={handleCreateTag} />
        {/* Sort component */}
        <Sort handleSort={handleSort} handleCreateSortTags={handleCreateSortTags} />
      </div>
      {/* Filter tags */}
      <div className="flex flex-row flex-wrap my-1">
        <FilterTags searchTag={searchTerm} sortTags={tags} handleRemoveTag={handleRemoveTag} />
      </div>
    </>
  )
}
