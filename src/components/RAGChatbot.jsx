import React, { useState, useRef, useEffect } from "react";
import "./RAGChatbot.css";

const RAG_CHATBOT_API = process.env.NODE_ENV === 'development'
  ? 'http://localhost:7860'
  : 'https://williamcass-rag-chatbot.hf.space';

// Cache buster for forced reload
const API_VERSION = '2.0.0';

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
      title: "RAG Chatbot - KI-gestütztes Frage-Antwort-System",
      placeholder: "Stellen Sie eine Frage zu Shaofeis Hintergrund, Fähigkeiten oder Erfahrung...",
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
    },
    en: {
      title: "RAG Chatbot - AI-powered Q&A System",
      placeholder: "Ask questions about Shaofei's background, skills, or professional experience...",
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
    },
  };

  const labels = t[language] || t.en;

  // Initialize session on mount and test connection
  useEffect(() => {
    const newSessionId = Math.random().toString(36).substring(7);
    setSessionId(newSessionId);
    
    // Test health check on mount
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      const pingUrl = process.env.NODE_ENV === 'development'
        ? 'http://localhost:7860/ping'
        : 'https://huggingface.co/spaces/WilliamCass/rag-chatbot/ping';
      
      console.log("🔍 Testing connection to:", pingUrl);
      
      const response = await fetch(pingUrl);
      if (response.ok) {
        const data = await response.json();
        console.log("✅ Chatbot API is reachable:", data);
      } else {
        console.warn("⚠️ Chatbot API returned status:", response.status);
      }
    } catch (err) {
      console.warn("⚠️ Chatbot API not reachable yet:", err.message);
      console.log("💡 The API is likely still starting. Please wait a moment and try again.");
    }
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
      // Use /api/chat with JSON payload for better cross-origin compatibility
      const apiUrl = `${RAG_CHATBOT_API}/api/chat`;
      console.log("📤 Sending request to:", apiUrl);

      const payload = {
        session_id: sessionId,
        message: userMessage,
        language: language === "de" ? "de" : "en",
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
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
        <div className={`rag-connection-status connected`}>
          <span className="rag-status-indicator"></span>
          {labels.connected}
        </div>
      </div>

      {/* Messages Area */}
      <div className="rag-messages-container">
        {messages.length === 0 && (
          <div className="rag-welcome-message">
            <p>🤖 {language === "de" ? "Willkommen!" : "Welcome!"}</p>
            <p style={{ fontSize: "14px", opacity: 0.7, marginTop: "8px" }}>
              {language === "de"
                ? "Stellen Sie Fragen zu Shaofei, und der Chatbot wird basierend auf seiner Erfahrung antworten."
                : "Ask questions about Shaofei, and the chatbot will answer based on his experience."}
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
