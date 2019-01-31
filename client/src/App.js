import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import OwnerSignup from "./pages/OwnerSignup";
import Header from "./components/Header";
import { Container } from "./components/Grid";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Container>
          {/* <Route exact path="/" component={Home} />
          <Route exact path="/user/login" component={Login} />
          <Route exact path="/walker/signup" component={Signup} />
          <Route exact path="/owner/signup" component={OwnerSignup} /> */}
        </Container>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
