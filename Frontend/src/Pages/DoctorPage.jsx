import React, { useEffect, useState } from "react";
import DoctorNavbar from "../Components-1/DoctorNavbar";
import PatientList from "../Components-1/PatientList";
import { patientGet } from "../services/api";

const DoctorPage = () => {

  const [patientList, setPatientList] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await patientGet();
        setPatientList(response);
      } catch (error) {
        console.error("Error fetching patient list:", error);
      }
    };

    fetchPatients();
  }, []); 

  return (
    <>
      <div className="h-screen ">
        <DoctorNavbar />
        <PatientList data={patientList} />
      </div>
    </>
  );
};

export default DoctorPage;
