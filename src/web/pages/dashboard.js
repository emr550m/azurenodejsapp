import React from 'react';
import Button from '@material-ui/core/Button';
import * as appActions from '../state/actions/app';
import * as dashboardActions from '../state/actions/dashboard';
import { connect } from 'react-redux';
import { backend } from '../utils';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

class Dashboard extends React.Component {

    componentDidMount() {
        appActions.setLoader(true);
        backend("/api/auth/user/info", {
            username: this.props.username,
            session: this.props.session
        }).then((result) => {
            if (result.success) {
                dashboardActions.setUserInfo(result.userinfo.name, result.userinfo.surname,new Date(result.userinfo.lastlogin));
                appActions.setLoader(false);
            } else {
                appActions.setLoader(false);
                appActions.setDialog(true, result.message);
            }

        }).catch((err) => {
            appActions.setLoader(false);
            appActions.setDialog(true, err);
        });
    }

    dologOut = () => {
        this.props.history.push("/login")
    }

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <TextField
                    label="Name Surname"
                    value = {this.props.name + " " + this.props.surname}
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                /><br />
                <TextField
                    label="Last Login"
                    value= {this.props.lastlogin.toString()}
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                /><br />
                <Button variant="contained" disabled={this.props.loading} color="primary" onClick={(e) => {
                    appActions.setSession("", "");
                    appActions.setPageName("Login");
                    this.dologOut();
                }}>
                    {this.props.loading ? <CircularProgress size={16} color="secondary" style={{ marginRight: '5px' }} /> : null}    Log Out
                </Button>
            </div>


        );
    }
}


const mapStateToProps = (state) => {
    const { dashboard, app } = state
    return { name: dashboard.name, surname: dashboard.surname, lastlogin: dashboard.lastlogin, loading: app.loading, username: app.username, session: app.session }
};

export default connect(mapStateToProps)(Dashboard);