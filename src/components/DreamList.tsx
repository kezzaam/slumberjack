import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faImage, faList } from "@fortawesome/free-solid-svg-icons"
// import dreams from '@/json/dreams.json' // dummy data for testing
import { db } from '@/firebase'
import { collection, query, onSnapshot } from 'firebase/firestore'
import Link from 'next/link'

interface Dream {
  id: string
  date: string
  description: string
  emotion: string
  medication: string
  moon: string
  selectedValues: object
  tags: object
  theme: string
  title: string
  type: string
  image: string
}

export default function DreamList() {
  // viewMode default
  const [viewMode, setViewMode] = useState<'image' | 'list'>('list')
  const [hoveredImage, setHoveredImage] = useState<Dream | null>(null)
  const [dreams, setDreams] = useState<Dream[]>([])

  useEffect(() => {
    // Fetch dreams collection from the database and listen for real-time updates
    const q = query(collection(db, 'dreams'))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log('Snapshot:', snapshot) // Log the snapshot to check the data
      const dreamData: Dream[] = []
      snapshot.forEach((doc) => {
        const dream = doc.data()
        dreamData.push({
          id: doc.id,
          date: dream.date,
          description: dream.description,
          emotion: dream.emotion,
          medication: dream.medication,
          moon: dream.moon,
          selectedValues: dream.selectedValues,
          tags: dream.tags,
          theme: dream.theme,
          title: dream.title,
          type: dream.type,
          image: dream.image || '/images/aliens',
        })
      })
      console.log('Dream data:', dreamData) // Log the dreamData to check the transformed data
      setDreams(dreamData)
    })

    return () => unsubscribe()
  }, [])


  const handleViewModeChange = (mode: 'image' | 'list') => {
    // Update the view mode based on user selection
    setViewMode(mode)
  }

  const handleImageHover = (dream: Dream) => {
    // Set the currently hovered dream for displaying alt title
    setHoveredImage(dream)
  }

  const handleImageHoverEnd = () => {
    // Reset the hovered dream when the mouse leaves the image
    setHoveredImage(null)
  }

  const handleDreamClick = (dreamId: string) => {
    console.log('Dream selected', dreamId)
    // Navigate to the dream detail page
    window.location.href = `/dreams/${dreamId}`
  }

  // Format the date as 'Day, Month'
  const formatDate = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' }
    return new Date(date).toLocaleDateString(undefined, options)
  }

  return (
    <div className="w-full my-2">
      <div className="flex flex-row items-center justify-end space-x-2 px-8 text-[--alabaster]">
        <button
          // mode is passed to function
          onClick={() => handleViewModeChange('image')}
          // changes icon color based on mode
          className={`text-lg focus:outline-none ${viewMode === 'image' ? 'text-[--englishlavender]' : ''
            }`}
        >
          <FontAwesomeIcon icon={faImage} />
        </button>
        <button
          // mode is passed to function
          onClick={() => handleViewModeChange('list')}
          // changes icon color based on mode
          className={`text-lg focus:outline-none ${viewMode === 'list' ? 'text-[--englishlavender]' : ''
            }`}
        >
          <FontAwesomeIcon icon={faList} />
        </button>
      </div>

      {/* Display based on selected view mode */}
      {viewMode === 'image' ? (
        <>
          <div className="w-screen grid grid-cols-3 gap-1 px-4">
            {dreams.map((dream: Dream) => (
              <Link key={dream.id} href={`/dreams/${dream.id}`}>
                <div
                  className="bg-[--heatherindigo] rounded-lg w-auto relative"
                  onMouseEnter={() => handleImageHover(dream)}
                  onMouseLeave={handleImageHoverEnd}
                  onClick={() => handleDreamClick(dream.id)}
                >
                  <Image
                    src={dream.image}
                    alt={dream.title}
                    className="rounded-lg object-none object-top hover:opacity-50"
                    width={120}
                    height={120}
                    priority
                  />
                  {hoveredImage === dream && (
                    <div className="absolute inset-0 flex items-center justify-center text-alabaster text-center px-2">
                      <h2 className="text-md font-bold">{dream.title}</h2>
                    </div>
                  )}
                </div>
              </Link>
            ))}

          </div>
        </>
      ) : (
        <>
          {dreams.map((dream, index) => (
            <React.Fragment key={dream.id}>
              {index > 0 && new Date(dreams[index - 1]?.date).getMonth() !== new Date(dream.date).getMonth() && (
                <div className="separator px-4 py-1"></div>
              )}

              <Link href={`/dreams/${dream.id}`} >
                <div
                  className="w-screen px-8 flex flex-row items-center justify-start space-x-2 my-1 hover:bg-[--heatherindigo]"
                  key={dream.id}
                  onClick={() => handleDreamClick(dream.id)}
                >
                  <Image
                    src={dream.image}
                    alt={dream.title}
                    className="rounded-lg object-none object-top"
                    width={60}
                    height={60}
                    priority
                  />
                  <div className="w-full flex flex-row items-center justify-between space-x-2 text-md p-2">
                    <h2>{dream.title}</h2>
                    <h2 className="whitespace-nowrap">{formatDate(dream.date)}</h2>
                  </div>
                </div>
              </Link>
            </React.Fragment>
          ))}

        </>
      )}
    </div>
  )
}
