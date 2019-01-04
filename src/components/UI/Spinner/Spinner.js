import React from 'react';
import classes from './Spinner.css'

const spinner = () => {
    return (
        <div className={classes.loader}>Loading...</div>
    );
}

export default spinner;