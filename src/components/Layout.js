import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUsers } from "../reducers/users";
import { getUsersThunk } from "../actions/users";

class LayoutDashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(getUsersThunk());
  }

  render() {
    const {
      getUsers: {
        data: { data: dataUsers }
      }
    } = this.props;

    console.log('dataUsers', dataUsers)

    return (
      <div>
        <h1>Selamat datang di dashboard</h1>
        <ul>
          {dataUsers.map((v) => {
            return (
              <li>{v.name}</li>
            )
          })}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("state", state);
  return {
    countingAdd: state.countingAdd,
    getUsers: state.getUsers
  };
}

export default withRouter(connect(mapStateToProps)(LayoutDashboard));
