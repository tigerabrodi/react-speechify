import { FormEvent, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const synthRef = useRef(window.speechSynthesis)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectVoice, setSelectVoice] = useState(
    'Eddy (English (United Kingdom))'
  )
  const [text, setText] = useState('')
  const [rate, setRate] = useState(1)

  useEffect(() => {
    function setVoicesList() {
      setVoices(synthRef.current.getVoices())
    }

    if (synthRef.current.onvoiceschanged !== undefined) {
      synthRef.current.onvoiceschanged = setVoicesList
    }

    setVoicesList()
  }, [])

  function synthesizeSpeech() {
    if (!text || !selectVoice) {
      return
    }

    const utterance = new SpeechSynthesisUtterance(text)

    // Cancel if speaking because it will start speaking again
    if (synthRef.current.speaking) {
      synthRef.current.cancel()
    }

    utterance.voice = voices.find((voice) => voice.name === selectVoice) || null
    utterance.rate = rate
    synthRef.current.speak(utterance)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    synthesizeSpeech()
  }

  return (
    <main>
      <h1>Speechify</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          name="speech"
          aria-label="speech"
          id="text-input"
          placeholder="Type something here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="speech-rate">
          <p>Speech Rate</p>
          <input
            type="range"
            id="rate"
            name="rate"
            min="0.5"
            max="2"
            step="0.1"
            value={rate}
            onChange={(e) => {
              setRate(Number(e.target.value))
            }}
            aria-label="speech rate"
          />
        </div>

        <select
          name="voice"
          id="voice-select"
          aria-label="voice"
          value={selectVoice}
          onChange={(e) => setSelectVoice(e.target.value)}
        >
          {voices.map((voice) => (
            <option value={voice.name} key={voice.name}>
              {voice.name}
            </option>
          ))}
        </select>

        <button type="submit">SYNTHESIZE SPEECH</button>
      </form>
    </main>
  )
}

export default App
