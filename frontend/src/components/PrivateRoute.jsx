import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

// so what this whole private guard component does is that it checks if im logged in but if im not i cant go to specific routes it just takes me back to the login component
const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo ? <Outlet /> : <Navigate to='/login' replace />
}

export default PrivateRoute