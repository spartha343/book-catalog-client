import { IBook } from "../../redux/features/book/book.interface";
import { useAddBookMutation } from "../../redux/features/book/bookApi";
import { useNavigate } from "react-router-dom";
import handleResponse from "../../hooks/handleResponse";

const AddNewBook = () => {
  const navigate = useNavigate();
  const [addBook] = useAddBookMutation();

  const handleAddBook = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const newBook: Partial<IBook> = {
      title: (form.elements.namedItem("title") as HTMLInputElement).value,
      author: (form.elements.namedItem("author") as HTMLInputElement).value,
      genre: (form.elements.namedItem("genre") as HTMLInputElement).value,
      description: (
        form.elements.namedItem("description") as HTMLTextAreaElement
      ).value,
      publicationDate: (
        form.elements.namedItem("publicationDate") as HTMLInputElement
      ).value
    };

    const { data } = await addBook(newBook);
    await handleResponse<IBook>(data!);
    form.reset(); // Reset form on successful submission
    navigate("/all-books");
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Add a Book Now !</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-xl shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleAddBook}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                placeholder="Title"
                className="input input-bordered"
                name="title"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Author</span>
              </label>
              <input
                type="text"
                placeholder="Author"
                className="input input-bordered"
                name="author"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Genre</span>
              </label>
              <input
                type="text"
                placeholder="Genre"
                className="input input-bordered"
                name="genre"
                required
              />
            </div>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Book Description</span>
              </div>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="Book Description"
                name="description"
              ></textarea>
            </label>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Publication Date</span>
              </label>
              <input
                type="date"
                placeholder="Publication Date"
                className="input input-bordered"
                name="publicationDate"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Add Book</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewBook;
