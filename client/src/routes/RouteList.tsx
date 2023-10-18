import { Routes, Route } from "react-router-dom";

import LandingPage from '../pages/landingpage/LandingPage';
import LogIn from '../auth/Login';
import SignUp from '../auth/Signup';
import Map from "../pages/map/Map";

import EditProfile from "../pages/profile/EditProfile";
import UserProfile from "../pages/profile/UserProfile";

import RequireAuth from "../auth/RequireAuth";
import RedirectUser from "../auth/RedirectUser";

const RouteList = () => {
    
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/choresquad/" element={<LandingPage />} />

            {/* Redirect if signed in */}
            <Route element={<RedirectUser  />}>
                <Route path="/choresquad/login" element={<LogIn />} />
                <Route path="/choresquad/signup" element={<SignUp  />} />
            </Route>
            
            {/* protected routes */}
            <Route element={<RequireAuth  />}>
                <Route path="/choresquad/map/" element={<Map />} >
                    <Route path="edit_profile" element={<EditProfile />} />
                    <Route path=":name" element={<UserProfile />} />
                </Route>
            </Route>
           
        </Routes>
    )
}

export default RouteList;