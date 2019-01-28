import React, {Component} from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Auth.css';

import * as actions from '../../store/actions/index';

import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from 'axios';

import {updateObject, checkValidity} from '../../shared/utility';
class Auth extends Component{
    state = {
        controls:{
            email: {
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your Email'
                },
                value: '',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid: false,
                touched:false
            },
            password: {
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Password'
                },
                value: '',
                validation:{
                    required:true,
                    minLength:7
                },
                valid: false,
                touched:false
            },

        },
        isLogin: true
    }

    componentDidMount(){
        //console.log(this.props.buildingBurger,this.props.authRedirectPath);
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
             this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = (event,controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched:true
            })
        });
        this.setState({controls:updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isLogin);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isLogin:!prevState.isLogin}
        });
    }

    render(){
        const formElementArray = [];
        
        for(let key in this.state.controls){
            formElementArray.push({
                id:key,
                config: this.state.controls[key]
            });
        }

        let form = formElementArray.map(formElement=>(
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event)=>this.inputChangedHandler(event,formElement.id)}/>
        )); 

        if(this.props.loading){
            form = <Spinner/>;
        }

        let errorMessage = null;
        
        if(this.props.error){
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return(
            <div className={classes.Auth}>
                <Button btnType="Danger">{this.state.isLogin?'LOGIN':'SIGNUP'} </Button>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success" clicked={this.submitHandler}>SUBMIT</Button>
                </form>
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>SWITCH TO {this.state.isLogin?'SIGNUP':'LOGIN'} </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirect
    };
};

const mapDispatchToProps = dispatch =>{
    return{
        onAuth: (email,password,isLogin)=> dispatch(actions.auth(email,password,isLogin)),
        onSetAuthRedirectPath: ()=> dispatch(actions.setAuthRedirectPath('/'))
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Auth,axios));