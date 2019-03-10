import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/login";
import { Dashboard } from "./pages/dashboard";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import * as appActions from './state/actions/app';
import Button from '@material-ui/core/Button';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton color="inherit" aria-label="Menu">
                                <MenuIcon />
                            </IconButton>

                            <Typography variant="h6" color="inherit">
                                {this.props.title} \  {this.props.page}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Route exact path="/" component={Login} />
                    <Route path="/login" component={Login} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Dialog
                        fullScreen={false}
                        open={this.props.dialog}
                        onClose={() => {

                        }} aria-labelledby="responsive-dialog-title">
                        <DialogTitle id="responsive-dialog-title">Something Happened!</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {this.props.dialogMessage}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => {
                               appActions.setDialog(false,"");
                            }} color="primary">
                                OK
                         </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    const { app } = state
    return {
        title: app.title, page: app.page, dialog: app.dialog,  dialogMessage: app.dialogMessage
    }
};

export default connect(mapStateToProps)(App);