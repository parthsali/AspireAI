# AspireAI

AspireAI is an innovative career guidance platform designed to help users navigate their career paths and enhance their job-seeking experience. This platform allows users to upload their resumes, receive personalized career advice, and prepare for interviews with the help of advanced AI technology.

## Table of Contents

1. [Features](#features)
2. [Workflow](#workflow)
3. [Tech Stack](#tech-stack)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Contributing](#contributing)
7. [License](#license)

## Features

- **User Registration & Login**: Secure user authentication to access personalized features.
- **Resume Upload**: Users can upload their resumes, which will be parsed to extract skills, experiences, projects, and grades.
- **Career Guidance**: Interactive 3D avatar providing personalized career advice and support through a chat interface powered by the Gemini API.
- **Roadmap Generation**: Generates customized career roadmaps based on user data and interests.
- **Mock Interview Feature**: Users can practice for interviews with a 3D avatar, tailored to specific roles and skills.
- **Real-time Feedback**: Voice responses generated through TTS (Text-to-Speech) technology enhance the user experience.

## Workflow

1. **User Registration**: Users create an account to access the platform.
2. **User Login**: Users log in to their accounts to access personalized features.
3. **Homepage**: Users are directed to the homepage featuring navigation links.
4. **Resume Upload**: Users upload their resumes, which are processed and stored in the database.
5. **Career Guidance**: Users interact with a 3D avatar that responds to queries regarding career advice, powered by the Gemini API.
6. **Roadmap Generation**: Based on user data and interests, a personalized career roadmap is generated.
7. **Mock Interviews**: Users can simulate interviews for specific roles, with a 3D avatar providing feedback.

## Tech Stack

- **Frontend**: 
  - React
  - R3F (React Three Fiber) for 3D rendering
- **Backend**:
  - Node.js (Express) for handling user-related functionalities and interactions with MongoDB
  - FastAPI for managing queries to the Gemini API and extracting data from PDF resumes
- **Database**: 
  - MongoDB for storing user data and resume information

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/aspireAI.git
   cd aspireAI
   ```

2. Install the frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Install the backend dependencies:
   ```bash
   cd backend
   npm install
   ```

4. Set up the FastAPI backend:
   ```bash
   cd fastapi
   pip install -r requirements.txt
   ```

5. Start the servers:
   - For the frontend, run:
     ```bash
     npm run dev
     ```
   - For the Node.js backend, run:
     ```bash
     npm run dev
     ```
   - For the FastAPI backend, run:
     ```bash
     uvicorn main:app --reload
     ```

## Usage

Once everything is set up and running:

1. Open your browser and go to `http://localhost:3000` to access the AspireAI platform.
2. Create an account or log in.
3. Navigate through the platform to upload your resume, receive career guidance, generate roadmaps, and practice mock interviews.


