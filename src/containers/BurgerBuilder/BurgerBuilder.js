import React, {Component} from 'react';
import {connect} from 'react-redux';

//import the components
import Aux from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios-orders'; 
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component{
    constructor(props){
        super(props);
        this.state={
            purchasable: false,
            purchasing:false,
            loading:false,
            error: false
        }
    }

    componentDidMount(){
        // axios.get('/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data});
        //     }).catch( error => {
        //         this.setState({error:true});
        //     });
    }

    updatePurchaseState = (ingredients) =>{
        const sum = Object.keys(ingredients).map((idKey)=>{
            return ingredients[idKey];
        }).reduce((sum,el)=>{
            return sum+el;
        },0);
        return sum>0;
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1; 
        
    //     //keep in mind that if an object is a const, only it's properties cannot be changed.
    //     //it's property values CAN STILL BE CHANGED.
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    //     this.setState({
    //         ingredients:updatedIngredients,
    //         totalPrice:newPrice
    //     });
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if(oldCount <= 0){
    //         return;
    //     }

    //     const updatedCount = oldCount - 1; 
        
    //     //keep in mind that if an object is a const, only it's properties cannot be changed.
    //     //it's property values CAN STILL BE CHANGED.
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    //     this.setState({
    //         ingredients:updatedIngredients,
    //         totalPrice:newPrice
    //     });
    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHandler = () => {
        this.setState({purchasing:true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
        // const queryParams = [];
        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i)+"="+encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price='+this.state.totalPrice);
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?'+queryParams.join('&')
        // });
    }

    render(){
        //this is to disable the less button when the count is zero
        const disableInfo = {
          ...this.props.ings  
        };
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        }
        
        let orderSummary = null;

        let burger = this.state.error? <p>Unable to load ingredients</p> : <Spinner/>
        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ingredientsAdded={this.props.onIngredientAdded}
                        ingredientsRemoved={this.props.onIngredientRemoved}
                        disable={disableInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.price}/>
                </Aux>
            );
            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price.toFixed(2)}/>;
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios)); 