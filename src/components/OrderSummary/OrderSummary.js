import React from 'react';

import Aux from '../../hoc/Auxillary/Auxillary';
import Button from '../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(idKey => {
    return (
            <li key={idKey}>
                <span style={{textTransform:'capitalize'}}>
                    {idKey} 
                </span>:{props.ingredients[idKey]}
            </li>
        ); 
    });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: ${props.price}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    );
}

export default orderSummary;