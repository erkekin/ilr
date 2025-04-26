import React from 'react';
import styles from '../App.module.css';

export default function DateInput({ value, onChange }) {
  return (
    <div className={styles.inputSection}>
      <label className={styles.dateLabel} htmlFor="entry-date">
        Your UK Entry Date on Skilled Worker Visa:
      </label>
      <input
        id="entry-date"
        className={styles.dateInput}
        type="date"
        value={value}
        onChange={onChange}
        max={new Date().toISOString().split('T')[0]}
      />
    </div>
  );
}
