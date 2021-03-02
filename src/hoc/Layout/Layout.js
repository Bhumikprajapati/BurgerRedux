import React, { useState } from 'react';

import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';
const layout =props=> {

    const [sideDrawerIsVisible,setSideDrawerIsVisible]=useState(false)
   
   const sideDrawerClosedHandler = () => {
        setSideDrawerIsVisible(false)
    }

    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible)
    
    }
        return (
            <Auxiliary>
                <Toolbar 
                isAuthenticated={props.isAuth}
                drawerToggleClicked={sideDrawerToggleHandler} />
                <SideDrawer
                  isAuthenticated={props.isAuth}
                    open={props.setSideDrawerIsVisible}
                    closed={sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {props.children}
                </main>
            </Auxiliary>
        )
    }

const mapStateToProps=state=>{
    return{
        isAuth:state.authReducer.token!==null
    }
}

export default connect(mapStateToProps)(layout);