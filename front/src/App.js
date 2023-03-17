/**
 * @author Alex Lloyd <alloyd2@umbc.edu>
 */
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Menu from './Menu';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Switch>
            <Route name="curdmenu" exact path="/menu">
              <Menu />
            </Route>
            <Redirect exact from="/" to="/menu" />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
