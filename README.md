# Live Chat Application

This is a simple live chat application built using React, NodeJS, Express and Socket.IO for real-time communication on the backend.

## Project Structure

```
live-chat
├── server
│   ├── src
│   │   ├── index.ts       # Entry point for the Node Express server
│   │   └── socket.ts      # Socket.IO event management
│   ├── package.json       # Server dependencies
│   └── tsconfig.json      # TypeScript configuration for the server
├── client
│   ├── src
│   │   ├── App.tsx        # Main React component
│   │   ├── index.tsx      # Entry point for the React application
│   │   └── components
│   │       └── Chat.tsx   # Chat component for UI
│   ├── package.json       # Client dependencies
│   └── tsconfig.json      # TypeScript configuration for the client
└── README.md              # Project documentation
```

## Setup Instructions

### Server

1. Navigate to the `server` directory:
   ```
   cd server
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```

### Client

1. Navigate to the `client` directory:
   ```
   cd client
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Start the client:
   ```
   npm start
   ```

## Usage

Once both the server and client are running, you can open your browser and navigate to `http://localhost:5173` to access the chat application. You can send and receive messages in real-time without storing them.