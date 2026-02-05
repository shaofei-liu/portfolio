import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { dataportfolio, projectDetails, contactConfig, translations } from "../../content_option";
import DogBreedClassifier from "../../components/DogBreedClassifier";
import RejectionLetters from "../../components/RejectionLetters";

export default function ProjectView() {
  const { id } = useParams();
  const project = dataportfolio.find((p) => p.id === id);
  const storageKey = `portfolio_comment_${id}`;
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [mailtoHref, setMailtoHref] = useState("");
  const [lang, setLang] = useState(localStorage.getItem("lang") || "de");

  useEffect(() => {
    const onLang = (e) => setLang(e.detail || localStorage.getItem("lang") || "de");
    window.addEventListener("langChange", onLang);
    return () => window.removeEventListener("langChange", onLang);
  }, []);

  useEffect(() => {
    if (!project) return;
    const v = localStorage.getItem(storageKey);
    if (v) setText(v);
  }, [project, storageKey]);

  if (!project) {
    return (
      <div style={{ padding: 16 }}>
        {translations[lang].projectView.notFound} <Link to="/portfolio">{translations[lang].projectView.back}</Link>
      </div>
    );
  }

  // Project 2: Dog Breed Classifier
  if (project.id === "project2") {
    return (
      <div className="project-view" style={{ padding: 16 }}>
        <h2 style={{ marginBottom: 8 }}>{(lang === 'en' && project.description_en) ? project.description_en : project.description}</h2>
        <p style={{ marginBottom: 24, color: "#666", fontSize: "15px", lineHeight: "1.6" }}>
          {lang === 'en'
            ? "AI-powered dog breed classifier using Vision Transformer (ViT-B/16) trained on 120 dog breeds. Upload a dog photo and get instant breed identification with confidence scores and top-5 predictions. Supports English and German."
            : "KI-gestützter Hunderassen-Klassifizierer mit Vision Transformer (ViT-B/16) für 120 Hunderassen. Laden Sie ein Hundefoto hoch und erhalten Sie eine sofortige Rassenidentifizierung mit Konfidenzscores und den Top-5-Vorhersagen. Unterstützt Englisch und Deutsch."}
        </p>

        {/* Header Info Bar */}
        <div style={{
          display: "flex",
          gap: "20px",
          marginBottom: "24px",
          padding: "16px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          borderLeft: "4px solid #0066cc"
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "12px", color: "#999", textTransform: "uppercase", fontWeight: "600", marginBottom: "4px" }}>
              {lang === 'en' ? "AI Model" : "KI-Modell"}
            </div>
            <div style={{ fontSize: "14px", color: "#333", fontWeight: "500" }}>
              Vision Transformer (ViT-B/16)
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "12px", color: "#999", textTransform: "uppercase", fontWeight: "600", marginBottom: "4px" }}>
              {lang === 'en' ? "Framework" : "Framework"}
            </div>
            <div style={{ fontSize: "14px", color: "#333", fontWeight: "500" }}>
              PyTorch 2.10 + FastAPI
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "12px", color: "#999", textTransform: "uppercase", fontWeight: "600", marginBottom: "4px" }}>
              {lang === 'en' ? "Dataset" : "Datensatz"}
            </div>
            <div style={{ fontSize: "14px", color: "#333", fontWeight: "500" }}>
              120 Dog Breeds
            </div>
          </div>
        </div>

        {/* Demo Container */}
        <div style={{
          margin: "0 0 24px 0",
          border: "1px solid #2a3f5a",
          borderRadius: "12px",
          overflow: "hidden",
          padding: "20px",
          backgroundColor: "#0f1419",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)"
        }}>
          <DogBreedClassifier />
        </div>

        {/* Features List */}
        <div style={{
          marginBottom: "24px",
          padding: "20px",
          backgroundColor: "#f0f4ff",
          borderRadius: "8px",
          borderLeft: "4px solid #0066cc"
        }}>
          <h4 style={{ margin: "0 0 12px 0", color: "#0066cc", fontSize: "14px", fontWeight: "600", textTransform: "uppercase" }}>
            {lang === 'en' ? "Key Features" : "Hauptmerkmale"}
          </h4>
          <ul style={{ margin: 0, paddingLeft: "20px", color: "#333", fontSize: "14px", lineHeight: "1.8" }}>
            <li>{lang === 'en' ? "Real-time breed classification with confidence scores" : "Echtzeit-Rassenklassifizierung mit Konfidenzwerten"}</li>
            <li>{lang === 'en' ? "Top-5 predictions for each image" : "Top-5-Vorhersagen für jedes Bild"}</li>
            <li>{lang === 'en' ? "Support for 120 dog breeds" : "Unterstützung für 120 Hunderassen"}</li>
            <li>{lang === 'en' ? "Bilingual interface (English & German)" : "Zweisprachige Schnittstelle (Englisch & Deutsch)"}</li>
            <li>{lang === 'en' ? "Drag-and-drop image upload" : "Drag-and-Drop-Bild-Upload"}</li>
            <li>{lang === 'en' ? "Local and cloud API support" : "Lokale und Cloud-API-Unterstützung"}</li>
          </ul>
        </div>

        {/* Technical Stack */}
        <div style={{
          marginBottom: "24px",
          padding: "20px",
          backgroundColor: "#fff0f5",
          borderRadius: "8px",
          borderLeft: "4px solid #d946a0"
        }}>
          <h4 style={{ margin: "0 0 12px 0", color: "#d946a0", fontSize: "14px", fontWeight: "600", textTransform: "uppercase" }}>
            {lang === 'en' ? "Technical Stack" : "Technischer Stack"}
          </h4>
          <ul style={{ margin: 0, paddingLeft: "20px", color: "#333", fontSize: "14px", lineHeight: "1.8" }}>
            <li><strong>Backend:</strong> Python 3.11, FastAPI, PyTorch 2.10</li>
            <li><strong>Frontend:</strong> React 18+, Gradio UI</li>
            <li><strong>Model:</strong> Vision Transformer (ViT-B/16) with pre-training</li>
            <li><strong>Deployment:</strong> Hugging Face Spaces (Docker)</li>
            <li><strong>API:</strong> RESTful API with CORS support</li>
          </ul>
        </div>

        {/* Links */}
        <div style={{ marginBottom: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a
            href="https://huggingface.co/spaces/WilliamCass/dog-breed-classification"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '10px 20px',
              backgroundColor: '#667eea',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#764ba2'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#667eea'}
          >
            HF Spaces Live Demo
          </a>
          <a
            href="https://github.com/shaofei-liu/dog-breed-classification"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '10px 20px',
              backgroundColor: '#333',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#555'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#333'}
          >
            GitHub Repository
          </a>
        </div>

        <div style={{ marginTop: 40, paddingTop: 20, borderTop: '1px solid #eee' }}>
          <h3>{translations[lang]?.projectView?.yourComments || 'Your Comments'}</h3>
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              localStorage.setItem(storageKey, e.target.value);
            }}
            placeholder={translations[lang]?.projectView?.placeholder || "Type your feedback here..."}
            style={{
              width: '100%',
              height: '120px',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              fontFamily: 'inherit',
              fontSize: '14px'
            }}
          />
        </div>

        <Link to="/portfolio" style={{
          display: 'inline-block',
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#f0f0f0',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: '600',
          color: '#333',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#e0e0e0';
          e.target.style.transform = 'translateY(-2px)';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#f0f0f0';
          e.target.style.transform = 'translateY(0)';
        }}>
          {translations[lang]?.projectView?.back || 'Back'}
        </Link>
      </div>
    );
  }
  // Project 3: RAG Chatbot
  if (project.id === "project3") {
    const iframeUrl = project.projectUrl;
    const fullScreenUrl = project.projectUrl.split("?")[0];
    
    return (
      <div className="project-view" style={{ padding: 16 }}>
        <h2 style={{ marginBottom: 8 }}>{(lang === 'en' && project.description_en) ? project.description_en : project.description}</h2>
        
        <p style={{ marginBottom: 24, color: "#666", fontSize: "15px", lineHeight: "1.6" }}>
          {lang === 'en' 
            ? "A multilingual AI-powered chatbot built with Streamlit, LangChain, and Google Gemini API. Uses Retrieval-Augmented Generation (RAG) with vector database to answer questions about Shaofei's background, skills, and professional experience."
            : "Ein mehrsprachiger KI-gestützter Chatbot, gebaut mit Streamlit, LangChain und Google Gemini API. Nutzt Retrieval-Augmented Generation (RAG) mit Vektordatenbank, um Fragen zu Shaofeis Hintergrund, Fähigkeiten und beruflicher Erfahrung zu beantworten."}
        </p>

        {/* Header Info Bar */}
        <div style={{ 
          display: "flex",
          gap: "20px",
          marginBottom: "24px",
          padding: "16px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          borderLeft: "4px solid #0066cc"
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "12px", color: "#999", textTransform: "uppercase", fontWeight: "600", marginBottom: "4px" }}>
              {lang === 'en' ? "Framework" : "Framework"}
            </div>
            <div style={{ fontSize: "14px", color: "#333", fontWeight: "500" }}>
              Streamlit + LangChain
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "12px", color: "#999", textTransform: "uppercase", fontWeight: "600", marginBottom: "4px" }}>
              {lang === 'en' ? "AI Model" : "KI-Modell"}
            </div>
            <div style={{ fontSize: "14px", color: "#333", fontWeight: "500" }}>
              Google Gemini API
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "12px", color: "#999", textTransform: "uppercase", fontWeight: "600", marginBottom: "4px" }}>
              {lang === 'en' ? "Vector DB" : "Vektor-DB"}
            </div>
            <div style={{ fontSize: "14px", color: "#333", fontWeight: "500" }}>
              Chroma
            </div>
          </div>
        </div>

        {/* Chatbot Container */}
        <div style={{ 
          margin: "0 0 24px 0",
          border: "1px solid #e0e0e0",
          borderRadius: "12px",
          overflow: "hidden",
          height: "800px",
          position: "relative",
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)"
        }}>
          <iframe
            key={iframeUrl}
            src={iframeUrl}
            title="RAG Chatbot"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              display: "block"
            }}
            allow="clipboard-read clipboard-write"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Features List */}
        <div style={{ 
          marginBottom: "24px",
          padding: "20px",
          backgroundColor: "#f0f4ff",
          borderRadius: "8px",
          borderLeft: "4px solid #0066cc"
        }}>
          <h4 style={{ margin: "0 0 12px 0", color: "#0066cc", fontSize: "14px", fontWeight: "600", textTransform: "uppercase" }}>
            {lang === 'en' ? "Key Features" : "Hauptmerkmale"}
          </h4>
          <ul style={{ 
            margin: 0, 
            padding: "0 0 0 20px", 
            color: "#555", 
            fontSize: "14px",
            lineHeight: "1.8"
          }}>
            <li>{lang === 'en' ? "Bilingual support - English & Deutsch" : "Zweisprachig - English & Deutsch"}</li>
            <li>{lang === 'en' ? "RAG with vector database for contextual answers" : "RAG mit Vektordatenbank für kontextbezogene Antworten"}</li>
            <li>{lang === 'en' ? "Real-time responses with automatic model switching" : "Echtzeitantworten mit automatischem Modellwechsel"}</li>
            <li>{lang === 'en' ? "Smart fallback system - tries alternative models if one fails" : "Smart Fallback - versucht alternative Modelle bei Fehlern"}</li>
            <li>{lang === 'en' ? "Instant knowledge base initialization from PDFs" : "Sofortige KB-Initialisierung aus PDFs"}</li>
          </ul>
        </div>

        {/* Tech Stack */}
        <div style={{ 
          marginBottom: "24px",
          padding: "20px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          border: "1px solid #e0e0e0"
        }}>
          <h4 style={{ margin: "0 0 12px 0", color: "#333", fontSize: "14px", fontWeight: "600" }}>
            {lang === 'en' ? "Tech Stack" : "Technologie-Stack"}
          </h4>
          <div style={{ 
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "12px",
            fontSize: "13px",
            color: "#666"
          }}>
            <div>�?<strong>Frontend:</strong> Streamlit</div>
            <div>�?<strong>LLM:</strong> Google Gemini</div>
            <div>�?<strong>Framework:</strong> LangChain</div>
            <div>�?<strong>Embeddings:</strong> HuggingFace</div>
            <div>�?<strong>Vector DB:</strong> Chroma</div>
            <div>�?<strong>Language:</strong> Python 3.9+</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ 
          display: "flex", 
          gap: "12px",
          alignItems: "center"
        }}>
          <a 
            href={fullScreenUrl}
            target="_blank" 
            rel="noopener noreferrer" 
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              backgroundColor: "#0066cc",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px",
              fontSize: "15px",
              fontWeight: "500",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#0052a3";
              e.target.style.boxShadow = "0 4px 12px rgba(0, 102, 204, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#0066cc";
              e.target.style.boxShadow = "none";
            }}
          >
            🔗 {lang === 'en' ? "Open in Full Screen" : "Vollbild öffnen"}
          </a>
          <Link 
            to="/portfolio" 
            className="btn"
            style={{
              padding: "12px 24px",
              fontSize: "15px"
            }}
          >
            {translations[lang].projectView.back}
          </Link>
        </div>
      </div>
    );
  }

  // Project 4: IRevRNN Thesis
  if (project.id === "project4") {
    const details = projectDetails.project4;
    const title = lang === 'en' ? details.title_en : details.title_de;
    const subtitle = lang === 'en' ? details.subtitle_en : details.subtitle_de;
    const desc = lang === 'en' ? details.description_en : details.description_de;
    const features = lang === 'en' ? details.keyFeatures_en : details.keyFeatures_de;
    const codeFeatures = lang === 'en' ? details.codeFeatures_en : details.codeFeatures_de;
    const techStack = details.techStack_en;

    return (
      <div className="project-view" style={{ padding: 16 }}>
        <h2 style={{ marginBottom: 8 }}>{title}</h2>
        <p style={{ marginBottom: 4, color: "#0066cc", fontSize: "16px", fontWeight: "600" }}>
          {subtitle}
        </p>
        <p style={{ marginBottom: 24, color: "#666", fontSize: "15px", lineHeight: "1.6" }}>
          {desc}
        </p>

        {/* Header Info Bar */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
          padding: "16px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          borderLeft: "4px solid #667eea"
        }}>
          <div>
            <div style={{ fontSize: "12px", color: "#999", textTransform: "uppercase", fontWeight: "600", marginBottom: "4px" }}>
              {lang === 'en' ? "Pages" : "Seiten"}
            </div>
            <div style={{ fontSize: "14px", color: "#333", fontWeight: "500" }}>
              {details.fileInfo.pages}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "12px", color: "#999", textTransform: "uppercase", fontWeight: "600", marginBottom: "4px" }}>
              {lang === 'en' ? "Code Lines" : "Code-Zeilen"}
            </div>
            <div style={{ fontSize: "14px", color: "#333", fontWeight: "500" }}>
              {details.fileInfo.lines_python + " Python"}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "12px", color: "#999", textTransform: "uppercase", fontWeight: "600", marginBottom: "4px" }}>
              {lang === 'en' ? "CUDA Kernels" : "CUDA-Kernel"}
            </div>
            <div style={{ fontSize: "14px", color: "#333", fontWeight: "500" }}>
              {details.fileInfo.lines_cuda}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "12px", color: "#999", textTransform: "uppercase", fontWeight: "600", marginBottom: "4px" }}>
              {lang === 'en' ? "Datasets" : "Datensätze"}
            </div>
            <div style={{ fontSize: "14px", color: "#333", fontWeight: "500" }}>
              {details.fileInfo.datasets}
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div style={{
          marginBottom: "24px",
          padding: "20px",
          backgroundColor: "#f0f4ff",
          borderRadius: "8px",
          borderLeft: "4px solid #667eea"
        }}>
          <h4 style={{ margin: "0 0 12px 0", color: "#667eea", fontSize: "14px", fontWeight: "600", textTransform: "uppercase" }}>
            {lang === 'en' ? "Key Features" : "Hauptmerkmale"}
          </h4>
          <ul style={{ margin: 0, paddingLeft: "20px", color: "#333", fontSize: "14px", lineHeight: "1.8" }}>
            {features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </div>

        {/* Code Architecture */}
        <div style={{
          marginBottom: "24px",
          padding: "20px",
          backgroundColor: "#fff0f5",
          borderRadius: "8px",
          borderLeft: "4px solid #d946a0"
        }}>
          <h4 style={{ margin: "0 0 12px 0", color: "#d946a0", fontSize: "14px", fontWeight: "600", textTransform: "uppercase" }}>
            {lang === 'en' ? "Code Architecture" : "Code-Architektur"}
          </h4>
          <ul style={{ margin: 0, paddingLeft: "20px", color: "#333", fontSize: "14px", lineHeight: "1.8" }}>
            {codeFeatures.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </div>

        {/* Technical Stack */}
        <div style={{
          marginBottom: "24px",
          padding: "20px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          borderLeft: "4px solid #f59e0b"
        }}>
          <h4 style={{ margin: "0 0 12px 0", color: "#f59e0b", fontSize: "14px", fontWeight: "600", textTransform: "uppercase" }}>
            {lang === 'en' ? "Technical Stack" : "Technischer Stack"}
          </h4>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "12px",
            fontSize: "13px",
            color: "#666"
          }}>
            {techStack.map((tech, idx) => (
              <div key={idx} style={{ paddingLeft: "8px" }}>• {tech}</div>
            ))}
          </div>
        </div>

        {/* Paper and Source */}
        <div style={{
          marginBottom: "24px",
          padding: "20px",
          backgroundColor: "#e8f5e9",
          borderRadius: "8px",
          borderLeft: "4px solid #10b981"
        }}>
          <h4 style={{ margin: "0 0 12px 0", color: "#10b981", fontSize: "14px", fontWeight: "600", textTransform: "uppercase" }}>
            {lang === 'en' ? "Master's Thesis" : "Masterarbeit"}
          </h4>
          <p style={{ margin: "0 0 12px 0", color: "#333", fontSize: "14px", lineHeight: "1.6" }}>
            {lang === 'en' 
              ? "The original thesis 'RNNs with Independency Assumptions: Scalable and Efficient Sequence Learning' is approximately 80 pages and covers comprehensive research on efficient RNN architectures. A related research paper is available below for your reference."
              : "Die ursprüngliche Masterarbeit 'RNNs with Independency Assumptions: Scalable and Efficient Sequence Learning' umfasst etwa 80 Seiten und behandelt umfassende Forschung zu effizienten RNN-Architekturen. Ein verwandtes Forschungspapier steht unten zur Verfügung."}
          </p>
        </div>

        {/* Action Links */}
        <div style={{ marginBottom: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a
            href={details.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '10px 20px',
              backgroundColor: '#333',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#555'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#333'}
          >
            📊 GitHub Repository
          </a>
          {details.paperUrl && (
            <a
              href={details.paperUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '10px 20px',
                backgroundColor: '#667eea',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#764ba2'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#667eea'}
            >
              📄 {lang === 'en' ? "View Paper" : "Arbeit ansehen"}
            </a>
          )}
        </div>

        <div style={{ marginTop: 40, paddingTop: 20, borderTop: '1px solid #eee' }}>
          <h3>{translations[lang]?.projectView?.yourComments || 'Your Comments'}</h3>
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              localStorage.setItem(storageKey, e.target.value);
            }}
            placeholder={translations[lang]?.projectView?.placeholder || "Type your feedback here..."}
            style={{
              width: '100%',
              height: '120px',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              fontFamily: 'inherit',
              fontSize: '14px'
            }}
          />
        </div>

        <Link to="/portfolio" style={{
          display: 'inline-block',
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#f0f0f0',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: '600',
          color: '#333',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#e0e0e0';
          e.target.style.transform = 'translateY(-2px)';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#f0f0f0';
          e.target.style.transform = 'translateY(0)';
        }}>
          {translations[lang]?.projectView?.back || 'Back'}
        </Link>
      </div>
    );
  }

  // Only project1 has the detail page content
  if (project.id !== "project1") {
    return (
      <div style={{ padding: 16 }}>
        {translations[lang].projectView.noDetail} <Link to="/portfolio">{translations[lang].projectView.back}</Link>
      </div>
    );
  }

  const handleCopy = () => {
    // Save locally
    try {
      localStorage.setItem(storageKey, text);
      // copy to clipboard
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }

      // prepare mailto link so user can open their mail client
      const body = `Feedback zu ${project.description}:\n\n${text}`;
      const href = `mailto:${contactConfig.YOUR_EMAIL}?subject=${encodeURIComponent(
        'Feedback zu ' + project.description
      )}&body=${encodeURIComponent(body)}`;
      setMailtoHref(href);

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div className="project-view" style={{ padding: 16 }}>
      <h2>{(lang === 'en' && project.description_en) ? project.description_en : project.description}</h2>

      <p>
        {translations[lang].projectView.website}:
        <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 6 }}>
          {project.projectUrl}
        </a>
      </p>

      <div style={{ margin: "12px 0" }}>
        <a className="btn" href={project.pdf} target="_blank" rel="noopener noreferrer">
          {translations[lang].projectView.pdfOpen}
        </a>
      </div>

      <label htmlFor="comment" style={{ display: "block", marginTop: 12 }}>{translations[lang].projectView.yourComments}</label>
      <textarea
        id="comment"
        aria-label={translations[lang].projectView.yourComments}
        placeholder={translations[lang].projectView.placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%", minHeight: 160 }}
      />

      <div style={{ marginTop: 8 }}>
        <button className="btn btn-sm" onClick={handleCopy}>{translations[lang].projectView.copy}</button>
        {copied && <span style={{ marginLeft: 8, color: "lightgreen" }}>{translations[lang].projectView.copied}</span>}
        {mailtoHref && (
          <a href={mailtoHref} className="btn" style={{ marginLeft: 12 }}>
            {translations[lang].projectView.emailCreate}
          </a>
        )}
        <Link to="/portfolio" style={{ marginLeft: 12 }}>{translations[lang].projectView.back}</Link>
      </div>
    </div>
  );
}



