import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popover } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  editSession, removeSession } from '../../models/AppModel';
import {
  editSessionAction,
  removeSessionAction,
} from '../../store/actions';
import Schema from '../Schema/Schema';

class Session extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputName: false,
      inputTime: false,
      name: this.props.sessions[this.props.sessionId].name,
      time: this.props.sessions[this.props.sessionId].time,
    };
  }

  onDelete = async () => {
    await removeSession(this.props.sessionId);

    this.props.removeSessionDispatch(this.props.sessionId);
  };

  onInputChange = (e) => {
    if (e.target.id === 'name') {
      this.setState({ ...this.state, name: e.target.value });
    } else {
      this.setState({ ...this.state, time: e.target.value });
    }
  };

  onKeyDown = async (e) => {
    if (e.key === 'Escape') {
      this.setState({
        inputName: false,
        inputTime: false,
        name: this.props.sessions[this.props.sessionId].name,
        time: this.props.sessions[this.props.sessionId].time,
      });
    } else if (e.key === 'Enter') {
      await editSession({
        sessionId: this.props.sessionId,
        time: this.state.time,
        name: this.state.name,
      });

      this.props.updateSessionDispatch(this.props.sessionId, {
        name: this.state.name,
        time: this.state.time,
      });

      if (e.target.id === 'name') {
        this.setState({
          ...this.state,
          name: e.target.value,
          inputName: false,
        });
      } else {
        this.setState({
          ...this.state,
          time: e.target.value,
          inputTime: false,
        });
      }
    }
  };

  render() {
    return (
      <div className="session">
        <DeleteOutlined className="delete-session" onClick={this.onDelete} />
        {!this.state.inputName ? (
          <h2
            className="session-name"
            onClick={() =>
              this.setState({ ...this.state, inputName: true })
            }
          >
            {this.state.name}
          </h2>
        ) : (
          <input
            id="name"
            className="session-input"
            value={this.state.name}
            onChange={this.onInputChange}
            onKeyDown={this.onKeyDown}
          />
        )}
        {!this.state.inputTime ? (
          <h2
            className="session-time"
            onClick={() =>
              this.setState({ ...this.state, inputTime: true })
            }
          >
            {this.state.time}
          </h2>
        ) : (
          <input
            id="time"
            className="session-input"
            value={this.state.time}
            onChange={this.onInputChange}
            onKeyDown={this.onKey}
          />
        )}
        <Popover
          content={<Schema sessionId={this.props.sessionId} />}
          title="Hall"
          trigger="click"
        >
          <Button className="session-button">Add Booking</Button>
        </Popover>
      </div>
    );
  }
}

const mapStateToProps = ({ sessions }) => ({ sessions });

const mapDispatchToProps = (dispatch) => ({
  removeSessionDispatch: (sessionId) =>
    dispatch(removeSessionAction(sessionId)),
  updateSessionDispatch: (sessionId, data) => {
    dispatch(editSessionAction(sessionId, data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Session);
