import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../utils/validation";
import { z } from "zod";
import Footer from "../components/Footer";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  function handleSignUp() {
    try {
      const newUser = User.parse({
        email,
        password,
        dateSignUp: new Date(),
      });

      const ISSUE_PASS = ["Passwords are not the same"];
      if (password !== confirmPassword) {
        setErrors({ password: ISSUE_PASS });
        return;
      }

      setErrors(null);

      fetch("http://localhost:5001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then((response) => response.json())
        .then((user) => {
          if (user) {
            navigate("/login");
          } else {
            setErrors("Failed to create user");
          }
        });
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.format());
      }
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-center text-3xl font-bold mb-6">Sign Up</h1>

        <input
          className="w-full border border-gray-300 px-4 py-2 rounded-lg mb-4"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors?.email && (
          <div className="text-red-400">{errors?.email?._errors}</div>
        )}
        <input
          className="w-full border border-gray-300 px-4 py-2 rounded-lg mb-4"
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors?.password && (
          <div className="text-red-400">{errors?.password?._errors}</div>
        )}
        <input
          className="w-full border border-gray-300 px-4 py-2 rounded-lg mb-4"
          placeholder="Retry the password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors?.password && (
          <div className="text-red-400">{errors.password[0]}</div>
        )}

        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
      </div>
      <Footer />
    </div>
  );
}
