import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import BackButton from './BackButton'
import EditButton from './EditButton'
import { db } from '@/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { categoryData, renderIcon } from './CategoryData'

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

interface DreamProps {
  id: string 
}

export default function Dream({ id }: DreamProps) { 
  const [selectedDream, setSelectedDream] = useState<Dream | null>(null)
  const router = useRouter();

  useEffect(() => {
    // Fetch the dream data from the database based on the passed id prop
    async function fetchDream() {
      try {
        const docRef = doc(db, 'dreams', id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const dreamData = docSnap.data() as Dream
          setSelectedDream(dreamData)
          console.log('Dream data:', dreamData)
        } else {
          console.log('No such document!')
        }
      } catch (err) {
        console.error('Failed to get dream data:', err)
      }
    }
    fetchDream()
  }, [id]) // Add id as a dependency to re-fetch when it changes


  // will display if there is no selected dream - maybe add a timeout
  if (!selectedDream) {
    return <div>Loading...</div>
  }

  // formats date into day name, month name and date
  const formattedDate = new Date(selectedDream.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  const handleEditClick = () => {
    // Navigate to the dream editing page
    router.push(`/dreams/edit-dream/${id}`)
  }

  return (
    <>
      {/* NOTE - these components need to be made more reusable with props */}
      <BackButton />
      <EditButton onClick={handleEditClick}/>
      {/* display dream image */}
      <div>
        <Image src={selectedDream.image} alt={selectedDream.title} width={1500} height={1500} priority />
      </div>
      <main className="flex flex-col items-center rounded-t-2xl -mt-12 w-full">
        <div className="min-h-screen flex-col flex items-center p-8 sm:px-4 lg:px-8 bg-[--alabaster] rounded-t-2xl leading-8">
          {/* Display the formatted dream date */}
          <h2 className="bg-[--pastelindigo] px-10 rounded my-2">{formattedDate}</h2>
          <h3 className="text-xl font-bold my-4">{selectedDream.title}</h3>

          {/* Display the dream description */}
          <p>{selectedDream.description}</p>

          {/* TODO: Based on audio storage, could display audio file or not */}
          {/* <Audio /> */}

          {/* TODO: Display dream icons and their details */}
        </div>
      </main>
    </>
  )
}
