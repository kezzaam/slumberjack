"use client"

import React, { useState, useContext, useEffect } from 'react'
import LogoHeader from './LogoHeader'
import Dropdown from './Dropdown'
import Alert from './Alert'
import Footer from './Footer'
import { DreamContext } from '@/context/DreamContext'
import ProgressDisplay from './ProgressDisplay'

export default function Main() {

  // if numRecording is undefined it will default to 0
  const { numRecording, handleGoalSelection, backgroundImage = '', selectedGoal } = useContext(DreamContext) || {}

  const [text, setText] = useState('');
  // background image based on goal selection
  useEffect(() => {
    // Update the body's background image style when the backgroundImage value changes
    document.body.style.backgroundImage = `url(${backgroundImage})`
    // use goal selected by user on signup 
    setText(selectedGoal ? selectedGoal : '');

    // Clean up the effect by removing the background image style when the component unmounts
    return () => {
      document.body.style.backgroundImage = ''
    }
  }, [backgroundImage, selectedGoal])

  return (
    <main className="flex min-h-screen flex-col items-center overlay overflow-hidden">
      <LogoHeader />
      <div className="h-full flex-col flex items-center justify-center py-8 px-4 sm:px-4 lg:px-8">
        <div className="w-screen">
          {/* dropdown goal menu */}
          <Dropdown
            onOptionClick={(option) => {
              // the text is set to the goal in handleGoalSelection
              setText(option)
              if (handleGoalSelection) {
                handleGoalSelection(option)
              }

            }}

            options={[
              'Dream Recall',
              'Self Understanding',
              'Creativity',
              'Exploration',
              'Lucid Dreaming',
              'Better Sleep'
            ]}>
            Goal: {text}
          </Dropdown>


          {/* circular slider modified from "@fseehawer/react-circular-slider": "^2.6.1" */}
          <ProgressDisplay />



          {/* voice recording alert modal */}
          {numRecording > 0 && (
            <Alert>
              You have {numRecording === 1 ? "1 new voice recording" : `${numRecording} new voice recordings`}.{" "}
              <a className="text-[--morningblue] hover:text-[--englishlavender] underline" href="#">
                Review
              </a>
            </Alert>
          )}

        </div>
      </div>
      {/* footer */}
      <Footer />
    </main>
  )
}
