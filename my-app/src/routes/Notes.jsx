import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/UserContextProvider";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Note from "../components/Note";
import Footer from "../components/Footer";

const Notes = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [userNotes, setUserNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleAddNewNote = () => {
    navigate("/createnote");
  };

  useEffect(() => {
    const fetchUserNotes = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/notes?userId=${user.id}`
        );
        const notes = await response.json();
        setUserNotes(notes.reverse());
      } catch (error) {
        console.error("Error fetching user notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserNotes();
  }, [user.id]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-[800px] min-h-[400px] p-8 bg-white rounded-lg shadow-lg">
        <Header user={user} />
        <div className="flex flex-col justify-center items-center mt-2 mb-3">
          <h2 className="text-3xl font-bold">Notes</h2>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold mt-5 py-2 px-4 rounded"
            onClick={handleAddNewNote}
          >
            Add new note
          </button>
        </div>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : userNotes.length === 0 ? (
            <p>No notes at the moment</p>
          ) : (
            userNotes.map((note) => (
              <Note
                key={note.id}
                name={note.name}
                createdAt={new Date(note.dateCreateNote).toLocaleDateString()}
                note={note}
              />
            ))
          )}
        </div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Notes;
