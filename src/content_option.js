import background from './assets/images/background.png';
import dogBreedImg from './assets/images/dog-breed-classifier.png';
import chatbotImg from './assets/images/chatbot.jpg';
import voiceSynthesisImg from './assets/images/voice-synthesis.png';
import officeImg from './assets/images/office.jpg';
import irevrnnImg from './assets/images/irevrnn.jpg';
import museumImg from './assets/images/museum.png';
import museum1Img from './assets/images/museum-1.png';
import cookerImg from './assets/images/cooker.png';
import cooker1Img from './assets/images/cooker-1.png';
import digitalTwinImg from './assets/images/digital-twin.png';
import digitalTwin1Img from './assets/images/digital-twin-1.png';
import radarImg from './assets/images/radar.png';
import radar1Img from './assets/images/radar-1.png';

const logotext = "SHAOFEI";
const meta = {
    title: "Shaofei Liu",
    description: "Ich bin Shaofei Liu, Ingenieur mit Mechatronik- und Robotik-Hintergrund, spezialisiert auf datengetriebene Analyse, maschinelles Lernen und digitale Gesundheit. Derzeit tätig in München, Deutschland",
};

const introdata = {
    title: "Ich bin Shaofei Liu",
    animated: {
        first: "Ich entwickle KI-Modelle",
        second: "Ich baue Machine-Learning-Systeme",
        third: "Ich erstelle intelligente Lösungen",
    },
    description: "Ingenieur mit Mechatronik- und Robotik-Hintergrund, spezialisiert auf datengetriebene Analyse, maschinelles Lernen und digitale Gesundheit. Erfahrung in der Verarbeitung von Sensor- und medizinischen Daten sowie in der Entwicklung KI-basierter Modelle für Diagnose- und Assistenzsysteme.",
    your_img_url: background,
};

const dataabout = {
    title: "Über mich",
    title_en: "About me",
    aboutme: "KI-Ingenieur mit forschungsorientiertem Hintergrund in Robotik und Mechatronik. Fundierte Kenntnisse in Künstlicher Intelligenz, Sensorfusion und Signalverarbeitung mit Erfahrung in der Entwicklung und Simulation intelligenter Systeme im Bereich Radar, Embedded Systems und Robotik. Internationale Ausbildung (Deutschland/China) mit Fokus auf datengetriebene Methoden und modellbasierte Ansätze für adaptive technische Systeme. Spezialisiert auf die Entwicklung prototypischer Anwendungen zur Datenverarbeitung und Machine-Learning-Integration mit Python, PyTorch und C++. Ich schaffe intelligente Lösungen, die reale Auswirkungen haben.",
    aboutme_en: "AI Engineer with research-oriented background in robotics and mechatronics. Proficient in Artificial Intelligence, sensor fusion and signal processing with experience developing and simulating intelligent systems in radar, embedded systems and robotics. International education (Germany/China) with focus on data-driven methods and model-based approaches for adaptive technical systems. Specialized in developing prototypical applications for data processing and machine learning integration with Python, PyTorch and C++. I create intelligent solutions with real-world impact.",
};
const worktimeline = [{
        jobtitle: "KI-Softwareentwickler (projektbasiert)",
        jobtitle_en: "AI Software Developer (Project-based)",
        where: "München, Deutschland",
        where_en: "Munich, Germany",
        date: "05/2025 – heute",
    },
    {
        jobtitle: "Softwareentwickler",
        jobtitle_en: "Software Developer",
        where: "The Pets Team GmbH & Co. KG, Grünwald, Deutschland",
        where_en: "The Pets Team GmbH & Co. KG, Grünwald, Germany",
        date: "03/2024 – 04/2025",
    },
    {
        jobtitle: "Praktikant im Bereich KI-Entwicklung",
        jobtitle_en: "Intern - AI Development",
        where: "Wisemed Medical Technology Co. Ltd, Peking, China",
        where_en: "Wisemed Medical Technology Co. Ltd, Beijing, China",
        date: "03/2023 – 12/2023",
    },
    {
        jobtitle: "Praktikant im Bereich Algorithmusentwicklung",
        jobtitle_en: "Intern - Algorithm Development",
        where: "Continental Automotive GmbH, Regensburg, Deutschland",
        where_en: "Continental Automotive GmbH, Regensburg, Germany",
        date: "03/2019 – 09/2019",
    },
];

const education = [{
        degree: "Master of Science in Robotik, Kognition, Intelligenz",
        degree_en: "Master of Science in Robotics, Cognition and Intelligence",
        where: "Technische Universität München, Deutschland",
        where_en: "Technical University of Munich, Germany",
        date: "10/2019 – 03/2023",
        description: "Masterarbeit: RNNs with Independency Assumptions: Scalable and Efficient Sequence Learning",
        description_en: "Thesis: RNNs with Independency Assumptions: Scalable and Efficient Sequence Learning",
    },
    {
        degree: "Bachelor of Engineering in Mechatronik/Feinwerktechnik",
        degree_en: "Bachelor of Engineering in Mechatronics/Precision Engineering",
        where: "Hochschule München, Deutschland",
        where_en: "Munich University of Applied Sciences, Germany",
        date: "10/2018 – 09/2019",
        description: "Sino-deutsches Doppelabschlussprogramm",
        description_en: "Sino-German double degree program",
    },
    {
        degree: "Bachelor of Engineering in Mechatronik",
        degree_en: "Bachelor of Engineering in Mechatronics",
        where: "Tongji Universität, China",
        where_en: "Tongji University, China",
        date: "09/2015 – 09/2019",
        description: "Bachelorarbeit: Entwicklung eines Algorithmus zur Hinderniserkennung mittels MIMO FMCW Radar",
        description_en: "Thesis: Development of an obstacle detection algorithm using MIMO FMCW radar",
    },
];

