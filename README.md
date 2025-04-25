# DB-Grp12


## Overview
This is a full-stack web application built using React (frontend) and Flask (backend) to interact with a PostgreSQL database. It provides users with a friendly UI to perform the following operations:
- Insert, Update, and Delete records in any table.
- Fetch and display data from any table.
- View results from a complex database view.

## Tech Stack
- Frontend: React, Bootstrap
- Backend: Flask, Flask-CORS
- Database: PostgreSQL

## How to Run
### Setting up for backend:
1. Navigate to the backend
2. Create an .env file which includes:<br>
    DB_HOST={YOUR_DB_HOST}<br>
    DB_NAME={YOUR_DB_NAME}<br>
    DB_USER={YOUR_DB_USER_NAME}<br>
    DB_PASSWORD={YOUR_DB_PASSWORD}<br>
### Backend
1. Navigate to the backend:
   cd ./backend
2. Create the virtual environment
   python -m venv venv
3. Active the virtual environment:
   source venv/Scripts/activate (For Win)
   source venv/bin/activate (For Linux)
4. Install Python dependencies:
   pip install -r requirements-win.txt (For Win)
   pip install -r requirements-linux.txt (For Linux)
5. Run server : python app.py

### Frontend
1. Navigate to the React app directory.
2. Install dependencies and start the server:
npm install 
npm start

## API Endpoints
- POST `/api/insert` – Insert data into a table.
- POST `/api/update` – Update data with WHERE clause.
- POST `/api/delete` – Delete data with WHERE clause.
- GET `/api/select?table=table_name` – Select all records from the table.
- GET `/api/view-result` – View data from a predefined view.
