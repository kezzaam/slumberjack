// UNFINISHED
// fix image error

import React, { useState, useContext, useEffect, ChangeEvent, KeyboardEvent, FormEvent } from 'react'
import { DreamContext } from '@/context/DreamContext'
import Image from 'next/image'
import BackButton from '@/components/BackButton'
import Categories from './Categories'
import { useDreamCategories } from '@/hooks/useDreamCategories'
import Tags from './Tags'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { db } from '@/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { ref, uploadString, getDownloadURL, deleteObject } from 'firebase/storage';


interface Dream {
  id: string
  title: string
  description: string
  type: string
  emotion: string
  theme: string
  medication: string
  date: string
  moon: string
  tags: string[]
  selectedValues: Record<string, string>
  image: string
}

interface DreamParams {
  id: string
}

export default function EditDream({ id }: DreamParams): JSX.Element {
  // context for changing background image based on user goal
  const { backgroundImage = '' } = useContext(DreamContext) || {}

  useEffect(() => {
    // Update the body's background image style when the backgroundImage value changes
    document.body.style.backgroundImage = `url(${backgroundImage})`

    // Clean up the effect by removing the background image style when the component unmounts
    return () => {
      document.body.style.backgroundImage = ''
    }
  }, [backgroundImage])

  const [dream, setDream] = useState<Dream | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>({})
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [imageFile, setImageFile] = useState<File | null>(null) // Track the selected image file
  const [imageUrl, setImageUrl] = useState<string>('') // Track the URL of the image

  // custom hook to manage dream categories and values
  const {
    type,
    emotion,
    theme,
    medication,
    handleTypeChange,
    handleEmotionChange,
    handleThemeChange,
    handleMedicationChange,
  } = useDreamCategories()

  useEffect(() => {
    async function fetchDream() {
      try {
        const docRef = doc(db, 'dreams', id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const dreamData = docSnap.data() as Dream
          setDream(dreamData)
          setTitle(dreamData.title)
          setDescription(dreamData.description)
          setTags(dreamData.tags)
          setSelectedValues(dreamData.selectedValues)
          setSelectedDate(new Date(dreamData.date))
          setImageUrl(dreamData.image)
        } else {
          console.log('No such document!')
        }
      } catch (err) {
        console.error('Failed to get dream data:', err)
      }
    }
    fetchDream()
  }, [id])

  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
  }

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  const handleTagsChange = (e: ChangeEvent<HTMLInputElement> & KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const tagString = e.currentTarget.value
      const tagArray = tagString.split(',').map((tag) => tag.trim())
      setTags((prevTags) => [...prevTags, ...tagArray])
      e.currentTarget.value = '' // Reset the input field
    }
  }

  const handleRemoveTag = (tag: string) => {
    const updatedTags = tags.filter((t) => t !== tag)
    setTags(updatedTags)
  }

  const handleSelectValue = (categoryName: string, value: string) => {
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [categoryName]: value,
    }))
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0])
    }
  }

  const handleReplaceImage = async () => {
    if (imageFile) {
      try {
        // Reference the existing image file in Firebase Storage
        const imageRef = ref(db, `dreams/${dream?.id}`);
  
        // Upload the new image file
        await uploadString(imageRef, imageFile, 'data_url');
  
        // Get the download URL of the new image
        const downloadURL = await getDownloadURL(imageRef);
  
        // Update the image URL in the state
        setImageUrl(downloadURL);
  
        console.log('Image replaced:', dream?.id);
      } catch (err) {
        console.error('Error replacing image:', err);
      }
    }
  };
  

  const handleDeleteImage = async () => {
    try {
      // Delete the current image file
      const imageRef = ref(db, `dreams/${dream.id}`)
      await deleteObject(imageRef)

      // Clear the image URL in the state
      setImageUrl('')

      console.log('Image deleted:', dream.id)
    } catch (err) {
      console.error('Error deleting image:', err)
    }
  }

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault()
  
    try {
      if (dream) {
        const updatedTags = Array.isArray(tags) ? tags : []; // Ensure tags is an array
        const docRef = doc(db, 'dreams', dream.id)
        await updateDoc(docRef, {
          title,
          description,
          type: selectedValues['Dream Type'] || '',
          emotion: selectedValues['Emotion'] || '',
          theme: selectedValues['Dream Theme'] || '',
          medication: selectedValues['Supplements or Medication'] || '',
          date: selectedDate.toISOString(),
          tags: updatedTags,
          selectedValues,
          image: imageUrl, // Update the image URL
        })
  
        console.log('Dream updated:', dream.id)
  
        // Clear the input fields after successful submission
        setTitle('')
        setDescription('')
        setTags([])
        handleTypeChange('') // Reset category values
        handleEmotionChange('')
        handleThemeChange('')
        handleMedicationChange('')
      }
    } catch (err) {
      console.error('Error updating document:', err)
    }
  }
  

  return (
    <>
      <BackButton />
      <main className="flex min-h-screen w-screen items-center flex-col overlay py-8">
        <div className="flex flex-row items-center justify-center">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            className="text-center rounded-lg px-2 ml-2"
            dateFormat="EEEE, d MMMM"
          />
        </div>
        <div>
          <h2>Moon Phase</h2>
          {/* insert moon phase for selected date */}
        </div>
        <div className="flex-col flex items-center justify-center py-8 px-4 sm:px-4 lg:px-8">
          <div className="space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-bold">Edit Dream</h2>
            </div>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleUpdate}>
            <div className="w-full rounded-md shadow-sm">
              {/* form input */}
              <div>
                <label className="text-sm" htmlFor="title">
                  Title:
                </label>
                <input
                  id="title"
                  type="text"
                  autoComplete="none"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-[--pastelindigo] focus:outline-[--pastelgrey] focus:ring-none focus:border-[--englishlavender] focus:z-10 sm:text-sm"
                  placeholder="Dream title"
                  value={title}
                  onChange={handleTitleChange}
                />
              </div>

              <div>
                <label className="text-sm" htmlFor="description">
                  Description:
                </label>
                <textarea
                  id="description"
                  autoComplete="none"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-[--pastelindigo] focus:outline-[--pastelgrey] focus:ring-none focus:border-[--englishlavender] focus:z-10 sm:text-sm"
                  placeholder="Dream description"
                  value={description}
                  onChange={handleDescriptionChange}
                  rows={3}
                />
              </div>

              <div>
                <label className="text-sm" htmlFor="tags">
                  Tags:
                </label>
                <input
                  id="tags"
                  type="text"
                  autoComplete="none"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-[--pastelindigo] focus:outline-[--pastelgrey] focus:ring-none focus:border-[--englishlavender] focus:z-10 sm:text-sm"
                  placeholder="Separate tags by comma and press Enter"
                  onChange={handleTagsChange}
                  onKeyDown={handleTagsChange} // Add this line
                />
              </div>

            {/* NOTE work on integrating the Tags and FilterTags components by adding props */}
            <Tags tags={tags} onRemoveTag={handleRemoveTag} />
            </div>

            <Categories selectedValues={selectedValues} handleSelectValue={handleSelectValue} />

            <div className="w-full flex flex-col items-center bg-[--heatherindigo] rounded-2xl py-4">
              <label htmlFor="image" className="text-sm">
                <h2 className="text-lg">Image:</h2>
              </label>
              <div className="flex flex-col items-center">
                {imageUrl && <Image src={imageUrl} alt="Dream" width={200} height={200} className="object-cover" />}
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-2 text-xs"
                />
              </div>
              <div className="mt-2 space-x-2">
                <button
                  type="button"
                  onClick={handleReplaceImage}
                  className="px-2 py-1 text-sm text-white bg-[--morningblue] rounded hover:bg-[--pastelindigo]"
                >
                  Replace Image
                </button>
                {imageUrl && (
                  <button
                    type="button"
                    onClick={handleDeleteImage}
                    className="px-2 py-1 text-sm text-white bg-[--morningblue] rounded hover:bg-[--pastelindigo]"
                  >
                    Delete Image
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-[--morningblue] text-sm font-medium text-white rounded-md hover:bg-[--pastelindigo]"
              >
                Update Dream
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}
