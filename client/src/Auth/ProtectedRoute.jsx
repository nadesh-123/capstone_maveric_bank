import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
 const user = useSelector((state) => state.user);

 
  if (user.id===null &&(allowedRoles==="CUSTOMER")) {
  
    return <Navigate to="/signin" replace />
  }
  else if(user.id===null){
    return <Navigate to="/empsignin" replace />
  }

 
  const hasRequiredRole = allowedRoles.includes(user.role)
   console.log(user.role)
   console.log(allowedRoles)
  if (!hasRequiredRole) {
   
    return <Navigate to="/unauthorized" replace />;
  }

  // 4. If they pass both checks, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;