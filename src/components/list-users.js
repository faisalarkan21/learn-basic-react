import React from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import { withRouter } from "react-router-dom";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { getUsersThunk } from "../actions/users";
import { Button, Modal, Input } from "antd";

const users = [{ name: "Faisal", email: "faisalarkan21@gmail.com" }];

class ListUsers extends React.Component {
  state = {
    addUser: false,
    email: '',
    password:'',
    name: '',
  };

  componentDidMount() {
    this.props.dispatch(getUsersThunk());
  }
  /**
   * Fat Function
   */
  handleOpenModal = id => {
    console.log(id);
    this.setState({ [id]: !this.state[id] });
  };

  handleOnChange = (e) => {
      console.log('handleOnChange', e.target.id, e.target.value)
    this.setState({[e.target.id]: e.target.value})
  }

  handleSubmit(){
    const { email, password, name } = this.state;
    this.props.dispatch(submitData({ email, password, name}))
  }

  render() {
    console.log("this.state.add", this.state.addUser);
    return (
      <div>
        <Modal
          visible={this.state.addUser}
          title="Title"
          onCancel={() => this.handleOpenModal('addUser')}
          footer={[
            <Button key="back" onClick={() => this.handleOpenModal('addUser')}>
              Return
            </Button>,
            <Button key="submit" onClick={this.handleSubmit} type="primary">
              Submit
            </Button>
          ]}
        >
          <Input id='name' value={this.state.name} onChange={this.handleOnChange} placeholder="Basic usage" />
          <br />
          <br />
          <Input id='email'  value={this.state.email} onChange={this.handleOnChange} placeholder="Basic usage" />
          <br />
          <br />
          <Input id='password'   value={this.state.password} onChange={this.handleOnChange} placeholder="Basic usage" />
        </Modal>
        <Button type="primary" onClick={() => this.handleOpenModal("addUser")}>
          Tambah User
        </Button>
        <div style={{ width: 400 }}>
          <BootstrapTable data={this.props.Users.data}>
            <TableHeaderColumn dataField="name" isKey>
              Name
            </TableHeaderColumn>
            <TableHeaderColumn dataField="email">Email</TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log("state", state);
  return {
    countingAdd: state.countingAdd,
    login: state.loginUser,
    Users: state.getUsers
  };
}

export default withRouter(connect(mapStateToProps)(ListUsers));
