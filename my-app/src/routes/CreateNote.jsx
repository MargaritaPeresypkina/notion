import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { UserContext } from "../components/UserContextProvider";
import Footer from "../components/Footer";

const CreateNote = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [noteText, setNoteText] = useState("");
  const [errors, setErrors] = useState({});
  const { user } = useContext(UserContext);

  const handleCreateNote = () => {
    const errors = {};
    if (!name.trim()) {
      errors.name = "Name cannot be empty";
    }

    if (Object.keys(errors).length === 0) {
      const note = {
        name: name,
        noteText: noteText,
        userId: user.id,
        dateCreateNote: new Date(),
      };

      fetch("http://localhost:5001/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to create note");
          }
        })
        .then((createdNote) => {
          navigate("/viewnote", { state: { note: createdNote } });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-[800px]  min-h-[400px] p-8 bg-white rounded-lg shadow-lg">
        <Header user={user} />
        <div className="flex flex-col justify-center items-center mt-2">
          <h2 className="text-3xl font-bold">Create New Note</h2>
          <div className="mt-4">
            <label htmlFor="name" className="text-lg font-semibold">
              Name:
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter name..."
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
              placeholder="Enter note text..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
            />
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 mr-5"
              onClick={handleCreateNote}
            >
              Create
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

export default CreateNote;
