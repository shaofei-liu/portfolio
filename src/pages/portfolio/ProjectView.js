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
            ? "This is an AI-powered Retrieval-Augmented Generation (RAG) chatbot that can answer questions based on indexed documents and knowledge bases."
            : "Dies ist ein KI-gestützter Retrieval-Augmented Generation (RAG)-Chatbot, der Fragen basierend auf indexierten Dokumenten und Wissensdatenbanken beantworten kann."}
        </p>

        <div style={{ 
          margin: "20px 0",
          border: "1px solid #ddd",
          borderRadius: "8px",
          overflow: "hidden",
          height: "800px"
        }}>
          <iframe
            src={project.projectUrl}
            title="RAG Chatbot"
            style={{
              width: "100%",
              height: "100%",
              border: "none"
            }}
            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; microphone; payment; usb; vr; xr-spatial-tracking"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          />
        </div>

        <div style={{ marginTop: 16 }}>
          <a 
            href={project.projectUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn"
            style={{ marginRight: 12 }}
          >
            {lang === 'en' ? "Open in new tab" : "In neuem Tab öffnen"}
          </a>
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
