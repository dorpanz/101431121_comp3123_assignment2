import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { EmployeeList } from './EmployeeList';
import { Register } from './Register';
import Login from './Login';
import AddForm from './AddForm';
import ViewEmployee from './ViewEmployee';
import UpdateForm from './UpdateFrom';
import ProtectedRoute from './ProtectedRoute'; 

function App() {
  const handleLogout = () => {
    localStorage.removeItem('authToken');
  };

  return (
    <Router>
      <div className="App">
        <nav className="menu">
          <ul>
            <li>
              <Link to="/employees" className="menu-link">Employee List</Link>
            </li>
            <li>
              <Link to="/" className="menu-link">Register</Link>
            </li>
            <li>
              <Link to="/login" className="menu-link">Login</Link>
            </li>
            <li>
              <Link onClick={handleLogout} className="menu-link">Logout</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route
            path="/employees"
            element={
              <ProtectedRoute>
                <EmployeeList />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/employees/add" element={<ProtectedRoute><AddForm /></ProtectedRoute>} />
          <Route path="/employees/view" element={<ProtectedRoute><ViewEmployee /></ProtectedRoute>} />
          <Route path="/employees/update" element={<ProtectedRoute><UpdateForm /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
