## Overview

This backend is part of a comprehensive chatbot application designed to provide information about the Faculty of Sciences and Technologies of Tangier (FSTT). It handles user authentication, session management, and the retrieval of information using a Retrieval-Augmented Generation (RAG) model, ensuring users receive accurate and relevant responses based on data scraped from FSTT's website.

## Technologies Used

- **Backend Framework:** FastAPI, Express.js
- **Data Handling:** Pydantic
- **Web Server:** Uvicorn
- **Authentication:** JWT (JSON Web Tokens)
- **Database:** MongoDB
- **CORS Middleware:** For handling cross-origin requests

## Project Structure

- **User Authentication:** Manages sign-up, sign-in, and JWT-based authentication using Express.js.
- **Session Management:** Stores user queries and chatbot responses in MongoDB.

## Functionalities

- **User Registration and Login:** Secure user authentication and session management.
- **Query Handling:** Processes user queries and provides accurate responses based on the scraped FSTT data.
- **Session Storage:** Logs user interactions for conversation history tracking.
