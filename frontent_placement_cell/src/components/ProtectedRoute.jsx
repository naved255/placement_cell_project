import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProtectedRoute({ allowedRole }) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get("http://localhost:8000/check-auth", {
          withCredentials: true,
        });
        // res.data should contain user info (role, id, etc.)
        if (allowedRole && res.data.role !== allowedRole) {
          setIsAuth(false);
        } else {
          setIsAuth(true);
        }
      } catch (err) {
        setIsAuth(false);
      }
    };
    verifyUser();
  }, [allowedRole]);

  if (isAuth === null) return <div>Loading...</div>;

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}
