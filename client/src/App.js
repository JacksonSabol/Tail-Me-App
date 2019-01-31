import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
//import Home from "./pages/Home";
//import Login from "./pages/Login";
//import Signup from "./pages/Signup";
//import OwnerSignup from "./pages/OwnerSignup";
import Navbar from "./components/Navbar";
import { Container } from "./components/Grid";
import Footer from "./components/Footer";
import TodayWalks from "./components/TodayWalks";


function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Container>
         {/* <Route exact path="/" component={Home} />*/}
        { /* <Route exact path="/user/login" component={Login} /> */} 
        { /*  <Route exact path="/walker/signup" component={Signup} />*/} 
        { /*  <Route exact path="/owner/signup" component={OwnerSignup} />*/} 
          <Route exact path="/walker/todayWalks" component={TodayWalks} />
          
        </Container>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
