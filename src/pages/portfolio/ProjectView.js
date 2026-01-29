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
    return (
      <div className="project-view" style={{ padding: 16 }}>
        <h2>{(lang === 'en' && project.description_en) ? project.description_en : project.description}</h2>
        
        <p style={{ marginBottom: 16 }}>
          {lang === 'en' 
            ? "This is an AI-powered Retrieval-Augmented Generation (RAG) chatbot that can answer questions about my background, skills, and experience."
            : "Dies ist ein KI-gestützter Retrieval-Augmented Generation (RAG)-Chatbot, der Fragen zu meinem Hintergrund, meinen Fähigkeiten und meiner Erfahrung beantworten kann."}
        </p>

        <div style={{ 
          margin: "30px 0",
          padding: "40px",
          borderRadius: "12px",
          backgroundColor: "#f0f4ff",
          border: "2px solid #0066cc",
          textAlign: "center"
        }}>
          <div style={{ marginBottom: "25px" }}>
            <div style={{ fontSize: "48px", marginBottom: "15px" }}>💬</div>
            <h3 style={{ margin: "0 0 10px 0", color: "#0066cc" }}>
              {lang === 'en' ? "Interactive Chatbot" : "Interaktiver Chatbot"}
            </h3>
            <p style={{ margin: "10px 0", color: "#666", fontSize: "15px" }}>
              {lang === 'en' 
                ? "Click below to open the chatbot. It will open in a new tab for the best experience."
                : "Klicken Sie unten, um den Chatbot zu öffnen. Er wird in einem neuen Tab geöffnet, um die beste Erfahrung zu bieten."}
            </p>
          </div>

          <a 
            href={project.projectUrl}
            target="_blank" 
            rel="noopener noreferrer" 
            style={{
              display: "inline-block",
              padding: "14px 32px",
              backgroundColor: "#0066cc",
              color: "white",
              textDecoration: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.3s",
              border: "none"
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#0052a3"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#0066cc"}
          >
            {lang === 'en' ? "Open Chatbot →" : "Chatbot öffnen →"}
          </a>

          <p style={{ marginTop: "20px", fontSize: "13px", color: "#999" }}>
            {lang === 'en' 
              ? "⏱️ Loading takes 10-15 seconds on first visit"
              : "⏱️ Das erste Laden dauert 10-15 Sekunden"}
          </p>
        </div>

        <div style={{ marginTop: "30px", backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px" }}>
          <h4 style={{ marginTop: 0 }}>
            {lang === 'en' ? "About this Chatbot" : "Über diesen Chatbot"}
          </h4>
          <ul style={{ marginBottom: 0, color: "#666", lineHeight: "1.8" }}>
            <li>{lang === 'en' ? "Powered by advanced AI models" : "Mit fortschrittlichen KI-Modellen betrieben"}</li>
            <li>{lang === 'en' ? "Learn about my professional background" : "Erfahren Sie mehr über meinen beruflichen Hintergrund"}</li>
            <li>{lang === 'en' ? "Ask about my skills and experience" : "Fragen Sie nach meinen Fähigkeiten und Erfahrungen"}</li>
            <li>{lang === 'en' ? "Get recommendations and insights" : "Erhalten Sie Empfehlungen und Einblicke"}</li>
          </ul>
        </div>

        <div style={{ marginTop: 24 }}>
          <Link to="/portfolio" className="btn">{translations[lang].projectView.back}</Link>
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
