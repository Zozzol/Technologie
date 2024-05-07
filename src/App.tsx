import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './login-form/LoginFrom';
import BookView from './book-form/BookView';
import BookTable from './book-form/BookTable';

function App() {
  return (
    <>
      {/*<LoginForm></LoginForm>;*/}
      <BookTable></BookTable>;
    </>
  );
}
export default App;
