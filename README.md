# Blog API with Next.js and Mongoose

This project is a RESTful API for managing blogs, users and categories built with Next.js using API routes and serverless functions, Mongoose and MongoDB.

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

   Create a `.env.local` file in the root directory and add your MongoDB connection string:

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

### Endpoints

#### Blog Endpoints

- **Get a blog by ID**

  ```http
  GET /api/blogs/[blog]
  ```

  **Query Parameters:**

  - `userId`: The ID of the user.
  - `categoryId`: The ID of the category.

  **Response:**

  ```json
  {
    "blog": {
      "_id": "60c72b2f9b1d8c001f8e4e0b",
      "title": "Blog Title",
      "description": "Blog Description",
      "user": "60c72b2f9b1d8c001f8e4e0a",
      "category": "60c72b2f9b1d8c001f8e4e0c",
      "createdAt": "2021-06-14T12:34:56.789Z",
      "updatedAt": "2021-06-14T12:34:56.789Z"
    }
  }
  ```

- **Update a blog by ID**

  ```http
  PATCH /api/blogs/[blog]
  ```

  **Query Parameters:**

  - `userId`: The ID of the user.

  **Request Body:**

  ```json
  {
    "title": "Updated Blog Title",
    "description": "Updated Blog Description"
  }
  ```

  **Response:**

  ```json
  {
    "message": "Blog updated",
    "blog": {
      "_id": "60c72b2f9b1d8c001f8e4e0b",
      "title": "Updated Blog Title",
      "description": "Updated Blog Description",
      "user": "60c72b2f9b1d8c001f8e4e0a",
      "category": "60c72b2f9b1d8c001f8e4e0c",
      "createdAt": "2021-06-14T12:34:56.789Z",
      "updatedAt": "2021-06-14T12:34:56.789Z"
    }
  }
  ```

- **Delete a blog by ID**

  ```http
  DELETE /api/blogs/[blog]
  ```

  **Query Parameters:**

  - `userId`: The ID of the user.

  **Response:**

  ```json
  {
    "message": "Blog deleted successfully"
  }
  ```

#### User Endpoints

- **Get a user by ID**

  ```http
  GET /api/users/[user]
  ```

  **Response:**

  ```json
  {
    "user": {
      "_id": "60c72b2f9b1d8c001f8e4e0a",
      "username": "john_doe",
      "email": "john.doe@example.com",
      "createdAt": "2021-06-14T12:34:56.789Z",
      "updatedAt": "2021-06-14T12:34:56.789Z"
    }
  }
  ```

#### Category Endpoints

- **Get a category by ID**

  ```http
  GET /api/categories/[category]
  ```

  **Response:**

  ```json
  {
    "category": {
      "_id": "60c72b2f9b1d8c001f8e4e0c",
      "title": "Category Title",
      "user": "60c72b2f9b1d8c001f8e4e0a",
      "createdAt": "2021-06-14T12:34:56.789Z",
      "updatedAt": "2021-06-14T12:34:56.789Z"
    }
  }
  ```

## License

This project is licensed under the MIT License.
