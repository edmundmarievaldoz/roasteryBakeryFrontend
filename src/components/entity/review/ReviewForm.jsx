import { useState } from "react";
import "./ReviewForm.scss";

function ReviewForm({ onSubmit, serverError, isSaving }) {
  // Initialisation--------------------------------------
  // State keeps null for "empty"; the textarea needs "" instead.
  const conformance = {
    js2html: {
      reviewComment: (value) => (value === null ? "" : value),
    },
    html2js: {
      reviewComment: (value) => (value === "" ? null : value),
    },
  };

  // State ----------------------------------------------
  const [reviewComment, setReviewComment] = useState(null);
  const [errors, setErrors] = useState([]);

  // Handlers -------------------------------------------
    const handleChange = (event) => {
    setReviewComment(conformance.html2js.reviewComment(event.target.value));
  };

  const validate = (reviewStatus) => {
    const problems = [];
    const isEmpty = !reviewComment || reviewComment.trim() === "";
    if (reviewStatus === "Rejected" && isEmpty) {
      problems.push("Please give a reason for rejecting this recipe.");
    }
    return problems;
  };

  const handleDecision = (reviewStatus) => {
    const problems = validate(reviewStatus);
    setErrors(problems);
    if (problems.length > 0) return; // stop here: the API is never called

    const trimmed = reviewComment ? reviewComment.trim() : "";
    onSubmit({
      reviewStatus,
      reviewComment: trimmed === "" ? null : trimmed,
    });
  };

  // View -----------------------------------------------
  // Our own validation errors, plus the backend's message (if any)
  const messages = serverError ? [...errors, serverError] : errors;

  return (
    <div className="reviewForm">
      <div className="reviewForm__field">
        <label htmlFor="reviewComment">Reason</label>
        <textarea
          id="reviewComment"
          rows="5"
          placeholder="Required to reject, optional to approve"
          value={conformance.js2html.reviewComment(reviewComment)}
          onChange={handleChange}
        />
      </div>

      {messages.length > 0 && (
        <ul className="reviewForm__errors" role="alert">
          {messages.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      )}

      <div className="reviewForm__actions">
        <button
          type="button"
          className="reviewForm__button reviewForm__button--reject"
          onClick={() => handleDecision("Rejected")}
          disabled={isSaving}>
          Reject
        </button>
        <button
          type="button"
          className="reviewForm__button reviewForm__button--approve"
          onClick={() => handleDecision("Approved")}
          disabled={isSaving}>
          Approve
        </button>
      </div>
    </div>
  );
}

export default ReviewForm;
