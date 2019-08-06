import React from "react";
import { Button } from "antd";
// const axios = require("axios");
import axios from 'axios';


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
    // this.props.handleUpdateNumber('Hai Bro!');

    axios
      .get(`https://jsonplaceholder.typicode.com`)
      .then(({ data }) => data)
      .catch(err => {
        console.log("err", err);
      });

  };

  handleSubtractNumber = () => {
    this.setState({ number: this.state.number - 1 } , () => {
        this.props.handleUpdateNumber(this.state.number)
    });
  };

  handleMultiplyNumber = () => {
    this.setState({ number: this.state.number * this.state.multiply }, () => {
        this.props.handleUpdateNumber(this.state.number)
    });
  };

  render() {
    console.log("props another component", this.props);
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
      </div>
    );
  }
}

export default AnotherComponent;
