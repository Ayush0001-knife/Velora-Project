import PatientList from "./PatientList";
import { useNavigate } from "react-router-dom";

const PatientFXN = () => {
  const navigate = useNavigate();

  return (
    <div className="h-[800px] w-[90%] mt-30 mx-auto rounded-2xl ">
      <div className="h-[650px] w-[90%] mx-auto overflow-hidden overflow-y-scroll rounded-2xl">
        <PatientList />
      </div>
    </div>
  );
};

export default PatientFXN;
