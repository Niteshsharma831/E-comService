import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Optional: Vercel Analytics
// import { Analytics } from "@vercel/analytics/react";

// Components & Pages
import Navbar from "./components/navbar";
import Home from "./pages/home";
import LoginPages from "./pages/loginPages";
import Register from "./pages/Register";
import ProfilePage from "./pages/ProfilePage";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import ShopPage from "./pages/ShopPage";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";
import SearchPage from "./components/SearchPage";
import ElectronicPage from "./pages/ElectronicPage";
import FashionPage from "./pages/FashionPage";
import HomeAndTv from "./pages/Home&Tv";
import GroceryPage from "./pages/GroceryPage";
import SmartPhones from "./pages/SmartPhones";
import ProductDetailPage from "./pages/ProductDetailPage";
import Query from "./pages/Query";
import Maintenance from "./components/Maintenance";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import UserManagement from "./pages/admin/UserManagement";
import ProductPublish from "./pages/admin/ProductPublish";
import ProductManagement from "./pages/admin/ProductManagement";
import AdminLogin from "./pages/admin/AdminLogin";
import Logout from "./pages/admin/Logout";
import AdminPrivateRoute from "./pages/admin/components/AdminPrivateRoute";
import UpdateProductForm from "./pages/admin/UpdateProductForm";
import CreateAdmin from "./pages/admin/CreateAdmin";
import UpdateUserDetails from "./pages/admin/UpdateUserDetails";
import AdminProfile from "./pages/admin/AdminProfile";

// Order Pages
import OrderFormPage from "./pages/OrderFormPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import MyOrdersPage from "./pages/OrderPage";

// Utilities
import ScrollToTop from "./hooks/ScrollToTop";
import RazorpayPayment from "./pages/RazorpayPayment";
import About from "./pages/About";
import Booking from "./context/BookingPage";

// ✅ Detect if on admin route
const useIsAdminRoute = () => {
  const location = useLocation();
  return location.pathname.startsWith("/admin");
};

const AppContent = () => {
  const isAdmin = useIsAdminRoute();
  // const maintenanceMode = process.env.REACT_APP_MAINTENANCE === "true";

  // ✅ Maintenance mode check
  // if (maintenanceMode && !isAdmin) {
  //   return <Maintenance />;
  // }

  return (
    <>
      <ScrollToTop />
      {/* <Analytics /> */}
      {!isAdmin && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/login" element={<LoginPages />} />
        <Route path="/register" element={<Register />} />
        <Route path="/smartphone" element={<SmartPhones />} />
        <Route path="/buy/:id" element={<ProductDetailPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/electronic" element={<ElectronicPage />} />
        <Route path="/fashions" element={<FashionPage />} />
        <Route path="/home&tv" element={<HomeAndTv />} />
        <Route path="/grocery" element={<GroceryPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />

        {/* Private Routes */}
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <CartPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/account"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <OrderPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <PrivateRoute>
              <Query />
            </PrivateRoute>
          }
        />
        <Route
          path="/order"
          element={
            <PrivateRoute>
              <OrderFormPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-orders"
          element={
            <PrivateRoute>
              <MyOrdersPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/razorpay-payment"
          element={
            <PrivateRoute>
              <RazorpayPayment />
            </PrivateRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminPrivateRoute>
              <Dashboard />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminPrivateRoute>
              <UserManagement />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/publish"
          element={
            <AdminPrivateRoute>
              <ProductPublish />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminPrivateRoute>
              <ProductManagement />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <AdminPrivateRoute>
              <AdminProfile />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/logout"
          element={
            <AdminPrivateRoute>
              <Logout />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/update/:id"
          element={
            <AdminPrivateRoute>
              <UpdateProductForm />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/create-admin"
          element={
            <AdminPrivateRoute>
              <CreateAdmin />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/edit-user/:userId"
          element={
            <AdminPrivateRoute>
              <UpdateUserDetails />
            </AdminPrivateRoute>
          }
        />
      </Routes>

      {!isAdmin && <Footer />}

      {/* ✅ Toast setup */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

// Main App
const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
