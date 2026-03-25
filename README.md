# Blog App

A full-stack blogging platform where an admin can manage posts and users, and anyone can read articles and comment on posts.

<img width="1908" height="872" alt="image" src="https://github.com/user-attachments/assets/e8ed0fc1-411a-4c17-8333-79adf085b343" />
<img width="1898" height="852" alt="image" src="https://github.com/user-attachments/assets/26dcd1a5-2aff-4d58-841a-e49015053473" />
<img width="1897" height="765" alt="image" src="https://github.com/user-attachments/assets/eaf3e6c4-5eab-462c-8762-212509ec3174" />
<img width="1898" height="865" alt="image" src="https://github.com/user-attachments/assets/c8c4af6c-89b2-4a2f-a66b-f1f8d515d084" />


## Features

- Admin login and authentication  
- Admin can create, upload, and delete posts with title, description, and images  
- Users can register/login to read posts and comment (optional login for commenting)  
- Public users can view posts and add comments without authentication  
- Admin can manage the web application by deleting posts, users, and comments  
- Comments displayed under each post, with timestamps  
- User authentication and role-based access control  

## Tech Stack

- **Frontend:** React, Tailwind CSS, HTML  
- **Backend:** Node.js, Express  
- **Database:** MongoDB (via Mongoose)  
- **Authentication:** JWT-based  

## Deployed Link

[Live Demo](https://bloggify-gamma.vercel.app/)

## Setup Instructions

### Prerequisites

- Node.js (v16+ recommended)  
- MongoDB (local instance or MongoDB Atlas)

---

### 🔧 Backend Setup

1. Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file:

    ```env
    PORT=8080
    MONGODB_URI=mongodb://localhost:27017/blog-app
    JWT_SECRET=your_jwt_secret_here
    ```

4. Start the backend server:

    ```bash
    npm start
    ```

---

### 💻 Frontend Setup

1. Navigate to the `client` directory:

    ```bash
    cd client
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the frontend app:

    ```bash
    npm start
    ```

4. Visit the app in your browser:  
   `http://localhost:3000` or deployed version [here](https://bloggify-gamma.vercel.app/)

---

## API Endpoints

### ✅ Post Routes

- `POST /api/posts` – Add new post (Admin only)  
- `GET /api/posts` – Get all posts (public)  
- `GET /api/posts/:id` – Get a single post  
- `DELETE /api/posts/:id` – Delete a post (Admin only)

### 👤 User Routes

- `POST /api/auth/register` – Register user  
- `POST /api/auth/login` – Login (Admin/User)  
- `DELETE /api/users/:id` – Delete user (Admin only)

### 💬 Comment Routes

- `POST /api/comments/:postId` – Add comment to post (public allowed)  
- `GET /api/comments/:postId` – Get comments for post  
- `DELETE /api/comments/:commentId` – Delete a comment (Admin only)

---

## Notes

- Admin users can manage users, posts, and comments.  
- Authenticated or guest users can comment on posts.  
- Comments appear instantly below each post.  
- Post content includes rich text and image support.  
- Frontend uses **Tailwind CSS** for modern styling.  
- Comments are stored in MongoDB and linked by post ID.

---

