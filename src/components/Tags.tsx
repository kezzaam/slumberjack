import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose } from "@fortawesome/free-solid-svg-icons"

interface TagsProps {
  tags: string[];
  onRemoveTag: (tag: string) => void;
}


// Tags arguments
// array of tags to be displayed.
// handle the removal of a tag.

export default function Tags({ tags, onRemoveTag }: TagsProps) {
  return (
    <>
      <div className="flex flex-row flex-wrap my-1">
        {/* maps over tags array and renders tag element with name and close button */}
        {tags.map((tag) => (
          <div
            key={tag}
            className="tag flex flex-row items-center justify-between bg-[--pastelindigo] text-[--alabaster] rounded-2xl space-x-2 px-2 mx-1 my-1"
          >
            <span>{tag}</span>
            <button
              onClick={() => onRemoveTag(tag)}
              className="flex flex-column items-center justify-center border rounded-full w-4 h-4 text-xs"
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
          </div>
        ))}
      </div>
    </>
  )
}
