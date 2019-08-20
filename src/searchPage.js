import { Col, Row } from "antd";
import React from "react";
import { connect } from "react-redux";
import { getUsersSearch } from "./actions/users";
var Typeahead = require("react-typeahead").Typeahead;

class SearchUsers extends React.Component {
  componentDidMount() {
    // this.props.dispatch(getUsersSearch());
  }

  render() {
    const {
      getUsers: { data }
    } = this.props;
    return (
      <div style={{ paddingTop: 20 }}>
        <Row>
          <Col offset={2} span={5}>
            Type On Me !
          </Col>
        </Row>
        <Row>
          <Col offset={2} span={5}>
            <Typeahead customClasses={{ input: "ant-input" }} options={data} />
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("state", state);
  return {
    getUsers: state.getUsers
  };
}

export default connect(mapStateToProps)(SearchUsers);
