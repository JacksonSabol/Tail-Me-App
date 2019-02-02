import React from "react";

import { Router, Route } from "react-router-dom";
import history from "./history/history";
import Header from "./components/Header";
import { Container } from "./components/Grid";
import HomeTest from "./pages/HomeTest";
import Login from "./pages/Login";
//import OwnerSignup from "./pages/OwnerSignup";
import walkerDashboard from "./pages/walkerDashboard";
import WalkerSignupTest from "./pages/WalkerSignupTest";
import ownerProfile from "./pages/ownerProfile";
import walkerProfile  from "./pages/walkerProfile";
import Footer from "./components/Footer";






function App() {
  return (
    <Router history={history}>
     <Header />
        <Container>
          <Route exact path="/" component={HomeTest} />
          <Route exact path="/user/login" component={Login} />
          { /*  <Route exact path="/owner/signup" component={OwnerSignup} />*/}
          <Route exact path="/walker/create" component={walkerDashboard} />
          <Route exact path="/walker/signup" component={WalkerSignupTest} />
          <Route exact path="/ownerProfile/" component={ownerProfile}/>
          <Route exact path="/walkerDashboard/" component={walkerDashboard}/>
          <Route exact path="/walkerProfile/" component={walkerProfile}/>
        </Container>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
