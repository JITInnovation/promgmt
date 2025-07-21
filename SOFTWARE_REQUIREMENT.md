# Software Requirements Specification (SRS)

## 1. Introduction

### 1.1 Purpose
This document details the software requirements for the Project Management System, as described in the Product Requirements Document (PRODUCT_REQUIREMENT.md) and implemented in the codebase. It is intended for developers, testers, and stakeholders to ensure a shared understanding of the system's expected behavior.

### 1.2 Scope
The system is a web-based project management tool supporting user authentication, project management, resource allocation, and timesheet tracking for organizations.

### 1.3 Definitions, Acronyms, and Abbreviations
- **Admin**: System administrator
- **Manager**: Project manager
- **Developer**: Project team member
- **API**: Application Programming Interface

---

## 2. Overall Description

### 2.1 Product Perspective
The system is a client-server web application with a React frontend and a Java Spring Boot backend. It uses RESTful APIs for communication.

### 2.2 User Classes and Characteristics
- **Admin**: Manages users and system settings
- **Manager**: Manages projects, allocates resources, reviews timesheets
- **Developer**: Views assigned projects, submits timesheets

### 2.3 Operating Environment
- Frontend: React (JavaScript)
- Backend: Java Spring Boot
- Database: (inferred, not specified)
- Runs on modern web browsers

---

## 3. Functional Requirements

### 3.1 User Authentication & Authorization
- The system shall allow users to register and log in.
- The system shall enforce role-based access (Admin, Manager, Developer).
- The system shall allow users to manage their profile.

### 3.2 Project Management
- The system shall allow managers to create, view, update, and delete projects.
- The system shall allow managers to assign users to projects.
- The system shall display project details and status.

### 3.3 Resource Allocation
- The system shall allow managers to allocate resources (users) to projects.
- The system shall allow viewing and managing resource assignments.

### 3.4 Timesheet Management
- The system shall allow developers to submit timesheets for assigned projects.
- The system shall allow managers to review and approve timesheets.

### 3.5 Administrative Functions
- The system shall provide an admin dashboard for managing users.
- The system shall allow admins to configure system-level settings.

### 3.6 API Endpoints (Backend)
- `/api/auth/*` — Authentication (AuthController.java)
- `/api/admin/*` — Admin functions (AdminController.java)
- `/api/projects/*` — Project management (ProjectController.java)
- `/api/allocations/*` — Resource allocation (AllocationController.java)
- `/api/timesheets/*` — Timesheet management (TimesheetController.java)

### 3.7 Data Models
- **User**: id, name, email, role, etc. (User.java, Role.java, ERole.java)
- **Project**: id, name, description, status, etc. (Project.java)
- **Allocation**: id, user, project, allocation details (Allocation.java)
- **Timesheet**: id, user, project, hours, status, etc. (Timesheet.java)

---

## 4. Non-Functional Requirements
- The system shall provide secure authentication and data handling.
- The system shall have a responsive and user-friendly UI.
- The system shall be scalable to support organizational growth.

---

## 5. Future Enhancements
- The system may include notifications and alerts.
- The system may provide reporting and analytics features.
- The system may support file attachments for projects or timesheets.

---

## 6. Constraints
- The system must run on modern browsers (Chrome, Firefox, Edge).
- The backend must be compatible with Java 8+ and Spring Boot.

---

## 7. Assumptions and Dependencies
- Users have internet access and a compatible browser.
- The backend is deployed on a server accessible by the frontend.

---

## 8. Appendices
- For detailed product-level requirements, see PRODUCT_REQUIREMENT.md
