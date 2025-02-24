# JustMark

## 📌 Project Overview
This project is a web application that allows users to log in and drop location pins on a map. Each pin can have a title, description, and rating.</br>
The application is built using **React, Leaflet, Tailwind CSS, and Express.js** for the backend.

## 🚀 Features
- **Interactive Map**: Users can double-click to add pins.
- **Pin Management**: Users can add, view, and rate pins.
- **Persistent Data**: Pins are stored and retrieved from a backend server.
- **Responsive UI**: Tailwind CSS for a sleek and adaptive design.

## 🛠️ Tech Stack
- **Frontend**: React.js, Leaflet.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (for storing users and pins)
- **Other Libraries**: Axios, React Hook Form, React Toastify


## 🛠️ Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Start the Frontend
```sh
npm run dev
```

### 4️⃣ Start the Backend (if applicable)
```sh
cd backend
npm install
npm start
```

## 🌍 API Endpoints
| Method | Endpoint                | Description             |
|--------|-------------------------|-------------------------|
| POST   | /api/user/login         | User login             |
| GET    | /api/pin                | Fetch all pins         |
| POST   | /api/pin                | Add a new pin          |

