import { Button, Form, Input, Select } from "antd";
import qs from "query-string";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getDetailUserThunk } from "../actions/users";
const { Option } = Select;

class DetailUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataUser: {
        data: {}
      }
    };
  }

  onChange = e => {
    const dataTemp = { ...this.state.dataUser };
    dataTemp.data[e.target.id] = e.target.value;

    this.setState({
      dataUser: dataTemp
    });
  };

  onChangeSelect = (type, value) => {
    const dataTemp = { ...this.state.dataUser };
    dataTemp.data[type] = value;
    this.setState({
      dataUser: dataTemp
    });
  };

  componentDidMount() {
    const {
      location: { search }
    } = this.props;
    const { id } = qs.parse(search);
    this.props.dispatch(getDetailUserThunk(`?id=${id}`));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataUser: nextProps.getUser
    });
  }

  render() {
    console.log("data-render", this.state.dataUser.data.gender);
    return (
      <div>
        <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
          <Form.Item label="City">
            <Input
              id="city"
              value={this.state.dataUser.data.city}
              onChange={this.onChange}
            />
          </Form.Item>
          <Form.Item label="Gender">
            <Select
              id="gender"
              value={this.state.dataUser.data.gender}
              onChange={e => this.onChangeSelect("gender", e)}
              placeholder="Pilih Gender"
            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    getUser: state.getDetailUser
  };
}

export default withRouter(connect(mapStateToProps)(DetailUser));
