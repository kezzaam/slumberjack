"use client"

import React, { createContext, useState, ReactNode } from 'react'
import goals from '@/json/goals.json'

interface DreamContextProps {
  numRecording: number
  setNumRecording: React.Dispatch<React.SetStateAction<number>>
  backgroundImage: string
  setBackgroundImage: React.Dispatch<React.SetStateAction<string>>
  handleGoalSelection: (goal: string) => void
  selectedGoal: string
  setSelectedGoal: React.Dispatch<React.SetStateAction<string>>
  userName: string
  setUserName: React.Dispatch<React.SetStateAction<string>>
}

export const DreamContext = createContext<DreamContextProps | undefined>(undefined)

interface DreamProviderProps {
  children: ReactNode
}


// Context provider component for DreamContext
// children - The child components to be wrapped by the provider
export function DreamProvider({ children }: DreamProviderProps) {
  const [numRecording, setNumRecording] = useState(0)
  const [backgroundImage, setBackgroundImage] = useState('/images/luciddreaming.jpg')
  const [selectedGoal, setSelectedGoal] = useState('')
  const [userName, setUserName] = useState('')

  
  // Handles the selection of a goal in signup goal and home page
  const handleGoalSelection = (selectedGoal: string) => {
    console.log('Selected Goal:', selectedGoal)
    
    // Set the appropriate background image based on the selected goal
    setSelectedGoal(selectedGoal)
  
    const selectedGoalData = goals.find((goal) => goal.name === selectedGoal)
    console.log('Selected Goal:', selectedGoal)
    console.log('Selected Goal Data:', selectedGoalData)

    if (selectedGoalData) {
      setBackgroundImage(selectedGoalData.imageSrc)
    } 
  }

  const contextValue = {
    numRecording,
    setNumRecording,
    backgroundImage,
    setBackgroundImage,
    handleGoalSelection,
    selectedGoal,
    setSelectedGoal,
    userName,
    setUserName,
  }

  return (
    <DreamContext.Provider value={contextValue}>
      {children}
    </DreamContext.Provider>
  )
}
