import React, { useState, useEffect } from "react";
import "./DogBreedClassifier.css";
import { dogBreedLang, getBreedName } from "./dogBreedData";

export default function DogBreedClassifier() {
  const [language, setLanguage] = useState("de");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputMode, setInputMode] = useState("file"); // "file" or "url"
  const [webpageImages, setWebpageImages] = useState([]); // 从网页提取的图片列表
  const [selectedImageIndex, setSelectedImageIndex] = useState(null); // 用户选择的图片索引

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
    if (!image && !imageUrl) {
      setError(t.selectImageError);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setWebpageImages([]);

    try {
      // 开发环境使用本地 API，生产环境使用 Hugging Face Spaces
      let apiUrl = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:7860/api/predict'
        : 'https://williamcass-dog-breed-classification.hf.space/api/predict';

      const formData = new FormData();
      
      // For URL input, add as query parameter
      if (inputMode === "url" && imageUrl) {
        const urlParams = new URLSearchParams();
        urlParams.append('url', imageUrl);
        apiUrl += '?' + urlParams.toString();
      } else if (inputMode === "file" && image) {
        formData.append("file", image);
      }

      const response = await fetch(apiUrl, {
        method: "POST",
        body: inputMode === "file" ? formData : null,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("API Error:", errorData);
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      // 检查是否是网页图片选择响应
      if (data.type === "image_selection") {
        setWebpageImages(data.images);
        setError(null);
        setLoading(false); // 重要：设置加载状态为false
        // 自动选择第一个图片并进行分类
        if (data.images.length > 0) {
          await predictSelectedImage(data.images[0]);
        }
        return;
      }

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

  const predictSelectedImage = async (imageUrl) => {
    // 预测网页中选择的特定图片
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      let apiUrl = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:7860/api/predict-selected-image'
        : 'https://williamcass-dog-breed-classification.hf.space/api/predict-selected-image';

      const urlParams = new URLSearchParams();
      urlParams.append('image_url', imageUrl);
      apiUrl += '?' + urlParams.toString();

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      });

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
    setImageUrl("");
    setPreview(null);
    setResult(null);
    setError(null);
    setWebpageImages([]);
    setSelectedImageIndex(null);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem("dogBreedLang", lang);
  };

  const isImageUrl = (url) => {
    // 检查URL是否指向直接图片而不是网页
    if (!url) return false;
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];
    const lowerUrl = url.toLowerCase();
    return imageExtensions.some(ext => lowerUrl.includes(ext));
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
          {/* Input Mode Toggle */}
          <div className="input-mode-toggle" style={{
            display: "flex",
            gap: "10px",
            marginBottom: "16px",
            justifyContent: "center"
          }}>
            <button
              onClick={() => setInputMode("file")}
              className={`mode-btn ${inputMode === "file" ? "active" : ""}`}
              style={{
                padding: "8px 16px",
                border: inputMode === "file" ? "2px solid #0066cc" : "1px solid #ccc",
                backgroundColor: inputMode === "file" ? "#e6f0ff" : "#f5f5f5",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: inputMode === "file" ? "600" : "400",
                color: inputMode === "file" ? "#0066cc" : "#666"
              }}
            >
              {language === "en" ? "📁 Upload" : "📁 Hochladen"}
            </button>
            <button
              onClick={() => setInputMode("url")}
              className={`mode-btn ${inputMode === "url" ? "active" : ""}`}
              style={{
                padding: "8px 16px",
                border: inputMode === "url" ? "2px solid #0066cc" : "1px solid #ccc",
                backgroundColor: inputMode === "url" ? "#e6f0ff" : "#f5f5f5",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: inputMode === "url" ? "600" : "400",
                color: inputMode === "url" ? "#0066cc" : "#666"
              }}
            >
              {language === "en" ? "🔗 URL" : "🔗 URL"}
            </button>
          </div>

          {inputMode === "file" ? (
            <>
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
            </>
          ) : (
            <>
              <div style={{
                marginBottom: "16px"
              }}>
                <label style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#333"
                }}>
                  {language === "en" ? "Image URL" : "Bild-URL"}
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => {
                    const url = e.target.value;
                    setImageUrl(url);
                    // 只有直接图片URL才显示预览
                    if (isImageUrl(url)) {
                      setPreview(url);
                    } else {
                      setPreview(null);
                    }
                    setResult(null);
                    setError(null);
                    setWebpageImages([]);
                  }}
                  placeholder={language === "en" ? "Enter image URL..." : "Bild-URL eingeben..."}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #ddd",
                    fontSize: "14px",
                    boxSizing: "border-box"
                  }}
                />
                <div style={{
                  marginTop: "8px",
                  fontSize: "12px",
                  color: "#666",
                  fontStyle: "italic"
                }}>
                  💡 {t.urlHint || (language === "en" ? "Use direct image links or paste a webpage URL to auto-extract images" : "Verwenden Sie direkte Bild-Links oder geben Sie eine Webseiten-URL ein, um Bilder automatisch zu extrahieren")}
                </div>
              </div>

              {/* 网页图片选择网格 */}
              {webpageImages.length > 0 && (
                <div style={{
                  marginBottom: "16px",
                  padding: "12px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0"
                }}>
                  <div style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    marginBottom: "12px",
                    color: "#333"
                  }}>
                    {language === "en" ? `Found ${webpageImages.length} images on the webpage:` : `${webpageImages.length} Bilder auf der Webseite gefunden:`}
                  </div>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
                    gap: "8px"
                  }}>
                    {webpageImages.map((imgUrl, idx) => (
                      <div
                        key={idx}
                        onClick={() => predictSelectedImage(imgUrl)}
                        style={{
                          cursor: "pointer",
                          border: selectedImageIndex === idx ? "3px solid #0066cc" : "1px solid #ddd",
                          borderRadius: "6px",
                          overflow: "hidden",
                          height: "80px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#fff",
                          transition: "all 0.2s ease"
                        }}
                        title={imgUrl}
                      >
                        <img
                          src={imgUrl}
                          alt={`Option ${idx + 1}`}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain"
                          }}
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.parentElement.textContent = `${idx + 1}`;
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {preview && !webpageImages.length && (
                <div style={{
                  marginBottom: "16px",
                  textAlign: "center"
                }}>
                  <img
                    src={preview}
                    alt="URL Preview"
                    className="preview-image"
                    onError={() => setError(language === "en" ? "Failed to load image from URL" : "Fehler beim Laden des Bildes von der URL")}
                    style={{ maxHeight: "300px", maxWidth: "100%", borderRadius: "6px" }}
                  />
                </div>
              )}

              {/* 显示网页URL输入状态 */}
              {imageUrl && !isImageUrl(imageUrl) && !webpageImages.length && (
                <div style={{
                  marginBottom: "16px",
                  padding: "12px",
                  backgroundColor: "#e3f2fd",
                  borderRadius: "6px",
                  border: "1px solid #90caf9",
                  color: "#1976d2",
                  fontSize: "13px"
                }}>
                  {loading ? (
                    <>⏳ {language === "en" ? "Extracting images from webpage..." : "Bilder von der Webseite extrahieren..."}</>
                  ) : (
                    <>✓ {language === "en" ? "Webpage URL detected. Click 'Identify' to extract and classify images." : "Webseiten-URL erkannt. Klicken Sie auf 'Identifizieren', um Bilder zu extrahieren und zu klassifizieren."}</>
                  )}
                </div>
              )}

              <div className="button-group">
                <button
                  className="btn btn-secondary"
                  onClick={handlePredict}
                  disabled={loading || !imageUrl}
                >
                  {loading ? t.predicting : t.predictButton}
                </button>
                {imageUrl && (
                  <button className="btn btn-tertiary" onClick={handleClear}>
                    {t.clearButton}
                  </button>
                )}
              </div>
            </>
          )}

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