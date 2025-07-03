import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddPatient = () => {
  const [dynamicFields, setDynamicFields] = useState([]);
  const [newFieldCount, setNewFieldCount] = useState(0);

  const firstNameRef = useRef("");
  const lastNameRef = useRef("");
  const sexRef = useRef("");
  const ageRef = useRef("");
  const heightRef = useRef("");
  const weightRef = useRef("");
  const sportsHoursRef = useRef("");
  const stepsRef = useRef("");
  const sleepHoursRef = useRef("");
  const exerciseHoursRef = useRef("");
  const vo2MaxRef = useRef("");
  const allergiesRef = useRef("");
  const notesRef = useRef("");
  const reportsRef = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const patientData = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      sex: sexRef.current.value,
      age: ageRef.current.value,
      height: heightRef.current.value,
      weight: weightRef.current.value,
      sportsHours: sportsHoursRef.current.value,
      stepsPerDay: stepsRef.current.value,
      sleepHours: sleepHoursRef.current.value,
      exerciseHours: exerciseHoursRef.current.value,
      vo2Max: vo2MaxRef.current.value,
      allergies: allergiesRef.current.value,
      notes: notesRef.current.value,
      reports: reportsRef.current.files[0],
      dynamicFields: dynamicFields.reduce((acc, field) => {
        acc[field.name] = field.value;
        return acc;
      }, {}),
    };

    console.log("Patient Data:", patientData);
  };

  const addDynamicField = () => {
    setDynamicFields([
      ...dynamicFields,
      {
        id: Date.now(),
        name: "",
        type: "text",
        value: "",
      },
    ]);
  };

  const removeDynamicField = (id) => {
    setDynamicFields(dynamicFields.filter((field) => field.id !== id));
  };

  const updateDynamicField = (id, updates) => {
    setDynamicFields(
      dynamicFields.map((field) =>
        field.id === id ? { ...field, ...updates } : field
      )
    );
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex justify-center items-start py-20 px-4">
      <div className="w-[70%] mx-auto bg-white rounded-3xl shadow-[0_8px_30px_rgba(16,_185,_129,_0.2)]  backdrop-blur-sm bg-opacity-95 my-10 p-5">
        <header className="flex justify-center mb-12">
          <div className="w-[40%] h-20 bg-gradient-to-r from-emerald-500 to-teal-600 px-12 py-6 rounded-2xl shadow-md transform hover:scale-102 transition duration-300 flex justify-center items-center">
            <h1 className="text-4xl font-extrabold text-white tracking-wider drop-shadow-sm flex items-center justify-center gap-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              Add New Patient
            </h1>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6 px-8 py-6 mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput label="First Name" type="text" ref={firstNameRef} />
            <FormInput label="Last Name" type="text" ref={lastNameRef} />
            <FormSelect
              label="Sex"
              options={["Male", "Female", "Other"]}
              ref={sexRef}
            />
            <FormInput label="Age" type="number" ref={ageRef} />
            <FormInput label="Height (cm)" type="number" ref={heightRef} />
            <FormInput label="Weight (kg)" type="number" ref={weightRef} />
            <FormInput
              label="Sports Hours per Week"
              type="number"
              ref={sportsHoursRef}
            />
            <FormInput label="Steps per Day" type="number" ref={stepsRef} />
            <FormInput
              label="Sleep Hours per Day"
              type="number"
              ref={sleepHoursRef}
            />
            <FormInput
              label="Exercise Hours per Week"
              type="number"
              ref={exerciseHoursRef}
            />
            <FormInput label="VO2 Max" type="number" ref={vo2MaxRef} />
            <FormInput label="Allergies" type="text" ref={allergiesRef} />

            {/* Dynamic Fields */}
            {dynamicFields.map((field) => (
              <div key={field.id} className="col-span-2 flex gap-4 items-end">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Field Name"
                    className="w-full h-11 border-2 border-gray-300 rounded-xl px-4 mb-2"
                    value={field.name}
                    onChange={(e) =>
                      updateDynamicField(field.id, { name: e.target.value })
                    }
                  />
                  <select
                    className="w-full h-11 border-2 border-gray-300 rounded-xl px-4"
                    value={field.type}
                    onChange={(e) =>
                      updateDynamicField(field.id, { type: e.target.value })
                    }
                  >
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="date">Date</option>
                  </select>
                </div>
                <input
                  type={field.type}
                  className="flex-1 h-11 border-2 border-gray-300 rounded-xl px-4"
                  value={field.value}
                  onChange={(e) =>
                    updateDynamicField(field.id, { value: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => removeDynamicField(field.id)}
                  className="h-11 px-4 bg-red-500 text-white rounded-xl hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-semibold text-lg">
              Notes
            </label>
            <textarea
              ref={notesRef}
              className="w-full h-40 border-2 border-gray-300 rounded-2xl p-4 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 focus:outline-none transition duration-200 resize-none"
              placeholder="Enter any additional notes here..."
            />
          </div>

          <div className="w-full mt-2 p-4 flex justify-center">
            <button
              type="button"
              onClick={addDynamicField}
              className="bg-blue-500 text-white px-5 py-3 rounded-xl hover:bg-blue-600 transition duration-200 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add Custom Field
            </button>
          </div>

          <div className="space-y-2 mt-5">
            <label className="block text-gray-700 font-semibold text-lg">
              Pathology Reports (PDF)
            </label>
            <input
              type="file"
              accept=".pdf"
              ref={reportsRef}
              className="w-full file:mr-5 file:py-2.5 file:px-6 file:rounded-xl file:border-0 file:bg-emerald-500 file:text-white hover:file:bg-emerald-600 file:cursor-pointer file:shadow-sm file:transition-all file:duration-200 text-gray-600"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6 mt-3">
            <button
              type="button"
              className="w-full sm:w-40 bg-gray-400 text-white px-6 py-3 rounded-xl hover:bg-gray-500 transition duration-200 shadow-sm hover:shadow-md font-medium flex items-center justify-center gap-2"
              onClick={() => window.history.back()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-40 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 hover:from-emerald-600 hover:to-teal-700 transition duration-200 shadow-sm hover:shadow-md font-medium flex items-center justify-center gap-2 rounded-xl"
            >
              Add Patient
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

const FormInput = React.forwardRef(({ label, type }, ref) => (
  <div className="space-y-2">
    <label className="block text-gray-700 font-semibold text-lg">{label}</label>
    <input
      ref={ref}
      type={type}
      className="w-full h-11 border-2 border-gray-300 rounded-xl px-4 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 focus:outline-none transition duration-200"
    />
  </div>
));

const FormSelect = React.forwardRef(({ label, options }, ref) => (
  <div className="space-y-2">
    <label className="block text-gray-700 font-semibold text-lg">{label}</label>
    <select
      ref={ref}
      className="w-full h-11 border-2 border-gray-300 rounded-xl px-4 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 focus:outline-none transition duration-200 appearance-none bg-white"
    >
      <option value="" disabled selected>
        Select
      </option>
      {options.map((option, idx) => (
        <option key={idx} value={option.toLowerCase()}>
          {option}
        </option>
      ))}
    </select>
  </div>
));

export default AddPatient;
