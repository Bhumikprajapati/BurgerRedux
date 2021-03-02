import React, { Suspense, useEffect} from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './store/actions/index';

const Orders = React.lazy(() =>{ return import('./containers/Orders/Orders')});
const Auth = React.lazy(() =>{ return import('./containers/Auth/Auth')});
const Checkout=React.lazy(()=>{return import('./containers/Checkout/Checkout')})
const app=props=> { 

  useEffect(()=>{
  props.onTryAutoSignUp()
  },[]);

    let routes = (
     
        <Switch>
          <Route path="/auth"   render={()=><Auth/>} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>

    )
    if (props.isAuthenticated) {
      routes = (
    
          <Switch>
            <Route path="/checkout"   render={()=><Checkout/>} />
            <Route path="/orders"   render={()=><Orders/>} />
            <Route path="/auth"  render={()=><Auth/>} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to='/' />
          </Switch>
 
      )
    }
    return (
      <div>
        <Layout>
          <Suspense fallback='loading...' > {routes}</Suspense>  
        </Layout>
      </div>
    );
  }

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.token !== null
  }
}
export const mapDispatchTOProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchTOProps)(app));
