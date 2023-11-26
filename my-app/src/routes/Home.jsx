import React, { useContext } from "react";
import { UserContext } from "../components/UserContextProvider";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const handleNotes = () => {
    navigate("/notes");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-[800px] h-[400px] p-8 bg-white rounded-lg shadow-lg">
        <Header user={user} />
        <div className="flex flex-col justify-center items-center mt-6">
          <h2 className="text-3xl font-bold mb-6">About me</h2>
          <p className="text-gray-600 text-lg">Email: {user.email}</p>
          <p className="text-gray-600 text-lg">
            Date of registration: {new Date(user.dateSignUp).toLocaleString()}
          </p>
          <div className="mt-6">
            <button
              className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${
                location.pathname === "/notes" ? "font-bold" : ""
              }`}
              onClick={handleNotes}
            >
              Go to notes
            </button>
          </div>
        </div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
