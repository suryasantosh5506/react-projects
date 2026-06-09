import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Oops!</h1>

      <p className="text-gray-600 mt-2">{error.statusText || error.message}</p>

      <Link to="/" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
