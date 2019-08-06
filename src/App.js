import React from "react";
import logo from "./logo.svg";
import { version, Button } from "antd";
import AnotherComponent from "./AnotherComponent";
import "./App.css";
import { from } from "rxjs";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0
    };
  }

  handleUpdateNumber = (value) => {
    // this.setState({ number: value });
    alert(value);
  }

  render() {
    console.log("this.state", this.state);
    return (
      <div className="App">
        <div style={{ marginTop: "16px" }}>
          <h3>{this.state.number}</h3>
          <AnotherComponent
            handleUpdateNumber={this.handleUpdateNumber}
            type="primary"
            buttonName="Tombol Self Distruction"
          />
        </div>
      </div>
    );
  }
}

export default App;
