import React, { useState, useRef, useEffect } from "react";
import "./VoiceSynthesis.css";

export default function VoiceSynthesis() {
  const [language, setLanguage] = useState("en");
  const [text, setText] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("sample");
  const [selectedSampleFile, setSelectedSampleFile] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [voicePreviewUrl, setVoicePreviewUrl] = useState(null);
  const [sampleVoices, setSampleVoices] = useState({});
  const [samplesLoading, setSamplesLoading] = useState(true);
  const audioRef = useRef(null);
  const fileInputRef = useRef(null);

  // Fetch available sample voices on component mount
  useEffect(() => {
    const fetchSamples = async () => {
      try {
        const apiUrl = process.env.NODE_ENV === 'development'
          ? 'http://localhost:7860/samples'
          : 'https://williamcass-voice-synthesis.hf.space/samples';
        
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch samples');
        
        const data = await response.json();
        setSampleVoices(data);
        
        // Set default sample voice for English (first available)
        if (data.en?.voices?.length > 0) {
          setSelectedSampleFile(data.en.voices[0].filename);
        } else if (data.de?.voices?.length > 0) {
          // Fallback to German if English not available
          setSelectedSampleFile(data.de.voices[0].filename);
          setLanguage('de');
        }
      } catch (err) {
        console.error('Failed to fetch sample voices:', err);
        setSampleVoices({ en: { language: "English", voices: [] }, de: { language: "German", voices: [] } });
      } finally {
        setSamplesLoading(false);
      }
    };
    
    fetchSamples();
  }, []);

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
      processing: "⏳ Verarbeitung läuft... Dies kann etwa 1 Minute dauern.",
      success: "Erfolgreich generiert!",
      error: "Fehler",
      selectText: "Bitte geben Sie Text ein",
      selectAudio: "Bitte wählen Sie eine Stimme",
      characterCount: "Zeichen",
      playPreview: "Vorschau abspielen",
      stopPreview: "Stoppen",
      previewLoading: "Lädt...",
      errorMessage: "Fehler bei der Sprachsynthese",
      noCustomUpload: "Bitte laden Sie eine Audiodatei hoch"
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
      processing: "⏳ Processing... This may take about 1 minute.",
      success: "Successfully generated!",
      error: "Error",
      selectText: "Please enter some text",
      selectAudio: "Please select a voice",
      characterCount: "Characters",
      playPreview: "Play Preview",
      stopPreview: "Stop",
      previewLoading: "Loading...",
      errorMessage: "Error during speech synthesis",
      noCustomUpload: "Please upload an audio file"
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

    if (selectedVoice === "sample") {
      // Check if sample file is actually available
      const currentLanguageSamples = sampleVoices[language]?.voices || [];
      if (!selectedSampleFile || currentLanguageSamples.length === 0) {
        const message = language === 'de'
          ? 'Beispielstimmen sind nicht verfügbar. Bitte laden Sie stattdessen Ihre eigene Audiodatei hoch.'
          : 'No sample voices available. Please upload your own audio file instead.';
        setError(message);
        return;
      }
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
        // For sample voices, pass the actual filename
        formData.append('sample_audio', selectedSampleFile);
      } else {
        // For custom voices, upload the file
        formData.append('reference_audio', uploadedFile);
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
        headers: {
          // Don't set Content-Type, let browser set it for FormData
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error (${response.status}): ${errorText.substring(0, 100)}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      setResult(audioUrl);
    } catch (err) {
      console.error('Synthesis error:', err);
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
                // Only switch to sample mode if samples are available
                if (sampleVoices.de?.voices?.length > 0) {
                  setSelectedVoice('sample');
                  setSelectedSampleFile(sampleVoices.de.voices[0].filename);
                } else if (sampleVoices.en?.voices?.length > 0) {
                  // Keep current mode if no DE samples
                }
              }}
            >
              🇩🇪 Deutsch
            </button>
            <button
              className={`vs-lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => {
                setLanguage('en');
                // Only switch to sample mode if samples are available
                if (sampleVoices.en?.voices?.length > 0) {
                  setSelectedVoice('sample');
                  setSelectedSampleFile(sampleVoices.en.voices[0].filename);
                }
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
        {selectedVoice === 'sample' && !samplesLoading && (!sampleVoices[language]?.voices || sampleVoices[language].voices.length === 0) && (
          <div className="vs-control-group">
            <div className="vs-warning">
              <div className="vs-warning-title">⚠️ No Sample Voices Available</div>
              <div className="vs-warning-text">
                {language === 'de' 
                  ? 'Beispielstimmen sind noch nicht konfiguriert. Bitte verwenden Sie den "Benutzerdefinierte Stimme" Modus und laden Sie Ihre eigene Audiodatei hoch.' 
                  : 'Sample voices are not yet configured. Please use the "Custom Voice" mode and upload your own audio file.'}
              </div>
            </div>
          </div>
        )}

        {selectedVoice === 'sample' && (
          <div className="vs-control-group">
            <label>{texts.voiceSelect}</label>
            {samplesLoading ? (
              <div className="vs-loading">{texts.previewLoading}</div>
            ) : sampleVoices[language]?.voices && sampleVoices[language].voices.length > 0 ? (
              <div className="vs-sample-voices">
                {sampleVoices[language].voices.map((voice) => (
                  <button
                    key={voice.filename}
                    className={`vs-voice-card ${selectedSampleFile === voice.filename ? 'active' : ''}`}
                    onClick={() => setSelectedSampleFile(voice.filename)}
                    title={voice.name}
                  >
                    <span className="vs-voice-flag">
                      {language === 'de' ? '🇩🇪' : '🇺🇸'}
                    </span>
                    <span className="vs-voice-name">
                      {voice.name}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="vs-no-samples">
                {language === 'de'
                  ? 'Für diese Sprache sind keine Beispielstimmen verfügbar.'
                  : 'No sample voices available for this language.'}
              </div>
            )}
          </div>
        )}

        {/* Custom Voice Upload */}
        {selectedVoice === 'custom' && (
          <div className="vs-control-group">
            <label>{texts.uploadAudio}</label>
            <label className="vs-file-input-wrapper">
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="vs-file-input"
              />
              <div className="vs-file-name">
                {uploadedFileName ? (
                  <>
                    ✓ {uploadedFileName}
                  </>
                ) : (
                  <>
                    📁 {texts.uploadAudio}
                  </>
                )}
              </div>
            </label>
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

        {/* Processing Notification */}
        {loading && (
          <div className="vs-processing-notification">
            {texts.processing}
          </div>
        )}
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
