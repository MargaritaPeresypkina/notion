import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { UserContext } from "../components/UserContextProvider";
import Footer from "../components/Footer";

const EditNote = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(UserContext);
  const { note } = location.state;

  const [name, setName] = useState(note.name);
  const [noteText, setNoteText] = useState(note.noteText);
  const [errors, setErrors] = useState({});

  const handleSaveNote = () => {
    const errors = {};
    if (!name.trim()) {
      errors.name = "Name cannot be empty";
    }

    if (Object.keys(errors).length === 0) {
      const updatedNote = {
        ...note,
        name: name,
        noteText: noteText,
      };

      fetch(`http://localhost:5001/notes/${updatedNote.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedNote),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.error) {
            setErrors({ name: json.error });
          } else {
            navigate("/viewnote", { state: { note: updatedNote } });
          }
        })
        .catch((error) => {
          console.error("Error updating note:", error);
          setErrors(error);
        });
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-[800px] min-h-[400px] p-8 bg-white rounded-lg shadow-lg">
        <Header user={user} />
        <div className="flex flex-col justify-center items-center mt-6">
          <h1 className="text-3xl font-bold">Edit Note</h1>
          <div className="mt-4">
            <label htmlFor="name" className="text-lg font-semibold">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
            />
            {errors.name && (
              <div className="text-red-400 mt-1">{errors.name}</div>
            )}
          </div>
          <div className="mt-4">
            <label htmlFor="noteText" className="text-lg font-semibold">
              Note text:
            </label>
            <textarea
              id="noteText"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
            />
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 mr-8"
              onClick={handleSaveNote}
            >
              Save
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={() => navigate("/notes")}
            >
              Back
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditNote;
