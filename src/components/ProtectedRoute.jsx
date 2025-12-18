import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { isLoggedIn } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  if (!isLoggedIn()) {
    toast.error("Please login first");
    return <Navigate to="/LoginForm" replace />;
  }

  return children;
};

export default ProtectedRoute;
