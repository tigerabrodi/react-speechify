import { FormEvent, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const synthRef = useRef(window.speechSynthesis)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectVoice, setSelectVoice] = useState<string>('')
  const [text, setText] = useState<string>('')

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

        <select
          name="voice"
          id="voice-select"
          aria-label="voice"
          onChange={(e) => setSelectVoice(e.target.value)}
        >
          {voices.map((voice) => (
            <option value={voice.name}>{voice.name}</option>
          ))}
        </select>

        <button type="submit">SYNTHESIZE SPEECH</button>
      </form>
    </main>
  )
}

export default App
