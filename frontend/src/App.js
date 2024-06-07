import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Subscriptions from './components/Subscriptions';
import AdminSubscriptions from './components/AdminSubscriptions';
import AdminQuestions from './components/AdminQuestions';

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/subscriptions" component={Subscriptions} />
                    <Route exact path="/admin/subscriptions" component={AdminSubscriptions} />
                    <Route exact path="/admin/questions" component={AdminQuestions} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;