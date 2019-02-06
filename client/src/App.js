import React from "react";
import { Router, Route } from "react-router-dom";
import history from "./history/history";
// import Header from "./components/Header";
import Login from "./pages/Login";
import OwnerSignup from "./pages/OwnerSignup";
import walkerDashboard from "./pages/walkerDashboard";
import WalkerSignupTest from "./pages/WalkerSignupTest";
import ownerProfile from "./pages/ownerProfile";
import walkerProfile from "./pages/walkerProfile";
import splash from "./pages/splash";
import WalkPhotoUpandPost from "./components/WalkPhotoUpandPost/index"
import WalkImages from "./components/WalkPhotoUpandPost/pics"
import Schedule from "./components/Schedule";
import aboutTailMe from "./pages/aboutTailMe";
import contactTailMe from "./pages/contactTailMe";
import createWalkerProfile from "./pages/createWalkerProfile";
import createOwnerProfile from "./pages/createOwnerProfile";
import ProfileTest from "./pages/ProfileTest";
import ShowMap from "./components/ShowMap";
import InviteOwners from "./components/InviteOwners";
import GetCoordinates from "./components/GetCoordinates";
import ShowPicsMap from "./components/ShowPicsMap";
import WalkerScheduleWalks from "./components/WalkerScheduleWalks";
import Referral from "./pages/Referral";
// import Footer from "./components/Footer";

function App() {
  return (
    <Router history={history}>
      <div>
        {/* <Header /> */}
        <Route exact path="/" component={splash} />
        <Route exact path="/user/login" component={Login} />
        <Route exact path="/owner/signup" component={OwnerSignup} />
        <Route exact path="/walker/signup" component={WalkerSignupTest} />
        <Route exact path="/walker/create/:username" component={createWalkerProfile} />
        <Route exact path="/owner/create/:username" component={createOwnerProfile} />
        <Route exact path="/ownerProfile/" component={ownerProfile} />
        <Route exact path="/walkerDashboard/" component={walkerDashboard} />
        <Route exact path="/walkerProfile/" component={walkerProfile} />
        <Route exact path="/walker/uploadPhotos" component={WalkPhotoUpandPost} />
        <Route exact path="/walker/walkImages" component={WalkImages} />
        <Route exact path="/walker/schedule" component={Schedule} />
        <Route exact path="/walker/addSchedule" component={WalkerScheduleWalks} />
        <Route exact path="/aboutTailMe/" component={aboutTailMe} />
        <Route exact path="/contactTailMe/" component={contactTailMe} />
        <Route exact path="/userProfile/:username" component={ProfileTest} />
        <Route exact path="/walker/showmap" component={ShowMap} />
        <Route exact path="/walker/inviteowner" component={InviteOwners} />
        <Route exact path="/walker/getcoordinates" component={GetCoordinates} />
        <Route exact path="/walker/showpicsmap" component={ShowPicsMap} />
        <Route exact path="/owner/signup/:id/:code" component={Referral} />
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
