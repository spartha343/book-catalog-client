import { Navigate, useLocation } from "react-router-dom";
import Loading from "../../components/Loading";
import { useAppSelector } from "../../redux/hooks/hooks";
import { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { loading, user, initialLoading } = useAppSelector(
    (state) => state.auth
  );
  if (loading || initialLoading) {
    return <Loading />;
  } else if (!user) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
