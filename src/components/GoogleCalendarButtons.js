import React from 'react';
import styles from '../App.module.css';

function buildGoogleCalUrl({ title, date, description }) {
  // Google Calendar expects YYYYMMDD format for all-day events
  const formattedDate = date.replace(/-/g, '');
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${formattedDate}/${formattedDate}&details=${encodeURIComponent(description)}`;
}

export default function GoogleCalendarButtons({ results }) {
  if (!results) return null;
  const events = [
    {
      label: "'Life in the UK' Test Study Start",
      title: "Start studying for 'Life in the UK' Test",
      date: results.lifeInUKStudyStart,
      description: "Recommended study start for 'Life in the UK' Test."
    },
    {
      label: 'Earliest ILR Application',
      title: 'Earliest ILR Application',
      date: results.earliestILRApplication,
      description: 'Earliest date to apply for Indefinite Leave to Remain.'
    },
    {
      label: 'ILR Qualifying Date',
      title: 'ILR Qualifying Date',
      date: results.ilrQualifyingDate,
      description: 'Date you complete the 5-year ILR qualifying period.'
    },
    {
      label: 'Earliest Citizenship Application',
      title: 'Earliest Citizenship Application',
      date: results.earliestCitizenship,
      description: 'Estimated date to apply for British Citizenship.'
    },
  ];
  // Use ISO format for passing to Google Calendar
  const rawDates = {
    lifeInUKStudyStart: results.lifeInUKStudyStartISO || results.lifeInUKStudyStart,
    earliestILRApplication: results.earliestILRApplicationISO || results.earliestILRApplication,
    ilrQualifyingDate: results.ilrQualifyingDateISO || results.ilrQualifyingDate,
    earliestCitizenship: results.earliestCitizenshipISO || results.earliestCitizenship
  };
  // Patch events with ISO dates if available
  events[0].date = results.lifeInUKStudyStartISO || results.lifeInUKStudyStart;
  events[1].date = results.earliestILRApplicationISO || results.earliestILRApplication;
  events[2].date = results.ilrQualifyingDateISO || results.ilrQualifyingDate;
  events[3].date = results.earliestCitizenshipISO || results.earliestCitizenship;

  return (
    <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div style={{ fontWeight: 500, color: '#444', marginBottom: '0.2rem' }}>
        Add to Google Calendar:
      </div>
      {events.map((event, idx) => (
        <a
          key={event.label}
          href={buildGoogleCalUrl(event)}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.icsButton}
          style={{ background: '#ea4335' }}
        >
          {event.label}
        </a>
      ))}
    </div>
  );
}
