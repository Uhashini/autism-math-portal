# Autism Math Learning Portal 

> **Lab Evaluation 2 - Full Stack Web Development**  
> **Course Code:** 22CSE314  
> **Student:** N. Uhashini (CB.SC.U4CSE23352)

A specialized educational platform designed to make math learning accessible, engaging, and sensory-friendly for children with Autism Spectrum Disorder (ASD). This full-stack application combines gamified learning with behavioral skill development in a controlled, predictable environment.

---

##  Project Overview

Children with ASD often face challenges with abstract concepts, sensory overload, and fine motor skills. This portal addresses these needs through:
- **Visual Learning:** Converting abstract numbers into concrete visual items (pizzas, coins).
- **Sensory Regulation:** A "Calm Mode" to instantly reduce visual stimuli.
- **Holistic Education:** Integrating academic math skills with social behavioral training.

---

##  Key Features

### 1.  Snack Shop (Currency & Arithmetic)
- **Real-world Simulation:** Shop for items using visual currency.
- **Adaptive Difficulty:** Prices adjust based on user success rates.
- **Multi-Modal Input:** Use mouse clicks or keyboard number keys (1-6) to select coins.
- **Screen Capture:** Save "receipts" as digital rewards.

### 2.  Pizza Builder (Fractions)
- **Concrete-Representational-Abstract (CRA):** Learn fractions by visually building pizzas.
- **Ghost Outlines:** Visual cues to guide slice placement.
- **Keyboard Accessibility:** Keys 1-8 instantly map to slice counts for users with fine motor delays.

### 3.  Behavioral Skills (Social)
- **Interactive Tutorials:** Step-by-step guides for classroom skills like "Raise Hand" and "Stay Seated".
- **Practice Timer:** 45-second focused practice sessions with audio cues.
- **Quiz System:** Validates understanding of social rules.

### 4. Comprehensive Feedback System
- **Detailed Tracking:** Parents/Teachers can rate focus, emotional regulation, and social interaction (1-5 scale).
- **History Log:** View past feedback submissions to track progress over time.

### 5. Technical Highlights
- **Role-Based Profiles:** Dedicates profiles for Students and Member details.
- **Full-Stack Persistence:**
  - **Frontend:** React.js with Context API for state management.
  - **Backend:** Node.js & Express server.
  - **Database:** Local JSON file system (`db.json`) for portable, offline-capable data persistence.

---

##  Tech Stack

- **Frontend:** React.js, React Router, Lucide Icons, CSS3 (Variables & Animations)
- **Backend:** Node.js, Express.js
- **Data Store:** JSON File System (Low-latency, lightweight)
- **Deployment:** optimized for local lab environments.

---

##  Installation & Run Instructions

This project requires **Node.js** installed on your system.

### 1. Clone the Repository
```bash
git clone https://github.com/uhashini/autism-math-portal.git
cd autism-math-portal
```

### 2. Setup & Start Backend
The backend handles data saving. Open a terminal:
```bash
cd backend
npm install
node server.js
```
*Server will start on `http://localhost:5000`*

### 3. Setup & Start Frontend
Open a **new** terminal window:
```bash
cd frontend
npm install
npm start
```
*The application will open automatically at `http://localhost:3000`*

---


## 👩‍💻 Student Details

| Field | Detail |
| :--- | :--- |
| **Name** | N. Uhashini |
| **Roll Number** | CB.SC.U4CSE23352 |
| **Department** | Computer Science and Engineering |
| **Institution** | Amrita Vishwa Vidyapeetham, Coimbatore |

---

> **Note:** This project implements **multi-modal interaction strategies** (Keyboard + Mouse) and **CRA learning models** as part of the pedagogical research requirements for the course.
