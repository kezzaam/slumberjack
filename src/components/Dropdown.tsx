import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faCaretRight,
    faCaretDown,
} from "@fortawesome/free-solid-svg-icons"

interface DropdownProps {
    children: any
    options: string[]
    onOptionClick: (option: string) => void
}

export default function Dropdown({ children, options, onOptionClick }: DropdownProps) {
    // State to manage the expansion of the dropdown
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div className="flex flex-col items-center relative mb-[10%]">
            {/* Toggle button to expand/collapse the dropdown */}
            <button
                onClick={() => setIsExpanded(!isExpanded)} // Toggle state onClick
                className="rounded border py-2 px-4 text-[--alabaster] border-[--pastelindigo] w-min-3/5 flex items-center justify-between"
            >
                <span className="pr-4">{children}</span>
                {/* Display caret icon based on the expansion state */}
                {isExpanded && <FontAwesomeIcon icon={faCaretDown} />}
                {!isExpanded && <FontAwesomeIcon icon={faCaretRight} />}
            </button>
            {/* Render the options if the dropdown is expanded */}
            {isExpanded && (
                <div className="rounded bg-[--alabaster] shadow-lg absolute mt-12 w-min-3/5 z-10">
                    <ul>
                        {/* Render each option as a list item */}
                        {options.map(option => (
                            <li
                                onClick={() => {
                                    setIsExpanded(false)
                                    onOptionClick(option)
                                }}
                                className="hover:bg-[--pastelindigo] hover:text-[--alabaster] py-2 px-4 cursor-pointer"
                                key={option}
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
