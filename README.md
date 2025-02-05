# Project-Management-API

A **Full-Stack RESTful API** built with **Node.js, Express.js, PostgreSQL, and Prisma** to manage projects, tasks, and users. Includes authentication with JWT.

## Features

- **User Management** (Register, Login, CRUD)
- **Project Management** (Create, Update, Delete)
- **Task Management** (Assign, Update, Filter)
- **JWT Authentication** (Protected Routes)

---

## Setup & Installation

### Clone the Repository

```sh
git clone [https://github.com/your-username/project-management-api.git](https://github.com/your-username/project-management-api.git)
cd project-management-api
```
### Install Dependencies

```sh
npm install
```

### Set Up Environment Variables

```sh
DATABASE_URL="postgresql://username:password@localhost:5432/project_management"
JWT_SECRET="your_secret_key"
```

### Set Up PostgreSQL Database and Run Prisma Migration

```sh
psql -U postgres
CREATE DATABASE project_management;

npx prisma migrate dev --name init
npx prisma generate
```

### Run the Server
```sh
npx nodemon src/server.js
```

I have tested the endpoints using Postman.
