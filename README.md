# Project Management System

This project consists of a Java Spring Boot backend and a React frontend. Follow the instructions below to start both servers for local development.

---

## Prerequisites
- Java 17 or higher
- Node.js (v14 or higher recommended) & npm
- (Optional) Maven or Gradle for backend build

---

## 1. Start the Backend Server (Spring Boot)

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Build and run the Spring Boot application:
   - If using Maven:
     ```bash
     ./mvnw spring-boot:run
     ```
   - Or, if you have Maven/Gradle installed globally:
     ```bash
     mvn spring-boot:run
     ```
3. The backend server will typically start at `http://localhost:8080`

---

## 2. Start the Frontend Server (React)

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
4. The frontend will typically start at `http://localhost:3000`

---

## 3. Access the Application
- Open your browser and go to `http://localhost:3000`
- The frontend will communicate with the backend at `http://localhost:8080`

---

## Notes
- Ensure both servers are running for full functionality.
- Update backend API URLs in the frontend if ports or hosts differ from the defaults.
- For production deployment, refer to respective build and deployment guides for Spring Boot and React.
