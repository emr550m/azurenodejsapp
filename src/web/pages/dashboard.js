import React from 'react';
import Button from '@material-ui/core/Button';
import * as appActions from '../state/actions/app';


export class Dashboard extends React.Component {

    dologOut=()=>{
        this.props.history.push("/login")
    }

    render() {
        return (
            <div style={{ textAlign: 'center' }}> 
                <Button variant="contained" color="primary" onClick={(e) => { 
                     appActions.setPageName("Login");
                    this.dologOut();
                }}>
                    Log Out
                </Button>
            </div>


        );
    }
} 