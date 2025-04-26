import React, { useState } from 'react';
import styles from './App.module.css';
import DateInput from './components/DateInput';
import ResultCards from './components/ResultCards';
import ICSDownloadButton from './components/ICSDownloadButton';

// Helper to format dates as e.g. 24 April 2025
function formatDisplayDate(date) {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
}

function calculateRoadmap(entryDateStr) {
  const entryDate = new Date(entryDateStr);
  // ILR Qualifying Date: 5 years after entry
  const ilrQualifying = new Date(entryDate);
  ilrQualifying.setFullYear(ilrQualifying.getFullYear() + 5);
  // Earliest ILR Application: 28 days before 5 years
  const earliestILR = new Date(ilrQualifying);
  earliestILR.setDate(earliestILR.getDate() - 28);
  // Life in UK study start: 5-6 months before ILR eligibility (pick 5.5 months)
  const lifeInUKStudy = new Date(earliestILR);
  lifeInUKStudy.setMonth(lifeInUKStudy.getMonth() - 5);
  lifeInUKStudy.setDate(lifeInUKStudy.getDate() - 15); // approx half month
  // Earliest Citizenship: 1 year after ILR qualifying
  const earliestCitizenship = new Date(ilrQualifying);
  earliestCitizenship.setFullYear(earliestCitizenship.getFullYear() + 1);
  return {
    lifeInUKStudyStart: formatDisplayDate(lifeInUKStudy),
    earliestILRApplication: formatDisplayDate(earliestILR),
    ilrQualifyingDate: formatDisplayDate(ilrQualifying),
    earliestCitizenship: formatDisplayDate(earliestCitizenship),
    // For ICS
    _ics: {
      lifeInUKStudyStart: lifeInUKStudy.toISOString().slice(0,10),
      earliestILRApplication: earliestILR.toISOString().slice(0,10),
      ilrQualifyingDate: ilrQualifying.toISOString().slice(0,10),
      earliestCitizenship: earliestCitizenship.toISOString().slice(0,10)
    }
  };
}

function App() {
  const [entryDate, setEntryDate] = useState('');
  const [results, setResults] = useState(null);

  const handleDateChange = (e) => {
    const value = e.target.value;
    setEntryDate(value);
    if (value) {
      const roadmap = calculateRoadmap(value);
      setResults({
        lifeInUKStudyStart: roadmap.lifeInUKStudyStart,
        earliestILRApplication: roadmap.earliestILRApplication,
        ilrQualifyingDate: roadmap.ilrQualifyingDate,
        earliestCitizenship: roadmap.earliestCitizenship,
        // Pass raw ISO dates for ICS/Google
        ...roadmap._ics
      });
    } else {
      setResults(null);
    }
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.title}>UK Settlement Roadmap Estimator</div>
      <div className={styles.instructions}>
        Enter the date you first entered the UK on your Skilled Worker Visa to estimate your path to settlement.
      </div>
      <DateInput value={entryDate} onChange={handleDateChange} />
      {results && (
        <>
          <ResultCards results={results} />
          <ICSDownloadButton results={results} />
        </>
      )}
      <div className={styles.disclaimer}>
        <strong>Disclaimer:</strong> These dates are estimates based on current standard UKVI rules for the Skilled Worker route. They do not constitute immigration advice. Processing times and individual circumstances can vary. Always consult the official UKVI website and consider seeking professional advice for your specific situation.
      </div>
    </div>
  );
}

export default App;
