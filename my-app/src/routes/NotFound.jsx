import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../components/UserContextProvider";

const NotFound = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="flex flex-col items-center justify-center w-[800px] min-h-[400px] p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-center">Page Not Found</h1>
        <p className="text-lg text-center mb-4">
          The requested page could not be found.
        </p>
        {user ? (
          <Link to="/" className="text-blue-500 hover:text-blue-600 text-lg">
            Go to Home
          </Link>
        ) : (
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-600 text-lg"
          >
            Go to Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default NotFound;
