import React from 'react';
import classes from './Order.css';

const order = (props) => {
    const ingredients = [];
    //another way of converting objects to arrays
    for(let key in props.ingredients){
        ingredients.push({name:key,amount:props.ingredients[key]});
    }  

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredients.map(item=>{
                return (
                    <span style = {{
                            textTransform:"capitalize",
                            display:"inline-block",
                            margin: "0 8px",
                            border: "1px solid #ccc",
                            padding: "5px"
                        }} 
                        key={item.name}> 
                        {item.name}({item.amount})
                    </span>
                );
            })}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong> </p>
        </div>
    );
}
    

export default order;