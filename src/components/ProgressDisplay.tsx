// import React and useState hook
import React, { useState } from 'react'
import CircularSlider from './circular-slider/CircularSlider'


// Component for displaying the month and dream data for each day
// Adapted from "@fseehawer/react-circular-slider": "^2.6.1" 
// in future integrate this to better match the usage and be faster and cleaner

export default function ProgressDisplay() {
  // Get current date information
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() + 1 // Month is zero-based, so add 1
  const currentDateValue = currentDate.getDate()
  const daysInMonth = new Date(currentDate.getFullYear(), currentMonth, 0).getDate()

  // Set up state for the knob value
  const [knobValue, setKnobValue] = useState(currentDateValue)

  const max = Number(daysInMonth)

  // Handle knob value change
  const handleKnobChange = (value) => {
    setKnobValue(value)
  }

  // Calculate the date based on the knob value
  const calculateDate = (knobValue) => {
    const targetDate = new Date(currentDate.getFullYear(), currentMonth - 1, knobValue)
    return targetDate.toDateString()
  }

  // Log current date information
  console.log(currentDate, currentMonth, currentDateValue, daysInMonth, max)

  return (
    <div className="w-screen flex flex-col items-center justify-center">
      {/* NOTE - can go in to CircularSlider and set these if time, so we don't have to keep passing props */}

      <CircularSlider
        width={350}
        min={1}
        max={max}
        knobColor="var(--pastelindigo)"
        knobSize={60}
        knobDraggable={true}
        label="Month"
        labelColor="var(--englishlavender)"
        labelFontSize="1rem"
        valueFontSize="4rem"
        hideLabelValue={true}
        progressColorFrom="var(--pastelindigo)"
        progressColorTo="var(--pewterblue)"
        progressSize={25}
        trackColor="var(--alabaster)"
        trackSize={25}
        dataIndex={currentDateValue-1} // sets knob at current date on load
        value={knobValue}
        onChange={handleKnobChange}
      />
      <div className="absolute text-center">
        <p className="mb-2">Moon Phase</p>
        <h3 className="mb-2">{calculateDate(knobValue)}</h3>
        <h2 className="text-lg mb-2">0 dreams logged</h2>
        <h2 className="text-lg">No sleep data</h2>
      </div>
    </div>
  )
}
