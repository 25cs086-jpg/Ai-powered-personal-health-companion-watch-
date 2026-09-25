# AI Health Companion Watch — Advanced GitHub Prototype

This is a static hackathon demonstration UI for an ESP32-based health and safety watch.

## Features
- Watch-style live dashboard
- Heart-rate and SpO2 demo values
- Fall detection simulation with 10-second "I'm OK" countdown
- Women's safety SOS mode
- Guardian WhatsApp and SMS actions
- Emergency dialer (`112`) action
- Browser location permission and Google Maps location text
- Trusted guardian contact saved in localStorage
- Event/safety log
- Responsive mobile design
- AI health insight panel

## Hardware concept
ESP32 + MPU6050 + MAX30102 + buzzer/vibration + emergency button.

## Important prototype note
GitHub Pages is static hosting. The website can demonstrate the emergency workflow and open the phone's dialer/messaging/share UI, but a real automatic SMS/WhatsApp/call from a hardware watch requires a backend/service or cellular communication module. Do not present the browser demo as a production emergency service.

## Deploy
Upload `index.html`, `style.css`, and `app.js` to the root of the GitHub Pages repository. GitHub Pages publishes static HTML/CSS/JavaScript sites from a repository.
