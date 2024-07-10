import UserDetails from "./components/userDetails/userDetails";
import UserList from "./components/userList/userList";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import RoleManagement from "./components/Role/RoleManagement";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/employee" element={<UserDetails />} />
        <Route path="/getall" element={<UserList />} />
        Redirect to login if route does not match
        <Route path="*" element={<Navigate to="/getall" />} />
        <Route path="/manageroles" element={<RoleManagement />} />
      </Routes>
    </div>
  );
}

export default App;
