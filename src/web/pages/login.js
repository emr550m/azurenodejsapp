import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {backend} from '../utils';

export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }

    dologin = ( ) => {
        backend({
            username: this.state.username,
            password: this.state.password
        }).then((result)=>{
            if(result.success){
                console.log("LOGIN OK");
            }
        }).catch((err)=>{
            alert(err);
        })
    }

    render() {
        return (
            <div>
                <h1>AzureNodeApp Login</h1>
                <TextField
                    id="username"
                    label="Username"
                    placeholder="Username"
                    margin="normal" onChange={(e) => { this.setState({ username: e.target.value }) }}
                /><br />
                <TextField
                    id="password"
                    label="Password"
                    placeholder="Password"
                    margin="normal"
                    type="password" onChange={(e) => { this.setState({ password: e.target.value }) }}
                /><br />
                <Button variant="contained" color="primary" onClick={(e) => {
                    this.dologin();
                }}>
                    Login Me
                </Button>
            </div> 
        );
    }
} 