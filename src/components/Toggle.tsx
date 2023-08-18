import React from 'react'
import classNames from 'classnames'

interface ToggleProps {
  isSelected: boolean
  handleClick: () => void
}


// Toggle switch
// Indicates whether the toggle switch is selected or not
// handle the click event on the toggle switch
const Toggle: React.FC<ToggleProps> = ({ isSelected, handleClick }) => {
  const text = isSelected ? 'Yes' : 'No'

  return (
    <div className="flex flex-row items-center justify-center">
      <p className="text-sm">{text}</p>
      <div
        onClick={handleClick}
        className={classNames(
          'flex w-14 h-7 bg-[--pastelgrey] m-2 rounded-full transition-all duration-500',
          {
            'bg-[--pastelindigo]': isSelected,
          }
        )}
      >
        <span
          className={classNames('h-7 w-7 bg-[--alabaster] rounded-full transition-all duration-500 shadow-lg', {
            'ml-7': isSelected,
          })}
        />
      </div>
    </div>
  )
}

export default Toggle