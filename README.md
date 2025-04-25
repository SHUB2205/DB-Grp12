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

### Backend
1. Install Python dependencies: pip install requirements.txt

2. Run server : python app.py

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