const skills = [{
        name: "Python (PyTorch)",
        name_en: "Python (PyTorch)",
        value: 90,
    },
    {
        name: "C++",
        name_en: "C++",
        value: 85,
    },
    {
        name: "CUDA",
        name_en: "CUDA",
        value: 80,
    },
    {
        name: "Maschinelles Lernen",
        name_en: "Machine Learning",
        value: 90,
    },
    {
        name: "MATLAB/Simulink",
        name_en: "MATLAB/Simulink",
        value: 85,
    },
    {
        name: "AWS Cloud",
        name_en: "AWS Cloud",
        value: 75,
    },
];

const services = [{
        title: "KI & Maschinelles Lernen",
        title_en: "AI & Machine Learning",
        description: "Entwicklung und Evaluation datengetriebener Modelle für Diagnose- und Assistenzsysteme. Erfahrung in der Verarbeitung von Sensor- und medizinischen Daten mit Deep-Learning-Frameworks.",
        description_en: "Development and evaluation of data-driven models for diagnosis and assistance systems. Experience processing sensor and medical data with deep learning frameworks.",
    },
    {
        title: "Softwareentwicklung",
        title_en: "Software Development",
        description: "Entwicklung und Optimierung von Softwarearchitektur und Schnittstellen für Android-basierte Smart Devices mit OTA Update-Funktion. Konzeption und Integration KI-gesteuerter Anwendungen für automatisierte Inhaltserstellung.",
        description_en: "Development and optimization of software architecture and interfaces for Android-based smart devices with OTA update capability. Design and integration of AI-driven apps for automated content creation.",
    },
    {
        title: "Algorithmusentwicklung",
        title_en: "Algorithm Development",
        description: "Entwicklung von Hinderniserkennungsalgorithmen auf Basis von MIMO-FMCW-Radardaten. Durchführung von Systemintegration und Tests zur quantifizierbaren Steigerung der Erkennungsgenauigkeit.",
        description_en: "Development of obstacle detection algorithms based on MIMO-FMCW radar data. System integration and testing for measurable improvements in detection accuracy.",
    },
];

const dataportfolio = [
    // Personal Projects
    {
        id: "project1",
        img: voiceSynthesisImg,
        description: "Voice Synthesis - KI-gestützte Sprachsynthese mit Stimmenklonung",
        description_en: "Voice Synthesis - AI-powered Text-to-Speech with Voice Cloning",
        link: "#",
        type: "personal",
        projectUrl: "https://huggingface.co/spaces/WilliamCass/voice-synthesis?embedded=true",
    },
    {
        id: "project2",
        img: dogBreedImg,
        description: "Dog Breed Classifier - KI-gestützte Hunderassenidentifikation",
        description_en: "Dog Breed Classifier - AI-powered Dog Breed Identification",
        link: "#",
        type: "personal",
        projectUrl: "https://huggingface.co/spaces/WilliamCass/dog-breed-classifier?embedded=true",
    },
    {
        id: "project3",
        img: chatbotImg,
        description: "RAG Chatbot - KI-gestütztes Frage-Antwort-System",
        description_en: "RAG Chatbot - AI-powered Q&A System",
        link: "#",
        type: "personal",
        projectUrl: "https://williamcass-rag-chatbot.hf.space",
    },
    {
        id: "project4",
        img: irevrnnImg,
        description: "Masterarbeit: RNNs with Independency Assumptions - Scalable and Efficient Sequence Learning",
        description_en: "Master's Thesis: RNNs with Independency Assumptions - Scalable and Efficient Sequence Learning",
        link: "#",
        type: "personal",
        thesis: true,
    },
    
    // Collaborative and Work Projects
    {
        id: "project5",
        img: museumImg,
        description: "Museum Intelligence - KI-gestützte Optimierung von Ausstellungsanordnung und Besuchererlebnis",
        description_en: "Museum Intelligence - AI-powered Exhibit Placement and Visitor Experience Optimization",
        link: "#",
        type: "collaboration",
    },
    {
        id: "project6",
        img: cookerImg,
        description: "SmartCooker - KI-gestützte Haustier-Kochmaschine mit 20+ Funktionen",
        description_en: "SmartCooker - AI-powered Pet Food Cooking Machine with 20+ Functions",
        link: "#",
        type: "work",
    },
    {
        id: "project7",
        img: digitalTwinImg,
        description: "Digital Twin - KI-gestützte medizinische Diagnoseverfahren und Patientendatensystem",
        description_en: "Digital Twin - AI-powered Medical Diagnosis System and Patient Data Analytics",
        link: "#",
        type: "work",
    },
    {
        id: "project8",
        img: radarImg,
        description: "Radar Hinderniserkennung - MIMO FMCW Radar Algorithmusentwicklung",
        description_en: "Radar Obstacle Detection - MIMO FMCW Radar Algorithm Development",
        link: "#",
        type: "work",
    },
];

const contactConfig = {
    YOUR_EMAIL: "shaofei.liu@shaofeiliu.com",
    YOUR_FONE: "+49 177-909-2448",
    description: "Ich bin offen für neue Möglichkeiten und Kooperationen. Kontaktieren Sie mich gerne, wenn Sie Projekte, Forschung oder potenzielle Zusammenarbeit in den Bereichen KI, maschinelles Lernen oder Robotik diskutieren möchten.",
    description_en: "I am open to new opportunities and collaborations. Feel free to contact me if you'd like to discuss projects, research or potential partnerships in AI, machine learning or robotics.",
    // To enable automatic email sending of comments, create an account at https://www.emailjs.com/
    // Then set YOUR_SERVICE_ID, YOUR_TEMPLATE_ID and YOUR_USER_ID below.
    // Example:
    // YOUR_SERVICE_ID: "service_xxx",
    // YOUR_TEMPLATE_ID: "template_xxx",
    // YOUR_USER_ID: "user_xxx",

    YOUR_SERVICE_ID: "service_pkbdt9t",
    YOUR_TEMPLATE_ID: "template_90tycgn",
    YOUR_USER_ID: "nx_dt1XashdmUb5Or",
};

