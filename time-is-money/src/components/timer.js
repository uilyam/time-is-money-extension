import React from 'react';
import { DateTime } from 'luxon';

export default class Timer extends React.Component {

  constructor() {
    super();
    this.state = {
      displayTime: '00:00:00' 
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        displayTime: this.timeAgo(this.props.started)
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  timeAgo(date) {
    const now = DateTime.local();
    const hours = Math.floor(now.diff(date, 'hours').hours);
    const minutes = Math.floor(now.diff(date, 'minutes').minutes);
    const seconds = Math.floor(now.diff(date, 'seconds').seconds);
    return `${this.format(hours)}:${this.format(minutes)}:${this.format(seconds)}`;
  }

  format(value) {
    if (value === 0) {
      return '00'
    } else if (String(value).length === 1) {
      return `0${value}`;
    } else {
      return value;
    }
  }

  render() {
    const { displayTime } = this.state;
  
    return (
      <h1 className="title is-1" style={{color: 'white', textAlign: 'center'}}>
        { displayTime }
      </h1>
    );
  }
}