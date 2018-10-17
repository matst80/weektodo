import React, { Component } from 'react';
import './TodoItem.css';

export default class TodoItem extends Component {
    render() {
        const { item: { title, done }, onDelete, onStateToggle } = this.props;
        return (
            <div className="item">
                <span className={done ? "done" : ""} onClick={onStateToggle}>{title}</span><span onClick={onDelete} className="tool delete">X</span>
            </div>
        );
    }
}