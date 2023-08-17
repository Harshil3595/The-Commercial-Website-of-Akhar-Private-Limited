// ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

function Protected({ isSignedIn, isAdmin, children ,user}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSignedIn !== null) {
      setLoading(false);
    }
  }, [isSignedIn]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  if (isAdmin && user?.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default Protected;
