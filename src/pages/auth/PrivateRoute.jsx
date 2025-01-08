import React from "react";
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

  return currentUser ? children : <Navigate to="/login" />;
}
