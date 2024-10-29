import girlReadingBook from "../../../assets/girlReadingBook.jpg";

const Banner = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-evenly my-5">
      <div className="lg:w-1/2">
        <h1 className="text-5xl font-semibold">
          Find the book that you are looking for to read right away.
        </h1>
        <p className="text-2xl mt-5 ">
          The most appropriate book site to search for books.
        </p>
      </div>
      <div className="lg:w-1/2 flex justify-center">
        <img
          src={girlReadingBook}
          alt="Girl reading book"
          className="rounded-xl max-w-96 my-5"
        />
      </div>
    </div>
  );
};

export default Banner;
