# Live Chat Application

This is a simple live chat application built using React, NodeJS, Express and Socket.IO for real-time communication on the backend.

## Live Demo

You can see a live demo of the application running at [www.live-chat.gryboskamil.com](http://www.live-chat.gryboskamil.com).


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

## Setup Instructions for local development

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

### Local access

Once both the server and client are running, you can open your browser and navigate to `http://localhost:5173` to access the chat application during development or `http://localhost:3000` to access the built client served by the server. You can send and receive messages in real-time without storing them.

### Serving from server

## Building

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

## Running with Docker

You can also run the application using Docker. Follow these steps:

1. Build the Docker image:

   ```sh
   docker-compose build
   ```

2. Start the Docker container:
   ```sh
   docker-compose up
   ```

The server will be accessible at `http://localhost:3000`, and it will serve the built client from the `dist` directory.

### Environment Variables

- `NODE_ENV`: Set to `production` for production builds.
