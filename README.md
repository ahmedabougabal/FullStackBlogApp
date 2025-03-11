# FullStackBlogApp

A modern, responsive blog platform built with React, TypeScript, and NestJS. Features a beautiful UI, robust error handling, and full CRUD operations for blog posts.

![image](https://github.com/user-attachments/assets/38052fd1-f8c7-4030-8b7d-922477e5c44f)

  <img src="https://github.com/Govindv7555/Govindv7555/blob/main/49e76e0596857673c5c80c85b84394c1.gif" width="1000px" height="100px">


![image](https://github.com/user-attachments/assets/74d42884-7708-489c-bcd8-e2c9e1fe1eb1)

  <img src="https://github.com/Govindv7555/Govindv7555/blob/main/49e76e0596857673c5c80c85b84394c1.gif" width="1000px" height="100px">


![image](https://github.com/user-attachments/assets/6ca9b84f-9aae-49f8-a836-fc7b48d8c66a)

  <img src="https://github.com/Govindv7555/Govindv7555/blob/main/49e76e0596857673c5c80c85b84394c1.gif" width="1000px" height="100px">

## 🚀 Features

- 📝 Create, read, update, and delete blog posts
- 🎨 Modern and responsive design
- ⚡ Fast and efficient TypeScript-based backend
- 🔒 Robust error handling and validation
- 📱 Mobile-friendly interface
- 🔍 Real-time post filtering and search
- ⚙️ PostgreSQL database for reliable data storage
- 🐳 Docker support for easy deployment

## 🛠️ Tech Stack

### Frontend

- React 18
- TypeScript
- React Router v6
- Modern CSS-in-JS styling

### Backend

- NestJS
- TypeORM
- PostgreSQL
- TypeScript

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or higher)
- npm (v8 or higher)
- PostgreSQL (v14 or higher) - _Not needed if using Docker_
- Git
- Docker and Docker Compose (optional)

## 🚀 Quick Start with Docker

The easiest way to get started is using Docker Compose:

```bash
# Clone the repository
git clone https://github.com/yourusername/FullStackBlogApp.git
cd FullStackBlogApp

# Start the application
docker-compose up -d

# The application will be available at:
# Frontend: http://localhost:3001
# Backend: http://localhost:3000
```

## 🔧 Manual Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/FullStackBlogApp.git
cd FullStackBlogApp
```

2. **Set up the database**

```bash
# Login to PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE blog_db;

# Create a user (optional)
CREATE USER blog_user WITH ENCRYPTED PASSWORD 'your_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE blog_db TO blog_user;
```

3. **Configure environment variables**

Create a `.env` file in the `backend` directory:

```env
# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=blog_user
DATABASE_PASSWORD=your_password
DATABASE_NAME=blog_db

# Application Configuration
PORT=3000
NODE_ENV=development
```

4. **Install backend dependencies**

```bash
cd backend
npm install
```

5. **Install frontend dependencies**

```bash
cd ../frontend
npm install
```

## 🚀 Running the Application

### Using Docker

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild containers
docker-compose up -d --build
```

### Manual Start

1. **Start the backend server**

```bash
cd backend
npm run start:dev
```

The backend will be available at `http://localhost:3000`

2. **Start the frontend development server**

```bash
cd frontend
npm start
```

The frontend will be available at `http://localhost:3001`

## 📝 API Documentation

### Posts Endpoints

#### Get all posts

```
GET /api/posts
```

#### Get a specific post

```
GET /api/posts/:id
```

#### Create a new post

```
POST /api/posts
Content-Type: application/json

{
  "title": "Post Title",
  "content": "Post content",
  "author": "Author Name"
}
```

#### Update a post

```
PATCH /api/posts/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content"
}
```

#### Delete a post

```
DELETE /api/posts/:id
```

## 🧪 Running Tests

### Backend Tests

```bash
cd backend
npm run test        # Unit tests
npm run test:e2e    # E2E tests
```

### Frontend Tests

```bash
cd frontend
npm test
```

## 📦 Building for Production

### Using Docker

```bash
# Build and start production containers
docker-compose -f docker-compose.prod.yml up -d
```

### Manual Build

#### Backend

```bash
cd backend
npm run build
```

#### Frontend

```bash
cd frontend
npm run build
```

## 🔒 Security

- All user inputs are validated and sanitized
- HTTP exception filter for standardized error handling
- TypeORM for SQL injection prevention
- CORS enabled for frontend communication
- Secure headers with nginx configuration
- Environment variables for sensitive data

## 🛠️ Development

### Code Style

- We use ESLint and Prettier for code formatting
- Run `npm run lint` to check for style issues
- Run `npm run format` to automatically fix style issues

### Git Workflow

1. Create a feature branch from `main`
2. Make your changes
3. Run tests and linting
4. Submit a pull request
5. Wait for review and approval

---

> Made with ❤️ by Ahmed Abou Gabal
