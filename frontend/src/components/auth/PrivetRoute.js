import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function PrivateRoute({ children }) {
    const isLoggedIn = useAuth();
    console.log(isLoggedIn);

    return isLoggedIn ? children : <Navigate to="/" />;
}