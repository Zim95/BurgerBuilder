import React from 'react';

//import style
import classes from './Burger.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    //now we are gonna get an ingredients object which we are gonna have to turn into an array
    //Steps:
        //1. Get all key values.
        //2. For each key get the corresponding count value and then create an array of that size.
        //3. For each item in that array, fill it up with the key value.
    let transformedIngredients = Object.keys(props.ingredients).map(idKey => {
        //this will return an array filled with the key string
        return [...Array(props.ingredients[idKey])].map((_,i)=>{
            //now we will be getting the index of each item in the empty array of size props.ingredients[idKey] in i
            //our job is to assign idKey which is the key string to each index.
            //Better, we can create a BurgerIngredient component with idkey as the type
            //Also since we are returning arrays we need to have unique keys on each element.
            return <BurgerIngredient key={idKey+i} type={idKey}/>;
        });
    }).reduce((arr,el)=>{
        return arr.concat(el);
    },[]);

    if(transformedIngredients.length === 0){
        transformedIngredients =  <p>Please start adding ingredients</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;