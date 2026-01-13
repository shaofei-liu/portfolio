import background from './assets/images/background.jpg';

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
    aboutme: "Ich bin ein Ingenieur mit starkem Hintergrund in Mechatronik und Robotik, spezialisiert auf datengetriebene Analyse, maschinelles Lernen und digitale Gesundheit. Ich habe umfangreiche Erfahrung in der Verarbeitung von Sensor- und medizinischen Daten sowie in der Entwicklung KI-basierter Modelle für Diagnose- und Assistenzsysteme. Mit starker Kompetenz in Modellierung, Algorithmik und Software-Engineering bin ich leidenschaftlich daran interessiert, intelligente Lösungen zu schaffen, die reale Auswirkungen haben. Ich habe einen Master of Science in Robotik, Kognition und Intelligenz von der Technischen Universität München und spreche fließend Chinesisch (Muttersprache), Deutsch (C1, TestDaF) und Englisch (C1, IELTS).",
};
const worktimeline = [{
        jobtitle: "Softwareentwickler",
        where: "The Pets Team GmbH & Co. KG, Grünwald, Deutschland",
        date: "03/2024 – 04/2025",
    },
    {
        jobtitle: "Praktikant im Bereich KI-Entwicklung",
        where: "Wisemed Medical Technology Co. Ltd, Peking, China",
        date: "03/2023 – 12/2023",
    },
    {
        jobtitle: "Praktikant im Bereich Algorithmusentwicklung",
        where: "Continental Automotive GmbH, Regensburg, Deutschland",
        date: "03/2019 – 09/2019",
    },
];

const education = [{
        degree: "Master of Science in Robotik, Kognition, Intelligenz",
        where: "Technische Universität München, Deutschland",
        date: "10/2019 – 03/2023",
        description: "Masterarbeit: RNNs with Independency Assumptions: Scalable and Efficient Sequence Learning",
    },
    {
        degree: "Bachelor of Engineering in Mechatronik/Feinwerktechnik",
        where: "Hochschule München, Deutschland",
        date: "10/2018 – 09/2019",
        description: "Sino-deutsches Doppelabschlussprogramm",
    },
    {
        degree: "Bachelor of Engineering in Mechatronik",
        where: "Tongji Universität, China",
        date: "09/2015 – 09/2019",
        description: "Bachelorarbeit: Entwicklung eines Algorithmus zur Hinderniserkennung mittels MIMO FMCW Radar",
    },
];

const skills = [{
        name: "Python (PyTorch)",
        value: 90,
    },
    {
        name: "C++",
        value: 85,
    },
    {
        name: "CUDA",
        value: 80,
    },
    {
        name: "Maschinelles Lernen",
        value: 90,
    },
    {
        name: "MATLAB/Simulink",
        value: 85,
    },
    {
        name: "AWS Cloud",
        value: 75,
    },
];

const services = [{
        title: "KI & Maschinelles Lernen",
        description: "Entwicklung und Evaluation datengetriebener Modelle für Diagnose- und Assistenzsysteme. Erfahrung in der Verarbeitung von Sensor- und medizinischen Daten mit Deep-Learning-Frameworks.",
    },
    {
        title: "Softwareentwicklung",
        description: "Entwicklung und Optimierung von Softwarearchitektur und Schnittstellen für Android-basierte Smart Devices mit OTA Update-Funktion. Konzeption und Integration KI-gesteuerter Anwendungen für automatisierte Inhaltserstellung.",
    },
    {
        title: "Algorithmusentwicklung",
        description: "Entwicklung von Hinderniserkennungsalgorithmen auf Basis von MIMO-FMCW-Radardaten. Durchführung von Systemintegration und Tests zur quantifizierbaren Steigerung der Erkennungsgenauigkeit.",
    },
];

const dataportfolio = [{
        id: "project1",
        img: "https://picsum.photos/400/?grayscale",
        description: "Portfolio-Projekt 1",
        link: "#",
        pdf: "/project1.pdf",
        projectUrl: "https://www.gia.rwth-aachen.de/cms/~zppfj/gia/",
    },
    {
        img: "https://picsum.photos/400/800/?grayscale",
        description: "Portfolio-Projekt 2",
        link: "#",
    },
    {
        img: "https://picsum.photos/400/?grayscale",
        description: "Portfolio-Projekt 3",
        link: "#",
    },
];

const contactConfig = {
    YOUR_EMAIL: "shaofei.liu.tum@gmail.com",
    YOUR_FONE: "+49 177-909-2448",
    description: "Ich bin offen für neue Möglichkeiten und Kooperationen. Kontaktieren Sie mich gerne, wenn Sie Projekte, Forschung oder potenzielle Zusammenarbeit in den Bereichen KI, maschinelles Lernen oder Robotik diskutieren möchten.",
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
export {
    meta,
    dataabout,
    dataportfolio,
    worktimeline,
    education,
    skills,
    services,
    introdata,
    contactConfig,
    socialprofils,
    logotext,
};