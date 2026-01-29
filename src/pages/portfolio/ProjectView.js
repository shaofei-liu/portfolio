import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { dataportfolio, contactConfig, translations } from "../../content_option";

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

  // Project 3: RAG Chatbot
  if (project.id === "project3") {
    const iframeUrl = project.projectUrl;
    const fullScreenUrl = project.projectUrl.split("?")[0];
    
    return (
      <div className="project-view" style={{ padding: 16 }}>
        <h2 style={{ marginBottom: 8 }}>{(lang === 'en' && project.description_en) ? project.description_en : project.description}</h2>
        
        <p style={{ marginBottom: 24, color: "#666", fontSize: "15px", lineHeight: "1.6" }}>
          {lang === 'en' 
            ? "Powered by advanced AI models (Gemini, Claude, GPT-4) with knowledge base indexing. Ask me anything about my professional background, technical skills, experience, education, and career interests."
            : "Mit fortschrittlichen KI-Modellen (Gemini, Claude, GPT-4) und Wissensdatenbankindexierung betrieben. Fragen Sie mich alles über meinen beruflichen Hintergrund, technische Fähigkeiten, Erfahrung, Bildung und Karriereinteressen."}
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
              {lang === 'en' ? "Powered by" : "Betrieben von"}
            </div>
            <div style={{ fontSize: "14px", color: "#333", fontWeight: "500" }}>
              Retrieval-Augmented Generation (RAG)
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "12px", color: "#999", textTransform: "uppercase", fontWeight: "600", marginBottom: "4px" }}>
              {lang === 'en' ? "Models" : "Modelle"}
            </div>
            <div style={{ fontSize: "14px", color: "#333", fontWeight: "500" }}>
              Gemini, Claude, GPT-4
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "12px", color: "#999", textTransform: "uppercase", fontWeight: "600", marginBottom: "4px" }}>
              {lang === 'en' ? "Data Source" : "Datenquelle"}
            </div>
            <div style={{ fontSize: "14px", color: "#333", fontWeight: "500" }}>
              Shaofei's Portfolio
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
            {lang === 'en' ? "Chat Features" : "Chat-Funktionen"}
          </h4>
          <ul style={{ 
            margin: 0, 
            padding: "0 0 0 20px", 
            color: "#555", 
            fontSize: "14px",
            lineHeight: "1.8"
          }}>
            <li>{lang === 'en' ? "Real-time responses from multiple AI models" : "Echtzeitantworten von mehreren KI-Modellen"}</li>
            <li>{lang === 'en' ? "Ask about my professional background and experience" : "Fragen Sie nach meinem beruflichen Hintergrund und meiner Erfahrung"}</li>
            <li>{lang === 'en' ? "Get insights on technical skills and expertise areas" : "Erhalten Sie Einblicke in technische Fähigkeiten und Expertenbereiche"}</li>
            <li>{lang === 'en' ? "Bilingual support - English & Deutsch" : "Zweisprachig - English & Deutsch"}</li>
          </ul>
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
            ← {translations[lang].projectView.back}
          </Link>
        </div>
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
