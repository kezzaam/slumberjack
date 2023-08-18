import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCirclePlus,
  faCloud,
  faChartSimple,
  faBrain,
  faGears,
} from '@fortawesome/free-solid-svg-icons'
import { DreamContext } from '../context/DreamContext'
import Modal from './Modal'
import { useRouter } from 'next/navigation'

// Footer component that displays navigation buttons and other UI elements.
export default function Footer() {
  const { numRecording } = useContext(DreamContext) || {}
  const [openModal, setOpenModal] = useState(false)
  const router = useRouter()

  
  // Handles the click event for the "Add Dream" button.
  // TO DO: add logic to switch action between voice or text mode
  // Opens the voice recording modal by setting the `openModal` state to `true`.
  const handleAddDream = () => {
    setOpenModal(true)
  }

  // link to dream log page
  const handleDreamLog = () => {
    router.push('/dreams')
  }

  // TODO: functions to link other buttons to pages
  // could also change these to Link components

  return (
    <>
      {openModal && <Modal setOpenModal={setOpenModal} />}
      <div className="flex flex-row items-center justify-center space-x-10 text-2xl text-[--alabaster] bg-[--heatherindigo] py-8 footer">
        <button>
          <FontAwesomeIcon icon={faGears} />
        </button>
        <button>
          <FontAwesomeIcon icon={faBrain} />
        </button>
        <button
          className="flex rounded bg-[--englishlavender] p-3 hover:bg-[--alabaster]"
          onClick={handleAddDream}
        >
          <FontAwesomeIcon icon={faCirclePlus} className="add-dream" />
        </button>
        <button>
          <FontAwesomeIcon icon={faChartSimple} />
        </button>
        <button>
          <FontAwesomeIcon
            icon={faCloud}
            onClick={handleDreamLog}
          />
        </button>

        {numRecording && numRecording > 0 ? (
          <div
            className="absolute bottom-auto left-auto right-10 top-10 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-50 scale-y-50 rounded-full bg-[--morningblue] p-2.5 text-xs"
          ></div>
        ) : null}
      </div>
    </>
  )
}
