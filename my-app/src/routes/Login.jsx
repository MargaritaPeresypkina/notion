import { useContext, useState } from "react";
import { UserContext } from "../components/UserContextProvider";
import { useNavigate } from "react-router-dom";
import { User } from "../utils/validation";
import { z } from "zod";
import Footer from "../components/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);

  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  function handleLogin() {
    try {
      const userSchema = User.extend({
        dateSignUp: z.date(),
      });

      userSchema.parse({
        email,
        password,
        dateSignUp: new Date(),
      });

      setErrors(null);
      const query = new URLSearchParams({
        email,
        password,
      }).toString();

      fetch(`http://localhost:5001/users?${query}`)
        .then((r) => r.json())
        .then((users) => users[0])
        .then((user) => {
          if (user) {
            userContext.onChange(user);
            navigate("/");
          } else {
            setErrors("Invalid user");
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
        <h1 className="text-center text-3xl font-bold mb-6">Log In</h1>

        <input
          className="w-full border border-gray-300 px-4 py-2 rounded-lg mb-4"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex flex-col space-y-2">
          {errors?.email && (
            <div className="text-red-400">{errors?.email?._errors}</div>
          )}
        </div>
        <input
          className="w-full border border-gray-300 px-4 py-2 rounded-lg mb-4"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          {errors?.password && (
            <div className="text-red-400">{errors?.password?._errors}</div>
          )}
        </div>
        {errors === "Invalid user" && (
          <div className="text-red-400">{errors}</div>
        )}
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
      <Footer />
    </div>
  );
}
