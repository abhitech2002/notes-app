import React from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Note = ({ note, deleteNote, fetchSingleNote }) => {
  const navigate = useNavigate();

  const handleViewNote = () => {
    navigate(`/note/${note.id}`);
  };

  return (
    <div className="note-container">
      <div className="note-header">
        <h3 className="note-title">{note.title}</h3>
        <FaEye onClick={handleViewNote} className="icon eye-icon" />
      </div>
      <div className="note-content">
        <p>{note.content.split(' ').slice(0, 10).join(' ')}...</p>
      </div>
      <div className="note-footer">
        <small>{new Date(note.date).toLocaleString()}</small>
        <div className="note-actions">
          <FaEdit onClick={() => fetchSingleNote(note.id)} className="icon edit-icon" />
          <FaTrash onClick={() => deleteNote(note.id)} className="icon delete-icon" />
        </div>
      </div>
    </div>
  );
};

export default Note;
