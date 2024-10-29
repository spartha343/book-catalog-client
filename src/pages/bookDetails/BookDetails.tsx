import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteBookMutation,
  useGetBookByIdQuery
} from "../../redux/features/book/bookApi";
import Loading from "../../components/Loading";
import Reviews from "./components/Reviews";
import { useState } from "react";
import EditBookModal from "./components/EditBookModal";
import handleResponse from "../../hooks/handleResponse";
import { IBook } from "../../redux/features/book/book.interface";
import { IApiResponse } from "../../interfaces/apiResponse";
import toast from "react-hot-toast";

const BookDetails = () => {
  const navigate = useNavigate();
  const param = useParams();
  const id = param.id!;
  const { data, isLoading } = useGetBookByIdQuery(id!);
  const book = data?.data;
  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      const result = await deleteBook(id);
      // Check if the result has data indicating success
      if ("data" in result) {
        await handleResponse<IBook>(result.data!); // Handle success
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
      navigate("/");
    }
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (isLoading) return <Loading />;

  return (
    <div className="my-10">
      <div className="container mx-auto  p-5">
        <div className="card glass w-full max-w-5xl mx-auto">
          <div className="card-body">
            <h2 className="card-title text-3xl font-semibold">{book?.title}</h2>
            <p className="text-lg text-gray-700 mt-2">
              <strong>Author:</strong> {book?.author}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Genre:</strong> {book?.genre}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Published on:</strong> {book?.publicationDate}
            </p>
            <p className="mt-4 text-gray-600">{book?.description}</p>
          </div>
          <div className="card-actions justify-end p-4">
            <button onClick={handleDelete} className="btn btn-error">
              Delete
            </button>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="btn btn-warning"
            >
              Edit
            </button>
            <button className="btn btn-primary">Add to Wishlist</button>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <EditBookModal book={book!} onClose={() => setIsEditModalOpen(false)} />
      )}

      {/* Review section  */}
      <Reviews bookId={id} />
    </div>
  );
};

export default BookDetails;
