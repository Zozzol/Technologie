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
import HomePageReader from './reader/home-page-reader/HomePageReader';
import LoginForm from './login-form/LoginForm';
import HomePageLibrarian from './librarian/home-page-librarian/HomePageLibrarian';
import BookListLibrarian from './librarian/manage-books/BookListLibrarian';
import BookPageLibrarian from './librarian/manage-books/BookPageLibrarian';
import LoanPageLibrarian from './librarian/manage-loans/LoanPageLibrarian';
import BookPageReader from './reader/search-books/BookPageReader';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import UsersPageLibrarian from './librarian/manage-users/UsersPageLibrarian';
import MyLoansList from './reader/my-loans/MyLoansList';
import MyLoansPage from './reader/my-loans/MyLoansPage';

function App() {
  return (
    <Router>
      <I18nextProvider i18n={i18n}>
        <ApiProvider>
          <Routes>
            <Route path="/" element={<Navigate to={'/login'} />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/reader/home" element={<HomePageReader />} />
            <Route path="/librarian/home" element={<HomePageLibrarian />} />
            <Route
              path="/librarian/manage-books"
              element={<BookPageLibrarian />}
            />
            <Route
              path="/librarian/manage-loans"
              element={<LoanPageLibrarian />}
            />
            <Route path="/reader/search-books" element={<BookPageReader />} />
            <Route
              path="/librarian/manage-users"
              element={<UsersPageLibrarian />}
            ></Route>
            <Route path="/reader/my-loans" element={<MyLoansPage />} />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </ApiProvider>
      </I18nextProvider>
    </Router>
  );
}
export default App;
