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

    Query Parameters:
    - `userId`: The ID of the user.

### Blog Endpoints

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

- **Create a new blog**

    ```http
    POST /api/blogs
    ```

    **Query Parameters:**
    - `userId`: The ID of the user.
    - `categoryId`: The ID of the category.

    **Request Body:**
    ```json
    {
      "title": "New Blog Title",
      "description": "New Blog Description"
    }
    ```

    **Response:**
    ```json
    {
      "message": "Blog created successfully",
      "blog": {
        "_id": "60c72b2f9b1d8c001f8e4e0b",
        "title": "New Blog Title",
        "description": "New Blog Description",
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
      "message": "Blog updated successfully",
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

### Category Endpoints

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

- **Create a new category**

    ```http
    POST /api/categories
    ```

    **Request Body:**
    ```json
    {
      "title": "New Category Title",
      "user": "60c72b2f9b1d8c001f8e4e0a"
    }
    ```

    **Response:**
    ```json
    {
      "message": "Category created successfully",
      "category": {
        "_id": "60c72b2f9b1d8c001f8e4e0c",
        "title": "New Category Title",
        "user": "60c72b2f9b1d8c001f8e4e0a",
        "createdAt": "2021-06-14T12:34:56.789Z",
        "updatedAt": "2021-06-14T12:34:56.789Z"
      }
    }
    ```

## Important

**Do not commit `.env` files to version control.**

Ensure your `.gitignore` file includes:

```gitignore
# .gitignore
.env
.env.*
