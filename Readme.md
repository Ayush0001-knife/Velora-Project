# Velora AI - Healthcare Management Platform

## Overview

Velora AI is a modern healthcare management platform designed to bridge the gap between patients and healthcare providers. The application features two distinct interfaces:

1. Doctor Interface : Allows healthcare professionals to manage patient records, view health metrics, and generate reports.
2. Patient Interface : Enables patients to view their health data, track progress, and communicate with healthcare providers.
   The platform leverages modern web technologies to provide a seamless, responsive user experience with intuitive visualizations of health data.

## Features

### Doctor Interface

- Patient Management :

  - View a sortable, searchable list of patients
  - Add new patients with comprehensive health information
  - View detailed patient profiles with health metrics
  - Track patient documents and reports

- Health Pillars Tracking :

  - Monitor nutrition, exercise, mental health, and other key health indicators
  - View progress through visual indicators and scores

- Document Management :

  - Upload and generate patient reports
  - Track document history and scores

### Patient Interface

- Health Dashboard :

  - View personalized health metrics across multiple pillars (Nutritional, Health, Mental, Exercise)
  - Track progress through visual indicators

- Quick Access :

  - View reports
  - Access personal data
  - Contact support

- Responsive Design :

  - Optimized for both desktop and mobile devices

## Technology Stack

- Frontend : React.js (v19.1.0)
- Styling : Tailwind CSS (v4.1.11)
- Animations : GSAP (GreenSock Animation Platform)
- Routing : React Router DOM (v7.6.3)
- State Management : React Redux (v9.2.0)
- Build Tool : Vite (v7.0.0)
- Icons : Remix Icon

## Project Structure

```
Frontend/
├── public/                # Static assets
│   ├── Logo.png           # Velora AI logo
│   └── Plus.png           # Add icon
├── src/
│   ├── Components-1/      # Reusable UI components
│   │   ├── AddPatient.jsx # Patient creation form
│   │   ├── DoctorNavbar.jsx # Navigation for 
doctor interface
│   │   ├── MoreDetails.jsx # Expandable patient 
details
│   │   ├── PatientFXN.jsx # Patient function 
wrapper
│   │   ├── PatientList.jsx # Patient listing 
component
│   │   └── PatientPage.jsx # Detailed patient view
│   ├── Pages/             # Main application pages
│   │   ├── DoctorPage.jsx # Doctor dashboard
│   │   └── PatientInterface.jsx # Patient 
dashboard
│   ├── App.jsx            # Main application 
component
│   ├── main.jsx           # Application entry 
point
│   └── index.css          # Global styles
└── package.json           # Project dependencies
```

## Key Components

### Doctor Interface

- DoctorNavbar : Navigation bar with pillars for patients, reports, prevention, and chat
- PatientList : Sortable table of patients with key metrics
- PatientPage : Detailed view of patient information with health metrics and documents
- AddPatient : Form for adding new patients with dynamic custom fields

### Patient Interface

- PatientInterface : Dashboard showing health pillars and quick access buttons

## Installation

1. Clone the repository
2. Navigate to the Frontend directory
3. Install dependencies:

```
npm install
```

4. Start the development server:

```
npm run dev
```

## Development

- Development Mode : npm run dev
- Build for Production : npm run build
- Preview Production Build : npm run preview
- Lint Code : npm run lint

## Dependencies

- React and React DOM (v19.1.0)
- React Router DOM (v7.6.3)
- GSAP and @gsap/react (v3.13.0, v2.1.2)
- Tailwind CSS (v4.1.11)
- Bootstrap (v5.3.7)
- React Redux (v9.2.0)
- Remix Icon (v4.6.0)
