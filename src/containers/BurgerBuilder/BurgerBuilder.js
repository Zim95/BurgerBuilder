import React, {Component} from 'react';

//import the components
import Aux from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios-orders'; 
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES={
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
}

class BurgerBuilder extends Component{
    constructor(props){
        super(props);
        this.state={
            ingredients:null,
            totalPrice: 4,
            purchasable: false,
            purchasing:false,
            loading:false,
            error: false
        }
    }

    componentDidMount(){
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            }).catch( error => {
                this.setState({error:true});
            });
    }

    updatePurchaseState = (ingredients) =>{
        const sum = Object.keys(ingredients).map((idKey)=>{
            return ingredients[idKey];
        }).reduce((sum,el)=>{
            return sum+el;
        },0);
        this.setState({purchasable:sum>0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1; 
        
        //keep in mind that if an object is a const, only it's properties cannot be changed.
        //it's property values CAN STILL BE CHANGED.
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({
            ingredients:updatedIngredients,
            totalPrice:newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }

        const updatedCount = oldCount - 1; 
        
        //keep in mind that if an object is a const, only it's properties cannot be changed.
        //it's property values CAN STILL BE CHANGED.
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({
            ingredients:updatedIngredients,
            totalPrice:newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing:true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () => {
        this.setState({loading:true});
        const order = {
            ...this.state.ingredients,
            price: this.state.totalPrice,
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
                this.setState({loading:false, purchasing: false});
                console.log(response);
            })
            .catch(error => {
                this.setState({loading:false, purchasing: false});
                console.log(error);
            });
    }

    render(){
        //this is to disable the less button when the count is zero
        const disableInfo = {
          ...this.state.ingredients  
        };
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        }
        
        let orderSummary = null;

        let burger = this.state.error? <p>Unable to load ingredients</p> : <Spinner/>
        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        ingredientsAdded={this.addIngredientHandler}
                        ingredientsRemoved={this.removeIngredientHandler}
                        disable={disableInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice}/>
                </Aux>
            );
            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.state.totalPrice.toFixed(2)}/>;
        }
        
        
        if(this.state.loading){
            orderSummary = <Spinner/>
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder,axios); 