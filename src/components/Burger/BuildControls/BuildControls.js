import React from 'react';
import classes from './BuildControls.css';

import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label:'Salad',type:'salad'},
    {label:'Bacon',type:'bacon'},
    {label:'Cheese',type:'cheese'},
    {label:'Meat',type:'meat'}
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl =>{
            //console.log(props.ingredientsAdded);
            return (
                <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                type={ctrl.type}
                added={props.ingredientsAdded}
                removed={props.ingredientsRemoved}
                disable={props.disable[ctrl.type]}/>
            );
        })}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>{props.isAuth?'ORDER NOW':'SIGNUP/LOGIN TO ORDER'}</button>
    </div>
);

export default buildControls;