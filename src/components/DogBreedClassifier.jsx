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
  const [webpageImages, setWebpageImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const fileInputRef = React.useRef(null);

  const t = dogBreedLang[language];

  // Valid image formats
  const VALID_IMAGE_FORMATS = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/tiff'];
  const VALID_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.tiff', '.tif'];

  const validateImageFile = (file) => {
    // Check MIME type
    if (file.type && !VALID_IMAGE_FORMATS.includes(file.type)) {
      const lang = language === 'en' 
        ? `Unsupported file format: ${file.type}. Please upload: JPEG, PNG, GIF, WebP, or BMP.`
        : `Nicht unterstütztes Dateiformat: ${file.type}. Bitte laden Sie hoch: JPEG, PNG, GIF, WebP oder BMP.`;
      setError(lang);
      return false;
    }

    // Check extension
    const fileName = file.name.toLowerCase();
    const hasValidExtension = VALID_EXTENSIONS.some(ext => fileName.endsWith(ext));
    if (!hasValidExtension) {
      const lang = language === 'en' 
        ? `Invalid file extension: ${file.name}. Please use: .jpg, .png, .gif, .webp, .bmp, or .tiff`
        : `Ungültige Dateierweiterung: ${file.name}. Bitte verwenden Sie: .jpg, .png, .gif, .webp, .bmp oder .tiff`;
      setError(lang);
      return false;
    }

    return true;
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate image format
      if (!validateImageFile(file)) {
        return;
      }
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
      // Validate image format
      if (!validateImageFile(file)) {
        return;
      }
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
      // Development uses local API, production uses Hugging Face Spaces
      let apiUrl = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:7860/api/predict'
        : 'https://williamcass-dog-breed-classification.hf.space/api/predict';

      const formData = new FormData();
      
      // For URL input, add as query parameter
      if (inputMode === "url" && imageUrl) {
        const urlParams = new URLSearchParams();
        urlParams.append('url', imageUrl);
        apiUrl += '?' + urlParams.toString();
        
        const response = await fetch(apiUrl, {
          method: "POST",
          body: null,
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.text();
          console.error("API Error:", errorData);
          throw new Error(language === "en" ? "No image found at this URL. Please provide a valid image URL." : "Keine Bilder gefunden. Bitte geben Sie eine gültige Bild-URL ein.");
        }

        const data = await response.json();
        await handleResponseData(data);
      } else if (inputMode === "file" && image) {
        // For file upload, send FormData without query parameters
        console.log("File upload debug:", {
          fileName: image.name,
          fileSize: image.size,
          fileType: image.type,
          isFile: image instanceof File,
        });
        
        formData.append("file", image);
        
        const response = await fetch(apiUrl, {
          method: "POST",
          body: formData,
          // Don't set Content-Type for FormData, let browser handle it
          headers: {
            "Accept": "application/json"
          }
        });

        if (!response.ok) {
          const errorData = await response.text();
          console.error("API Error:", errorData);
          throw new Error(language === "en" ? "Failed to predict. Please try again." : "Fehler bei der Vorhersage. Bitte versuchen Sie es erneut.");
        }

        const data = await response.json();
        await handleResponseData(data);
      }
    } catch (err) {
      console.error("Prediction error details:", {
        message: err.message,
        stack: err.stack,
        inputMode: inputMode,
        hasImage: !!image,
        hasImageUrl: !!imageUrl,
      });
      setError(err.message || t.predictError);
    } finally {
      setLoading(false);
    }
  };

  const handleResponseData = async (data) => {
    // Check if response is webpage image selection
    if (data.type === "image_selection") {
      setWebpageImages(data.images);
      setError(null);
      // 不自动选择第一个图片，让用户自己点击选择
      return;
    }

    if (!data.success) {
      // Backend error message
      const errorMsg = data.error || t.predictError;
      throw new Error(errorMsg);
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
          <div className="input-mode-toggle">
            <button
              onClick={() => setInputMode("file")}
              className={`mode-btn ${inputMode === "file" ? "active" : ""}`}
            >
              {language === "en" ? "📁 Upload" : "📁 Hochladen"}
            </button>
            <button
              onClick={() => setInputMode("url")}
              className={`mode-btn ${inputMode === "url" ? "active" : ""}`}
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
                onClick={openFileDialog}
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
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.gif,.webp,.bmp,.tiff,.tif,image/jpeg,image/png,image/gif,image/webp,image/bmp,image/tiff"
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
              <input
                type="url"
                className="url-input"
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
                placeholder={language === "en" ? "Enter image URL..." : "URL eingeben..."}
              />



              {/* Webpage image selection grid */}
              {webpageImages.length > 0 && (
                <div className="webpage-images-container">
                  <div className="webpage-images-label">
                    {language === "en" ? `Found ${webpageImages.length} images on the webpage:` : `${webpageImages.length} Bilder auf der Webseite gefunden:`}
                  </div>
                  <div className="webpage-images-grid">
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
                <div className="url-preview">
                  <img
                    src={preview}
                    alt="URL Preview"
                    className="preview-image"
                    onError={() => setError(language === "en" ? "Failed to load image from URL" : "Fehler beim Laden des Bildes von der URL")}
                  />
                </div>
              )}

              {/* 显示网页URL输入状态 */}
              {imageUrl && !isImageUrl(imageUrl) && !webpageImages.length && (
                <div className="webpage-url-status">
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

            <div className="model-disclaimer">
              <span className="disclaimer-icon">ℹ️</span>
              <div className="disclaimer-text">
                {language === "en" 
                  ? "The model is trained on 120 dog breeds. For dog breeds not included in the database, the classification may be inaccurate. The model will attempt to find the closest match among known breeds."
                  : "Das Modell wurde mit 120 Hunderassen trainiert. Für Hunderassen, die nicht in der Datenbank enthalten sind, kann die Klassifizierung ungenau sein. Das Modell versucht, die beste Übereinstimmung unter den bekannten Rassen zu finden."}
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