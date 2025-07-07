import React from "react";
import DoctorNavbar from "../Components-1/DoctorNavbar";
import PatientFXN from "../Components-1/PatientFXN";

const DoctorPage = () => {
  return (
    <>
      <div className="h-screen">
        <DoctorNavbar />
        <PatientFXN />
      </div>
    </>
  );
};

export default DoctorPage;
