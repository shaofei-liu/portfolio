import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { dataportfolio, contactConfig } from "../../content_option";

export default function ProjectView() {
  const { id } = useParams();
  const project = dataportfolio.find((p) => p.id === id);
  const storageKey = `portfolio_comment_${id}`;
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [mailtoHref, setMailtoHref] = useState("");

  useEffect(() => {
    if (!project) return;
    const v = localStorage.getItem(storageKey);
    if (v) setText(v);
  }, [project, storageKey]);

  if (!project) {
    return (
      <div style={{ padding: 16 }}>
        Projekt nicht gefunden. <Link to="/portfolio">Zurück zur Übersicht</Link>
      </div>
    );
  }

  // Only project1 has the detail page content
  if (project.id !== "project1") {
    return (
      <div style={{ padding: 16 }}>
        Für dieses Projekt gibt es keine Detailseite. <Link to="/portfolio">Zurück zur Übersicht</Link>
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
      <h2>{project.description}</h2>

      <p>
        Webseite:
        <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 6 }}>
          {project.projectUrl}
        </a>
      </p>

      <div style={{ margin: "12px 0" }}>
        <a className="btn" href={project.pdf} target="_blank" rel="noopener noreferrer">
          PDF öffnen
        </a>
      </div>

      <label htmlFor="comment" style={{ display: "block", marginTop: 12 }}>Ihre Anmerkungen</label>
      <textarea
        id="comment"
        aria-label="Ihre Anmerkungen"
        placeholder="Schreiben Sie hier Ihre Änderungswünsche..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%", minHeight: 160 }}
      />

      <div style={{ marginTop: 8 }}>
        <button className="btn btn-sm" onClick={handleCopy}>Kopieren</button>
        {copied && <span style={{ marginLeft: 8, color: "lightgreen" }}>In die Zwischenablage kopiert</span>}
        {mailtoHref && (
          <a href={mailtoHref} className="btn" style={{ marginLeft: 12 }}>
            E-Mail erstellen
          </a>
        )}
        <Link to="/portfolio" style={{ marginLeft: 12 }}>Zurück</Link>
      </div>
    </div>
  );
}
