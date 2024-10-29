import React, { useState } from "react";
import { IBook } from "../../../redux/features/book/book.interface";
import { useUpdateBookMutation } from "../../../redux/features/book/bookApi";
import handleResponse from "../../../hooks/handleResponse";
import { IApiResponse } from "../../../interfaces/apiResponse";
import toast from "react-hot-toast";

interface EditBookModalProps {
  book: IBook;
  onClose: () => void;
}

const EditBookModal: React.FC<EditBookModalProps> = ({ book, onClose }) => {
  const [updatedBook, setUpdatedBook] = useState<IBook>(book);
  const [updateBook] = useUpdateBookMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedBook({ ...updatedBook, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Call the updateBook mutation
    const result = await updateBook(updatedBook);

    // Check if the result has data indicating success
    if ("data" in result) {
      await handleResponse<IBook>(result.data!); // Handle success
      onClose(); // Close modal after updating
    } else if ("error" in result) {
      // Handle the case where there was an error in the mutation
      const errorResponse = result.error;

      // Check if it's a FetchBaseQueryError
      if ("status" in errorResponse) {
        const errorData = errorResponse.data as IApiResponse<IBook>; // Assuming this contains your error messages
        await handleResponse<IBook>(errorData);
      } else {
        // Handle SerializedError or any other error type
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h2 className="font-bold text-lg">Edit Book</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              name="title"
              value={updatedBook.title}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Author</span>
            </label>
            <input
              type="text"
              name="author"
              value={updatedBook.author}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Genre</span>
            </label>
            <input
              type="text"
              name="genre"
              value={updatedBook.genre}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Published Date</span>
            </label>
            <input
              type="date"
              name="publicationDate"
              value={updatedBook.publicationDate}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              name="description"
              value={updatedBook.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
              rows={4}
            />
          </div>
          <div className="modal-action">
            <button type="submit" className="btn">
              Save
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookModal;
