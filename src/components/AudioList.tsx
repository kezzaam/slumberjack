// UNFINISHED

import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import useSpeechToText from '@/hooks/useSpeechToText'


// Component for displaying a list of audio files.
 
const AudioList: React.FC = () => {
  const [audioFiles, setAudioFiles] = useState<string[]>([])
  const [convertedText, setConvertedText] = useState<string>('')

// Callback function for handling speech recognition results.
// @param text - The recognized text.
  const handleSpeechRecognized = (text: string) => {
    setConvertedText(text)
  }

  // Speech recognition hooks
  const { startListening, stopListening, recognizedText } = useSpeechToText(handleSpeechRecognized)

  useEffect(() => {

     // Fetches the list of audio files. 
    const fetchAudioFiles = async () => {
      const audioRecordings: string[] = []
      let num = 0

      // UNFINISHED - need to solve audio storage first 
      // TODO - numRecording update state
      while (true) {
        const audioFileName = `recorded_audio${num ? ` (${num})` : ''}.ogg`
        const audioFilePath = `/audio/${audioFileName}`

        try {
          const response = await fetch(audioFilePath)
          if (!response.ok) {
            break
          }
          audioRecordings.push(audioFilePath)
          num++
        } catch (error) {
          break
        }
      }

      setAudioFiles(audioRecordings)
    }

    fetchAudioFiles()
  }, [])

   // Removes an audio file from the list.
   // @param audioFilePath - The path of the audio file to delete.
  const handleDeleteAudio = (audioFilePath: string) => {
    setAudioFiles((prevAudioFiles) =>
      prevAudioFiles.filter((file) => file !== audioFilePath)
    )
  }

   // Handles the click event for managing audio for a new dream.
   // @param audioFilePath - The path of the audio file for the dream.
  const handleNewDream = async (audioFilePath: string) => {
    try {
      const response = await fetch(audioFilePath)
      if (response.ok) {
        const audioBlob = await response.blob()
        const audio = new Audio(URL.createObjectURL(audioBlob))

        audio.oncanplaythrough = () => {
          startListening(audio)
          audio.play()

          audio.onended = () => {
            stopListening()
          }
        }
      } else {
        console.log('Failed to fetch audio file')
      }
    } catch (error) {
      console.log('An error occurred while fetching audio:', error)
    }
  }

  return (
    <>
      {audioFiles.length > 0 ? (
        <>
          <div className="flex flex-col items-center justify-center m-2 bg-[--heatherindigo] py-4">
            <h2>New voice recordings:</h2>
            <p className="text-sm">Convert to text or Delete</p>
            {audioFiles.map((audioFilePath) => (
              <div
                key={audioFilePath}
                className="max-w-[80%] my-1 bg-[--morningblue] w-screen p-4 flex flex-row items-center justify-between space-x-2 rounded-2xl"
              >
                <audio controls>
                  <source src={audioFilePath} type="audio/ogg" />
                </audio>

                <button onClick={() => handleDeleteAudio(audioFilePath)}>
                  <FontAwesomeIcon
                    className="text-[--alabaster] hover:text-[--heatherindigo] text-lg"
                    icon={faTrash}
                  />
                </button>
                <button onClick={() => handleNewDream(audioFilePath)}>
                  <FontAwesomeIcon
                    className="text-[--alabaster] hover:text-[--heatherindigo] text-lg"
                    icon={faPlus}
                  />
                </button>
              </div>
            ))}
            {recognizedText && (
              <div>
                <p>Converted Text: {recognizedText}</p>
              </div>
            )}
          </div>
        </>
      ) : null}
    </>
  )
}

export default AudioList
