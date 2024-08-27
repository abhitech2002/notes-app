import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './NoteDetail.css'; 

const NoteDetail = ({ notes }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const note = notes.find((note) => note.id === parseInt(id, 10));
  
    if (!note) {
      console.error('Note with ID:', id, 'not found in data.');
      return <p className="note-detail-not-found">Note not found.</p>;
    }
  
    return (
      <div className="note-detail-wrapper">
        <div className="note-detail-header">
          <h2 className="note-detail-title">{note.title}</h2>
          <button className="note-detail-back-button" onClick={() => navigate('/')}>Back to Notes</button>
        </div>
        <div className="note-detail-content">
          <p className="note-detail-text">{note.content}</p>
          <small className="note-detail-date">{new Date(note.date).toLocaleString()}</small>
        </div>
      </div>
    );
  };

export default NoteDetail;