const socialprofils = {
    github: "https://github.com",
    facebook: "https://facebook.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
};

const translations = {
    en: {
        menu: { home: "Home", portfolio: "Portfolio", about: "About", contact: "Contact" },
        portfolio: { title: "Portfolio", viewProject: "View project" },
        projectView: {
            website: "Website",
            pdfOpen: "Open PDF",
            yourComments: "Your comments",
            placeholder: "Type your feedback here...",
            copy: "Copy",
            emailCreate: "Create email",
            copied: "Copied to clipboard",
            back: "Back",
            notFound: "Project not found.",
            noDetail: "No detail page for this project."
        },
        home: {
            portfolioBtn: "My Portfolio",
            aboutBtn: "About Me",
            contactBtn: "Contact Me",
            introTitle: "I'm Shaofei Liu",
            introDesc: "Engineer with background in mechatronics and robotics, specialized in data-driven analysis, machine learning and digital health. Experience in processing sensor and medical data and building AI models for diagnosis and assistance.",
            animated: {
                first: "I build AI models",
                second: "I build machine-learning systems",
                third: "I create intelligent solutions"
            }
        },
        about: {
            title: "About me",
            workTimeline: "Work Timeline",
            education: "Education",
            skills: "Skills",
            services: "Services"
        },
        contact: {
            title: "Contact Me",
            getInTouch: "Get in touch",
            name: "Name",
            email: "Email",
            message: "Message",
            send: "Send",
            sending: "Sending...",
            success: "SUCCESS! Thank you for your message",
            failure: "Failed to send",
            phone: "Phone",
            emailLabel: "Email"
        }
    },
    de: {
        menu: { home: "Home", portfolio: "Portfolio", about: "Über mich", contact: "Kontakt" },
        portfolio: { title: "Portfolio", viewProject: "Projekt ansehen" },
        projectView: {
            website: "Webseite",
            pdfOpen: "PDF öffnen",
            yourComments: "Ihre Anmerkungen",
            placeholder: "Schreiben Sie hier Ihre Änderungswünsche...",
            copy: "Kopieren",
            emailCreate: "E-Mail erstellen",
            copied: "In die Zwischenablage kopiert",
            back: "Zurück",
            notFound: "Projekt nicht gefunden.",
            noDetail: "Für dieses Projekt gibt es keine Detailseite."
        },
        home: {
            portfolioBtn: "Mein Portfolio",
            aboutBtn: "Über mich",
            contactBtn: "Kontakt",
            introTitle: introdata.title,
            introDesc: introdata.description,
            animated: {
                first: introdata.animated.first,
                second: introdata.animated.second,
                third: introdata.animated.third,
            }
        },
        about: {
            title: "Über mich",
            workTimeline: "Beruflicher Werdegang",
            education: "Bildung",
            skills: "Fähigkeiten",
            services: "Dienstleistungen"
        },
        contact: {
            title: "Kontakt",
            getInTouch: "Kontaktieren Sie mich",
            name: "Name",
            email: "E-Mail",
            message: "Nachricht",
            send: "Senden",
            sending: "Senden...",
            success: "ERFOLG! Vielen Dank für Ihre Nachricht",
            failure: "Senden fehlgeschlagen",
            phone: "Telefon",
            emailLabel: "E-Mail"
        }
    }
};

