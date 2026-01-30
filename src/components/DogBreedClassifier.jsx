import React, { useState, useEffect } from 'react';
import './DogBreedClassifier.css';
import { dogBreedLang, getBreedName } from './dogBreedData';

export default function DogBreedClassifier() {
  const [language, setLanguage] = useState('de');
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
      formData.append('file', image);

      // 使用HF Spaces API
      const response = await fetch(
        'https://williamcass-dog-breed-classification.hf.space/api/predict',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(t.predictError);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || t.predictError);
      }

      // 转换品种名称为本地语言
      const localizedResult = {
        ...data,
        breed: getBreedName(data.breed, language),
        top_5: data.top_5 ?
          Object.fromEntries(
            Object.entries(data.top_5).map(([breed, conf]) => [
              getBreedName(breed, language),
              conf
            ])
          ) : null
      };
      setResult(localizedResult);
    } catch (err) {
      setError(err.message || t.predictError);
      console.error('预测错误:', err);
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

  return (
    <div className="dog-breed-classifier">
      {/* 语言切换 */}
      <div className="language-toggle">
        <button
          className={`lang-btn ${language === 'en' ? 'active' : ''}`}
          onClick={() => setLanguage('en')}
        >
          English
        </button>
        <button
          className={`lang-btn ${language === 'de' ? 'active' : ''}`}
          onClick={() => setLanguage('de')}
        >
          Deutsch
        </button>
      </div>

      <div className="classifier-header">
        <h2>{t.title}</h2>
        <p>{t.description}</p>
      </div>

      <div className="classifier-container">
        {/* 上传区域 */}
        <div className="upload-section"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="upload-input-wrapper">
            <label htmlFor="image-input" className="upload-label">
              <span className="upload-icon">🖼️</span>
              <span>{t.selectImage}</span>
            </label>
            <input
              id="image-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={loading}
              className="upload-input"
            />
          </div>
        </div>

        {/* 图片预览和结果 */}
        <div className="content-section">
          <div className="preview-container">
            {preview && (
              <div className="image-preview">
                <img src={preview} alt="preview" />
              </div>
            )}
          </div>

          <div className="result-container">
            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {result && (
              <div className="result-box">
                <div className="breed-result">
                  <span className="breed-label">{t.breed}</span>
                  <span className="breed-name">{result.breed}</span>
                  <span className="confidence">{result.confidence.toFixed(2)}%</span>
                </div>

                {result.top_5 && (
                  <div className="top-5-section">
                    <h4>{t.top5}</h4>
                    <ul className="top-5-list">
                      {Object.entries(result.top_5).map(([breed, conf], index) => (
                        <li key={index}>
                          <span className="rank">{index + 1}</span>
                          <span className="breed-name-small">{breed}</span>
                          <span className="confidence-small">{conf.toFixed(2)}%</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {!result && !error && (
              <div className="placeholder">
                <span>{t.uploadHint}</span>
              </div>
            )}
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="button-group">
          <button
            className="btn btn-primary"
            onClick={handlePredict}
            disabled={!image || loading}
          >
            {loading ? t.predicting : t.predict}
          </button>
          <button
            className="btn btn-secondary"
            onClick={handleClear}
            disabled={!image && !result}
          >
            {t.clear}
          </button>
        </div>
      </div>
    </div>
  );
}
