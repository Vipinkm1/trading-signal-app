# 🚀 Trading Signal Tracking Application

## 📌 Overview

This is a full-stack trading signal tracking system where users can create trading signals and track their real-time performance using Binance public API.

---

## 🛠 Tech Stack

### Backend

* Node.js
* Express.js

### Frontend

* React (Vite)

### Database

* MySQL

### External API

* Binance Public API

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```
git clone https://github.com/your-username/trading-signal-app.git
cd trading-signal-app
```

---

### 2️⃣ Backend Setup

```
cd backend
npm install
node server.js
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

## 🗄 Database Setup

Create database:

```
CREATE DATABASE trading_app;
```

Create table:

```
CREATE TABLE signals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  symbol VARCHAR(20),
  direction ENUM('BUY','SELL'),
  entry_price FLOAT,
  stop_loss FLOAT,
  target_price FLOAT,
  entry_time DATETIME,
  expiry_time DATETIME,
  status VARCHAR(20),
  realized_roi FLOAT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔗 API Endpoints

### ➤ Create Signal

POST /api/signals

### ➤ Get All Signals

GET /api/signals

### ➤ Get Signal By ID

GET /api/signals/:id

### ➤ Delete Signal

DELETE /api/signals/:id

---

## 🧠 Business Logic

### ✔ Validation Rules

* BUY → Stop Loss < Entry < Target
* SELL → Target < Entry < Stop Loss
* Expiry time must be after entry time

---

### ✔ Status Logic

* TARGET_HIT → price >= target (BUY)
* STOPLOSS_HIT → price <= stop loss (BUY)
* SELL logic is reversed
* EXPIRED → current time > expiry

---

### ✔ ROI Calculation

* BUY → (price - entry) / entry × 100
* SELL → (entry - price) / entry × 100
* Rounded to 2 decimal places

---

## 🧱 Architecture

The project follows a layered architecture:

```
Routes → Controllers → Services → Models → Database
```

### 🔹 Routes

Define API endpoints

### 🔹 Controllers

Handle request & response

### 🔹 Services

Contain business logic (status, ROI, validation)

### 🔹 Models

Handle database queries

---

## 🔄 Live Tracking

* Fetches real-time price from Binance API
* Updates signal status dynamically
* Persists final status in database
* Auto-refresh dashboard every 15 seconds

---

## ⚠️ Edge Cases Handled

* Final states (TARGET_HIT / STOPLOSS_HIT / EXPIRED) are immutable
* Expired signals do not change later
* Correct BUY/SELL logic applied
* Proper validation prevents invalid signals

---

## 🚀 Future Improvements

* API caching for performance
* Pagination & filtering
* Authentication system
* Improved UI/UX

---

## 👨‍💻 Author

Vipin Kumar
