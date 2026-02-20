import React, { useState } from "react";
import * as emailjs from "emailjs-com";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { meta, translations } from "../../content_option";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { contactConfig } from "../../content_option";

export const ContactUs = () => {
  const [lang, setLang] = React.useState(localStorage.getItem("lang") || "de");
  React.useEffect(() => {
    const onLang = (e) => setLang(e.detail || localStorage.getItem("lang") || "de");
    window.addEventListener("langChange", onLang);
    return () => window.removeEventListener("langChange", onLang);
  }, []);

  const [formData, setFormdata] = useState({
    email: "",
    name: "",
    subject: "",
    message: "",
    loading: false,
    show: false,
    alertmessage: "",
    variant: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormdata((prev) => ({ ...prev, loading: true }));
    // set loading text according to language (used by button render)
    const sendingText = translations[lang].contact.sending;

    const templateParams = {
      from_name: formData.email,
      user_name: formData.name,
      to_name: contactConfig.YOUR_EMAIL,
      subject: formData.subject,
      message: formData.message,
    };

    emailjs
      .send(
        contactConfig.YOUR_SERVICE_ID,
        contactConfig.YOUR_TEMPLATE_ID,
        templateParams,
        contactConfig.YOUR_USER_ID
      )
      .then(
        (result) => {
          console.log(result.text);
          setFormdata((prev) => ({
            ...prev,
            loading: false,
            alertmessage: translations[lang].contact.success,
            variant: "success",
            show: true,
          }));
        },
        (error) => {
          console.log(error.text);
          setFormdata({
            loading: false,
            alertmessage: `${translations[lang].contact.failure}: ${error.text}`,
            variant: "danger",
            show: true,
          });
          document.getElementsByClassName("co_alert")[0].scrollIntoView();
        }
      );
  };

  const handleChange = (e) => {
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <HelmetProvider>
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{meta.title} | {translations[lang].contact.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">{translations[lang].contact.title}</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <Row className="sec_sp">
          <Col lg="12">
            <Alert
              //show={formData.show}
              variant={formData.variant}
              className={`rounded-0 co_alert ${
                formData.show ? "d-block" : "d-none"
              }`}
              onClose={() => setFormdata({ show: false })}
              dismissible
            >
              <p className="my-0">{formData.alertmessage}</p>
            </Alert>
          </Col>
          <Col lg="5" className="mb-5">
            <h3 className="color_sec py-4">{translations[lang].contact.getInTouch}</h3>
            <address>
              <strong>{translations[lang].contact.emailLabel}:</strong>{" "}
              <a href={`mailto:${contactConfig.YOUR_EMAIL}`}>
                {contactConfig.YOUR_EMAIL}
              </a>
              <br />
              <br />
              {contactConfig.hasOwnProperty("YOUR_FONE") ? (
                <p>
                  <strong>{translations[lang].contact.phone}:</strong> {contactConfig.YOUR_FONE}
                </p>
              ) : (
                ""
              )}
            </address>
            <p>{lang === 'en' && contactConfig.description_en ? contactConfig.description_en : contactConfig.description}</p>
          </Col>
          <Col lg="7" className="d-flex align-items-center">
            <form onSubmit={handleSubmit} className="contact__form w-100">
              <Row>
                <Col lg="6" className="form-group">
                  <input
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder={translations[lang].contact.name}
                    value={formData.name || ""}
                    type="text"
                    required
                    onChange={handleChange}
                  />
                </Col>
                <Col lg="6" className="form-group">
                  <input
                    className="form-control rounded-0"
                    id="email"
                    name="email"
                    placeholder={translations[lang].contact.email}
                    type="email"
                    value={formData.email || ""}
                    required
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <div className="form-group">
                <input
                  className="form-control rounded-0"
                  id="subject"
                  name="subject"
                  placeholder={lang === 'en' ? "Subject" : "Betreff"}
                  type="text"
                  value={formData.subject || ""}
                  onChange={handleChange}
                />
              </div>
              <textarea
                className="form-control rounded-0"
                id="message"
                name="message"
                placeholder={translations[lang].contact.message}
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <br />
              <Row>
                <Col lg="12" className="form-group">
                  <button className="btn ac_btn" type="submit">
                    {formData.loading ? translations[lang].contact.sending : translations[lang].contact.send}
                  </button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
      <div className={formData.loading ? "loading-bar" : "d-none"}></div>
    </HelmetProvider>
  );
};
