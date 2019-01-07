import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';

import classes from './ContactData.css';

import axios from '../../../axios-orders';

import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component{
    state = {
        name : '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading:false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading:true});
        const order = {
            ingredients:this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Namah Shrestha',
                address: {
                    street: 'Private Street',
                    zipcode: '500000',
                    country: 'Bharat Ki Jai'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'

        };

        axios.post("/orders.json", order)
            .then(response=> {
                this.setState({loading:false});
                this.props.history.push('/');
                console.log(response);
            })
            .catch(error => {
                this.setState({loading:false});
                console.log(error);
            });
    }

    render(){
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Name"/>
                <input className={classes.Input} type="email" name="email" placeholder="Email"/>
                <input className={classes.Input} type="text" name="street" placeholder="Street"/>
                <input className={classes.Input} type="text" name="postal" placeholder="PostalCode"/>
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if(this.state.loading){
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;