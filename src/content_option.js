import background from './assets/images/background.jpg';
import dogBreedImg from './assets/images/dog-breed-recognition.png';
import chatbotImg from './assets/images/chatbot.jpg';
import officeImg from './assets/images/office.jpg';
import irevrnnImg from './assets/images/irevrnn.jpg';

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
    aboutme: "Ich bin ein Ingenieur mit starkem Hintergrund in Mechatronik und Robotik, spezialisiert auf datengetriebene Analyse, maschinelles Lernen und digitale Gesundheit. Ich habe umfangreiche Erfahrung in der Verarbeitung von Sensor- und medizinischen Daten sowie in der Entwicklung KI-basierter Modelle für Diagnose- und Assistenzsysteme. Mit starker Kompetenz in Modellierung, Algorithmik und Software-Engineering bin ich leidenschaftlich daran interessiert, intelligente Lösungen zu schaffen, die reale Auswirkungen haben. Ich habe einen Master of Science in Robotik, Kognition und Intelligenz von der Technischen Universität München und spreche fließend Chinesisch (Muttersprache), Deutsch (C1, TestDaF) und Englisch (C1, IELTS).",
    aboutme_en: "I am an engineer with a strong background in mechatronics and robotics, specializing in data-driven analysis, machine learning and digital health. I have experience processing sensor and medical data and developing AI-based models for diagnosis and assistance systems. With expertise in modeling, algorithms and software engineering, I am passionate about building intelligent solutions with real-world impact. I hold an MSc in Robotics, Cognition and Intelligence from TU Munich and speak fluent Chinese (native), German (C1) and English (C1).",
};
const worktimeline = [{
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
        img: background,
        description: "Rejection Letters - HR Application Records",
        description_en: "Rejection Letters - HR Application Records",
        link: "#",
        type: "personal",
    },
    {
        id: "project2",
        img: dogBreedImg,
        description: "Dog Breed Classifier - KI-gestützte Hunderassenidentifikation",
        description_en: "Dog Breed Classifier - AI-powered Dog Breed Identification",
        link: "#",
        type: "personal",
    },
    {
        id: "project3",
        img: chatbotImg,
        description: "RAG Chatbot - KI-gestütztes Frage-Antwort-System",
        description_en: "RAG Chatbot - AI-powered Q&A System",
        link: "#",
        type: "personal",
        projectUrl: "https://portfolio-chatbot-k2apv4mklaemkakzx6zyir.streamlit.app/?embedded=true",
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
        img: background,
        description: "Kooperationsprojekt 1",
        description_en: "Collaboration Project 1",
        link: "#",
        type: "collaboration",
    },
    {
        id: "project6",
        img: background,
        description: "Kooperationsprojekt 2",
        description_en: "Collaboration Project 2",
        link: "#",
        type: "collaboration",
    },
    {
        id: "project7",
        img: background,
        description: "Arbeitsprojekt",
        description_en: "Work Project",
        link: "#",
        type: "work",
    },
];

const contactConfig = {
    YOUR_EMAIL: "shaofei.liu.tum@gmail.com",
    YOUR_FONE: "+49 177-909-2448",
    description: "Ich bin offen für neue Möglichkeiten und Kooperationen. Kontaktieren Sie mich gerne, wenn Sie Projekte, Forschung oder potenzielle Zusammenarbeit in den Bereichen KI, maschinelles Lernen oder Robotik diskutieren möchten.",
    description_en: "I am open to new opportunities and collaborations. Feel free to contact me if you'd like to discuss projects, research or potential partnerships in AI, machine learning or robotics.",
    // To enable automatic email sending of comments, create an account at https://www.emailjs.com/
    // Then set YOUR_SERVICE_ID, YOUR_TEMPLATE_ID and YOUR_USER_ID below.
    // Example:
    // YOUR_SERVICE_ID: "service_xxx",
    // YOUR_TEMPLATE_ID: "template_xxx",
    // YOUR_USER_ID: "user_xxx",

    YOUR_SERVICE_ID: "service_id",
    YOUR_TEMPLATE_ID: "template_id",
    YOUR_USER_ID: "user_id",
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
        menu: { home: "Home", portfolio: "Portfolio", about: "About", contact: "Kontakt" },
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
    project4: {
        title_de: "RNNs with Independency Assumptions: Scalable and Efficient Sequence Learning",
        title_en: "RNNs with Independency Assumptions: Scalable and Efficient Sequence Learning",
        subtitle_de: "Masterarbeit an der Technischen Universität München",
        subtitle_en: "Master's Thesis at Technical University of Munich",
        description_de: "Eine Masterarbeit über RNNs mit Unabhängigkeitsannahmen, die Methoden zur Speichereffizienz und skalierbaren Sequenzverarbeitung mit GPU-Beschleunigung untersucht.",
        description_en: "A master's thesis on RNNs with independence assumptions, investigating methods for memory efficiency and scalable sequence processing with GPU acceleration.",
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