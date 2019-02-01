import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
//import Home from "./pages/Home";
//import Login from "./pages/Login";
//import Signup from "./pages/Signup";
//import OwnerSignup from "./pages/OwnerSignup";
import Navbar from "./components/Navbar";

import { Container } from "./components/Grid";
import Footer from "./components/Footer";

import ownerProfile from "./pages/ownerProfile";
import walkerDashboard from "./pages/walkerDashboard";
import walkerProfile  from "./pages/walkerProfile";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Container>

         {/* <Route exact path="/" component={Home} />*/}
        { /* <Route exact path="/user/login" component={Login} /> */} 
        { /*  <Route exact path="/walker/signup" component={Signup} />*/} 
        { /*  <Route exact path="/owner/signup" component={OwnerSignup} />*/} 
        
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
