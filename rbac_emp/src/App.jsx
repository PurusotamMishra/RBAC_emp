import UserDetails from './components/userDetails/userDetails'
import UserList from './components/userList/userList'
import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './components/home/home';
import Register from './components/register/register';
import RoleManagement from './components/role/roleManagement'

function App() {

  return (
    <div>
    <Routes>
      <Route path="/employee" element={<UserDetails userEmail={'prem.kumar@company.net'} />} />
      <Route path="/getall" element={<UserList />} />
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/manageroles" element={<RoleManagement />} />

      {/* Redirect to login if route does not match */}
      <Route path="*" element={<Navigate to="/getall" />} />
    </Routes>
  </div>
  );
}

export default App;
