import React, { Component } from "react";
import "./App.css";
import {
  Route,
  Redirect,
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import List from "../../containers/List/List";
import Task from "../../containers/Task/Task";
import New from "../../containers/New/New";
import Edit from "../../containers/Edit/Edit";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router key="router">
          <div>
            <Switch key="switch">
              <Route key="tasks" path="/tasks" exact component={List} />
              <Route key="task" path="/task/:taskId" exact component={Task} />
              <Route key="new" path="/new" component={New} />
              <Route key="edit" path="/edit/:taskId" component={Edit} />
              <Redirect from="*" to="/tasks" />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
