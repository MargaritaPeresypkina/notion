import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { UserContext } from "../components/UserContextProvider";
import Footer from "../components/Footer";

const ViewNote = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(UserContext);
  const { note } = location.state;
  const [isDeleting, setIsDeleting] = useState(false);
  const handleEditNote = () => {
    navigate("/editnote", { state: { note } });
  };

  const handleDeleteNote = async () => {
    try {
      setIsDeleting(true);

      if (!note.id) {
        throw new Error("Invalid note ID");
      }

      await fetch(`http://localhost:5001/notes/${note.id}`, {
        method: "DELETE",
      });
      navigate("/notes");
    } catch (error) {
      console.error("Error deleting note:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-[800px] h-[400px] p-8 bg-white rounded-lg shadow-lg">
        <Header user={user} />
        <div className="flex flex-col justify-center items-center mt-3">
          <div className="flex items-center justify-between w-full">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 rounded"
              onClick={() => navigate("/notes")}
            >
              Back
            </button>
            <h1 className="text-3xl font-bold text-center">{note.name}</h1>
            <div>
              <button onClick={handleEditNote}>✍️</button>
              <button onClick={handleDeleteNote}>🗑️</button>
            </div>
          </div>
          <div className="w-full mt-4">
            <pre className="text-gray-600 text-lg bg-slate-200 px-5 py-5 whitespace-pre-wrap">
              {note.noteText}
            </pre>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ViewNote;
