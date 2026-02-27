import React, { useState, useRef, useEffect } from "react";
import "./RAGChatbot.css";

const RAG_CHATBOT_API = process.env.NODE_ENV === 'development'
  ? 'http://localhost:7860'
  : 'https://williamcass-rag-chatbot.hf.space';

// Cache buster for forced reload
const API_VERSION = '2.0.1';

export default function RAGChatbot() {
  const [language, setLanguage] = useState(localStorage.getItem("lang") || "de");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  const t = {
    de: {
      title: "💼 Shaofei's Portfolio",
      placeholder: "Ask me... / Frag mich...",
      send: "Senden",
      sending: "Wird gesendet...",
      connecting: "Verbindung wird hergestellt...",
      connected: "Verbunden",
      disconnected: "Getrennt",
      errorMessage: "Fehler bei der Verbindung zum Chatbot",
      language: "Sprache",
      english: "English",
      german: "Deutsch",
      clearChat: "Chat löschen",
      noConnection: "Konnte keine Verbindung zum Chatbot herstellen",
      welcomeTitle: "👋 Hallo! Ich bin Shaofeis KI-Assistent.",
      welcomeText: "Ich werde von fortschrittlichen KI-Modellen und Retrieval-Augmented Generation betrieben. Frag mich über Shaofeis Karriere, Ausbildung, technische Fähigkeiten und vielfältige Interessen!",
      welcomeExample: "Beispiel: Was hast Du studiert? Welche Sportarten magst Du?",
    },
    en: {
      title: "💼 Shaofei's Portfolio",
      placeholder: "Ask me... / Frag mich...",
      send: "Send",
      sending: "Sending...",
      connecting: "Connecting...",
      connected: "Connected",
      disconnected: "Disconnected",
      errorMessage: "Error connecting to chatbot",
      language: "Language",
      english: "English",
      german: "Deutsch",
      clearChat: "Clear Chat",
      noConnection: "Could not connect to chatbot",
      welcomeTitle: "👋 Hello! I'm Shaofei's AI Assistant.",
      welcomeText: "I'm powered by advanced AI models and Retrieval-Augmented Generation. Ask me about Shaofei's career, education, technical skills, and diverse interests!",
      welcomeExample: "Example: What did you study? What sports do you like?",
    },
  };

  const labels = t[language] || t.en;

  // Initialize session on mount
  useEffect(() => {
    const newSessionId = Math.random().toString(36).substring(7);
    setSessionId(newSessionId);
  }, []);

  const testConnection = async () => {
    // Test connection is no longer needed - errors will be handled when user sends a message
  };

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading || !sessionId) return;

    const userMessage = input.trim();
    setInput("");
    setLoading(true);
    setError(null);

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    try {
      // Use /chat with FormData (same as Project 1)
      const apiUrl = `${RAG_CHATBOT_API}/chat`;
      console.log("📤 Sending request to:", apiUrl);

      const formData = new FormData();
      formData.append("session_id", sessionId);
      formData.append("message", userMessage);
      formData.append("language", language === "de" ? "de" : "en");
      formData.append("use_streaming", "false");

      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      console.log("📨 Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ API Error:", response.status, errorText);
        throw new Error(
          `API Error ${response.status}: ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("✅ API Response:", data);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.assistant_message },
      ]);
    } catch (err) {
      console.error("❌ Error sending message:", err);
      let errorMsg = labels.errorMessage;
      
      if (err.message.includes("Failed to fetch")) {
        errorMsg = "❌ 无法连接到 Chatbot API - CORS 或网络问题";
      } else if (err.message.includes("JSON")) {
        errorMsg = "❌ API 返回了无效的 JSON 响应";
      } else {
        errorMsg = `❌ ${err.message}`;
      }
      
      setError(errorMsg);
      setMessages((prev) =>
        prev.slice(0, -1) // 移除发送失败的用户消息
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="rag-chatbot-container">
      {/* Header */}
      <div className="rag-chatbot-header">
        <div className="rag-header-content">
          <h3 className="rag-title">💬 {labels.title}</h3>
          <div className="rag-header-controls">
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="rag-language-select"
              aria-label={labels.language}
            >
              <option value="de">{labels.german}</option>
              <option value="en">{labels.english}</option>
            </select>
            <button onClick={clearChat} className="rag-clear-btn" title={labels.clearChat}>
              🗑️
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="rag-messages-container">
        {messages.length === 0 && (
          <div className="rag-welcome-message">
            <p style={{ fontSize: "20px", fontWeight: "600", marginBottom: "16px", fontFamily: '"Poppins", sans-serif' }}>
              {labels.welcomeTitle}
            </p>
            <p style={{ fontSize: "15px", lineHeight: "1.7", marginBottom: "16px", fontFamily: '"Poppins", sans-serif', color: "#e0e0e0" }}>
              {labels.welcomeText}
            </p>
            <p style={{ fontSize: "14px", color: "#a0a0a0", fontStyle: "italic", fontFamily: '"Poppins", sans-serif' }}>
              {labels.welcomeExample}
            </p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div key={idx} className={`rag-message rag-message-${msg.role}`}>
            <div className="rag-message-avatar">
              {msg.role === "user" ? "👤" : "🤖"}
            </div>
            <div className="rag-message-content">{msg.content}</div>
          </div>
        ))}

        {loading && (
          <div className="rag-message rag-message-assistant">
            <div className="rag-message-avatar">🤖</div>
            <div className="rag-message-content">
              <span className="rag-typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
          </div>
        )}

        {error && (
          <div className="rag-error-message">
            ⚠️ {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="rag-input-container">
        <div className="rag-input-wrapper">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={labels.placeholder}
            className="rag-input-field"
            disabled={loading || !sessionId}
            rows="2"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim() || !sessionId}
            className="rag-send-btn"
            title={labels.send}
          >
            {loading ? "⏳" : "📤"}
          </button>
        </div>
      </div>
    </div>
  );
}
