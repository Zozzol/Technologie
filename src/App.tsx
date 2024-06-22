import React from 'react';
import './App.css';
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from 'react-router-dom';
import ApiProvider from './api/ApiProvider';
import Login from './login-form/LoginForm';
import HomePageReader from './home-page-reader/HomePageReader';
import LoginForm from './login-form/LoginForm';
import HomePageLibrarian from './home-page-librarian/HomePageLibrarian';

function App() {
  return (
    <>
      <Router>
        <ApiProvider>
          <Routes>
            <Route path="/" element={<Navigate to={'/login'} />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/home/reader" element={<HomePageReader />} />
            <Route path="/home/librarian" element={<HomePageLibrarian />} />
            {/*<Route path="/book/getAll" element={<BookTable />} />*/}
            {/*<Route path={'/book/add'} element={<AddBook />} />*/}
            {/*<Route path="/loan/getAll" element={<LoanTable />} />*/}
            {/*<Route path={'/loan/add'} element={<AddLoan />} />*/}
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </ApiProvider>
      </Router>
    </>
  );
}
export default App;
