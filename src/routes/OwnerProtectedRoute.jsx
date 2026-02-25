import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import DashboardLoader from "../components/loaders/DashboardLoader";

const OwnerProtectedRoute = () => {
  const location = useLocation();

  const { user, isFetched ,loading} = useSelector((state) => state.user);

  // Loading check
  if (!isFetched || loading.profile) {
    return <DashboardLoader />;
  }

  // 1️⃣ Not Logged In
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2️⃣ Shop not created
  if (user?.status === "incomplete") {
    if (location.pathname !== "/owner/shop-details") {
      return <Navigate to="/owner/shop-details" replace />;
    }
    return <Outlet />;
  }

  // 3️⃣ Shop pending approval
  if (user?.status === "pending") {
    if (location.pathname !== "/owner/approval-pending") {
      return <Navigate to="/owner/approval-pending" replace />;
    }
    return <Outlet />;
  }

  // 4️⃣ Shop approved
  if (user?.status === "approved") {
    return <Outlet />;
  }

  return <Navigate to="/login" replace />;
};

export default OwnerProtectedRoute;