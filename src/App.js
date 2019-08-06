import React from "react";
import AnotherComponent from "./AnotherComponent";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0
    };
  }

  handleUpdateNumber = (value) => {
    this.setState({ number: value });
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
