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
│   │   ├── main.tsx       # Entry point for the React application
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
   npm run dev
   ```

### Building the Client

1. Navigate to the `client` directory and build client:
   ```
   cd client
   npm run build
   ```

2. Alternatively, navigate to the `server` directory and build client and server:
   ```
   cd server
   npm run build
   ```

### Serving the Client from the Server

1. Ensure the client is built by following the steps in the "Building the Client" section.

2. Start the server:
   ```
   cd server
   npm start
   ```

The server will serve the client from the `dist` directory on port `3000` by default.

## Usage

Once both the server and client are running, you can open your browser and navigate to `http://localhost:5173` to access the chat application during development or `http://localhost:3000` to access the built client served by the server. You can send and receive messages in real-time without storing them.