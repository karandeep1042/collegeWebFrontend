import './App.css';
import LoginPage from './Pages/Login Page/LoginPage';
import UserForm from './Pages/Module2/UserForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Pages/Module3/Dashboard';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/userdetails" element={<UserForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
