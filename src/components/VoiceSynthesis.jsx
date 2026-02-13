import React, { useState, useRef } from "react";
import "./VoiceSynthesis.css";

const SAMPLE_VOICES = {
  en: { name: "Trump", file: "trump.wav" },
  de: { name: "Merkel", file: "merkel.wav" }
};

export default function VoiceSynthesis() {
  const [language, setLanguage] = useState("en");
  const [text, setText] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("sample");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [voicePreviewUrl, setVoicePreviewUrl] = useState(null);
  const audioRef = useRef(null);

  const t = {
    de: {
      title: "Sprachsynthese mit Stimmenklonung",
      language: "Sprache",
      text: "Text zum Synthetisieren",
      voiceSelect: "Stimmenauswahl",
      voiceMode: "Stimmenmodus",
      sampleVoice: "Vordefinierte Stimme",
      customVoice: "Benutzerdefinierte Stimme",
      uploadAudio: "Audio hochladen (.wav, .mp3, etc.)",
      synthesize: "Synthesieren",
      synthesizing: "Wird synthetisiert...",
      success: "Erfolgreich generiert!",
      error: "Fehler",
      selectText: "Bitte geben Sie Text ein",
      selectAudio: "Bitte wählen Sie eine Stimme",
      characterCount: "Zeichen",
      playPreview: "Vorschau abspielen",
      stopPreview: "Stoppen",
      previewLoading: "Lädt...",
      errorMessage: "Fehler bei der Sprachsynthese"
    },
    en: {
      title: "Speech Synthesis with Voice Cloning",
      language: "Language",
      text: "Text to Synthesize",
      voiceSelect: "Voice Selection",
      voiceMode: "Voice Mode",
      sampleVoice: "Sample Voice",
      customVoice: "Custom Voice",
      uploadAudio: "Upload Audio (.wav, .mp3, etc.)",
      synthesize: "Synthesize",
      synthesizing: "Synthesizing...",
      success: "Successfully generated!",
      error: "Error",
      selectText: "Please enter some text",
      selectAudio: "Please select a voice",
      characterCount: "Characters",
      playPreview: "Play Preview",
      stopPreview: "Stop",
      previewLoading: "Loading...",
      errorMessage: "Error during speech synthesis"
    }
  };

  const texts = t[language];

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setUploadedFileName(file.name);
      setError(null);
    }
  };

  const handleSynthesize = async () => {
    if (!text.trim()) {
      setError(texts.selectText);
      return;
    }

    if (selectedVoice === "custom" && !uploadedFile) {
      setError(texts.selectAudio);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const apiUrl = process.env.NODE_ENV === 'development'
        ? 'http://localhost:7860/synthesize'
        : 'https://williamcass-voice-synthesis.hf.space/synthesize';

      const formData = new FormData();
      formData.append('text', text);
      formData.append('language', language);

      if (selectedVoice === "sample") {
        formData.append('sample_audio', SAMPLE_VOICES[language].file);
      } else {
        formData.append('speaker_wav', uploadedFile);
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(texts.errorMessage);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      setResult(audioUrl);
    } catch (err) {
      setError(err.message || texts.errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayPreview = async () => {
    if (audioRef.current?.paused === false) {
      audioRef.current.pause();
    } else if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div className="voice-synthesis-container">
      {/* Controls Section */}
      <div className="vs-controls">
        {/* Language Selection */}
        <div className="vs-control-group">
          <label>{texts.language}</label>
          <div className="vs-language-buttons">
            <button
              className={`vs-lang-btn ${language === 'de' ? 'active' : ''}`}
              onClick={() => {
                setLanguage('de');
                setSelectedVoice('sample');
              }}
            >
              🇩🇪 Deutsch
            </button>
            <button
              className={`vs-lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => {
                setLanguage('en');
                setSelectedVoice('sample');
              }}
            >
              🇺🇸 English
            </button>
          </div>
        </div>

        {/* Text Input */}
        <div className="vs-control-group">
          <label>{texts.text}</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={texts.text}
            className="vs-textarea"
            rows="5"
          />
          <div className="vs-char-count">
            {text.length} {texts.characterCount}
          </div>
        </div>

        {/* Voice Mode Selection */}
        <div className="vs-control-group">
          <label>{texts.voiceMode}</label>
          <div className="vs-radio-group">
            <label className="vs-radio-label">
              <input
                type="radio"
                name="voiceMode"
                value="sample"
                checked={selectedVoice === 'sample'}
                onChange={(e) => setSelectedVoice(e.target.value)}
              />
              <span>{texts.sampleVoice}</span>
            </label>
            <label className="vs-radio-label">
              <input
                type="radio"
                name="voiceMode"
                value="custom"
                checked={selectedVoice === 'custom'}
                onChange={(e) => setSelectedVoice(e.target.value)}
              />
              <span>{texts.customVoice}</span>
            </label>
          </div>
        </div>

        {/* Voice Selection */}
        {selectedVoice === 'sample' && (
          <div className="vs-control-group">
            <label>{texts.voiceSelect}</label>
            <div className="vs-sample-voices">
              <div className="vs-voice-card">
                <span className="vs-voice-flag">
                  {language === 'de' ? '🇩🇪' : '🇺🇸'}
                </span>
                <span className="vs-voice-name">
                  {SAMPLE_VOICES[language].name}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Custom Voice Upload */}
        {selectedVoice === 'custom' && (
          <div className="vs-control-group">
            <label>{texts.uploadAudio}</label>
            <div className="vs-file-input-wrapper">
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="vs-file-input"
              />
              <div className="vs-file-name">
                {uploadedFileName || texts.uploadAudio}
              </div>
            </div>
          </div>
        )}

        {/* Error Messages */}
        {error && (
          <div className="vs-error">
            <span>❌</span> {error}
          </div>
        )}

        {/* Synthesize Button */}
        <button
          onClick={handleSynthesize}
          disabled={loading}
          className="vs-synthesize-btn"
        >
          {loading ? texts.synthesizing : texts.synthesize}
        </button>
      </div>

      {/* Result Section */}
      {result && (
        <div className="vs-result">
          <div className="vs-result-header">
            <h4>✨ {texts.success}</h4>
          </div>
          <div className="vs-audio-player">
            <audio
              ref={audioRef}
              src={result}
              controls
              style={{ width: '100%' }}
            />
          </div>
          <a
            href={result}
            download="synthesized_speech.wav"
            className="vs-download-btn"
          >
            ⬇️ Download Audio
          </a>
        </div>
      )}
    </div>
  );
}
