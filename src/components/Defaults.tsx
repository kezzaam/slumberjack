import React, { useState, useContext, useEffect } from 'react'
import LogoHeader from '@/components/LogoHeader'
import Toggle from '@/components/Toggle'
import Pagination from '@/components/Pagination'
import { DreamContext } from '@/context/DreamContext'
import { useRouter } from 'next/navigation'

export default function SignupDefaults(): JSX.Element {
    const router = useRouter()

  // Retrieve background image and selected goal from context
  const { backgroundImage, selectedGoal } = useContext(DreamContext) || {}

  // Set body's background image based on goal selection
  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundImage})`

    // Clean up the effect by removing the background image style when the component unmounts
    return () => {
      document.body.style.backgroundImage = ''
    }
  }, [backgroundImage])

    const [isVoiceSelected, setIsVoiceSelected] = useState<boolean>(true)
    const [isTextSelected, setIsTextSelected] = useState<boolean>(false)
    const [toggles, setToggles] = useState<{
        dreamTypes: boolean
        emotions: boolean
        themes: boolean
        supplements: boolean
    }>({
        dreamTypes: true,
        emotions: true,
        themes: true,
        supplements: true,
        // add more options for moon phase, AI image and interpretation tracking
    })

    // Toggle the voice selection state
    const handleVoiceToggle = () => {
        setIsVoiceSelected(!isVoiceSelected)
        setIsTextSelected(isVoiceSelected) // Set the opposite value for text toggle
    }

    // Toggle the text selection state
    const handleTextToggle = () => {
        setIsTextSelected(!isTextSelected)
        setIsVoiceSelected(isTextSelected) // Set the opposite value for voice toggle
    }

    // Handle toggle state change
    const handleToggle = (toggleName: keyof typeof toggles) => {
        setToggles((prevToggles) => ({
            ...prevToggles,
            [toggleName]: !prevToggles[toggleName],
        }))
    }
    
    // NOTE - pagination component needs to be made more reusable
    // Navigate back to the goal page 
    const handlePrevious = () => {
        router.push('./goal')
    }

    // Navigate to the welcome page
    const handleNext = () => {
        router.push('./welcome')
    }

    return (
        <main className="flex min-h-screen min-w-screen items-center flex-col overlay">
            <LogoHeader />
            <div className="min-h-full flex-col flex items-center justify-center py-8 px-4 sm:px-4 lg:px-8">
                <div className="w-screen">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-bold">Set defaults</h2>

                        <div className="m-10 p-8 flex flex-col items-center rounded-md bg-[--heatherindigo]">
                            <h3 className="text-xl text-center font-bold ">Dream Entry</h3>

                            <div className="py-4">
                                <div className="w-full flex flex-row items-center justify-between">
                                    <h4>Voice</h4>
                                    <Toggle isSelected={isVoiceSelected} handleClick={handleVoiceToggle} />
                                </div>

                                <p>
                                    Add your dream description using your device's native voice recording and convert from Speech to Text to edit later.
                                </p>
                            </div>


                            <div className="py-4 border-b border-[--pastelindigo] mb-10">
                                <div className="w-full flex flex-row items-center justify-between">
                                    <h4>Text</h4>
                                    <Toggle isSelected={isTextSelected} handleClick={handleTextToggle} />
                                </div>

                                <p>
                                    Add your dream description by manually entering text.
                                </p>
                            </div>

                            <h3 className="text-xl text-center font-bold ">Dream Tracking</h3>

                            <div className="py-4">
                                <p>
                                    Choose what data you would like to track over time.
                                </p>
                                <div className="w-full flex flex-row items-center justify-between">
                                    <h4>Dream types</h4>
                                    <Toggle isSelected={toggles.dreamTypes} handleClick={() => handleToggle('dreamTypes')} />
                                </div>

                                <div className="w-full flex flex-row items-center justify-between">
                                    <h4>Emotions</h4>
                                    <Toggle isSelected={toggles.emotions} handleClick={() => handleToggle('emotions')} />
                                </div>

                                <div className="w-full flex flex-row items-center justify-between">
                                    <h4>Themes</h4>
                                    <Toggle isSelected={toggles.themes} handleClick={() => handleToggle('themes')} />
                                </div>

                                <div className="w-full flex flex-row items-center justify-between">
                                    <h4>Supplements / medication</h4>
                                    <Toggle isSelected={toggles.supplements} handleClick={() => handleToggle('supplements')} />
                                </div>

                                {/* Add more toggles for Moon data, AI image, AI interpretation features */}

                            </div>

                            <div>
                                {/* Pagination - needs to be modified to be more reusable with props */}
                                <Pagination handlePrevious={handlePrevious} handleNext={handleNext} />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
