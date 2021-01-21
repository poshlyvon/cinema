import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { addSession, getSessions } from '../../models/AppModel';
import { addSessionAction, downloadSessionsAction } from '../../store/actions';
import Session from '../Session/Session';
import './App.css';

class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      nameInputValue: '',
      timeInputValue: '',
    };
  }

  async componentDidMount() {
    const sessions = await getSessions();
    this.props.downloadManagersDispatch(sessions);
  }

  showInput = () => this.setState({ isInputShow: true });

  onInputChange = ({ target }) => {
    if (target.id === 'add-name-input') {
      this.setState({ ...this.state, nameInputValue: target.value });
    } else {
      this.setState({ ...this.state, timeInputValue: target.value });
    }
  };

  onAdd = async (e) => {
    e.preventDefault();

    await addSession({
      name: this.state.nameInputValue,
      time: this.state.timeInputValue,
      bookings: [],
    });

    this.props.addManagerDispatch(
      this.state.nameInputValue,
      this.state.timeInputValue
    );

    this.setState({
      nameInputValue: '',
      timeInputValue: '',
    });
  };

  render() {
    const { nameInputValue, timeInputValue } = this.state;
    const { sessions } = this.props;

    return (
      <div className="page">
        <mainpage id="main">
        <header className="header">
            Cinema 
        </header>
        <main className="main">
          {sessions.map((session, index) => (
            <Session sessionId={index} key={`session-${index}`} />
          ))}
          <form className="form">
            <input
              type="text"
              className="input"
              id="add-name-input"
              placeholder="Name"
              value={nameInputValue}
              onChange={this.onInputChange}
              autoComplete="off"
            />
            <input
              type="text"
              className="input"
              id="add-time-input"
              placeholder="Time"
              value={timeInputValue}
              onChange={this.onInputChange}
              autoComplete="off"
            />
            <button className="form-button" onClick={(e) => this.onAdd(e)}>
              Add session 
            </button>
          </form>
        </main>
        </mainpage>
      </div>
    );
  }
}

const mapStateToProps = ({ sessions }) => ({ sessions });

const mapDispatchToProps = (dispatch) => ({
  addManagerDispatch: (name, time) => dispatch(addSessionAction(name, time)),
  downloadManagersDispatch: (sessions) =>
    dispatch(downloadSessionsAction(sessions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
