import React, { useState, useEffect } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { dataportfolio, meta, translations } from "../../content_option";
import { Link } from "react-router-dom";

export const Portfolio = () => {
  const [comments, setComments] = useState({});
  const [uploadedPdfs, setUploadedPdfs] = useState({});
  const [saved, setSaved] = useState({});
  const [lang, setLang] = useState(localStorage.getItem("lang") || "de");

  useEffect(() => {
    const onLang = (e) => setLang(e.detail || localStorage.getItem("lang") || "de");
    window.addEventListener("langChange", onLang);
    return () => window.removeEventListener("langChange", onLang);
  }, []);

  useEffect(() => {
    const initial = {};
    dataportfolio.forEach((d, i) => {
      const key = d.id ? `portfolio_comment_${d.id}` : `portfolio_comment_${i}`;
      const v = localStorage.getItem(key);
      if (v) initial[key] = v;
    });
    setComments(initial);
    return () => {
      Object.values(uploadedPdfs).forEach((url) => {
        try { URL.revokeObjectURL(url); } catch (e) {}
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const storageKey = (d, i) => (d.id ? `portfolio_comment_${d.id}` : `portfolio_comment_${i}`);

  const handleFile = (key, file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setUploadedPdfs((prev) => ({ ...prev, [key]: url }));
  };

  const handleCommentChange = (key, value) => {
    setComments((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = (key) => {
    localStorage.setItem(key, comments[key] || "");
    setSaved((s) => ({ ...s, [key]: true }));
    setTimeout(() => setSaved((s) => ({ ...s, [key]: false })), 1500);
  };

  // Separate projects by type
  const personalProjects = dataportfolio.filter(p => p.type === "personal");
  const collaborativeProjects = dataportfolio.filter(p => p.type === "collaboration" || p.type === "work");

  const renderProjectSection = (title, projects) => (
    <div key={title} style={{ marginBottom: "60px" }}>
      <h2 style={{
        fontSize: "28px",
        fontWeight: "700",
        marginBottom: "30px",
        paddingBottom: "15px",
        borderBottom: "2px solid #0066cc",
        color: "#0066cc"
      }}>
        {title}
      </h2>
      <div className="mb-5 po_items_ho">
        {projects.map((data, i) => {
          const key = storageKey(data, i);
          const desc = ( (typeof data.description_en !== 'undefined') && lang === 'en') ? data.description_en : data.description;
          return (
            <div key={i} className="po_item">
              <img src={data.img} alt="" />
              <div className="content">
                <p>{desc}</p>
                {(data.id === "project1" || data.id === "project2" || data.id === "project3" || data.id === "project4" || data.id === "project5" || data.id === "project6" || data.id === "project7") ? (
                  <Link to={`/portfolio/${data.id}`} className="btn">{translations[lang].portfolio.viewProject}</Link>
                ) : (
                  <a href={data.link}>{translations[lang].portfolio.viewProject}</a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> {translations[lang].portfolio.title} | {meta.title} </title>{" "}
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4"> {translations[lang].portfolio.title} </h1>{" "}
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        
        {/* Personal Projects Section */}
        {renderProjectSection(
          lang === 'en' ? "Personal Projects" : "Persönliche Projekte",
          personalProjects
        )}
        
        {/* Collaborative and Work Projects Section */}
        {collaborativeProjects.length > 0 && renderProjectSection(
          lang === 'en' ? "Collaborative & Work Projects" : "Kooperations- und Arbeitsprojekte",
          collaborativeProjects
        )}
      </Container>
    </HelmetProvider>
  );
};
