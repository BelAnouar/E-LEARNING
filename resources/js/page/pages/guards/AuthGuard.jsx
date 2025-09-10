import { Navigate, useLocation } from "react-router-dom";
import { useStateContext } from "../contexts/contextProvider";

const AuthGuard = ({ children, roles, adminOnly = false }) => {
  const location = useLocation();
  const { token } = useStateContext();
  const userRole = localStorage.getItem('USER_ROLE') || 'user';
  
 
  if (!token) {
    return <Navigate to="/SignIn" state={{ from: location }} replace />;
  }

  const adminRoutes = ['/admin', '/addcours', '/content', '/Media', '/dascc'];
  const isAdminRoute = adminRoutes.some(route => location.pathname.startsWith(route));


  if (userRole === 'admin' && !isAdminRoute) {
    return <Navigate to="/admin" replace />;
  }


  if (userRole !== 'admin' && isAdminRoute) {
    return <Navigate to="/" replace />;
  }

  
  if (adminOnly && userRole !== 'admin') {
    return <Navigate to="/" replace />;
  }

 
  if (roles && !roles.includes(userRole)) {
    
    if (userRole === 'admin') {
      return <Navigate to="/admin" replace />;
    }
  
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthGuard;