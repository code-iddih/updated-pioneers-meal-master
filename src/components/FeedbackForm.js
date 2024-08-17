import React, { useState } from 'react';
import './FeedbackForm.css';
import Footer from "./Footer";

function FeedbackForm() {
  // The sttate to manage feedback input, submission status, and display messages
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  // This will handle submission of the form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (feedback.trim().length < 10) {
      setMessage('Feedback must be at least 10 characters long.');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    // Submission process and message
    setTimeout(() => {
      console.log('Feedback submitted:', feedback);
      setFeedback('');
      setIsSubmitting(false);
      setMessage('Thank you for your feedback!');
    }, 2000);
  };

  // what is rendered
  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      <h2>Feedback</h2>
      <textarea 
        value={feedback} 
        onChange={(e) => setFeedback(e.target.value)} 
        placeholder="Your feedback here..." 
        rows="4" 
        cols="50" 
        required 
        className="feedback-textarea"
        disabled={isSubmitting}
      />
      <button type="submit" disabled={isSubmitting} className="feedback-button">
        {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
      </button>
      {message && <p className={`feedback-message ${isSubmitting ? 'submitting' : ''}`}>{message}</p>}
      <Footer />
    </form>
  );
}

export default FeedbackForm;
