import React from "react";
import DoctorNavbar from "../Components-1/DoctorNavbar";
import PatientFXN from "../Components-1/PatientFXN";

const DoctorPage = () => {
  return (
    <>
      <div className="bg-[#b5aef3] h-screen w-screen border-1 ">
        <DoctorNavbar />
        <PatientFXN />
      </div>
    </>
  );
};

export default DoctorPage;
