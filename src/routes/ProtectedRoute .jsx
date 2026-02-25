import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import DashboardLoader from "../components/loaders/DashboardLoader";

const ProtectedRoute = ({ children }) => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  console.log(user);

  if (loading?.profile) return <DashboardLoader/>;

  // Agar login nahi hai
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
