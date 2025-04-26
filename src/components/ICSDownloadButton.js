import React from 'react';
import styles from '../App.module.css';

function formatICSDate(dateStr) {
  // Convert YYYY-MM-DD to YYYYMMDD
  return dateStr.replace(/-/g, '');
}

function generateICS(results) {
  const events = [
    {
      summary: "Start studying for 'Life in the UK' Test",
      dtstart: formatICSDate(results.lifeInUKStudyStart),
      description: "Recommended study start for 'Life in the UK' Test."
    },
    {
      summary: 'Earliest ILR Application',
      dtstart: formatICSDate(results.earliestILRApplication),
      description: 'Earliest date to apply for Indefinite Leave to Remain.'
    },
    {
      summary: 'ILR Qualifying Date',
      dtstart: formatICSDate(results.ilrQualifyingDate),
      description: 'Date you complete the 5-year ILR qualifying period.'
    },
    {
      summary: 'Earliest Citizenship Application',
      dtstart: formatICSDate(results.earliestCitizenship),
      description: 'Estimated date to apply for British Citizenship.'
    },
  ];
  let ics = 'BEGIN:VCALENDAR\nVERSION:2.0\nCALSCALE:GREGORIAN\n';
  events.forEach(event => {
    ics += `BEGIN:VEVENT\nSUMMARY:${event.summary}\nDTSTART;VALUE=DATE:${event.dtstart}\nDESCRIPTION:${event.description}\nEND:VEVENT\n`;
  });
  ics += 'END:VCALENDAR';
  return ics;
}

export default function ICSDownloadButton({ results }) {
  const handleDownload = () => {
    const icsContent = generateICS(results);
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'uk-settlement-roadmap.ics';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
  };
  return (
    <button className={styles.icsButton} onClick={handleDownload}>
      Add Dates to Calendar (.ics)
    </button>
  );
}
