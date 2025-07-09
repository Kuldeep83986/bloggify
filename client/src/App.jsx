import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import DashboardLayout from "./components/admin/DashboardLayout";
import AllPosts from "./components/admin/AllPosts";
import AddPost from "./components/admin/AddPost";
import EditPost from "./components/admin/EditPost";
import AllUsers from "./components/admin/AllUsers";
import AllComments from "./components/admin/AllComments";
import Blog from "./pages/Blog";
import PostDetails from "./pages/PostDetails";


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/posts/:id" element={<PostDetails />} />

        {/* Admin layout with nested routes */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route path="dashboard" element={<AllPosts />} />
          <Route path="add-post" element={<AddPost />} />
          <Route path="edit-post/:id" element={<EditPost />} />
          <Route path="users" element={<AllUsers />} />
          {/* <Route path="comments" element={<AllComments />} /> */}
          <Route path="comments/:postId" element={<AllComments />} />
        </Route>

        {/* 404 page */}
        <Route path="*" element={<div className="p-4">404 Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
