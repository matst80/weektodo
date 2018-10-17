import React, { Component } from 'react';
import { forEach, db } from './utils';
import TodoItem from './TodoItem';
import './TodoList.css';

const blankItem = { title: '' };

export default class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {},
            newItem: { ...blankItem },
            loading: true
        };
        this._ref = db.ref(this.props.dbKey);
    }
    componentDidMount() {
        this._ref.on('value', snap => {
            if (snap.exists()) {
                const items = snap.val();
                this.setState({ items, loading: false });
            }
            else this.setState({ items: {}, loading: false });
        });
    }
    componentWillUnmount() {
        this._ref.off();
    }
    deleteItem = (id) => {
        this._ref.child(id).remove();
    }
    toggleState = (id) => {
        const oldItem = this.state.items[id] || {};

        this._ref.child(id).update({ done: !oldItem.done });
    }
    handleKeypress = (e) => {
        const { newItem } = this.state;

        if (e.key === 'Enter') {
            let update = { ...newItem, created: Date.now() };
            this._ref.push().update(update);
            this.setState({ newItem: { ...blankItem } });
        }
    }
    render() {
        const { items, loading, newItem } = this.state;

        if (loading)
            return (<div>Laddar dagen...</div>);

        let todoList = forEach(items, (item, id) => {
            return (<TodoItem key={id} item={item} onDelete={() => this.deleteItem(id)} onStateToggle={() => this.toggleState(id)} />);
        });

        return (
            <div className="todo">
                <div className="list">
                    {todoList}
                </div>
                <input value={newItem.title} onKeyPressCapture={this.handleKeypress} onChange={({ target: { value } }) => { this.setState({ newItem: { title: value } }) }} />
            </div>
        );
    }
}
