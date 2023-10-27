import { Routes, Route } from "react-router-dom";

import LandingPage from '../pages/landingpage/LandingPage';
import LogIn from '../auth/Login';
import SignUp from '../auth/Signup';
import Map from "../pages/map/Map";
import NotFound from "../pages/notfound/Notfound";

import EditProfile from "../pages/profile/EditProfile";
import UserProfile from "../pages/profile/UserProfile";

import RequireAuth from "../auth/RequireAuth";
import RedirectUser from "../auth/RedirectUser";

import Inbox from "../components/chat/inbox/Inbox";
import NewChannel from "../components/chat/channel/New";

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
                    <Route path="channel/new" element={<NewChannel />} />
                    <Route path="inbox" element={<Inbox />} />
                    <Route path="edit_profile" element={<EditProfile />} />
                    <Route path=":name" element={<UserProfile />} />
                </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
           
        </Routes>
    )
}

export default RouteList;