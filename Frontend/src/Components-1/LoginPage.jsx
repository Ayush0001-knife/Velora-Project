// Homify Styled Login Page with background and soft pink-white theme

import React, { useRef, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";
import Notification from "../Components2/code/Notification";
import { Label } from "../Components2/ui/label";
import { Input } from "../Components2/ui/input";
import { cn } from "../lib/utils";
import ColourfulText from "../Components2/ui/colourful-text";
import { loginUser } from "../services/api"; // Adjust path if different
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [togglePass1, setTogglePass1] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [duration, setDuration] = useState(null);
  const navigate = useNavigate();

  const emailElement = useRef(null);
  const passwordElement = useRef(null);

  const toggle1 = () => setTogglePass1(!togglePass1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailElement.current.value;
    const password = passwordElement.current.value;

    if (!email || !password) {
      setMessage("Email and Password are required fields");
      setBgColor("#FF2400");
      setDuration(3000);
      setShowNotification(true);
      return;
    }

    if (email.length < 5 || password.length < 5) {
      setMessage("Email and Password must be at least 5 characters");
      setBgColor("#FF2400");
      setDuration(3000);
      setShowNotification(true);
      return;
    }

    try {
      const data = await loginUser({ email, password });

      // Assuming token comes from `data.token` (adjust if different)
      localStorage.setItem("access_token", data.token);
      console.log("Data", data);

      setMessage("Login Successful");
      setBgColor("#088F8F");
      setDuration(3000);
      setShowNotification(true);

      navigate("/home");
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Login failed. Try again.";
      setMessage(errorMsg);
      setBgColor("#FF2400");
      setDuration(3000);
      setShowNotification(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white  to-white relative px-4 py-12">
      <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-8 border border-pink-200">
        <h2
          className="text-2xl font-extrabold text-center text-pink-900 mb-2"
          onClick={() => {
            setShowNotification(true);
            setMessage("Login Successful");
            setBgColor("#088F8F");
            setDuration(3000);
          }}
        >
          Login to Velora
        </h2>

        <div className="text-center text-sm mb-6">
          Welcome to <ColourfulText text="VELORA" /> – Your{" "}
          <ColourfulText text="Health Partner" />
        </div>

        <form onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="homify@email.com"
              type="email"
              ref={emailElement}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                placeholder="••••••••"
                type={togglePass1 ? "text" : "password"}
                ref={passwordElement}
              />
              {togglePass1 ? (
                <IoMdEyeOff
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={toggle1}
                />
              ) : (
                <FaEye
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={toggle1}
                />
              )}
            </div>
          </LabelInputContainer>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-400 text-white py-2 rounded-lg font-semibold hover:shadow-md hover:shadow-pink-300 transition-all duration-300"
          >
            Login
          </button>
        </form>
      </div>

      {showNotification && (
        <Notification
          message={message}
          bgColor={bgColor}
          duration={duration}
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
}

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex flex-col space-y-1", className)}>{children}</div>
);
