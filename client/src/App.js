import React from "react";
import { Router, Route } from "react-router-dom";
import history from "./history/history";
import HomeTest from "./pages/HomeTest";
import Login from "./pages/Login";
//import Signup from "./pages/Signup";
//import OwnerSignup from "./pages/OwnerSignup";
// import Navbar from "./components/Navbar";
// import { Container } from "./components/Grid";
import Footer from "./components/Footer";
// import TodayWalks from "./components/TodayWalks";
import WalkerSignupTest from "./pages/WalkerSignupTest";
import walkerDashboard from "./pages/walkerDashboard";


function App() {
  return (
    <Router history={history}>
      <div>
        {/* <Navbar /> */}
        {/* <Container> */}
          <Route exact path="/" component={HomeTest} />
          <Route exact path="/user/login" component={Login} />
          { /*  <Route exact path="/walker/signup" component={Signup} />*/}
          { /*  <Route exact path="/owner/signup" component={OwnerSignup} />*/}
          <Route exact path="/walker/create" component={walkerDashboard} />
          <Route exact path="/walker/signup" component={WalkerSignupTest} />
          {/* <Route exact path="/walker/todayWalks" component={TodayWalks} /> */}
        {/* </Container> */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
