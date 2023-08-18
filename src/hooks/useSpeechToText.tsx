// UNFINISHED

import { useEffect, useState, useRef } from 'react';

const useSpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');

  const recognitionRef = useRef(null);

  useEffect(() => {
    const startRecognition = () => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        const recognition = recognitionRef.current;
        recognition.continuous = true;
        recognition.interimResults = true;
    
        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onresult = (event) => {
          let final = '';
          let interim = '';
    
          for (let i = 0; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              final += event.results[i][0].transcript;
            } else {
              interim += event.results[i][0].transcript;
            }
          }
    
          setRecognizedText(final);
        };
    
        recognition.start();
      } else {
        console.log('Speech recognition is not supported by this browser.');
      }
    };
    

    const stopRecognition = () => {
      const recognition = recognitionRef.current;
      if (recognition) {
        recognition.stop();
        setIsListening(false);
      }
    };

    return () => {
      stopRecognition();
    };
  }, []);

  const startListening = (audio) => {
    recognitionRef.current = new (window.webkitSpeechRecognition || window.SpeechRecognition)();
    const recognition = recognitionRef.current;
    recognition.continuous = true;
    recognition.interimResults = true;
  
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      let final = '';
      let interim = '';
  
      for (let i = 0; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }
  
      setRecognizedText(final);
    };
  
    // Start listening to the audio
    audio.oncanplaythrough = () => {
      audio.play(); // Play the audio
      recognition.start(); // Start speech recognition
    };
  
    audio.onended = () => {
      stopListening(); // Stop listening when the audio ends
    };
  };
  

  const stopListening = () => {
    if (isListening) {
      stopRecognition();
    }
  };

  return { isListening, recognizedText, startListening, stopListening };
};

export default useSpeechToText;
