# Intelligent Learning Difficulty Prediction System

A full-stack web application that analyzes student quiz behavior to identify weak topics and automatically recommend personalized study plans.

This system does **behavioral analytics (not machine learning)** using accuracy, response time, repeated mistakes, and inactivity patterns.

---

## Project Objective

Traditional learning platforms only show marks.

This system goes further:

It identifies **where and why a student struggles** and guides them on what to study next.

The platform:

* tracks quiz performance
* detects weak concepts
* computes difficulty score
* recommends revision plan
* sends reminder emails

---

## Key Features

### Student Features

* User registration and login (JWT authentication)
* Take MCQ quizzes
* Timer-based answering
* View weak topics
* Personalized study recommendations
* Performance analytics dashboard
* Difficulty score visualization (chart)
* Automated email study reminders

### Admin / Faculty Features

* Admin login (role-based access)
* Create courses, subjects, and topics
* Upload quiz questions
* Upload study materials
* View student learning analytics
* Identify weak students and weak topics

---

## Intelligence Logic (Core of the Project)

The system uses a **rule-based learning difficulty prediction algorithm**.

For each topic, it calculates:

* Wrong Answers
* Average Response Time
* Repeated Attempts
* Inactivity Days

### Difficulty Score Formula

```
DifficultyScore =
(wrong_answers × 3) +
(avg_time × 2) +
(repeated_attempts × 4) +
(inactivity_days × 1)
```

If the score crosses a threshold → Topic is marked **WEAK**.

Then the system recommends:

* revision material
* practice questions
* when to revise again

---

## Tech Stack

### Frontend

* React.js (Vite)
* Tailwind CSS
* Recharts (analytics charts)
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### Authentication

* JWT (role-based: Student, Admin)
* bcrypt password hashing

### Notifications

* Nodemailer email reminders
* node-cron scheduled jobs

---

## System Architecture

```
React Frontend
      ↓
Express REST API
      ↓
MongoDB Database
      ↓
Analytics Engine → Recommendation Engine → Email Reminder
```

---

## Folder Structure

```
intelligent-learning-backend
│   controllers
│   models
│   routes
│   middleware
│   services
│   server.js

intelligent-learning-frontend
│   src
│     pages
│     components
│     services
│   index.html
```

---

## How to Run the Project

### 1. Clone repository

```
git clone https://github.com/YOUR_USERNAME/intelligent-learning-difficulty-prediction.git
```

---

### 2. Backend Setup

```
cd intelligent-learning-backend
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_app_password
```

Run backend:

```
npm run dev
```

---

### 3. Frontend Setup

```
cd intelligent-learning-frontend
npm install
npm run dev
```

Open:

```
http://localhost:5173
```

---

## Example Workflow

1. Student logs in
2. Takes quiz
3. Attempts stored in database
4. System computes difficulty score
5. Weak topic detected
6. Dashboard shows analytics chart
7. Recommendation generated
8. Email reminder sent

---

## Future Improvements

* Adaptive quizzes based on performance
* AI-based study material recommendation
* Multi-subject analytics
* Leaderboard and gamification
* Mobile app integration

---

## Author

**Harsha Varthini S**
B.E Computer Science and Design Student

License

This project is developed for academic and learning purposes.