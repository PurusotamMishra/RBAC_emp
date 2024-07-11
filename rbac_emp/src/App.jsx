import UserDetails from './components/userDetails/userDetails'
import UserList from './components/userList/userList'
import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './components/home/home';
import RoleManagement from './components/role/roleManagement'

function App() {

  return (
    <div>
    <Routes>
      <Route path="/employee" element={<UserDetails />} />
      <Route path="/getall" element={<UserList />} />
      <Route path="/" element={<Home />} />
      <Route path="/manageroles" element={<RoleManagement />} />

      {/* Redirect to login if route does not match */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </div>
  );
}

export default App;
