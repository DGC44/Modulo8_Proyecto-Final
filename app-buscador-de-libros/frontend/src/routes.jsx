import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App';
import BookList from './components/BookList';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/books" element={<BookList />} />
    </Routes>
  );
};

export default AppRoutes;