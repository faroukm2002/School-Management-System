# School Management System Backend

Welcome to the **School Management System Backend**, a robust server-side application designed to manage school operations efficiently. This backend system facilitates various functionalities, including academic term management, student records, and more.

![School Management System Overview](https://i.ytimg.com/vi/X6rqdSrHtVI/maxresdefault.jpg)

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
  - [Academic Term](#academic-term)
  - [Academic Year](#academic-year)
  - [Admin](#admin)
  - [Auth](#auth)
  - [Class](#class)
  - [Exam](#exam)
  - [Exam Result](#exam-result)
  - [Parent](#parent)
  - [Program](#program)
  - [Question](#question)
  - [Student](#student)
  - [Subject](#subject)
  - [Teacher](#teacher)
  - [Year Group](#year-group)
- [Contributing](#contributing)
- [Licensing](#licensing)
- [Contact](#contact)

## Project Overview

This backend system provides a structured approach to managing school data and operations. Key features include:

- **Data Management:** Leverage MongoDB to store and manage data related to academic terms, students, teachers, exams, and more.
- **Administrative Control:** Enables administrators to perform essential tasks such as managing academic years, classes, and programs with ease.
- **User Authentication:** Secure user registration and login processes to ensure appropriate access levels and protect sensitive information.
- **Flexible API Endpoints:** Offers a wide range of RESTful API endpoints for interacting with school-related data, supporting CRUD operations for various entities like students, teachers, and exams.

## Features

- **Academic Term Management:** Manage academic terms efficiently.
- **Academic Year Management:** Organize and track academic years.
- **Admin Management:** Admin functionalities for system management.
- **User Authentication:** Secure sign-up and sign-in processes.
- **Class Management:** Manage class levels and assignments.
- **Exam Management:** Handle exam schedules and results.
- **Exam Result Management:** Track and manage exam results.
- **Parent Management:** Manage parent records and interactions.
- **Program Management:** Oversee academic programs.
- **Question Management:** Manage exam questions.
- **Student Management:** Track student information and records.
- **Subject Management:** Manage subjects and curricula.
- **Teacher Management:** Manage teacher records and assignments.
- **Year Group Management:** Organize students into year groups.

## Prerequisites

- **Node.js** (v18.12.0 or higher)
- **MongoDB** (Running on the default port)
- **npm** (for dependency management)

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/faroukm2002/E_Commerce.git
cd E_Commerce
npm install
```
Set up your environment variables in a .env file:

```
MODE=devlopment
DB_CONNECT=mongodb://127.0.0.1:27017/Atlas
BASE_URL=http://localhost:3000/
```
## Running the Server

```
npm start
```

## API Endpoints

### Academic Term
- **POST** `/academicTerm`: Add a new academic term (admin).
- **GET** `/academicTerm`: List all academic terms.
- **PUT** `/academicTerm/:id`: Update an academic term (admin).
- **DELETE** `/academicTerm/:id`: Delete an academic term (admin).

### Academic Year
- **POST** `/academicYear`: Add a new academic year (admin).
- **GET** `/academicYear`: List all academic years.
- **PUT** `/academicYear/:id`: Update an academic year (admin).
- **DELETE** `/academicYear/:id`: Delete an academic year (admin).

### Admin
- **POST** `/admin`: Add a new admin.
- **GET** `/admin`: List all admins.
- **PUT** `/admin/:id`: Update an admin.
- **DELETE** `/admin/:id`: Delete an admin.

### Auth
- **POST** `/auth/signup`: Register a new user.
- **POST** `/auth/signin`: Login for existing users.

### Class
- **POST** `/class`: Add a new class (admin).
- **GET** `/class`: List all classes.
- **PUT** `/class/:id`: Update a class (admin).
- **DELETE** `/class/:id`: Delete a class (admin).

### Exam
- **POST** `/exam`: Create a new exam (admin).
- **GET** `/exam`: List all exams.
- **PUT** `/exam/:id`: Update an exam (admin).
- **DELETE** `/exam/:id`: Delete an exam (admin).

### Exam Result
- **POST** `/examResult`: Add a new exam result (admin).
- **GET** `/examResult`: List all exam results.
- **PUT** `/examResult/:id`: Update an exam result (admin).
- **DELETE** `/examResult/:id`: Delete an exam result (admin).

### Parent
- **POST** `/parent`: Add a new parent.
- **GET** `/parent`: List all parents.
- **PUT** `/parent/:id`: Update a parent.
- **DELETE** `/parent/:id`: Delete a parent.

### Program
- **POST** `/program`: Create a new program (admin).
- **GET** `/program`: List all programs.
- **PUT** `/program/:id`: Update a program (admin).
- **DELETE** `/program/:id`: Delete a program (admin).

### Question
- **POST** `/question`: Add a new question (admin).
- **GET** `/question`: List all questions.
- **PUT** `/question/:id`: Update a question (admin).
- **DELETE** `/question/:id`: Delete a question (admin).

### Student
- **POST** `/student`: Add a new student.
- **GET** `/student`: List all students.
- **PUT** `/student/:id`: Update a student.
- **DELETE** `/student/:id`: Delete a student.

### Subject
- **POST** `/subject`: Create a new subject (admin).
- **GET** `/subject`: List all subjects.
- **PUT** `/subject/:id`: Update a subject (admin).
- **DELETE** `/subject/:id`: Delete a subject (admin).

### Teacher
- **POST** `/teacher`: Add a new teacher.
- **GET** `/teacher`: List all teachers.
- **PUT** `/teacher/:id`: Update a teacher.
- **DELETE** `/teacher/:id`: Delete a teacher.

### Year Group
- **POST** `/yeargroup`: Create a new year group (admin).
- **GET** `/yeargroup`: List all year groups.
- **PUT** `/yeargroup/:id`: Update a year group (admin).
- **DELETE** `/yeargroup/:id`: Delete a year group (admin).

## Contributing

Contributions are welcome! Please fork the repository and open a pull request with your features or fixes.

## Licensing

This project is licensed under the ISC License. See the LICENSE file for details.

## Contact

For any questions or feedback, feel free to reach out:

- **Email:** [faroukm238@gmail.com](mailto:faroukm238@gmail.com)
- **LinkedIn:** [Farouk Mohamed](https://www.linkedin.com/in/farouk-mohamed-87315b298/)
