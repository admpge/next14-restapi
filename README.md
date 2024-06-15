# Blog API with Next.js and Mongoose

This project is a RESTful API for managing blogs, users, and categories built with Next.js 14 using API routes and serverless functions, Mongoose, and MongoDB.

## Features

- Create, read, update, and delete blogs
- User authentication and authorization
- Category management
- Pagination and search functionality

## Technologies Used

- Next.js
- Mongoose
- MongoDB
- TypeScript

## Project Setup

### Prerequisites

- Node.js (>= 12.x)
- MongoDB

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/blog-api-nextjs.git
   cd blog-api-nextjs
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Environment Variables:**

   Create a `.env` file in the root directory and add your MongoDB connection string:

   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```

4. **Run the development server:**

   ```sh
   npm run dev
   ```

5. **Build for production:**

   ```sh
   npm run build
   npm start
   ```

## API Documentation

### User Endpoints

- **Get all users**

  ```http
  GET /api/users
  ```

- **Create a new user**

  ```http
  POST /api/users
  ```

- **Update a user by ID**

  ```http
  PATCH /api/users
  ```

- **Delete a user by ID**

  ```http
  DELETE /api/users
  ```

  **Query Parameters:**

  - `userId`: The ID of the user.

### Category Endpoints

- **Get all categories for a user**

  ```http
  GET /api/categories
  ```

  **Query Parameters:**

  - `userId`: The ID of the user.

- **Create a new category for a user**

  ```http
  POST /api/categories
  ```

  **Query Parameters:**

  - `userId`: The ID of the user.

- **Update a category for a user**

  ```http
  PATCH /api/categories/[category]
  ```

  **Query Parameters:**

  - `userId`: The ID of the user.

  -**Delete a category for a user**

  ```http
  DELETE /api/categories/[category]
  ```

  **Query Parameters:**

  - `userId`: The ID of the user.

### Blog Endpoints

- **Get blogs based on various filters**

  ```http
  GET /api/blogs
  ```

  **Query Parameters:**

  - `userId`: The ID of the user (required).
  - `categoryId`: The ID of the category (required).
  - `keywords`: Search keywords for the title or description (optional).
  - `startDate`: The start date for filtering blogs by creation date (optional).
  - `endDate`: The end date for filtering blogs by creation date (optional).
  - `page`: The page number for pagination (optional, default: 1).
  - `limit`: The number of blogs to return per page (optional, default: 10).

- **Create a new blog**

  ```http
  POST /api/blogs
  ```

  **Query Parameters:**

  - `userId`: The ID of the user (required).
  - `categoryId`: The ID of the category (required).

- **Get a blog by ID**

  ```http
  GET /api/blogs/[blog]
  ```

  **Query Parameters:**

  - `userId`: The ID of the user (required).
  - `categoryId`: The ID of the category (required).

- **Update a blog by ID**

  ```http
  PATCH /api/blogs/[blog]
  ```

  **Query Parameters:**

  - `userId`: The ID of the user (required).
