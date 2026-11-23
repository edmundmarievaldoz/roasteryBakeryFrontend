import "./ReviewHistory.scss";
import apiURL from "../../api/apiURL.js";
import useLoad from "../../api/useLoad.js";
import RecordsState from "../../UI/RecordsState.jsx";
import StatusBadge from "../../UI/StatusBadge.jsx";

function ReviewHistory({ recipeID }) {
  // Initialisation--------------------------------------
  const reviewsEndpoint = `${apiURL}/recipereviews/recipe/${recipeID}`;

  // "2026-11-10 17:04:13" -> "10/11/2026" (the format follows the browser's language)
  const formatDate = (reviewDate) =>
    new Date(reviewDate.replace(" ", "T")).toLocaleDateString();

  // State ----------------------------------------------
  const [reviews, loadingMessage] = useLoad(reviewsEndpoint);

  // Handlers -------------------------------------------
  // View -----------------------------------------------
  // The backend already sorts the reviews newest first.
  return (
    <RecordsState
      records={reviews}
      loadingMessage={loadingMessage}
      emptyMessage="No reviews yet">
      {(list) => (
        <ul className="reviewHistory">
          {list.map((review) => (
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
      )}
    </RecordsState>
  );
}

export default ReviewHistory;
