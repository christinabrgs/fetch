# Full-Stack App

This repository contains a full-stack web application with a **React Router frontend**, **Node.js backend**, and **SQLite database**.

## 🚀 Project Setup

### Prerequisites
- **Node.js** (Latest LTS version)
- **npm** or **yarn**
- **Git**

---

## 🔧 Backend Setup

### **1. Clone the Repository**
```sh
git clone git@github.com:christinabrgs/fetch.git
cd backend
```

### **2. Install Dependencies**
```sh
npm install
```

### **3. Set Up Environment Variables**
Create a `.env` file in the `backend` directory and add:
```sh
PORT = 5000
DATABASE_URL = ./database.db
```

### **4. Run the Server Locally**
```sh
npm run dev
```

---

## 🎨 Frontend Setup

### **1. Navigate to the Frontend Directory**
```sh
cd ../frontend
```

### **2. Install Dependencies**
```sh
npm install
```

### **3. Set Up Environment Variables**
Create a `.env` file in `frontend`:
```sh
VITE_DATABASE_URL = http://localhost:5000/dogs
VITE_API_URL = https://frontend-take-home-service.fetch.com
VITE_RENDER_URL = https://fetch-ne1g.onrender.com
```

### **4. Build and Run Locally**
```sh
npm run dev
```

---

## 📌 Notes
- The backend uses **Express.js** and **SQLite**.
- The frontend is built with **React Router & Vite**.
- API/ Database URLs are managed via **environment variables**.
- The session will expire after **1 hour**, requiring users to re-login.
- The frontend uses **Axios** for API data fetching.


### 🎯 Need Help?
- If you encounter issues, check the logs.
- Open a **GitHub issue** or reach out for support!


