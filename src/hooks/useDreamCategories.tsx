import { useState } from 'react'

interface DreamCategories {
  type: string
  emotion: string
  theme: string
  medication: string
  handleTypeChange: (value: string) => void
  handleEmotionChange: (value: string) => void
  handleThemeChange: (value: string) => void
  handleMedicationChange: (value: string) => void
}


// Custom hook for managing dream categories
// returns object with dream category state and functions to handle changes
export function useDreamCategories(): DreamCategories {
  const [type, setType] = useState<string>('')
  const [emotion, setEmotion] = useState<string>('')
  const [theme, setTheme] = useState<string>('')
  const [medication, setMedication] = useState<string>('')

  
  // Handles the change of the dream type.
  const handleTypeChange = (value: string) => {
    setType(value)
  }

  
  // Handles the change of the dream emotion
  const handleEmotionChange = (value: string) => {
    setEmotion(value)
  }

  
  // Handles the change of the dream theme
  const handleThemeChange = (value: string) => {
    setTheme(value)
  }

  
  // Handles the change of the dream medication
  const handleMedicationChange = (value: string) => {
    setMedication(value)
  }

  return {
    type,
    emotion,
    theme,
    medication,
    handleTypeChange,
    handleEmotionChange,
    handleThemeChange,
    handleMedicationChange,
  }
}
