import React from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import { withRouter } from "react-router-dom";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import {
  getUsersThunk,
  postUsersThunk,
  updateUsersThunk
} from "../actions/users";
import { Button, Modal, Input } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { ShowConfirm } from "./lib/comfirm-modal";

const users = [{ name: "Faisal", email: "faisalarkan21@gmail.com" }];

class ListUsers extends React.Component {
  state = {
    addUser: false,
    editUser: false,
    email: "",
    password: "",
    name: "",
    id: ""
  };

  componentDidMount() {
    this.props.dispatch(getUsersThunk());
  }
  /**
   * Fat Function
   */

  // { [id]: !this.state[id] });
  handleOpenModal = id => {
    console.log(id);
    this.setState(prevState => {
      return {
        [id]: !this.state[id]
      };
    });
  };

  handleOnChange = e => {
    console.log("handleOnChange", e.target.id, e.target.value);
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    const { email, password, name, id: IdUsers } = this.state;
    // this.props.dispatch(submitData({ email, password, name}))
    const { id } = e.target;
    const constructData = {
      email,
      password,
      name,
      id: IdUsers
    };

    if (id === "editUser") {
      this.props.dispatch(updateUsersThunk(constructData)).then(() => {
        this.setState({
          editUser: false,
          addUser: false
        });
      });
    } else if ("addUser") {
      this.props.dispatch(postUsersThunk(constructData)).then(() => {
        this.setState({
          editUser: false,
          addUser: false
        });
      });
    }
  };

  handleOpenModalEdit = row => {
    console.log("row", row);
    this.setState(
      {
        email: row.email,
        name: row.name,
        id: row.id
      },
      () => {
        this.handleOpenModal("editUser");
      }
    );
  };

  handleEdit = row => {
    return (
      <div>
        <Button onClick={() => this.handleOpenModalEdit(row)} color="primary">
          Edit
        </Button>
      </div>
    );
  };

  handleDelete = () => {
    return (
      <div>
        <Button onClick={ShowConfirm} color="primary">
          Delete
        </Button>
      </div>
    );
  }

 
  

  render() {
    console.log("this.state", this.state);
    return (
      <div>
        <ToastContainer />
        <Modal
          visible={this.state.addUser || this.state.editUser}
          title="Title"
          onCancel={() =>
            this.handleOpenModal(this.state.editUser ? "editUser" : "addUser")
          }
          footer={[
            <Button
              key="back"
              onClick={() =>
                this.handleOpenModal(
                  this.state.editUser ? "editUser" : "addUser"
                )
              }
            >
              Cancel
            </Button>,
            <Button
              key="submit"
              id={this.state.editUser ? "editUser" : "addUser"}
              onClick={this.handleSubmit}
              type="primary"
            >
              Submit
            </Button>
          ]}
        >
          <Input
            id="name"
            value={this.state.name}
            onChange={this.handleOnChange}
            placeholder="Basic usage"
          />
          <br />
          <br />
          <Input
            id="email"
            value={this.state.email}
            onChange={this.handleOnChange}
            placeholder="Basic usage"
          />
          <br />
          <br />
          <Input
            id="password"
            value={this.state.password}
            onChange={this.handleOnChange}
            placeholder="Basic usage"
          />
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
            <TableHeaderColumn dataFormat={(cell, row) => this.handleEdit(row)}>
              Edit
            </TableHeaderColumn>
            <TableHeaderColumn dataFormat={(cell, row) => this.handleDelete(row)}>
              Delete
            </TableHeaderColumn>
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