// Project-specific details for rendering
const projectDetails = {
    project1: {
        title_de: "Voice Synthesis - KI-gestützte Sprachsynthese mit Stimmenklonung",
        title_en: "Voice Synthesis - AI-powered Text-to-Speech with Voice Cloning",
        subtitle_de: "Eine fortschrittliche Text-zu-Sprache-Anwendung mit Zero-Shot-Stimmenklonung für natürliche mehresprachige Sprachsynthese mit benutzerdefinierter Stimmauswahl.",
        subtitle_en: "An advanced text-to-speech application with zero-shot voice cloning for natural multilingual speech synthesis with custom voice selection.",
        description_de: "",
        description_en: "",
        introduction_de: "Eine leistungsstarke Web-Anwendung zur natürlichen Text-zu-Sprache-Synthese mit erweiterbarer Stimmenklonung. Das System nutzt fortgeschrittene KI-Modelle zur Erzeugung hochwertiger synthetischer Sprachausgaben in mehreren Sprachen. Benutzer können vordefinierte Stimmsamples verwenden oder benutzerdefinierte Referenzaudios hochladen, um einzigartige, natürliche Stimmklone zu erstellen. Die kontinuierliche Textverarbeitung erzeugt flüssige, narrative Ausgaben ohne unnatürliche Pausen.",
        introduction_en: "A powerful web application for natural text-to-speech synthesis with extensible voice cloning capabilities. The system leverages advanced AI models to produce high-quality synthetic speech output in multiple languages. Users can either use predefined voice samples or upload custom reference audio files to create unique, natural voice clones. Continuous text processing generates fluid, narrative output without unnatural pauses.",
        keyFeatures_de: [
            "Zero-Shot Stimmenklonung mit fortgeschrittenen TTS-Modellen",
            "Multi-Language Unterstützung (Englisch, Deutsch und mehr)",
            "Vordefinierte Stimmsamples für schnelle Prototypisierung",
            "Benutzerdefinierte Referenzaudio-Upload für einzigartige Stimmklone",
            "Natürliche kontinuierliche Sprachsynthese mit flüssigen Übergängen",
            "REST API für Batch-Synthesierung und Integration",
            "Responsive Web-Interface mit Echtzeit-Audio-Preview"
        ],
        keyFeatures_en: [
            "Zero-shot voice cloning with advanced TTS models",
            "Multi-language support (English, German, and more)",
            "Predefined voice samples for quick prototyping",
            "Custom reference audio upload for unique voice clones",
            "Natural continuous speech synthesis with smooth transitions",
            "REST API for batch synthesis and integration",
            "Responsive web interface with real-time audio preview"
        ],
        codeFeatures_de: [
            "XTTS v2 Multilingual Speech Synthesis Engine (Coqui AI)",
            "FastAPI Backend mit asynchroner Verarbeitung",
            "librosa-basierte Audio-Preprocessing und Normalisierung",
            "FFmpeg Integration für flexible Audioformat-Konvertierung",
            "React Frontend mit responsiver Benutzeroberflächendesign",
            "Docker-Containerisierung für nahtlose Cloud-Bereitstellung",
            "Uvicorn ASGI Server für hochperformante Anfragen"
        ],
        codeFeatures_en: [
            "XTTS v2 multilingual speech synthesis engine (Coqui AI)",
            "FastAPI backend with asynchronous processing",
            "librosa-based audio preprocessing and normalization",
            "FFmpeg integration for flexible audio format conversion",
            "React frontend with responsive interface design",
            "Docker containerization for seamless cloud deployment",
            "Uvicorn ASGI server for high-performance request handling"
        ],
        ki_modell_de: "XTTS v2 (Zero-Shot Text-to-Speech Modell)",
        ki_modell_en: "XTTS v2 (Zero-Shot Text-to-Speech Model)",
        framework_de: "PyTorch 2.10+ + FastAPI 0.104.1",
        framework_en: "PyTorch 2.10+ + FastAPI 0.104.1",
        datensatz_de: "Multilingual Sprachsamples (Englisch, Deutsch, 8+ weitere Sprachen)",
        datensatz_en: "Multilingual voice samples (English, German, 8+ additional languages)",
        techStack_de: [
            "Python 3.11",
            "FastAPI 0.104.1",
            "PyTorch 2.10+",
            "Coqui TTS 0.22.0",
            "librosa 0.10.0",
            "soundfile 0.13.1"
        ],
        techStack_en: [
            "Python 3.11",
            "FastAPI 0.104.1",
            "PyTorch 2.10+",
            "Coqui TTS 0.22.0",
            "librosa 0.10.0",
            "soundfile 0.13.1"
        ],
        github: "https://github.com/shaofei-liu/voice-synthesis",
        projectUrl: "https://huggingface.co/spaces/WilliamCass/voice-synthesis",
        fileInfo: {
            pages: "",
            description: "Live-Demo auf HuggingFace Spaces verfügbar",
            description_en: "Live demo available on HuggingFace Spaces"
        }
    },
    project2: {
        title_de: "Dog Breed Classifier - KI-gestützte Hunderassenidentifikation",
        title_en: "Dog Breed Classifier - AI-powered Dog Breed Identification",
        subtitle_de: "Eine hochgenaue Deep-Learning-Anwendung zur automatischen Identifizierung und Klassifizierung von Hunderassen mit fortgeschrittenen CNN-Modellen und Echtzeit-Bildverarbeitung.",
        subtitle_en: "A highly accurate deep learning application for automated identification and classification of dog breeds using advanced CNN models and real-time image processing.",
        description_de: "",
        description_en: "",
        introduction_de: "Eine leistungsstarke Web-Anwendung zur automatischen Identifizierung von Hunderassen mittels State-of-the-art Deep-Learning-Modellen. Die Anwendung akzeptiert Bilder von Hunden und liefert genaue Rasse-Klassifikationen zusammen mit Konfidenzwerten und detaillierten Rasse-Informationen. Das System wurde mit einem großen Datensatz von Hunderassen trainiert und bietet eine benutzerfreundliche Schnittstelle für schnelle und zuverlässige Rassen-Identifikation.",
        introduction_en: "A powerful web application for automated dog breed identification using state-of-the-art deep learning models. The application accepts images of dogs and delivers accurate breed classifications along with confidence scores and detailed breed information. The system was trained on a large dataset of dog breeds and offers a user-friendly interface for quick and reliable breed identification.",
        keyFeatures_de: [
            "Hochgenaue Rassen-Klassifikation mit CNN-Modellen",
            "Unterstützung für 130+ Hunderassen",
            "Echtzeit-Bildverarbeitung mit sofortigen Ergebnissen",
            "Konfidenzwerte für Klassifikationssicherheit",
            "Detaillierte Rasse-Informationen und Charakteristiken",
            "URL-basierter und Datei-Upload-Unterstützung",
            "Responsive Mobile und Desktop-Oberfläche"
        ],
        keyFeatures_en: [
            "Highly accurate breed classification with CNN models",
            "Support for 130+ dog breeds",
            "Real-time image processing with instant results",
            "Confidence scores for classification certainty",
            "Detailed breed information and characteristics",
            "URL-based and file upload support",
            "Responsive mobile and desktop interface"
        ],
        codeFeatures_de: [
            "PyTorch-basierte pre-trained CNN Modelle (EfficientNet, ResNet)",
            "Effiziente Bildpre-Processing und Augmentation",
            "FastAPI REST API für flexible Integration",
            "Batch-Vorhersagen für skalierbare Verarbeitung",
            "Docker-Containerisierung für einfache Bereitstellung",
            "Streamlit Frontend für interaktive Benutzeroberfläche"
        ],
        codeFeatures_en: [
            "PyTorch-based pre-trained CNN models (EfficientNet, ResNet)",
            "Efficient image pre-processing and augmentation",
            "FastAPI REST API for flexible integration",
            "Batch predictions for scalable processing",
            "Docker containerization for easy deployment",
            "Streamlit frontend for interactive user interface"
        ],
        techStack_de: [
            "PyTorch 2.0+",
            "Python 3.9+",
            "Streamlit",
            "PIL/Pillow",
            "NumPy, Scikit-learning"
        ],
        techStack_en: [
            "PyTorch 2.0+",
            "Python 3.9+",
            "Streamlit",
            "PIL/Pillow",
            "NumPy, Scikit-learn"
        ],
        github: "https://github.com/shaofei-liu/dog-breed-classifier",
        projectUrl: "https://huggingface.co/spaces/WilliamCass/dog-breed-classifier",
        fileInfo: {
            pages: "",
            description: "Live-Demo auf HuggingFace Spaces verfügbar",
            description_en: "Live demo available on HuggingFace Spaces"
        }
    },
    project3: {
        title_de: "RAG Chatbot - KI-gestütztes Frage-Antwort-System",
        title_en: "RAG Chatbot - AI-powered Q&A System",
        subtitle_de: "Ein intelligentes Retrieval-Augmented-Generation (RAG) basiertes Chatbot-System, das präzise Antworten auf Fragen durch Kombination von semantischer Suche und großen Sprachmodellen liefert.",
        subtitle_en: "An intelligent Retrieval-Augmented-Generation (RAG) based chatbot system that delivers precise answers to questions by combining semantic search and large language models.",
        description_de: "",
        description_en: "",
        introduction_de: "Ein fortgeschrittenes RAG-Chatbot-System, das Benutzer-Fragen mit hochrelevanten Dokumenten verbindet und intelligente, kontextbewusste Antworten generiert. Das System nutzt moderne Embeddings und Sprachmodelle zur Verbesserung der Antwortqualität und Zuverlässigkeit. Die Architektur unterstützt mehrere Wissensquellen und bietet flexible Konfiguration für verschiedene Anwendungsfälle.",
        introduction_en: "An advanced RAG chatbot system that combines user questions with highly relevant documents and generates intelligent, context-aware answers. The system leverages modern embeddings and language models to improve answer quality and reliability. The architecture supports multiple knowledge sources and offers flexible configuration for various use cases.",
        keyFeatures_de: [
            "Retrieval-Augmented-Generation (RAG) Architektur",
            "Semantische Ähnlichkeitssuche auf großen Dokumentbeständen",
            "Large Language Model Integration für präzise Antwortgenerierung",
            "Multi-Source Wissensintegration",
            "Kontextbewusste Konversation mit Speicher",
            "Echtzeit-Streaming-Antworten",
            "Flexible Dokumenten-Management-Schnittstelle"
        ],
        keyFeatures_en: [
            "Retrieval-Augmented-Generation (RAG) architecture",
            "Semantic similarity search on large document collections",
            "Large language model integration for precise answer generation",
            "Multi-source knowledge integration",
            "Context-aware conversation with memory",
            "Real-time streaming responses",
            "Flexible document management interface"
        ],
        codeFeatures_de: [
            "Chroma Vector Database für hocheffiziente Embedding-Speicherung",
            "Google Gemini API Integration mit automatischem Fallback-System",
            "LangChain Framework für RAG-Pipeline-Orchestrierung (semantic search)",
            "FastAPI Backend mit WebSocket-Support für Echtzeit-Streaming",
            "HTML5/CSS3/JavaScript Frontend ohne Abhängigkeiten",
            "Professionelle Session-Verwaltung mit localStorage Persistence",
            "Multi-Language Support (EN, DE, ZH, FR, ES)",
            "Multi-Model Support (Flash Lite, Flash, Pro)"
        ],
        codeFeatures_en: [
            "Chroma vector database for highly efficient embedding storage",
            "Google Gemini API integration with automatic fallback system",
            "LangChain framework for RAG pipeline orchestration (semantic search)",
            "FastAPI backend with WebSocket support for real-time streaming",
            "HTML5/CSS3/JavaScript frontend without dependencies",
            "Professional session management with localStorage persistence",
            "Multi-language support (EN, DE, ZH, FR, ES)",
            "Multi-model support (Flash Lite, Flash, Pro)"
        ],
        techStack_de: [
            "FastAPI 0.104+",
            "Chroma Vector Database",
            "LangChain 0.2+",
            "Google Gemini API",
            "WebSocket (Real-time Streaming)",
            "Docker + HuggingFace Spaces",
            "Python 3.9+"
        ],
        techStack_en: [
            "FastAPI 0.104+",
            "Chroma Vector Database",
            "LangChain 0.2+",
            "Google Gemini API",
            "WebSocket (Real-time Streaming)",
            "Docker + HuggingFace Spaces",
            "Python 3.9+"
        ],
        projectUrl: "https://huggingface.co/spaces/WilliamCass/rag-chatbot?embedded=true",
        fileInfo: {
            pages: "",
            description: "Live-Demo auf HuggingFace Spaces mit FastAPI Backend",
            description_en: "Live demo on HuggingFace Spaces with FastAPI backend"
        }
    },
    project7: {
        title_de: "Digital Twin - KI-gestützte medizinische Diagnoseverfahren",
        title_en: "Digital Twin - AI-powered Medical Diagnosis and Healthcare Analytics",
        subtitle_de: "Ein fortgeschrittenes digitales Zwillings-System zur Analyse und Vorhersage krankheitsrelevanter Merkmale auf Basis von Patientendaten und medizinischen Bildern. Entwicklung und Evaluation von KI-gestützten Diagnosewerkzeugen mit Unterstützung für bildgeführte Klassifikationssysteme zur Verbesserung klinischer Entscheidungsprozesse.",
        subtitle_en: "An advanced digital twin system for analyzing and predicting disease-relevant characteristics based on patient data and medical imaging. Development and evaluation of AI-powered diagnostic tools with support for image-guided classification systems to enhance clinical decision-making processes.",
        description_de: "",
        description_en: "",
        introduction_de: "Aufbau und Evaluation von KI-gestützten Diagnosewerkzeugen zur umfassenden Analyse und Vorhersage krankheitsrelevanter Merkmale auf der Grundlage von Patientendaten und medizinischen Bildern. Aktive Mitarbeit bei bildgeführten Klassifikationssystemen zur Unterstützung klinischer Entscheidungsprozesse. Das System nutzt digitale Zwillings-Konzepte, um Patienten-Phänotypen zu modellieren und präzisere Diagnosen sowie Behandlungsempfehlungen zu ermöglichen.",
        introduction_en: "Development and evaluation of AI-powered diagnostic tools for comprehensive analysis and prediction of disease-relevant characteristics based on patient data and medical imaging. Active participation in image-guided classification systems to support clinical decision-making processes. The system leverages digital twin concepts to model patient phenotypes and enable more precise diagnoses and treatment recommendations.",
        keyFeatures_de: [
            "KI-gestützte Analyse von Patientendaten und medizinischen Bildern",
            "Bildgeführte Klassifikationssysteme für Diagnoseerkennung",
            "Digital Twin Modellierung für individuelle Patienten-Phänotypisierung",
            "Vorhersage krankheitsrelevanter Merkmale und Prognosen",
            "Integration mit klinischen Entscheidungsunterstützungssystemen"
        ],
        keyFeatures_en: [
            "AI-powered analysis of patient data and medical imaging",
            "Image-guided classification systems for diagnosis detection",
            "Digital twin modeling for personalized patient phenotyping",
            "Prediction of disease-relevant characteristics and prognoses",
            "Integration with clinical decision support systems"
        ],
        codeFeatures_de: [
            "Deep Learning Modelle für medizinische Bildanalyse (CNN, Transformer)",
            "Patient-Daten-Pipeline mit DICOM und strukturierten EHR-Daten",
            "Multi-modale Fusion von Bildgebung und klinischen Daten",
            "Explainbare KI Methoden für klinische Akzeptanz",
            "Robuste Validierung und klinische Evaluationsprotokolle"
        ],
        codeFeatures_en: [
            "Deep learning models for medical image analysis (CNN, Transformer)",
            "Patient data pipeline with DICOM and structured EHR data",
            "Multi-modal fusion of imaging and clinical data",
            "Explainable AI methods for clinical acceptance",
            "Robust validation and clinical evaluation protocols"
        ],
        internalImg: digitalTwin1Img,
        fileInfo: {
            pages: "",
            description: "Technische Details aufgrund der Zusammenarbeit mit Partnern nicht verfügbar",
            description_en: "Technical details not available due to collaborative partnership"
        }
    },
    project6: {
        title_de: "SmartCooker - KI-gestützte Haustier-Kochmaschine",
        title_en: "SmartCooker - AI-powered Pet Food Cooking Machine",
        subtitle_de: "Eine spezialisierte Kochmaschine für hochwertige Haustierfutterproduktion mit über 20 intelligenten Funktionen wie Heizen, Rühren, Zerkleinern, Wiegen und Kneten – ähnlich wie der Vorwerk Thermomix. Kooperativ entwickelt mit fortgeschrittener Benutzeroberflächensoftware und OTA-Update-Funktionalität.",
        subtitle_en: "A specialized cooking machine for premium pet food production with over 20 intelligent functions including heating, stirring, chopping, weighing, and kneading – comparable to Vorwerk Thermomix. Co-developed with advanced user interface software and OTA update functionality.",
        description_de: "",
        description_en: "",
        introduction_de: "Eine spezialisierte Kochmaschine, die speziell für die Herstellung von hochwertigem Haustierfutter entwickelt wurde. Mit über 20 Funktionen wie Heizen, Rühren, Zerkleinern, Wiegen und Kneten sowie vielen mehr bietet diese Maschine vergleichbare Funktionalität zum Vorwerk Thermomix, aber optimiert für Haustierfutter. Ich habe an der Entwicklung der Benutzeroberflächensoftware und der OTA-Update-Funktionalität mitgearbeitet, um eine nahtlose und sichere Produkterfahrung zu gewährleisten.",
        introduction_en: "A specialized cooking machine designed specifically for producing high-quality pet food. With over 20 functions including heating, stirring, chopping, weighing, and kneading, plus many more, this machine offers comparable functionality to the Vorwerk Thermomix but optimized for pet food production. I collaborated on developing the user interface software and OTA update functionality to ensure a seamless and secure product experience.",
        keyFeatures_de: [
            "Über 20 intelligente Funktionen für flexible Rezepte",
            "Benutzerfreundliche mobile und Web-Oberfläche",
            "OTA-Update-Funktionalität für kontinuierliche Verbesserungen",
            "Sichere IoT-Kommunikation für Geräteverwaltung",
            "Erweiterte Sensoren für präzise Kontrolle"
        ],
        keyFeatures_en: [
            "Over 20 intelligent functions for flexible recipes",
            "User-friendly mobile and web interface",
            "OTA update functionality for continuous improvements",
            "Secure IoT communication for device management",
            "Advanced sensors for precise control"
        ],
        codeFeatures_de: [
            "Responsive UI mit React für iOS/Android Anwendungen",
            "Cloud-basierte OTA-Update-Verwaltung und Versionskontrolle",
            "Echtzeit-Gerätesteuerung und Datenerfassung",
            "Sichere Authentifizierung und verschlüsselte Kommunikation",
            "Benutzerfreundliche Rezeptverwaltung und Erfolgsloggen"
        ],
        codeFeatures_en: [
            "Responsive UI with React for iOS/Android applications",
            "Cloud-based OTA update management and version control",
            "Real-time device control and data collection",
            "Secure authentication and encrypted communication",
            "User-friendly recipe management and success logging"
        ],
        internalImg: cooker1Img,
        fileInfo: {
            pages: "",
            description: "Technische Details aufgrund der Zusammenarbeit mit Partnern nicht verfügbar",
            description_en: "Technical details not available due to collaborative partnership"
        }
    },
    project5: {
        title_de: "Museum Intelligence - KI-gestützte Optimierung von Ausstellungsanordnung und Besuchererlebnis",
        title_en: "Museum Intelligence - AI-powered Exhibit Placement and Visitor Experience Optimization",
        subtitle_de: "Ein kooperatives KI-System, das durch Aggregation von Besucherwegdaten aus verschiedenen Museen und Verständnis der Architekturstruktur die optimale Platzierung von Ausstellungsstücken bestimmt und personalisierte Besucherwege vorschlägt, um narratives Erlebnis wie in einem Roman zu schaffen – mit Einleitung, Entwicklung, Höhepunkt und Auflösung. Beschädigte Artefakte können auch virtuell durch spezialisierte VR-Brillen betrachtet werden, um sie in ihrem ursprünglichen makellosen Zustand zu sehen.",
        subtitle_en: "A collaborative AI system that aggregates visitor path data from multiple museums and understands architectural structure to determine optimal placement of exhibits and suggest personalized visitor routes to create a novel-like narrative experience with introduction, development, climax, and resolution. Damaged artifacts can also be viewed in pristine condition through specialized VR glasses provided by the museum.",
        description_de: "",
        description_en: "",
        introduction_de: "Die besten Ausstellungsstücke an der prominentesten Stelle zu platzieren, ist nicht immer die beste Idee. Durch die Aggregation von Besucherwegdaten aus verschiedenen Museen und das Verständnis der Architekturstruktur optimieren Deep-Learning-Modelle die Platzierung von Artefakten und empfehlen optimale Besucherwege, um ein narratives Erlebnis zu schaffen – Einleitung, Entwicklung, Höhepunkt und Auflösung – ähnlich wie in einem Roman. Beschädigte Artefakte können auch virtuell durch spezialisierte VR-Brillen, die vom Museum bereitgestellt werden, restauriert werden, sodass Besucher die Stücke in ihrem ursprünglichen makellosen Zustand betrachten können.",
        introduction_en: "Placing the best exhibits in the most prominent location is not always the best idea. By aggregating visitor path data from various museums and understanding the building's architectural structure, deep learning models optimize artifact placement and recommend optimal visitor routes to create a narrative experience—introduction, development, climax, and resolution—much like a novel. Damaged artifacts can also be viewed in pristine condition through specialized VR glasses provided by the museum, allowing visitors to observe pieces in their original condition.",
        keyFeatures_de: [
            "Deep Learning basierte Optimierung der Ausstellungsanordnung",
            "Analyse und Aggregation von Besucherwegdaten",
            "Architekturgerechte Wegplanung für optimale Narrative",
            "Beschädigte Artefakte können in ihrem ursprünglichen Zustand durch VR-Brillen betrachtet werden"
        ],
        keyFeatures_en: [
            "Deep learning-based optimization of exhibit placement",
            "Analysis and aggregation of visitor path data",
            "Architecture-aware navigation planning for optimal narratives",
            "Damaged artifacts can be viewed in their pristine condition through VR glasses"
        ],
        codeFeatures_de: [
            "Pfadanalyse-Engine für Besucherdatensätze",
            "Deep Learning Modell für optimale Kunstwerk-Platzierung",
            "3D-Rekonstruktion und VR-Visualisierung",
            "Multi-Museen-Daten-Pipeline",
            "Interaktive Besuchererlebnis-Konfigurator"
        ],
        codeFeatures_en: [
            "Path analysis engine for visitor datasets",
            "Deep learning model for optimal artifact placement",
            "3D reconstruction and VR visualization",
            "Multi-museum data pipeline",
            "Interactive visitor experience configurator"
        ],
        internalImg: museum1Img,
        fileInfo: {
            pages: "",
            description: "Technische Details aufgrund der Zusammenarbeit mit Partnern nicht verfügbar",
            description_en: "Technical details not available due to collaborative partnership"
        }
    },
    project4: {
        title_de: "RNNs with Independency Assumptions: Scalable and Efficient Sequence Learning",
        title_en: "RNNs with Independency Assumptions: Scalable and Efficient Sequence Learning",
        subtitle_de: "Masterarbeit an der Technischen Universität München",
        subtitle_en: "Master's Thesis at Technical University of Munich",
        description_de: "Eine Masterarbeit über RNNs mit Unabhängigkeitsannahmen, die Methoden zur Speichereffizienz und skalierbaren Sequenzverarbeitung mit GPU-Beschleunigung untersucht. Das Original-Manuskript der Masterarbeit kann auf Anfrage bereitgestellt werden. Zusätzlich folgt ein unveröffentlichtes Beispiel einer Konferenzpapier.",
        description_en: "A master's thesis on RNNs with independence assumptions, investigating methods for memory efficiency and scalable sequence processing with GPU acceleration. The original master's thesis manuscript can be provided upon request. Additionally, an unpublished sample conference paper is available below.",
        keyFeatures_de: [
            "Unabhängigkeitsannahmen in RNN-Architekturen zur Speichereffizienz",
            "Theorie und Implementierung reversibler RNN-Schichten",
            "CUDA-optimierte Implementierung für GPU-Beschleunigung",
            "Evaluierung auf Sequenzklassifizierungsaufgaben",
            "Skalierbar für tiefe Netzwerke mit reduzierten Speicheranforderungen"
        ],
        keyFeatures_en: [
            "Independence assumptions in RNN architectures for memory efficiency",
            "Theory and implementation of reversible RNN layers",
            "CUDA-optimized implementation for GPU acceleration",
            "Evaluation on sequence classification tasks",
            "Scalable for deep networks with reduced memory requirements"
        ],
        techStack_de: [
            "Python 3.7+",
            "PyTorch 1.9+",
            "CUDA C++ (GPU-Beschleunigung)",
            "NumPy, Matplotlib, TensorBoard"
        ],
        techStack_en: [
            "Python 3.7+",
            "PyTorch 1.9+",
            "CUDA C++ (GPU acceleration)",
            "NumPy, Matplotlib, TensorBoard"
        ],
        codeFeatures_de: [
            "irevrnn.py: Kernimplementierung mit Forward/Backward-Pässen",
            "irevrnn_cuda_kernel.cu: CUDA-Kernels für GPU-beschleunigte Operationen",
            "irevrnn_mnist_action_model.py: Modellarchitekturen für Experimente",
            "action_main.py: Komplettes Training und Evaluierungs-Pipeline",
            "Hybride Python/C++/CUDA-Implementierung für maximale Performance"
        ],
        codeFeatures_en: [
            "irevrnn.py: Core implementation with forward/backward passes",
            "irevrnn_cuda_kernel.cu: CUDA kernels for GPU-accelerated operations",
            "irevrnn_mnist_action_model.py: Model architectures for experiments",
            "action_main.py: Complete training and evaluation pipeline",
            "Hybrid Python/C++/CUDA implementation for maximum performance"
        ],
        github: "https://github.com/shaofei-liu/irevrnn",
        paperUrl: "/irevrnn_paper.pdf",
        fileInfo: {
            pages: "76",
            lines_python: "2000+",
            lines_cuda: "500+",
            models_trained: "3",
            datasets: "Action Recognition, MNIST"
        }
    },
    project8: {
        title_de: "Radar Hinderniserkennung - MIMO FMCW Radar Algorithmenentwicklung",
        title_en: "Radar Obstacle Detection - MIMO FMCW Radar Algorithm Development",
        subtitle_de: "Algorithmenentwicklung für Hinderniserkennung und Klassifikation basierend auf MIMO-FMCW-Radardaten. Fokus auf Signal- und Bildverarbeitung zur Verbesserung der Erkennungsgenauigkeit und Robustheit unter verschiedenen Umgebungsbedingungen. Entwicklung einer umfassenden Erkennungspipeline von der Rohdatenverarbeitung bis zur Zielklassifikation mit Optimierung für Echtzeit-Systeme.",
        subtitle_en: "Algorithm development for obstacle detection and classification based on MIMO-FMCW radar data. Focus on signal and image processing to improve detection accuracy and robustness under various environmental conditions. Development of a comprehensive detection pipeline from raw data processing to target classification with optimization for real-time system applications.",
        description_de: "",
        description_en: "",
        introduction_de: "Aufbau und Evaluation von Hinderniserkennungsalgorithmen zur umfassenden Analyse von MIMO-FMCW-Radardaten und Vorhersage von Zielen in komplexen Umgebungen. Aktive Mitarbeit bei der Entwicklung bildgeführter Erkennungssysteme zur Unterstützung automatisierter Erkennungsanwendungen. Das System nutzt fortgeschrittene Signal- und Bildverarbeitungstechniken, um robuste Hinderniserkennung unter verschiedenen Umgebungsbedingungen zu ermöglichen und präzise Zielklassifikation sowie Vorhersagen zu liefern.",
        introduction_en: "Development and evaluation of obstacle detection algorithms for comprehensive analysis of MIMO-FMCW radar data and prediction of targets in complex environments. Active participation in the development of image-guided detection systems to support automated detection applications. The system leverages advanced signal and image processing techniques to enable robust obstacle detection under various environmental conditions and provide precise target classification and predictions.",
        keyFeatures_de: [
            "MIMO-FMCW Radar Signalverarbeitung und Multi-dimensionale Datenerfassung",
            "Robuste Hinderniserkennung und Klassifikation in komplexen Szenarien",
            "Adaptive Algorithmen für verschiedene Umgebungsbedingungen und Wetterverhältnisse",
            "Echtzeit-Verarbeitung und Optimierung für System-Integration",
            "Quantifizierbare Steigerung der Erkennungsgenauigkeit und Reduktion von Fehlalarm-Raten"
        ],
        keyFeatures_en: [
            "MIMO-FMCW radar signal processing and multi-dimensional data acquisition",
            "Robust obstacle detection and classification in complex scenarios",
            "Adaptive algorithms for various environmental conditions and weather",
            "Real-time processing and optimization for system integration",
            "Measurable improvement in detection accuracy and false alarm reduction"
        ],
        codeFeatures_de: [
            "MATLAB/Python Signalverarbeitung für Radar-Rohdaten und spektrale Analyse",
            "FFT, Clutter-Unterdrückung und Signal-Reinigung Algorithmen",
            "2D-Detektion, Zieltracking und Klassifikation Methoden",
            "Integration mit Kontrollsystemen und Sicherheits-Pipelines",
            "Validierungs- und Test-Frameworks für robuste Evaluation"
        ],
        codeFeatures_en: [
            "MATLAB/Python signal processing for radar raw data and spectral analysis",
            "FFT, clutter suppression and signal cleaning algorithms",
            "2D detection, target tracking and classification methods",
            "Integration with control systems and safety pipelines",
            "Validation and test frameworks for robust evaluation"
        ],
        internalImg: radar1Img,
        fileInfo: {
            pages: "",
            description: "Technische Details aufgrund der Zusammenarbeit nicht verfügbar",
            description_en: "Technical details not available due to partnership"
        }
    }
};

export {
    meta,
    dataabout,
    dataportfolio,
    projectDetails,
    worktimeline,
    education,
    skills,
    services,
    introdata,
    contactConfig,
    socialprofils,
    translations,
    logotext,
};