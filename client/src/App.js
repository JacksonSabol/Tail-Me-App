import React from "react";

import { Router, Route } from "react-router-dom";
import history from "./history/history";
// import Header from "./components/Header";
import HomeTest from "./pages/HomeTest";
import Login from "./pages/Login";
import OwnerSignup from "./pages/OwnerSignup";
import walkerDashboard from "./pages/walkerDashboard";
import WalkerSignupTest from "./pages/WalkerSignupTest";
import ownerProfile from "./pages/ownerProfile";
import walkerProfile from "./pages/walkerProfile";
import createWalkerProfile from "./pages/createWalkerProfile";
import createOwnerProfile from "./pages/createOwnerProfile";
import ProfileTest from "./pages/ProfileTest";
// import Footer from "./components/Footer";






function App() {
  return (
    <Router history={history}>
      <div>
        {/* <Header /> */}
        <Route exact path="/" component={HomeTest} />
        <Route exact path="/user/login" component={Login} />
        <Route exact path="/owner/signup" component={OwnerSignup} />
        <Route exact path="/walker/signup" component={WalkerSignupTest} />
        <Route exact path="/walker/create/:username" component={createWalkerProfile} />
        <Route exact path="/owner/create/:username" component={createOwnerProfile} />
        <Route exact path="/ownerProfile/" component={ownerProfile} />
        <Route exact path="/walkerDashboard/" component={walkerDashboard} />
        <Route exact path="/walkerProfile/" component={walkerProfile} />
        <Route exact path="/userProfile/:username" component={ProfileTest} />
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
