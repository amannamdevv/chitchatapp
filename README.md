# ChitChat

A real-time chat application built with React, Node.js, Express, MongoDB, and Socket.io.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd ReactProject-ChitChat
```

2. Install dependencies
```bash
npm install
cd frontend
npm install
cd ..
```

3. Create a `.env` file in the root directory with:
```
PORT=5000
MONGO_DB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
NODE_ENV=development
```

## Running the Project

### Development Mode

**Run backend only:**
```bash
npm run server
```

**Run frontend only:**
```bash
cd frontend
npm run dev
```

**Run both concurrently:**
Open two terminals and run the above commands separately.

### Production Mode

1. Build the project:
```bash
npm run build
```

2. Start the server:
```bash
npm start
```

The application will be available at `http://localhost:5000`

## Tech Stack

- **Frontend:** React, Vite, TailwindCSS, DaisyUI, Zustand
- **Backend:** Node.js, Express, Socket.io
- **Database:** MongoDB
- **Authentication:** JWT, bcryptjs

## Author

Developed by **Aman Namdev**

