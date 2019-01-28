import React, {Component} from 'react';

//import the auxillary file
import Aux from '../Auxillary/Auxillary';
//import style
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import {connect } from 'react-redux';

class Layout extends Component{
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer:false});
    }

    sideDrawerToggleHandler = () => {
        this.setState( (prevState) => {
            return {showSideDrawer:!prevState.showSideDrawer}
        });
    }

    render(){
        return (
            <Aux>
                <Toolbar isAuth={this.props.isAuthenticated} drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer isAuth={this.props.isAuthenticated} open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <main className = {classes.Content}>
                    {this.props.children }
                </main>    
            </Aux>
        );
    }
}


//Now we will receive whatever is wrapped by this component as props.children any thing else passed will come in props. 
//So to display whatever is wrapped by layout, we will have to use props.children.
//We will do the same in <main>.

//Now: In react everything should be inside a div.
        //However we have two workarounds.
        //One: We could return both these elemets as an array with unique keys assigned.
        //Two: We can pass this complete component into another component creating a higher order component.
            //The other component will simply return whatever is wrapped inside of it.
            //And we will use that component to wrap our divs and main to give an illusion of a single component.

        //NOTE: All our higher order components are in the hoc folder.

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);