import React from "react";

import { Router, Route } from "react-router-dom";
import history from "./history/history";
// import Header from "./components/Header";
import HomeTest from "./pages/HomeTest";
import Login from "./pages/Login";
//import OwnerSignup from "./pages/OwnerSignup";
import walkerDashboard from "./pages/walkerDashboard";
import WalkerSignupTest from "./pages/WalkerSignupTest";
import ownerProfile from "./pages/ownerProfile";
import walkerProfile from "./pages/walkerProfile";
import Footer from "./components/Footer";
import WalkPhotoUpandPost from "./components/WalkPhotoUpandPost/index"

import WalkImages from "./components/WalkPhotoUpandPost/pics"

import Schedule from "./components/Schedule";

import walkerWalksSchedule from "./components/WalkerScheduleWalks";

import WalkerScheduleWalks from "./components/WalkerScheduleWalks"

function App() {
  return (
    <Router history={history}>
      <div>
        {/* <Header /> */}
        <Route exact path="/" component={HomeTest} />
        <Route exact path="/user/login" component={Login} />
        { /*  <Route exact path="/owner/signup" component={OwnerSignup} />*/}
        <Route exact path="/walker/create" component={walkerDashboard} />
        <Route exact path="/walker/signup" component={WalkerSignupTest} />
        <Route exact path="/ownerProfile/" component={ownerProfile} />
        <Route exact path="/walkerDashboard/" component={walkerDashboard} />
        <Route exact path="/walkerProfile/" component={walkerProfile} />
        <Footer />
        <Route exact path="/walker/uploadPhotos" component={WalkPhotoUpandPost} />
        <Route exact path="/walker/walkImages" component={WalkImages} />
        <Route exact path="/walker/schedule" component={Schedule} />
        <Route exact path="/walkerWalks/schedule" component={walkerWalksSchedule} />
        <Footer />
        <Route exact path="/walker/addSchedule" component={WalkerScheduleWalks} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
