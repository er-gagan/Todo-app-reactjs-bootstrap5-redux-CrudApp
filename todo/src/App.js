import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import ChangePassword from './components/ChangePassword/ChangePassword';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/changePassword">
          <ChangePassword />
        </Route>
        <Route exact path="/forgotPassword">
          <ForgotPassword />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
