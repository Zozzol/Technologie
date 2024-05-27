import React from 'react';
import './App.css';
import LoginForm from './login-form/LoginFrom';
import BookTable from './book-form/BookTable';
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from 'react-router-dom';
import BookRented from './book-form/BookRented';
import HomePage from './home-page/HomePage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={'/login'} />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/allbooks" element={<BookTable />} />
          <Route path="/rentedbooks" element={<BookRented />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
