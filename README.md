🌸 Aurora – Women Safety & AI Support System

Aurora is a full-stack women safety and support web application developed as an academic project.
It focuses on complaint support, legal awareness, and mental health assistance using modern web technologies and AI-driven modules.

🎯 Project Purpose

The goal of Aurora is to:

Provide a safe platform for women to raise complaints

Educate users about women’s legal rights and actions

Offer emotional and mental health support through an AI therapist

✨ Core Features (Main Modules)
1️⃣ Complaint Support System (Email-Based)

A structured Complaint Form available on the frontend

Complaints are sent to the backend API

Backend processes the complaint and redirects it to the registered email

Ensures confidentiality, speed, and ease of reporting

📂 Frontend:
src/pages/ComplaintForm.jsx

📂 Backend:
backend/routes/complaint.py

2️⃣ LawBot – Women Rights & Legal Awareness AI

LawBot is an AI-powered legal awareness assistant

Helps women understand:

Their legal rights

Relevant acts and laws

What action to take in specific situations

Covers:

Domestic Violence laws

Sexual Harassment at Workplace Act

Cyber Crime laws

Women protection acts in India

📂 Frontend:
src/pages/LawBot.jsx

📂 Backend:
backend/lawbot.py

3️⃣ AI Therapist – Mental & Emotional Support

A conversational AI Therapist interface

Designed to provide:

Emotional support

Stress and anxiety relief

Encouragement and reassurance

Focuses on mental well-being and self-care

📂 Frontend:
src/pages/Therapist.jsx

📂 Backend:
backend/therapist.py

🛠️ Technology Stack
Frontend

React

Vite

JavaScript (ES6+)

CSS

Tailwind CSS

Backend

Python

FastAPI

SQLite Database

RESTful APIs

📁 Complete Project Structure
aurora/
│
├── backend/
│   ├── routes/
│   │   ├── __init__.py
│   │   └── complaint.py
│   │
│   ├── auth.py
│   ├── database.py
│   ├── lawbot.py
│   ├── therapist.py
│   ├── models.py
│   ├── schemas.py
│   ├── main.py
│   └── aurora.db
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AuthForm.jsx
│   │   ├── LoginForm.jsx
│   │   └── RegisterForm.jsx
│   │
│   ├── pages/
│   │   ├── Landing.jsx
│   │   ├── Dashboard.jsx
│   │   ├── AuthPage.jsx
│   │   ├── ComplaintForm.jsx
│   │   ├── LawBot.jsx
│   │   └── Therapist.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
│
├── public/
├── .env
├── package.json
├── vite.config.js
└── README.md

🚀 How to Run the Project
▶ Frontend
npm install
npm run dev


Runs on:

http://localhost:5173

▶ Backend
cd backend
uvicorn main:app --reload


Runs on:

http://localhost:8000

🎓 Academic Significance

Demonstrates full-stack development

Covers AI-assisted decision support

Shows server-side contribution

Focuses on real-world women safety problems

Suitable for:

Final Year Project

College Evaluation

Portfolio & GitHub Showcase

🔮 Future Enhancements

AI Avatar represnting therapist.

Emergency SOS integration

Voice-based AI interaction

Multilingual support

Secure complaint tracking dashboard

Mobile application version

👩‍💻 Developed By

Pranjali Rajguru
B.Sc. Computer Science
Final Year Project

📄 License

This project is developed for educational and awareness purposes.