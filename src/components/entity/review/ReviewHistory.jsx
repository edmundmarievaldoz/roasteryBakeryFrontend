import "./ReviewHistory.scss";
import apiURL from "../../api/apiURL.js";
import useLoad from "../../api/useLoad.js";
import StatusBadge from "../../UI/StatusBadge.jsx";

function ReviewHistory({ recipeID }) {
  // Initialisation--------------------------------------
  const reviewsEndpoint = `${apiURL}/recipereviews/recipe/${recipeID}`;

  // "2026-11-10 17:04:13" -> "10/11/2026" (the format follows the browser's language)
  const formatDate = (reviewDate) =>
    new Date(reviewDate.replace(" ", "T")).toLocaleDateString();

  // State ----------------------------------------------
  const [reviews, loadingMessage, , errorStatus] = useLoad(reviewsEndpoint);

  // Handlers -------------------------------------------
  // View -----------------------------------------------
  // 1. The API returns 404 when the recipe has no reviews yet
  if (errorStatus === 404) {
    return <p className="reviewHistory__message">No reviews yet</p>;
  }

  // 2. Still loading, or another error
  if (!reviews) {
    return <p className="reviewHistory__message">{loadingMessage}</p>;
  }

  // 3. We have reviews. The backend already sorts them newest first.
  return (
    <ul className="reviewHistory">
      {reviews.map((review) => (
        <li key={review.recipeReviewID} className="reviewHistory__item">
          <div className="reviewHistory__header">
            <span className="reviewHistory__reviewer">
              {review.reviewerFirstName} {review.reviewerLastName}
            </span>
            <StatusBadge status={review.reviewStatus} />
          </div>
          <span className="reviewHistory__date">{formatDate(review.reviewDate)}</span>
          {review.reviewComment && (
            <p className="reviewHistory__comment">{review.reviewComment}</p>
          )}
        </li>
      ))}
    </ul>
  );
}

export default ReviewHistory;
