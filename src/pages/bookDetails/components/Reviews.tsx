import { useState } from "react";
import {
  useAddReviewMutation,
  useDeleteReviewMutation,
  useGetReviewsByBookIdQuery,
  useUpdateReviewMutation
} from "../../../redux/features/review/reviewApi";
import handleResponse from "../../../hooks/handleResponse";
import { IReview } from "../../../redux/features/review/review.interface";

const Reviews = ({ bookId }: { bookId: string }) => {
  const { data, isLoading, error } = useGetReviewsByBookIdQuery(bookId);
  const reviews = data?.data ?? [];

  const [addReview] = useAddReviewMutation();
  const [updateReview] = useUpdateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();

  const [newReview, setNewReview] = useState("");
  const [editReviewId, setEditReviewId] = useState<string | null>(null);
  const [editReviewContent, setEditReviewContent] = useState("");

  const handleAddReview = async () => {
    const { data } = await addReview({ book: bookId, content: newReview });
    if (newReview.trim()) {
      await handleResponse<IReview>(data!);
      setNewReview(""); // Reset successful submission
    }
  };

  const handleEditReview = async (reviewId: string) => {
    if (editReviewContent.trim()) {
      const { data } = await updateReview({
        reviewId,
        data: { content: editReviewContent }
      });
      await handleResponse<IReview>(data!);
      setEditReviewId(null);
      setEditReviewContent("");
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    const { data } = await deleteReview(reviewId);
    await handleResponse<IReview>(data!);
  };

  return (
    <div>
      {/* Add Review Section */}
      <label className="form-control w-full max-w-5xl mx-auto">
        <div className="label">
          <span className="label-text">Add a Review</span>
        </div>
        <input
          type="text"
          placeholder="Add a Review"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          className="input input-bordered w-full max-w-5xl"
        />
        <div className="label">
          <span className="label-text-alt"></span>
          <span className="label-text-alt">
            <button onClick={handleAddReview} className="btn btn-sm">
              Add Review
            </button>
          </span>
        </div>
      </label>

      <h3 className="text-lg text-center">All Reviews</h3>

      {/* List of Reviews */}
      <div className="mt-6 max-w-5xl mx-auto">
        {isLoading ? (
          <p>Loading reviews...</p>
        ) : error ? (
          <p>Error loading reviews</p>
        ) : reviews.length > 0 ? (
          reviews.map((review: IReview) => (
            <div key={review._id} className="border-b pb-2 my-2">
              {editReviewId === review._id ? (
                // Edit Review Mode
                <div>
                  <input
                    type="text"
                    value={editReviewContent}
                    onChange={(e) => setEditReviewContent(e.target.value)}
                    className="input input-bordered w-full"
                  />
                  <button
                    onClick={() => handleEditReview(review._id!)}
                    className="btn btn-sm btn-success mt-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditReviewId(null)}
                    className="btn btn-sm btn-secondary mt-2 ml-2"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                // Display Review
                <div>
                  <p>{review.content}</p>
                  <button
                    onClick={() => {
                      setEditReviewId(review._id!);
                      setEditReviewContent(review.content);
                    }}
                    className="btn btn-xs btn-warning mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteReview(review._id!)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
