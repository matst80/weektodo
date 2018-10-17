import React, { Component } from 'react';
import Day from './Day.js'
import { safeName, auth, dayNames, getWeek } from './utils';
import './App.css';

const safeNames = dayNames.map(safeName);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false,
      zoomed: false,
      week: props.week || getWeek(new Date())
    }
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      this.setState({ user: user || false });
    });
    auth.signInAnonymously()
  }
  changeWeek = (week) => {
    this.setState({ week });
  }
  setZoom = (idx) => {
    let { zoomed } = this.state;
    zoomed = (zoomed === idx) ? false : idx;
    this.setState({ zoomed });
  }
  render() {
    const { user, week, zoomed } = this.state;
    if (!user) {
      return (
        <div className="center">
          <div className="loading">Loading...</div>
        </div>);
    }

    let days = dayNames.map((name, i) => (
      <Day
        onZoomed={_ => this.setZoom(i)}
        zoomed={{ isModal: zoomed === i, other: zoomed }}
        key={`${week}/${i}`}
        dbKey={`todo/${week}/${safeNames[i]}`}
        dayName={name}
      />));

    return (
      <div className="app">
        <div className="days">
          {days}
        </div>
        <div className="currentweek">
          {week > 0 && <div className="weekbutton" onClick={() => this.changeWeek(week - 1)}>&lsaquo;</div>}
          <div className="weeknr">Vecka {week}</div>
          {week < 52 && <div className="weekbutton" onClick={() => this.changeWeek(week + 1)}>&rsaquo;</div>}</div>
      </div>
    );
  }
}
