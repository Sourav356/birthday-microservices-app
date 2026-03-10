import React from 'react';

function Notes({ notes }) {
  return (
    <div>
      <h2>Celebration Notes</h2>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
    </div>
  );
}

export default Notes;
