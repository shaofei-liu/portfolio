import React, { useState, useEffect } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { dataportfolio, meta } from "../../content_option";
import { Link } from "react-router-dom";

export const Portfolio = () => {
  const [comments, setComments] = useState({});
  const [uploadedPdfs, setUploadedPdfs] = useState({});
  const [saved, setSaved] = useState({});

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

  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> Portfolio | {meta.title} </title>{" "}
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4"> Portfolio </h1>{" "}
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <div className="mb-5 po_items_ho">
          {dataportfolio.map((data, i) => {
            const key = storageKey(data, i);
            return (
              <div key={i} className="po_item">
                <img src={data.img} alt="" />
                <div className="content">
                  <p>{data.description}</p>
                  {data.id === "project1" ? (
                    <Link to={`/portfolio/${data.id}`} className="btn">Projekt ansehen</Link>
                  ) : (
                    <a href={data.link}>Projekt ansehen</a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </HelmetProvider>
  );
};
