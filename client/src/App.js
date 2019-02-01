import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import splash from "./pages/splash";
//import Home from "./pages/Home";
//import Login from "./pages/Login";
//import Signup from "./pages/Signup";
//import OwnerSignup from "./pages/OwnerSignup";
import Navbar from "./components/Navbar";
import Container from "./components/Container"
import Wrapper from "./components/Wrapper";
// import { Container } from "./components/Grid";
import Footer from "./components/Footer";
import TodayWalks from "./components/TodayWalks";


function App() {
  return (
    <Router>
      <div>
        {/* <Header /> */}
        <Wrapper>
           <Route exact path="/splash" component={splash} />
         {/* <Route exact path="/" component={Home} />*/}
        { /* <Route exact path="/user/login" component={Login} /> */} 
        { /*  <Route exact path="/walker/signup" component={Signup} />*/} 
        { /*  <Route exact path="/owner/signup" component={OwnerSignup} />*/} 
          <Route exact path="/walker/todayWalks" component={TodayWalks} />
          
        </Wrapper>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
