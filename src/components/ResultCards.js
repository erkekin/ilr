import React from 'react';
import styles from '../App.module.css';

function buildGoogleCalUrl({ title, date, description }) {
  // Google Calendar expects YYYYMMDD format for all-day events
  const formattedDate = date.replace(/-/g, '');
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${formattedDate}/${formattedDate}&details=${encodeURIComponent(description)}`;
}

export default function ResultCards({ results }) {
  if (!results) return null;
  const events = [
    {
      label: "Recommended: Start studying for 'Life in the UK' Test",
      title: "Start studying for 'Life in the UK' Test",
      date: results.lifeInUKStudyStartISO || results.lifeInUKStudyStart,
      display: results.lifeInUKStudyStart, // always long form from calculateRoadmap
      description: "Recommended study start for 'Life in the UK' Test."
    },
    {
      label: 'Earliest ILR Application Date',
      title: 'Earliest ILR Application',
      date: results.earliestILRApplicationISO || results.earliestILRApplication,
      display: results.earliestILRApplication, // always long form from calculateRoadmap
      description: 'Earliest date to apply for Indefinite Leave to Remain.'
    },
    {
      label: 'ILR Qualifying Date',
      title: 'ILR Qualifying Date',
      date: results.ilrQualifyingDateISO || results.ilrQualifyingDate,
      display: results.ilrQualifyingDate, // always long form from calculateRoadmap
      description: 'Date you complete the 5-year ILR qualifying period.'
    },
    {
      label: 'Earliest Citizenship Application Date',
      title: 'Earliest Citizenship Application',
      date: results.earliestCitizenshipISO || results.earliestCitizenship,
      display: results.earliestCitizenship, // always long form from calculateRoadmap
      description: 'Estimated date to apply for British Citizenship.'
    },
  ];
  // If for any reason display is in ISO format, convert to long form
  function ensureLongForm(dateStr) {
    // If already long form, return as is
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  return (
    <div className={styles.results}>
      {events.map(event => (
        <div className={styles.resultCard} key={event.label}>
          <div className={styles.resultLabel}>{event.label}</div>
          <div className={styles.resultDate}>{ensureLongForm(event.display)}</div>
          <button
            className={styles.calendarIconButton}
            title="Add to Google Calendar"
            aria-label="Add to Google Calendar"
            type="button"
            onClick={() => {
              const url = buildGoogleCalUrl(event);
              const win = window.open(url, '_blank', 'noopener,noreferrer');
              if (!win) {
                // Fallback for popup blockers
                const a = document.createElement('a');
                a.href = url;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              }
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="5" width="18" height="16" rx="3" fill="#ea4335"/>
              <rect x="3" y="8" width="18" height="13" rx="0" fill="#fff"/>
              <rect x="7" y="12" width="10" height="2" rx="1" fill="#ea4335"/>
              <rect x="7" y="16" width="6" height="2" rx="1" fill="#ea4335"/>
              <rect x="7" y="2" width="2" height="4" rx="1" fill="#ea4335"/>
              <rect x="15" y="2" width="2" height="4" rx="1" fill="#ea4335"/>
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
