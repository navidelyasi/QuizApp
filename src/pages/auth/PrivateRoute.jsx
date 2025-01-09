import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext.jsx";
import "../../styles/pages-styles/index.css";

export default function PrivateRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading)
    return (
      <div className="submitting-overlay">
        <div className="submitting-content">
          <div className="general-text">Loading ...</div>
        </div>
      </div>
    );

  if (!currentUser) return <Navigate to="/login" />;

  if (!currentUser.emailVerified) return <Navigate to="/verify-email" />;

  return children;
}
