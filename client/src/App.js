import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import NavBar from "./components/NavBar";

import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import AuthRoute from "./utils/AuthRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <NavBar></NavBar>
          <Route exact path="/" component={Home}></Route>
          <AuthRoute exact path="/login" component={Login}></AuthRoute>
          <AuthRoute exact path="/register" component={Register}></AuthRoute>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
