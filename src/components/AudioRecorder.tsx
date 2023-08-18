import React, { useState, useContext } from 'react'
import useAudioRecording from '@/hooks/useAudioRecording'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faStop, faCircle, faDownload } from '@fortawesome/free-solid-svg-icons'
import { DreamContext } from '@/context/DreamContext'


 // Component for recording audio.
function AudioRecorder(): JSX.Element {
  const { startRecording, stopRecording, audioURL, downloadAudio } = useAudioRecording()
  const [recording, setRecording] = useState<boolean>(false)
  const { numRecording, setNumRecording } = useContext(DreamContext) || {}

   // Handles the click event for starting audio recording.
  const handleRecordClick = () => {
    if (!recording) {
      startRecording()
      setRecording(true)
    }
  }

  
   // Handles the click event for stopping audio recording.
  const handleStopClick = () => {
    if (recording) {
      stopRecording()
      setRecording(false)
      if (setNumRecording) {
        setNumRecording((prevNumRecording: number) => prevNumRecording + 1);
      }    
    }
  }

  
   // Handles the click event for downloading the recorded audio.
   // NOTE: will likely need to modify this later depending on if and where audio is stored
  const handleDownloadClick = () => {
    if (!recording && audioURL) {
      downloadAudio()
    }
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="p-2">Voice Recording</h1>
        <FontAwesomeIcon icon={faMicrophone} size="2x" />
      </div>
      <div className="flex flex-row items-center justify-between space-x-10 text-4xl hover:text-[--englishlavender] my-10">
        {recording ? (
          <FontAwesomeIcon
            className="border border-4 border-[--pastelindigo] rounded-full p-2"
            icon={faCircle}
            beat
            onClick={handleStopClick}
          />
        ) : (
          <FontAwesomeIcon
            className="border border-4 border-[--pastelindigo] rounded-full p-2"
            icon={faCircle}
            onClick={handleRecordClick}
          />
        )}
      </div>
      <p>{recording ? 'Recording' : 'Stopped'}</p>

      {recording && (
        <div className="flex justify-center mt-4">
          <button className="bg-[--englishlavender] text-[--alabaster] px-4 py-2 rounded" onClick={handleStopClick}>
            Stop
          </button>
        </div>
      )}

      {!recording && audioURL && (
        <div className="flex justify-center mt-4">
          <button className="bg-[--englishlavender] text-[--alabaster] px-4 py-2 rounded" onClick={handleDownloadClick}>
            <FontAwesomeIcon icon={faDownload} className="mr-2" />
            Save
          </button>
        </div>
      )}

      {/* <audio src={audioURL} controls /> */}
    </>
  )
}

export default AudioRecorder
