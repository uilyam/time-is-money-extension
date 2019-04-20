import React, { Component } from 'react';
import { DateTime } from 'luxon';
import 'bulma/css/bulma.min.css';
import Input from './components/input';
import Layout from './components/layout';
import Timer from './components/timer';
import StorageService from './services/storage';

const APP_NAME = 'TIME_IS_MONEY';
const ACTIVE_TASK_KEY = `${APP_NAME}.'ACTIVE_TASK'`;
const CLEAR = null;

class App extends Component {

  constructor() {
    super();
    this.onTaskNameChange = this.onTaskNameChange.bind(this);
    this.onRateChange = this.onRateChange.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onStop = this.onStop.bind(this);
    this.storage = new StorageService();
    this.state = {
      task: '',
      rate: '',
      startedAt: undefined,
      loading: true,
      active: false,
      stopped: false,
    };
  }

  componentDidMount() {
    this.syncActiveTaskFromStorage();
  }

  async syncActiveTaskFromStorage() {
    const active = await this.storage.retrieve(ACTIVE_TASK_KEY);
    if (active) {
      this.setState({
        task: active.task,
        rate: active.rate,
        startedAt: DateTime.fromISO(active.startedAt),
        loading: false,
        active: true,
        stopped: false,
      });
    } else {
      this.setState({
        loading: false,
        active: false,
        stopped: false,
      });
    }
  }

  onTaskNameChange(event) {
    this.setState({ task: event.target.value });
  }

  onRateChange(event) {
    this.setState({ rate: event.target.value });
  }

  async onStart(event) {
    event.preventDefault();
    await this.storage.store(ACTIVE_TASK_KEY, {
      task: this.state.task,
      rate: Number(this.state.rate),
      startedAt: DateTime.local().toString(),
    });
    await this.syncActiveTaskFromStorage();
  }

  async onStop(event) {
    event.preventDefault();
    await this.storage.store(ACTIVE_TASK_KEY, CLEAR);
    await this.syncActiveTaskFromStorage();
  }

  render() {
    const { task, active, startedAt } = this.state;
    return (
      <Layout>
        { !active ? 
          <form>
            <h1 className="title" style={{color: 'white', textAlign: 'center'}}>Time is Money</h1>
            <Input placeholder={"Task Name"} type="text" value={task} onChange={this.onTaskNameChange} />
            <button onClick={this.onStart} className="button is-fullwidth is-medium is-full is-success">Start</button>
          </form>
          :
          <div>
            <Timer started={startedAt} />
            <button onClick={this.onStop} className="button is-fullwidth is-medium is-full is-danger">Stop</button>
          </div>
        }
      </Layout>
    );
  }
}

export default App;
