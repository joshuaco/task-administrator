# Task Administrator

Task Administrator is a fullstack application for team project and task management. It allows users to create projects, assign tasks, collaborate in teams, and track the progress of each project.

## Main Features

- Project and task management
- Task assignment to team members
- Task and project status tracking
- User authentication and authorization
- Modern interface built with React, TypeScript, and Vite
- Backend API with Express and MongoDB

---

## Installation and Running

### Prerequisites

- Node.js (v18 or higher recommended)
- pnpm (recommended, but you can use npm or yarn)
- MongoDB (local or cloud)

### Clone the repository

```bash
git clone <REPOSITORY_URL>
cd task-administrator
```

### Install dependencies

#### Client (Frontend)

```bash
cd client
pnpm install
```

#### Server (Backend)

```bash
cd ../server
pnpm install
```

### Environment variables setup

Create a `.env` file in the `server` folder with the required configuration (e.g., MongoDB URI, JWT keys, etc).

### Run in development mode

#### Backend

```bash
cd server
pnpm dev
```

#### Frontend

```bash
cd client
pnpm dev
```

The client app will usually be available at `http://localhost:5173` and the API at `http://localhost:3000` (or your configured port).

---

## Project Structure

- `client/`: Frontend app (React + Vite)
- `server/`: Backend API (Express + MongoDB)

---

## License

MIT
