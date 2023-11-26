import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header({ user }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogOut = () => {
    navigate("/login");
  };

  const handleAbout = () => {
    navigate("/");
  };

  const handleNotes = () => {
    navigate("/notes");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="flex justify-between items-center p-4">
      <h1 className="text-l font-bold">Hello, {user.email}</h1>
      <div className="flex gap-4">
        <button
          className={`font-bold py-2 px-4 rounded ${
            isActive("/") ? "text-blue-400" : ""
          }`}
          onClick={handleAbout}
        >
          About
        </button>
        <button
          className={`font-bold py-2 px-4 rounded ${
            isActive("/notes") ? "text-blue-400" : ""
          }`}
          onClick={handleNotes}
        >
          Notes
        </button>
        <button className="font-bold py-2 px-4 rounded" onClick={handleLogOut}>
          LogOut
        </button>
      </div>
    </div>
  );
}
