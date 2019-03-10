import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { backend } from '../utils';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import * as loginActions from '../state/actions/login';
import * as appActions from '../state/actions/app';
 

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {  
        };
    }

    dologin = () => {
        setTimeout(() => {
            backend({
                username: this.props.username,
                password: this.props.password
            }).then((result) => {
                if (result.success) {
                    loginActions.setPassword("");
                    loginActions.setUsername("");
                    appActions.setLoader(false);
                    appActions.setPageName("Dashboard");
                    this.props.history.push("/dashboard")
                } else {
                    appActions.setLoader(false);
                    appActions.setDialog(true, result.message); 
                }
            }).catch((err) => {
                appActions.setLoader(false);
                appActions.setDialog(true, err);  
            })
        }, 300);

    }

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <TextField
                    id="username"
                    label="Username"
                    placeholder="Username" value={this.props.username}
                    margin="normal" onChange={(e) => { loginActions.setUsername(e.target.value) }}
                /><br />
                <TextField
                    id="password"
                    label="Password"
                    placeholder="Password" value={this.props.password}
                    margin="normal"
                    type="password" onChange={(e) => { loginActions.setPassword(e.target.value) }}
                /><br />
                <Button variant="contained" disabled={this.props.loading} color="primary" onClick={(e) => {
                    appActions.setLoader(true);
                    this.dologin();
                }}>{this.props.loading ? <CircularProgress size={16} color="secondary" style={{ marginRight: '5px' }} /> : null} Login Me
                </Button>
                
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    const { login , app } = state
    return { username: login.username, password: login.password, loading: app.loading }
};

export default connect(mapStateToProps)(Login);