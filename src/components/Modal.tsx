import React from 'react'
import AudioRecorder from './AudioRecorder'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'


// Modal component for displaying an audio recorder. Function to control the visibility of the modal.
export default function Modal(props: any) {
  const { setOpenModal } = props

  
  // Handles the close button click event and closes the modal.
  const handleClose = () => {
    setOpenModal(false)
  }

  return (
    <div className="h-[50%] fixed inset-0 bg-[--heatherindigo] rounded-2xl flex flex-col items-center justify-center z-10 my-auto mx-10 p-10 opacity-95 border border-4 border-[--alabaster] outline outline-4">
      <div 
        className="absolute top-0 right-0 pr-4 pt-2 text-xl hover:text-[--englishlavender]"
        onClick={handleClose}
      >
        <FontAwesomeIcon icon={faClose} />
      </div>
      <div className="flex flex-col items-center justify-center p-4">
        <AudioRecorder />
      </div>     
    </div>
  )
}
