import React, { useContext } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { AuthContext } from "./context/AuthContext";
import Dashbord from './Pages/Dashbord/Dashbord';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './Pages/Profile/Profile';
import { ChatContextProvider } from './context/ChatContext';

function App() {

  const { user } = useContext(AuthContext);

  return (
    <ChatContextProvider user={user}>
      <Routes>
        <Route path="/dashbord" element={user ? <Dashbord /> : <Login />} />
        <Route path="/" element={user ? <Dashbord /> : <Register />} />
        <Route path="/login" element={user ? <Dashbord /> : <Login />} />
        <Route path="*" element={<Navigate to="/" />} />

        <Route path="/profile" element={user ? <Profile /> : <Login />} />

      </Routes>
      <ToastContainer theme='dark' autoClose={2000} />
    </ChatContextProvider>
  );
}

export default App;
