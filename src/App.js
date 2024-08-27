import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import notesService from './services/notesService';
import Note from './pages/note';
import NoteDetail from './component/NoteDetails'

const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [currentNoteId, setCurrentNoteId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const notesData = await notesService.getNotes();
      setNotes(notesData);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const fetchSingleNote = async (id) => {
    try {
      const note = await notesService.getNote(id);
      setTitle(note.title);
      setContent(note.content);
      setCurrentNoteId(note.id);
    } catch (error) {
      console.error('Error fetching note:', error);
    }
  };

  const addOrUpdateNote = async () => {
    if (title && content) {
      try {
        if (currentNoteId) {
          await notesService.updateNote(currentNoteId, { title, content });
          setCurrentNoteId(null);
        } else {
          await notesService.addNote({ title, content });
        }
        setTitle('');
        setContent('');
        fetchNotes();
      } catch (error) {
        console.error('Error adding/updating note:', error);
      }
    }
  };

  const deleteNote = async (id) => {
    try {
      await notesService.deleteNote(id);
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <h1>Notes</h1>
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button onClick={addOrUpdateNote}>
            {currentNoteId ? 'Update Note' : 'Add Note'}
          </button>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <div className="notes">
                {notes.map(note => (
                  <Note
                    key={note.id}
                    note={note}
                    deleteNote={deleteNote}
                    fetchSingleNote={fetchSingleNote}
                  />
                ))}
              </div>
            }
          />
          <Route
            path="/note/:id"
            element={<NoteDetail notes={notes} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
