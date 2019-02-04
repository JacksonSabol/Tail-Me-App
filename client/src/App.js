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
import splash from "./pages/splash";
import Footer from "./components/Footer";
import aboutTailMe from "./pages/aboutTailMe";
import contactTailMe from "./pages/contactTailMe";






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
        <Route exact path="/splash/" component={splash} />
        <Route exact path="/aboutTailMe/" component={aboutTailMe} />
        <Route exact path="/contactTailMe/" component={contactTailMe} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
