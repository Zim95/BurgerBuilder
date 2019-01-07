import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

//for nested routes
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{
    state = {
        ingredients:null,
        totalPrice:0
    }

    componentWillMount(){
        //console.log("akskjdakjsd");
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price=0;
        for(let param of query.entries()){
            //This is the format that we will have ['salad','1']
            if(param[0] === 'price'){
                price = param[1];
            }else{
                //as we know, even if object is constant, we can change it's properties
                ingredients[param[0]] = +param[1]; //plus '+' sign works like parseInt() in this case.
            }
        }
        this.setState({ingredients:ingredients, totalPrice:price});
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients} 
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                <Route path={this.props.match.path + '/contact-data'} render={(props)=>(<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}/>
            </div>
        );
    }
}

//NOTE:In the render method we pass props, to pass history and match properties to contact data.
//As we know, contact data does not have access to these methods without withRouter hoc.
export default Checkout;