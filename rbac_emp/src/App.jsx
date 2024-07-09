import UserDetails from './components/userDetails/userDetails'
import UserList from './components/userList/userList'
import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";

function App() {

  return (
    <div>
    <Routes>
      <Route path="/employee" element={<UserDetails />} />
      <Route path="/getall" element={<UserList />} />

      {/* Redirect to login if route does not match */}
      <Route path="*" element={<Navigate to="/getall" />} />
    </Routes>
  </div>
  );
}

export default App;
