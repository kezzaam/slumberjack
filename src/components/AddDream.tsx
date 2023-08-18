import React, { useState, useContext, useEffect, ChangeEvent, KeyboardEvent, FormEvent } from 'react'
import { DreamContext } from '@/context/DreamContext'
import BackButton from '@/components/BackButton'
import Categories from './Categories'
import { useDreamCategories } from '@/hooks/useDreamCategories'
import Tags from './Tags'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { db } from '@/firebase'
import { collection, addDoc } from "firebase/firestore"

interface Dream {
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

export default function AddDream(): JSX.Element {
  // if numRecording is undefined it will default to 0
  const {backgroundImage = ''} = useContext(DreamContext) || {}

  // background image based on goal selection
  useEffect(() => {
    // Update the body's background image style when the backgroundImage value changes
    document.body.style.backgroundImage = `url(${backgroundImage})`

    // Clean up the effect by removing the background image style when the component unmounts
    return () => {
      document.body.style.backgroundImage = ''
    }
  }, [backgroundImage])

  // state for dream data fields
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>({})
  const [selectedDate, setSelectedDate] = useState(new Date())
  // const [moonPhase, setMoonPhase] = useState('')

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

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  // TO DO moon api function to get moon phase from the selected date

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
    console.log(categoryName, value) // debugging
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [categoryName]: value,
    }))
  }

  const handleSave = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const dream = await addDoc(collection(db, "dreams"), {
        title,
        description,
        type: selectedValues['Dream Type'] || '',
        emotion: selectedValues['Emotion'] || '',
        theme: selectedValues['Dream Theme'] || '',
        medication: selectedValues['Supplements or Medication'] || '',
        date: selectedDate.toISOString(),
        moon: '',
        tags,
        selectedValues,
      })

      console.log("Dream saved with ID: ", dream.id)

      // Clear the input fields after successful submission
      setTitle('')
      setDescription('')
      setTags([])
      handleTypeChange('') // Reset category values
      handleEmotionChange('')
      handleThemeChange('')
      handleMedicationChange('')
    } catch (e) {
      console.error("Error adding document: ", e)
    }
  }

  return (
    <>
      <BackButton />
      <main className="flex min-h-screen min-w-screen items-center flex-col overlay py-8">
        <div className="flex flex-row items-center justify-center">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            className="text-center rounded-lg px-2 ml-2"
            dateFormat="EEEE, d MMMM" />
        </div>
        <div>
          <h2>Moon Phase</h2>
          {/* Replace with moon api output / possibly have an icon or svg showing phase too */}
        </div>
        <div className="flex-col flex items-center justify-center py-8 px-4 sm:px-4 lg:px-8">
          <div className="space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-bold">Add Dream</h2>
            </div>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSave}>
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
                  onKeyDown={handleTagsChange} 
                />

              </div>

              <Tags tags={tags} onRemoveTag={handleRemoveTag} />
            </div>

            <Categories selectedValues={selectedValues} handleSelectValue={handleSelectValue} />

            {/* AI image generation could go here or be an option after save */}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-[--alabaster] text-md font-medium rounded-md bg-[--pastelindigo] hover:bg-[--englishlavender]">
                Save Dream
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}