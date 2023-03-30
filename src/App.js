import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/auth/PrivetRoute";
import PublicRoute from "./components/auth/PublicRoute";
import useAuthChecked from "./hooks/useAuthChecked";
import Conversation from "./pages/Conversation";
import Inbox from "./pages/Inbox";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    const authChecked = useAuthChecked();
    return !authChecked ? <p>Checking Authentication...</p> : <Router>
        <Routes>
            <Route path="/" element={
                <PublicRoute>
                    <Login />
                </PublicRoute>
            } />
            <Route path="/register" element={<Register />} />
            <Route path="/inbox" element={
                <PrivateRoute>
                    <Conversation />
                </PrivateRoute>
            } />
            <Route path="/inbox/:conversationId" element={
                <PrivateRoute>
                    <Inbox />
                </PrivateRoute>
            } />
        </Routes>
    </Router>
}

export default App;
