import React from "react";
import { useNavigate } from "react-router-dom";

const Note = ({ name, createdAt, note }) => {
  const navigate = useNavigate();

  const handleEditNote = (event) => {
    event.stopPropagation();
    navigate("/editnote", { state: { note } });
  };

  const handleDeleteNote = async (event) => {
    event.stopPropagation();

    try {
      await fetch(`http://localhost:5001/notes/${note.id}`, {
        method: "DELETE",
      });
      window.location.reload();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleClickNote = () => {
    navigate("/viewnote", { state: { note } });
  };

  return (
    <div
      className="bg-gray-300 p-2 rounded-lg flex justify-between items-center mb-2"
      onClick={handleClickNote}
    >
      <div className="pl-3">
        <h3 className="text-l font-bold inline">{name}</h3>
        <p className="text-gray-600 inline ml-2 text-sm">{createdAt}</p>
      </div>
      <div>
        <button
          className="text-xl text-blue-500 hover:text-blue-600 mr-2"
          onClick={handleEditNote}
        >
          ✍️
        </button>
        <button
          className="text-xl text-red-500 hover:text-red-600"
          onClick={handleDeleteNote}
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default Note;
