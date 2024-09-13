# Generaited

An online multiplayer game inspired by AI-generated content.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/generaited.git
   cd generaited
   ```

2. Install all dependencies:
   ```
   npm run install-all
   ```

3. Set up environment variables:
   - Create a `.env` file in the `server` directory with the following variables:
     ```
     PORT=7613
     CLIENT_URL=http://localhost:9821
     GENERAITED_FIREBASE_API_KEY=your_firebase_api_key
     FIREBASE_SERVICE_ACCOUNT={"your":"firebase-service-account-json"}
     FIREBASE_DATABASE_URL=https://your-project.firebaseio.com
     ```
   - Create a `.env` file in the `client` directory with the following variables:
     ```
     VITE_SERVER_URL=http://localhost:7613
     ```

### Running the Application

1. Start both the server and client, and open the application in your default browser:
   ```
   npm start
   ```

   This command will start the backend server, the frontend development server, and automatically open the application in your default web browser.

2. If the browser doesn't open automatically, you can manually navigate to `http://localhost:9821`

## Features

- User authentication
- Quickplay matchmaking
- Real-time multiplayer gameplay
- In-game chat functionality
- User profile and statistics tracking

## Tech Stack

- Frontend: React.js, Tailwind CSS
- Backend: Node.js, Express.js, Socket.IO
- Database & Authentication: Firebase (Firestore + Authentication)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.