import React from 'react'; 
import { BrowserRouter as Router, Route } from "react-router-dom";
import {Login} from "./pages/login";
import {Dashboard} from "./pages/dashboard";


export class App extends React.Component {
    render() {
        return (
            <Router>
                <div> 
                    <Route exact path="/" component={Login} />
                    <Route path="/login" component={Login} />
                    <Route path="/dashboard" component={Dashboard} />
                </div>
            </Router>
        );
    }
} 