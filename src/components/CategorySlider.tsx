import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { renderIcon, categoryData } from './CategoryData'

interface CategorySliderProps {
  category: string;
  description: string;
  values: string[];
  onClickClose: () => void;
  onSelectValue: (value: string) => void;
}

// slider for selecting values within a category
export default function CategorySlider({
  category,
  description,
  values,
  onClickClose,
  onSelectValue,
}: CategorySliderProps) {
  const [showSlider, setShowSlider] = useState(false)
  const [selectedValue, setSelectedValue] = useState('')

  // Close the slider
  const handleClose = () => {
    setShowSlider(false)
    onClickClose()
  }

  // Handle click event on a value
  const handleClick = (value: string, event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    setSelectedValue(value)
    onSelectValue(value) // callback function
    setShowSlider(true)
  }

  useEffect(() => {
    console.log(selectedValue)
  }, [selectedValue]) // debugging when the selected value changes

  // Handle the add button click
  const handleAdd = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (selectedValue) {
      handleClose()
    }
  }

  // Get the color associated with a category
  const getCategoryColor = (categoryName: string) => {
    return categoryData.find((category) => category.name === categoryName)?.color || ''
  }

  // Check if a value is selected
  const isSelected = (value: string) => {
    return value === selectedValue
  }

  return (
    <div className="py-4 px-8 text-left fixed bottom-0 left-0 w-full h-[50%] bg-[--alabaster] rounded-t-2xl z-10">
      <button onClick={handleClose}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <h3 className="text-lg font-bold">{category}</h3>
      <p>{description}</p>
      <div className="flex overflow-x-auto snap-x touch-pan-right min-h-[60%]">
        <div className="flex flex-row items-center justify-center text-center">
          {/* Map through each value and render the icon and value name */}
          {values.map((value) => (
            <div
              key={value}
              className={`snap-start p-2 ${isSelected(value) ? 'opacity-100' : 'opacity-75'}`}
              onClick={(event) => handleClick(value, event)}
            >
              <FontAwesomeIcon
                icon={renderIcon(value)}
                className="text-8xl text-[--alabaster] hover:scale-90 p-4 rounded-xl shadow-inner active:bg-[--heatherindigo]"
                style={{ backgroundColor: getCategoryColor(category) }}
              />
              <p className="text-center">{value}</p>
            </div>
          ))}
        </div>
      </div>
      <button 
          className="disabled:bg-[--pastelgrey] group relative w-full flex justify-center py-2 px-4 border border-transparent text-[--alabaster] text-md font-medium rounded-md bg-[--pastelindigo] hover:bg-[--englishlavender]"
          onClick={handleAdd} 
          // button is disabled if there is no value selected
          disabled={!selectedValue}>
        Add
      </button>
    </div>
  )
}
