import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const synthRef = useRef(window.speechSynthesis)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])

  useEffect(() => {
    function setVoicesList() {
      setVoices(synthRef.current.getVoices())
    }

    if (synthRef.current.onvoiceschanged !== undefined) {
      synthRef.current.onvoiceschanged = setVoicesList
    }

    setVoicesList()
  }, [])

  return (
    <main>
      <h1>Speechify</h1>
      <textarea
        name="speech"
        aria-label="speech"
        id="text-input"
        placeholder="Type something here..."
      />

      <select name="voice" id="voice-select" aria-label="voice">
        {voices.map((voice) => (
          <option value={voice.name}>{voice.name}</option>
        ))}
      </select>

      <button type="button" onClick={() => console.log('clicked')}>
        SYNTHESIZE SPEECH
      </button>
    </main>
  )
}

export default App
