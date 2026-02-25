import { Stack } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DashboardLoader from "./components/loaders/DashboardLoader";
import { fetchOwner } from "./features/auth/authService";
import { getShop } from "./features/owner/shop/shopService";
import ProtectedRoute from "./routes/ProtectedRoute ";
import OwnerProtectedRoute from "./routes/OwnerProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

/* Lazy Imports */
const DashboardLogin = lazy(() => import("./pages/auth/DashboardLogin"));
const OwnerRegister = lazy(() => import("./pages/auth/OwnerRegister"));
const DeliveryRegister = lazy(() => import("./pages/auth/DeliveryRegister"));

const OwnerDashboardLayout = lazy(
  () => import("./components/layout/owner/OwnerDashboardLayout"),
);

const ShopDetailsForm = lazy(() => import("./pages/owner/ShopDetailsForm"));
const ApprovalPending = lazy(() => import("./pages/owner/ApprovalPending"));
const AddItem = lazy(() => import("./pages/owner/AddItems"));
const OwnerItems = lazy(() => import("./features/OwnerItems"));
const DashboardHome = lazy(() => import("./pages/owner/DashboardHome"));
const OwnerProfile = lazy(() => import("./pages/owner/OwnerProfile"));
const OwnerOrders = lazy(() => import("./pages/owner/OwnerOrders"));

const App = () => {
  const dispatch = useDispatch();
  const { isFetched, user } = useSelector((state) => state.user);
  const { isShopCreated } = useSelector((state) => state.shop);

  useEffect(() => {
    if (!isFetched) {
      dispatch(fetchOwner());
    }
  }, [isFetched, dispatch]);

  useEffect(() => {
    if (user && !isShopCreated) {
      dispatch(getShop());
    }
  }, [user, isShopCreated, dispatch]);

  return (
    <Suspense fallback={<DashboardLoader />}>
      <Stack>
        <Routes>
          {/* Default Redirect */}
          <Route
            path="/"
            element={
              user ? (
                <Navigate to="/owner/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Public */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<DashboardLogin />} />
            <Route path="/register-owner" element={<OwnerRegister />} />
          </Route>

          {/* Owner Protected */}
          <Route element={<OwnerProtectedRoute />}>
            <Route path="/owner/shop-details" element={<ShopDetailsForm />} />
            <Route
              path="/owner/approval-pending"
              element={<ApprovalPending />}
            />

            <Route element={<OwnerDashboardLayout />}>
              <Route path="/owner/dashboard" element={<DashboardHome />} />
              <Route path="/owner/add-item" element={<AddItem />} />
              <Route path="/owner/items" element={<OwnerItems />} />
              <Route path="/owner/profile" element={<OwnerProfile />} />
              <Route path="/owner/orders" element={<OwnerOrders />} />
            </Route>
          </Route>

          {/* 404 fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Stack>
    </Suspense>
  );
};
export default App;
