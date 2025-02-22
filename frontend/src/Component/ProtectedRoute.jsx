import { Navigate} from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
    const userRole = localStorage.getItem("role");
    console.log("ProtectedRoute - expected role:", role, "user role:", userRole);
  
    if (!userRole || userRole !== role) {
      console.log("Redirecting to login");
      return <Navigate to="/login" />;
    }
    
    console.log("Rendering children");
    return children;
  };

export default ProtectedRoute;
