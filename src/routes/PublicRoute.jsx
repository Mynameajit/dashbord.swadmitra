import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import DashboardLoader from "../components/loaders/DashboardLoader";

const PublicRoute = () => {
  const { user, loading } = useSelector((state) => state.user);

  if (loading.profile) return <DashboardLoader />;

  if (user) {
    return <Navigate to="/" replace />;
  }

  return  <Outlet />;
};

export default PublicRoute;