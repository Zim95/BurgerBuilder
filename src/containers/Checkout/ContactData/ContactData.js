//REACT
import React, {Component} from 'react';

//CSS CLASS
import classes from './ContactData.css';

//AXIOS
import axios from '../../../axios-orders';

//UI COMPONENTS
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';

class ContactData extends Component{
    state = {
        orderForm: {
            name: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value: ''
            },
            street: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value: ''
            },
            zipcode: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'ZIP CODE'
                },
                value: ''
            },
            country: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value: ''
            },
            email: {
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your Email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType:'select',
                elementConfig:{
                    options: [
                        {value:'fastest',displayValue:'Fastest'},
                        {value:'cheapest',displayValue:'Cheapest'}
                    ]
                },
                value: ''
            },
        },
        loading:false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading:true});
        const order = {
            ingredients:this.props.ingredients,
            price: this.props.price,
            customer: null
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
        const formElementArray = [];
        
        for(let key in this.state.orderForm){
            formElementArray.push({
                id:key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form>
                {formElementArray.map(formElement=>(
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}/>
                ))}
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