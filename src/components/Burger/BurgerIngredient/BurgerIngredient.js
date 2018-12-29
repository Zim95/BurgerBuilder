 import React ,{Component} from 'react';

 //import style
 import classes from './BurgerIngredient.css';

 //NOTE: Since we need to use Proptypes here, our component cannot be a dumb functional one
 //We need to use the class syntax here
 //However, this component will still be a dumb component as it will not be manageing any state.
 import PropTypes from 'prop-types';

 class BurgerIngredient extends Component{
    render(){
        let ingredient = null;

        switch(this.props.type){
            case ('bread-bottom'):
                ingredient = <div className={classes.BreadBottom}></div>;
                break;
            case ('bread-top'):
                ingredient = (
                    <div className = {classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>
                );
                break;
            case ('meat'):
                ingredient = <div className={classes.Meat}></div>;
                break;
            case ('cheese'):
                ingredient = <div className={classes.Cheese}></div>;
                break;
            case ('bacon'):
                ingredient = <div className={classes.Bacon}></div>;
                break;
            case ('salad'):
                ingredient = <div className={classes.Salad}></div>;
                break;
            default:
                ingredient = null;

        }

        return ingredient;

    }
 }

 //Now adding the PropType
 //Now the field props.type will be a required field
 BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
 };

 export default BurgerIngredient;