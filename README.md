# 🍫 Healthy Snacks Website - Frontend

This is the frontend of the Healthy Snacks Website built using **React.js**. It allows users to browse healthy snack products, add them to cart, and place orders.

## 🚀 Live Website
🌐 [Visit Frontend](healthy-snacks-website-frontend-csoaqyccs.vercel.app)

## 🧰 Tech Stack
- React.js
- React Router DOM
- Context API
- CSS Modules

## 💡 Features
- Browse products by categories (Sweets, Namkeen, Khakras)
- Add to and remove items from cart
- View total cart value and place order
- Fully responsive layout
- Payment Options interface

## 📦 Getting Started (Local Development)

### 1. Clone the repository
git clone https://github.com/your-username/healthy-snacks-website-frontend.git
cd healthy-snacks-website-frontend

2. Install dependencies

npm install
3. Update Backend URL
If you're running the backend locally, change all backend URLs in the code from:

https://healthy-snacks-website-backend.onrender.com

to:

http://localhost:4000

This includes:
files such as
ShopContext.js

Popular.jsx

PlaceOrder.jsx (or wherever the backend is called)

4. Start the app
npm start


📁 Folder Structure

frontend/
│
├── build/                     # Production-ready build output
├── node_modules/              # Project dependencies
├── public/                    # Static files (e.g., index.html, icons)
├── src/                       # Source code
│   ├── Components/            # Reusable UI components
│   ├── Context/               # React Context API related files (global state)
│   ├── Pages/                 # Application page components (views/screens)
│   ├── App.css                # Global styles for the App component
│   ├── App.js                 # Root component
│   ├── App.test.js            # Tests for App component
│   ├── index.css              # Global CSS styles
│   ├── index.js               # ReactDOM rendering and app bootstrap
│   ├── logo.svg               # Application logo
│   ├── reportWebVitals.js     # Performance measuring setup
│   └── setupTests.js          # Testing environment setup
│
├── .env                       # Environment variables
├── .gitignore                 # Files/folders to be ignored by Git
├── package.json               # Project configuration and dependencies
├── package-lock.json          # Exact versions of installed dependencies
└── README.md                  # Project documentation


📄 License
This project is licensed under the MIT License