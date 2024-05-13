import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './login-form/LoginFrom';
import BookView from './book-form/BookView';
import BookTable from './book-form/BookTable';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/allbooks" element={<BookTable />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
