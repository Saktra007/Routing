# Routing – Full-Stack User Management (CRUD)

This project is a full-stack **User Management CRUD Application** built with:

- **Backend:** Node.js + Express (File-Based Database using JSON)
- **Frontend:** HTML, CSS, JavaScript (Fetch API)
- **Architecture:** MVC + Modular Routing + Middleware

The project demonstrates how to build a clean, scalable CRUD system with a clear folder structure that separates frontend and backend concerns.

---

## 📁 Project Structure

```
Routing/
│
├── backend/
│   ├── src/
│   │   ├── server.js
│   │   ├── routes/
│   │   │   └── user.routes.js
│   │   ├── controllers/
│   │   │   └── user.controller.js
│   │   ├── data/
│   │   │   └── users.json
│   │   ├── middleware/
│   │   │   ├── logger.js
│   │   │   ├── errorHandler.js
│   │   │   └── asyncWrapper.js (optional)
│   │   └── utils/
│   │       └── file.js
│   ├── package.json
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js
│
├── .gitignore
└── README.md
```

---

## ⚙️ Backend (Node.js + Express)

### Features

- GET all users
- POST create user
- PUT update user
- DELETE remove user
- File-based database using `users.json`
- Custom middlewares: logger, error-handler
- Modular routing: `/api/users`

### Install Backend Dependencies

```
cd backend
npm install
```

### Run Server

```
npm start
```

Server runs at:

```
http://localhost:3000
```

---

## 🗄 API Endpoints

| Method | Endpoint       | Description     |
| ------ | -------------- | --------------- |
| GET    | /api/users     | Get all users   |
| POST   | /api/users     | Create new user |
| PUT    | /api/users/:id | Update user     |
| DELETE | /api/users/:id | Delete user     |

---

## 🖥 Frontend (HTML/CSS/JS)

### Features

- Fetch API integration with backend
- Display users in a dynamic table
- Modal UI for Create / Update
- Real-time rendering after CRUD operations
- Export table data to CSV (Excel)
- Clean responsive UI

### Start Frontend

Just open:

```
frontend/index.html
```

Make sure the backend server is running.

---

## 🔗 Connect Frontend & Backend

The frontend uses Fetch API with this base URL:

```
const API_URL = "http://localhost:3000/api/users";
```

If you deploy your backend, change this variable accordingly.

---

## 🚀 Deployment (GitHub)

This project uses separate folders:

- `/backend` → Node.js server
- `/frontend` → Static site

To deploy frontend using GitHub Pages:

1. Push repository to GitHub
2. Go to **Settings > Pages**
3. Select `/frontend` as the base folder for deployment

Note: Backend cannot be deployed on GitHub Pages.  
Use a service such as:

- Render
- Railway
- Vercel (for serverless)
- Netlify Functions

---

## ✔️ Requirements

- Node.js v18+
- Modern Web Browser

---

## 📌 Future Improvements

- Switch from JSON file to MongoDB / PostgreSQL
- JWT Authentication
- Role-based access control
- Pagination + Search + Filtering
- UI Themes

---

## 📄 License

This project is open-source and free to modify.
