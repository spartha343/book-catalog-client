import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h3 className="font-semibold mb-3 text-2xl">
          The page you are looking for does not exist
        </h3>
        <Link to="/home">
          <button className="btn ">Go Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
