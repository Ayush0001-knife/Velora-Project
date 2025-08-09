import React from "react";
import DoctorPage from "./Pages/DoctorPage";
import { Routes, Route } from "react-router-dom";
import AddPatient from "./Components-1/AddPatient";
import PatientPage from "./Components-1/PatientPage";
import LoginPage from "./Components-1/LoginPage";
import AdminInterface from "./Pages/AdminInterface";
import PatientInterface from "./Pages/PatientInterface";
import ChatPage from "./Components-1/ChatPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<DoctorPage />} />
        <Route path="/add-patient" element={<AddPatient />} />
        <Route path="/patient" element={<PatientPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>

      {/* <PatientInterface /> */}
      {/* <AdminInterface /> */}
    </>
  );
};

export default App;