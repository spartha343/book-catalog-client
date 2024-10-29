import { Link } from "react-router-dom";
import Loading from "../../../components/Loading";
import { useGetBooksQuery } from "../../../redux/features/book/bookApi";

const TopBooks = () => {
  const { data } = useGetBooksQuery();
  const books = data?.data;

  if (!books) {
    return <Loading />;
  }

  return (
    <div className="my-28">
      <h1 className="text-center text-3xl">Top 10 Recently added books</h1>

      {/* books  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-5">
        {books?.map((book) => (
          <div key={book._id} className="card glass">
            <div className="card-body">
              <h2 className="card-title">{book.title}</h2>
              <h3 className="text-base">
                Author: <b>{book.author}</b>
              </h3>
              <p>
                Genre: <b>{book.genre}</b>
              </p>
              <p>Published On: {book.publicationDate}</p>
              <div className="card-actions justify-end">
                <Link to={`/book-details/${book._id}`}>
                  <button className="btn btn-primary btn-sm">Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBooks;
