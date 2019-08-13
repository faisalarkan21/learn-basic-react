import React from "react";
import AnotherComponent from "./AnotherComponent";
import "./App.css";
import { connect } from "react-redux";

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
          <br></br>
          <h4>Ini App Component</h4>
          {this.props.countingAdd.data}
        </div>
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

export default connect(mapStateToProps)(App);
