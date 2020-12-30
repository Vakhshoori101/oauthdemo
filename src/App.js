import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import LoggedIn from './Pages/LoggedIn';
import ForgotPassword from './Pages/ForgotPassword';

function App() {
  
  return (
    <Router>
      <Switch>
        <Route path="/ForgotPassword" component={ForgotPassword} />
        <Route path="/LoggedIn" component={LoggedIn} />
        <Route path="/SignUp" component={SignUp} />
        <Route path="/" component={SignIn} />
      </Switch>
    </Router>
  )
  
}

export default App;
