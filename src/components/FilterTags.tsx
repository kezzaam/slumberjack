// NOTE - this could be integrated with Tags.tsx and made more reusable with props

import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose } from "@fortawesome/free-solid-svg-icons"

interface FilterTagsProps {
  searchTag: string
  sortTags: string[]
  handleRemoveTag: (tag: string) => void
}

export default function FilterTags({ searchTag, sortTags, handleRemoveTag }: FilterTagsProps) {
  const handleRemove = (tag: string) => {
    handleRemoveTag(tag)
  }

  return (
    <>
      {searchTag && (
        <div className="tag flex flex-row items-center justify-between bg-[--pastelindigo] text-[--alabaster] rounded-2xl space-x-2 px-2 mx-1">
          <span>{searchTag}</span>
          <button
            onClick={() => handleRemove(searchTag)}
            className="flex flex-column items-center justify-center border rounded-full w-4 h-4 text-xs"
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
      )}

      {sortTags.map((tag) => (
        <div
          key={tag} 
          className="tag flex flex-row items-center justify-between my-1 bg-[--pastelindigo] text-[--alabaster] rounded-2xl space-x-2 px-2 mx-1"
        >
          <span>{tag}</span>
          <button
            onClick={() => handleRemove(tag)}
            className="flex flex-column items-center justify-center border rounded-full w-4 h-4 text-xs"
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
      ))}
    </>
  )
}
