import React from 'react';

import Aux from '../../hoc/Auxillary';

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
            <p>Continue to Checkout?</p>
        </Aux>
    );
}

export default orderSummary;