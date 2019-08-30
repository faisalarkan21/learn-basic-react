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
import { Button, Modal, Input, Icon } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { ShowConfirm, ButtonDelete, ModalDelete } from "./lib/comfirm-modal";

const users = [{ name: "Faisal", email: "faisalarkan21@gmail.com" }];

class ListUsers extends React.Component {
  state = {
    addUser: false,
    editUser: false,
    modalDelete: false,
    data: "",
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
  handleOpenModal = (id, data) => {
    console.log(id);
    this.setState(prevState => {
      return {
        [id]: !this.state[id],
        data: data
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

  handleDeleteOk = id => {
    console.log("data", this.state.data.id);

    // this.props.dispatch(postDeleteThunk({id: this.state.data.id}))
    // console.log("id", id);
  };

  handleDelete = row => {
    return (
      <div>
        {/* <ModalDelete data={row} handleOk={this.handleOk} visible={this.state.modalDelete}  /> */}
        <Button
          onClick={() => this.handleOpenModal("modalDelete", row)}
          color="primary"
        >
          Delete
        </Button>
      </div>
    );
  };

  handlePushDetail = (id) =>{

    console.log('this.props', this.props)
    this.props.history.push({
      pathname: '/detail-user',
      search: `?id=${id}`
    });
  }

  handleDetail = ({ id }) => {
    return (
      <Button onClick={() => this.handlePushDetail(id)} color="primary">
        Detail
      </Button>
    );
  };

  render() {
    console.log("this.props", this.props.Users);
    return (
      <div>
        <ModalDelete
          handleOk={this.handleDeleteOk}
          handleCancel={() => this.handleOpenModal("modalDelete")}
          visible={this.state.modalDelete}
        >
          {" "}
          Apakah anda ingin menghapus user tersebut ?{" "}
        </ModalDelete>
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
          {this.props.Users.data.length <= 0 && (
            <Icon type="loading" style={{ fontSize: 50 }} spin />
          )}

          <BootstrapTable data={this.props.Users.data}>
            <TableHeaderColumn dataField="name" isKey>
              Name
            </TableHeaderColumn>
            <TableHeaderColumn dataField="email">Email</TableHeaderColumn>
            <TableHeaderColumn dataFormat={(cell, row) => this.handleEdit(row)}>
              Edit
            </TableHeaderColumn>
            <TableHeaderColumn
              dataFormat={(cell, row) => this.handleDelete(row)}
            >
              Delete
            </TableHeaderColumn>
            <TableHeaderColumn
              dataFormat={(cell, row) => this.handleDetail(row)}
            >
              Detail
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
