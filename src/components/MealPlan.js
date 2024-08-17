import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Footer from "./Footer";
import 'react-calendar/dist/Calendar.css';
import './MealPlan.css';

function MealPlan() {
  // setting states for date notes and saved notes
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState({});
  const [savedNotes, setSavedNotes] = useState({});

  // Handle note input change
  const handleNoteChange = (event) => {
    setNotes({
      ...notes,
      [date.toDateString()]: event.target.value,
    });
  };

  // saving notes
  const handleSave = () => {
    setSavedNotes({
      ...savedNotes,
      [date.toDateString()]: notes[date.toDateString()],
    });
  };

    //what to render
  return (
    <div className="meal-plan-container">
      <h1>Meal Plan</h1>
      <div className="calendar-container">
        <Calendar
          onChange={setDate}
          value={date}
        />
        <p>Selected Date: {date.toDateString()}</p>
      </div>
      <div className="note-container">
        <h3>Notes for {date.toDateString()}</h3>
        <textarea
          value={notes[date.toDateString()] || ''}
          onChange={handleNoteChange}
          placeholder="Enter your meal plan notes here..."
        />
        <button onClick={handleSave}>Save</button>
      </div>
      <div className="saved-notes-container">
        <h3>Saved Notes</h3>
        {Object.entries(savedNotes).map(([date, note]) => (
          <div key={date} className="saved-note">
            <h4>{date}</h4>
            <p>{note}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default MealPlan;
