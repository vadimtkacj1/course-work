import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import VehicleRegistration from "./components/MainPage/MainPage";
import LogIn from "./components/LogIn/LogIn";
import MainPage from "./components/MainPage/MainPage";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={!isLoggedIn ? <LogIn onLoginSuccess={() => setIsLoggedIn(true)} /> : <Navigate to="/" />}
                />
                <Route
                    path="/"
                    element={isLoggedIn ? <MainPage handleLogOut={() => setIsLoggedIn(false)} /> : <Navigate to="/login" />}
                />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
