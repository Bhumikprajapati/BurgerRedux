import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index'
import {connect} from 'react-redux' 
import Spinner from '../../components/UI/Spinner/Spinner'
class Orders extends Component {

    componentDidMount() {
      this.props.onfetchOrder()
    }

    render () {
        let order=<Spinner/>
        if(!this.props.loading){
            order=this.props.orders.map(order => (
                <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            ))

        }
        return (
            <div>
                {order}
            </div>
        );
    }
}
const mapStateToProps=state=>{
    return{
        orders:state.orderReducer.orders,
        loading:state.orderReducer.loading
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onfetchOrder:()=>dispatch(actions.fetchOrder())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios));