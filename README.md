# UK Settlement Roadmap Estimator

A simple, single-page web application to help UK Skilled Worker Visa holders estimate key dates for obtaining Indefinite Leave to Remain (ILR) and British Citizenship. Built with React.

## Features

- **Date Picker:** Enter your UK entry date on a Skilled Worker Visa.
- **Instant Calculation:** Key settlement milestones are calculated and shown as soon as a date is selected.
- **Milestone Cards:** See clear, labeled dates for:
  - Recommended 'Life in the UK' Test study start
  - Earliest ILR application date
  - ILR qualifying date
  - Earliest citizenship application date
- **Calendar Integration:**
  - Download all milestones as an `.ics` calendar file
  - Add any milestone directly to Google Calendar with a single click (calendar icon next to each date)
- **Disclaimer:** Clear notice that dates are estimates and not legal advice
- **Mobile-friendly:** Responsive, clean UI

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14+ recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/YOUR_GITHUB_USERNAME/uk-settlement-roadmap-estimator.git
   cd uk-settlement-roadmap-estimator
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage
1. Enter the date you first entered the UK on your Skilled Worker Visa.
2. Instantly view your personalized settlement roadmap.
3. Click the calendar icon next to any milestone to add it to Google Calendar, or download all milestones as an `.ics` file.

## Project Structure
- `src/` — React source code
  - `components/` — UI components (date input, results, calendar integrations)
  - `App.js` — Main logic and layout
  - `App.module.css` — Styles
- `public/` — Static assets and HTML template

## Disclaimer
**These dates are estimates based on current standard UKVI rules for the Skilled Worker route. They do not constitute immigration advice. Processing times and individual circumstances can vary. Always consult the official UKVI website and consider seeking professional advice for your specific situation.**

## License
MIT

---

*This project is not affiliated with UKVI or the UK government. For official information, visit [gov.uk](https://www.gov.uk/).*
