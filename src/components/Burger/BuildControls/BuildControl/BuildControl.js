import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button onClick={()=>props.removed(props.type)} className={classes.Less} disabled={props.disable}>Less</button>
        <button onClick={()=>props.added(props.type)} className={classes.More}>More</button>
    </div>
);

export default buildControl;