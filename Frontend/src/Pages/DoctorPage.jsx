import React from "react";
import DoctorNavbar from "../Components-1/DoctorNavbar";
import PatientList from "../Components-1/PatientList";

const DoctorPage = () => {
  return (
    <>
      <div className="h-screen ">
        <DoctorNavbar />
        <PatientList />
      </div>
    </>
  );
};

export default DoctorPage;
