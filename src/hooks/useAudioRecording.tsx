import { useState, useEffect } from 'react'

interface AudioRecording {
  recording: boolean
  audioURL: string
  startRecording: () => void
  stopRecording: () => void
  downloadAudio: () => void
}


// Custom hook for audio recording functionality
// Returns an object with recording-related state and functions
const useAudioRecording = (): AudioRecording => {
  const [recording, setRecording] = useState(false)
  const [audioURL, setAudioURL] = useState('')
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)

  
  // Starts the audio recording
  const startRecording = () => {
    setRecording(true)
    mediaRecorder?.start()
  }

  
  // Stops the audio recording
  const stopRecording = () => {
    setRecording(false)
    mediaRecorder?.stop()
  }

  
  // Downloads the recorded audio
  // NOTE this will change later depending on storage requirements
  const downloadAudio = () => {
    const link = document.createElement('a')
    link.href = audioURL
    link.download = 'recorded_audio.ogg'
    link.click()
  }

  useEffect(() => {
    let chunks: BlobPart[] = []

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const newMediaRecorder = new MediaRecorder(stream)
          setMediaRecorder(newMediaRecorder)

          newMediaRecorder.addEventListener('dataavailable', (e) => {
            chunks.push(e.data)
          })

          newMediaRecorder.addEventListener('stop', () => {
            const audioBlob = new Blob(chunks, { type: 'audio/ogg codecs=opus' })
            const audioURL = URL.createObjectURL(audioBlob)
            setAudioURL(audioURL)
          })
        })
        .catch((error) => {
          console.log('An error has occurred:', error)
        })
    }

    return () => {
      if (mediaRecorder) {
        mediaRecorder.removeEventListener('dataavailable', null)
        mediaRecorder.removeEventListener('stop', null)
        mediaRecorder.stream?.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  return { recording, audioURL, startRecording, stopRecording, downloadAudio }
}

export default useAudioRecording
