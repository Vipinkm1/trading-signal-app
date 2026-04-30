# Trading Signal System

## Overview
This project is a full-stack trading signal system where users can create and track trading signals in real-time.

## Tech Stack
- Backend: Node.js, Express
- Database: MySQL
- Frontend: React (Vite)
- API: Binance Public API

## Features
- Create trading signals (BUY/SELL)
- Real-time price tracking
- Status calculation (OPEN, TARGET_HIT, STOPLOSS_HIT, EXPIRED)
- ROI calculation
- Auto-refresh dashboard
- Persistent status updates

## Setup Instructions

### Backend
cd backend
npm install
node server.js

### Frontend
cd frontend
npm install
npm run dev

## API Endpoints

POST /api/signals
Create a new signal

GET /api/signals
Get all signals with live status

## Future Improvements
- Caching for API calls
- Better UI/UX
- Authentication