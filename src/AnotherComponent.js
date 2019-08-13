import React from "react";
import { Button } from "antd";
// const axios = require("axios");
import { connect } from "react-redux";
import axios from "axios";
import { addCounting, minCounting } from "./actions/counting";

/**
 * @todo
 * - Dibuat as Class
 * - Pemprosesan pengurangan dan pertambahan dipindahkan ke Another Component
 * - Ditambahkan perkalian didalamnya (dikalikan state = 5) as default;
 */

class AnotherComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      multiply: 5
    };
  }

  handleAddNumber = () => {
    this.props.dispatch(addCounting(this.props.countingAdd.data))
  };

  handleSubtractNumber = () => {
    this.props.dispatch(minCounting(this.props.dataMin.data))
  };

  handleMultiplyNumber = () => {
    this.setState({ number: this.state.number * this.state.multiply }, () => {
      this.props.handleUpdateNumber(this.state.number);
    });
  };

  render() {
    console.log("props another component", this.props.countingAdd.data);
    return (
      <div>
        <Button onClick={this.handleAddNumber} className="coba" type="danger">
          Tambah
        </Button>
        <Button
          onClick={this.handleSubtractNumber}
          className="coba"
          type="danger"
        >
          Kurang
        </Button>
        <Button
          onClick={this.handleMultiplyNumber}
          className="coba"
          type="danger"
        >
          multiply by 5
        </Button>

        {this.props.countingAdd.data}
        <br></br>
        {this.props.dataMin.data}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("state", state);
  return {
    countingAdd: state.countingAdd,
    dataMin: state.countingMin
  };
}

export default connect(mapStateToProps)(AnotherComponent);
