import React from "react";

import qs from 'query-string';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class DetailUser extends React.Component {
  componentDidMount() {
    console.log('this.props', this.props)
    const { location: { search } } = this.props;
    const data = qs.parse(search);
    console.log('id', data.id)
  }

  render() {
    return (
      <div>
        <h1>Detail User</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    countingAdd: state.countingAdd,
    getUsers: state.getUsers
  };
}

export default withRouter(connect(mapStateToProps)(DetailUser));
