import React, {Component} from 'react';

//import the components
import Aux from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';

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
            ingredients:{
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            totalPrice: 4,
            purchasable: false,
            purchasing:false
        }
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
        alert('UH-HUH');
    }

    render(){
        //this is to disable the less button when the count is zero
        const disableInfo = {
          ...this.state.ingredients  
        };
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        price={this.state.totalPrice.toFixed(2)}/>
                </Modal>
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
    }
}

export default BurgerBuilder; 