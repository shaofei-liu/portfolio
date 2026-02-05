import React, { useState } from 'react';
import './RejectionLetters.css';

const RejectionLetters = ({ lang }) => {
  const [selectedLetter, setSelectedLetter] = useState(0);

  const letters = [
    {
      title: 'RWTH Aachen',
      from: 'Bettina Clever-Offermanns',
      content: `Sehr geehrter Herr Liu,

wir bedanken uns für Ihre Bewerbung und Ihr Interesse an einer Anstellung an unserem Institut.

Leider müssen wir Ihnen jedoch mitteilen, dass wir uns nicht für Sie entschieden haben.

Wir hoffen auf Ihr Verständnis dafür, dass bei mehreren qualifizierten Bewerbern oft nur Details ausschlaggebend sind und wir deshalb keine weiteren Angaben zu den Gründen machen können.

Für Ihren weiteren Berufs- und Lebensweg wünschen wir Ihnen alles Gute und weiterhin viel Erfolg.

Mit freundlichen Grüßen

Bettina Clever-Offermanns

Lehrstuhl fuer Medizinische Informationstechnik
Helmholtz-Institut fuer Biomedizinische Technik
RWTH Aachen
Pauwelsstr. 20, D-52074 Aachen
Tel.: +49 (0)241 80 -23211
clever-offermanns@hia.rwth-aachen.de`,
      icon: '🏛️'
    },
    {
      title: 'Technische Universität Berlin',
      from: 'Ewa Heinze',
      content: `Guten Tag,

wir danken Ihnen für Ihre Bewerbung auf die von uns unter der o.g. Kennziffer ausgeschriebene Stelle, müssen Ihnen jedoch zu unserem Bedauern mitteilen, dass die Entscheidung zur Besetzung der Stelle zugunsten einer anderen Bewerberin/eines anderen Bewerbers getroffen wurde.

Wir wünschen Ihnen für Ihre private und berufliche Zukunft alles Gute und viel Erfolg.

Viele Grüße

Ewa Heinze

Fachgebietsassistenz
sie/ihr – she/her

Technische Universität Berlin
Fakultät IV Elektrotechnik und Informatik
Institut für Energie- und Automatisierungstechnik
FG Elektronische Mess- und Diagnosetechnik
Einsteinufer 17, 10587 Berlin

Telefon: +49 (0)30 314-22280
ewa.heinze@tu-berlin.de

www.tu-berlin.de`,
      icon: '🎓'
    },
    {
      title: 'Volkswagen AG',
      from: 'Recruiting Team',
      content: `Hallo,

vielen Dank für Ihre Bewerbung. Ihr Profil und unsere Anforderungen für eine Stelle als "Doktorandin / Doktorand KI-gestützte E-Maschinenauslegung (w/m/d)" (Job ID: 17615) passen derzeit noch nicht perfekt zusammen. Daher können wir Ihre Bewerbung für den weiteren Bewerbungsprozess leider nicht berücksichtigen.

Wir möchten Sie aber ermutigen, sich wieder zu bewerben.
Informieren Sie sich gerne über weitere Stellenangebote. Aktuelle Positionen finden Sie hier in unserem Jobportal: JOBPORTAL

Viele Grüße
Ihr Recruiting Team
Volkswagen AG

Volkswagen Aktiengesellschaft | Sitz: Wolfsburg | Registergericht: Amtsgericht Braunschweig | HRB Nr.: 100484
Vorsitzender des Aufsichtsrats: Hans Dieter Pötsch | Vorstand: Oliver Blume (Vorsitzender), Arno Antlitz, Ralf Brandstätter, Gernot Döllner, Manfred Döss, Thomas Schäfer, Thomas Schmall-von Westerholt, Hauke Stars`,
      icon: '🚗'
    }
  ];

  return (
    <div className="rejection-letters-container">
      <div className="letter-selector">
        {letters.map((letter, idx) => (
          <button
            key={idx}
            className={`letter-button ${selectedLetter === idx ? 'active' : ''}`}
            onClick={() => setSelectedLetter(idx)}
          >
            <span className="letter-icon">{letter.icon}</span>
            <span className="letter-name">{letter.title}</span>
          </button>
        ))}
      </div>

      <div className="letter-content">
        <div className="letter-header">
          <h3>{letters[selectedLetter].title}</h3>
          <p className="letter-from">von {letters[selectedLetter].from}</p>
        </div>
        <div className="letter-text">
          {letters[selectedLetter].content.split('\n').map((line, idx) => (
            <p key={idx}>{line || <br />}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RejectionLetters;
