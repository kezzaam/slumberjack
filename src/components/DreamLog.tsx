import React, { useEffect, useContext } from 'react'
import LogoHeader from './LogoHeader'
import Footer from './Footer'
import SearchAndSort from './SearchAndSort'
import DreamList from './DreamList'
import Back from './BackButton'
import { DreamContext } from '@/context/DreamContext'
import AudioList from './AudioList'

export default function DreamLog() {
  // Context for changing the background image based on the user's goal
  const { backgroundImage = '' } = useContext(DreamContext) || {}

  useEffect(() => {
    // Update the body's background image style when the backgroundImage value changes
    document.body.style.backgroundImage = `url(${backgroundImage})`

    // Clean up the effect by removing the background image style when the component unmounts
    return () => {
      document.body.style.backgroundImage = ''
    }
  }, [backgroundImage])


  // TODO BackButton
  // fix dream [id] routing
  
  return (
    <>
      <Back />
      <main className="flex min-h-screen flex-col items-center overlay overflow-hidden pb-40">
        <LogoHeader />
        <div className="min-h-full flex-col flex items-center justify-center py-8 px-4 sm:px-4 lg:px-8">
          <SearchAndSort />
          <DreamList />
          <AudioList />
        </div>
        <Footer />
      </main>
    </>
  )
}
