import React, { Component } from 'react';
import TodoList from './TodoList'
import './Day.css';

export default class Day extends Component {
    render() {
        const { dayName, dbKey, zoomed, onZoomed } = this.props;
        let classes = ['day'];
        if (zoomed.isModal)
            classes.push('zoomed');
        else if (zoomed.other)
            classes.push('small');
        return (
            <div className={classes.join(' ')}>
                <div onClick={onZoomed} className="dayname">{dayName}</div>
                <TodoList dbKey={dbKey} />
            </div>
        );
    }
}
