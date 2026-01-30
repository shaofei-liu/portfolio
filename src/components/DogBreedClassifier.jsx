import React, { useState } from 'react';
import './DogBreedClassifier.css';
import { dogBreedLang, getBreedName } from './dogBreedData';

/**
 * 狗品种分类组件
 * 集成 HF Spaces Gradio 界面
 * 支持英文和德文
 */
export default function DogBreedClassifier() {
  const [language, setLanguage] = useState('en');
  const [useLocalAPI, setUseLocalAPI] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const t = dogBreedLang[language];

  // 处理图片选择
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 验证文件类型
      if (!file.type.startsWith('image/')) {
        setError(t.imageTypeError);
        return;
      }

      // 验证文件大小 (限制 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError(t.imageSizeError);
        return;
      }

      setImage(file);
      setError(null);

      // 生成预览
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 处理拖拽上传
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageChange({ target: { files } });
    }
  };

  // 发送预测请求
  const handlePredict = async () => {
    if (!image) {
      setError(t.selectImageError);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // 如果使用本地 API
      if (useLocalAPI) {
        const formData = new FormData();
        formData.append('file', image);

        const response = await fetch('http://localhost:8000/api/predict', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(t.predictError);
        }

        const data = await response.json();
        if (!data.success) {
          throw new Error(data.detail || t.predictError);
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
      } else {
        // 使用 HF Spaces API
        const formData = new FormData();
        formData.append('files', image);

        const response = await fetch(
          'https://williamcass-dog-breed-classification.hf.space/api/predict/',
          {
            method: 'POST',
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(t.predictError);
        }

        const data = await response.json();
        
        // 处理 HF Spaces 返回的结果
        const processedResult = {
          success: true,
          breed: data.breed || 'Unknown',
          confidence: data.confidence || 0,
          top_5: data.top_5 || null
        };

        // 转换品种名称
        processedResult.breed = getBreedName(processedResult.breed, language);
        if (processedResult.top_5) {
          processedResult.top_5 = Object.fromEntries(
            Object.entries(processedResult.top_5).map(([breed, conf]) => [
              getBreedName(breed, language),
              conf
            ])
          );
        }

        setResult(processedResult);
      }
    } catch (err) {
      setError(err.message || t.predictError);
      console.error('预测错误:', err);
    } finally {
      setLoading(false);
    }
  };

  // 清除结果
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
        {/* API 来源选择 */}
        <div className="api-source-toggle">
          <label>
            <input
              type="checkbox"
              checked={useLocalAPI}
              onChange={(e) => setUseLocalAPI(e.target.checked)}
              disabled={loading}
            />
            <span className="toggle-label">
              {useLocalAPI ? 'Local API (localhost:8000)' : 'HF Spaces API'}
            </span>
          </label>
        </div>

        {/* 上传区域 */}
        <div className="upload-section"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="upload-input-wrapper">
            <label htmlFor="image-input" className="upload-label">
              <span className="upload-icon">📁</span>
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

        {/* 图片预览 */}
        {preview && (
          <div className="preview-section">
            <img src={preview} alt="preview" className="preview-image" />
          </div>
        )}

        {/* 错误信息 */}
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* 操作按钮 */}
        <div className="action-buttons">
          <button
            onClick={handlePredict}
            disabled={!image || loading}
            className="predict-btn"
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                {t.identifying}
              </>
            ) : (
              <>
                <span>🔍</span>
                {t.predict}
              </>
            )}
          </button>

          {image && (
            <button
              onClick={handleClear}
              disabled={loading}
              className="clear-btn"
            >
              ✕ {t.clear}
            </button>
          )}
        </div>

        {/* 识别结果 */}
        {result && (
          <div className="result-section">
            <div className="result-header">
              <h3>🎉 {t.result}</h3>
            </div>

            <div className="breed-result">
              <div className="breed-name">{result.breed}</div>
              <div className="confidence-bar">
                <div
                  className="confidence-fill"
                  style={{ width: `${(result.confidence || 0) * 100}%` }}
                ></div>
              </div>
              <div className="confidence-text">
                {t.confidence}: {((result.confidence || 0) * 100).toFixed(2)}%
              </div>
            </div>

            {result.top_5 && Object.keys(result.top_5).length > 0 && (
              <div className="top-predictions">
                <h4>{t.topResults}</h4>
                <div className="predictions-list">
                  {Object.entries(result.top_5).map(([breed, confidence], idx) => (
                    <div key={breed} className="prediction-item">
                      <span className="rank">#{idx + 1}</span>
                      <span className="breed-text">{breed}</span>
                      <span className="conf-text">
                        {(confidence * 100).toFixed(2)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="powered-by">
              <small>{t.powered}</small>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
