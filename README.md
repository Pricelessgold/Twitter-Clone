# Twitter Clone

A full-stack Twitter Clone built with Next.js, React, MongoDB Atlas, JWT Authentication, and Tailwind CSS. Users can create accounts, log in, post tweets,  view profiles, and manage their own content.

## Features

### Authentication

* User registration
* User login
* JWT-based authentication
* Secure password hashing with bcrypt
* Logout functionality
* Protected routes using middleware

### Tweets

* Create tweets
* View all tweets
* View individual tweet details
* Edit your own tweets
* Delete your own tweets

### Profile

* View user profile
* View all tweets created by a user
* Tweet statistics

### Deployment

* Frontend and backend deployed on Vercel
* Database hosted on MongoDB Atlas

---

## Tech Stack

### Frontend

* React
* Next.js App Router
* Tailwind CSS

### Backend

* Next.js API Routes
* JWT Authentication
* bcrypt

### Database

* MongoDB Atlas
* Mongoose

### Deployment

* GitHub
* Vercel

---

## Project Structure

```txt
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   └── tweets/
│   ├── login/
│   ├── signup/
│   ├── profile/
│   ├── tweet/[id]/
│   └── page.js
│
├── components/
│   ├── Navbar.jsx
│   ├── LogoutButton.jsx
│   ├── VoteButtons.jsx
│   └── TweetActions.jsx
│
├── context/
│   └── AuthContext.js
│
├── lib/
│   ├── auth.js
│   └── mongodb.js
│
├── models/
│   ├── User.js
│   └── Tweet.js
│
└── middleware.js
```

---

## Authentication Flow

1. User signs up
2. Password is hashed using bcrypt
3. User logs in
4. JWT token is generated
5. JWT token is stored in an HttpOnly cookie
6. Protected routes verify the token
7. Users can create and manage their own tweets

---

## Future Improvements

* User avatars
* Follow and unfollow users
* Profile customization
* Comments and replies
* Image uploads
* Notifications
* Direct messaging
* Likes and dislikes

---

## What I Learned

Through this project, I learned:

* React fundamentals
* Next.js App Router
* REST API development
* MongoDB and Mongoose
* Authentication with JWT
* Password hashing with bcrypt
* Route protection with Middleware
* State management with React Context
* Deployment using Vercel
* Cloud database management with MongoDB Atlas

---


