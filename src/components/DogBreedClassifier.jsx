import React, { useState, useEffect } from "react";
import "./DogBreedClassifier.css";
import { dogBreedLang, getBreedName } from "./dogBreedData";

export default function DogBreedClassifier() {
  const [language, setLanguage] = useState("de");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const t = dogBreedLang[language];

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
      setResult(null);
      setError(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
      setResult(null);
      setError(null);
    }
  };

  const handlePredict = async () => {
    if (!image) {
      setError(t.selectImageError);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", image);

      const response = await fetch(
        "https://williamcass-dog-breed-classification.hf.space/api/predict",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        console.error("API Error:", errorData);
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || t.predictError);
      }

      const localizedResult = {
        breed: getBreedName(data.breed, language),
        confidence: data.confidence,
        top_5: {},
      };

      if (data.top_5) {
        for (const [breed, conf] of Object.entries(data.top_5)) {
          localizedResult.top_5[getBreedName(breed, language)] = conf;
        }
      }

      setResult(localizedResult);
    } catch (err) {
      console.error("Prediction error:", err);
      setError(err.message || t.predictError);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem("dogBreedLang", lang);
  };

  return (
    <div className="dog-breed-classifier-container">
      <div className="dog-breed-classifier-header">
        <h2 className="dog-breed-classifier-title">{t.title}</h2>
        <div className="language-toggle">
          <button
            className={`lang-btn ${language === "de" ? "active" : ""}`}
            onClick={() => handleLanguageChange("de")}
          >
            DE
          </button>
          <button
            className={`lang-btn ${language === "en" ? "active" : ""}`}
            onClick={() => handleLanguageChange("en")}
          >
            EN
          </button>
        </div>
      </div>

      <div className="dog-breed-classifier-content">
        <div className="upload-section">
          <div
            className="upload-area"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {preview ? (
              <img src={preview} alt="Preview" className="preview-image" />
            ) : (
              <div className="upload-placeholder">
                <div className="upload-icon"></div>
                <p>{t.dragDropText}</p>
              </div>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input"
            id="image-input"
            style={{ display: "none" }}
          />

          <div className="button-group">
            <label htmlFor="image-input" className="btn btn-primary">
              {t.selectButton}
            </label>
            {image && (
              <button
                className="btn btn-secondary"
                onClick={handlePredict}
                disabled={loading}
              >
                {loading ? t.predicting : t.predictButton}
              </button>
            )}
            {image && (
              <button className="btn btn-tertiary" onClick={handleClear}>
                {t.clearButton}
              </button>
            )}
          </div>

          {error && <div className="error-message">{error}</div>}
        </div>

        {result && (
          <div className="result-section">
            <h3>{t.resultTitle}</h3>
            <div className="result-card">
              <div className="breed-info">
                <span className="breed-label">{t.breed}:</span>
                <span className="breed-name">{result.breed}</span>
              </div>
              <div className="confidence-info">
                <span className="confidence-label">{t.confidence}:</span>
                <span className="confidence-value">
                  {result.confidence.toFixed(2)}%
                </span>
              </div>
            </div>

            {result.top_5 && Object.keys(result.top_5).length > 0 && (
              <div className="top5-section">
                <h4>{t.top5Title}</h4>
                <div className="top5-list">
                  {Object.entries(result.top_5).map(([breed, conf], idx) => (
                    <div key={idx} className="top5-item">
                      <span className="top5-rank">{idx + 1}.</span>
                      <span className="top5-breed">{breed}</span>
                      <span className="top5-confidence">{conf.toFixed(2)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}