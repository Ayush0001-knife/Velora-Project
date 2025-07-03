import PatientList from "./PatientList";
import { useNavigate } from "react-router-dom";

const PatientFXN = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden">
      <div className="h-[650px] w-[90%] mt-5 mx-auto rounded-2xl">
        <div className="flex justify-end mb-4">
          <div
            className="h-20 w-35 bg-green-400 mt-2 flex justify-evenly items-center gap-4 rounded-3xl hover:bg-green-500 cursor-pointer shadow-lg p-3"
            onClick={() => {
              navigate("/add-patient");
            }}
          >
            <div className="h-10 w-10 rounded-full overflow-hidden">
              <img
                src="/Plus.png"
                alt="Plus"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="text-lg font-bold text-white">Add Patient</span>
          </div>
        </div>

        <PatientList />
      </div>
    </div>
  );
};

export default PatientFXN;
