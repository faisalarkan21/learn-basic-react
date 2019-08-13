import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Icon,
  Input,
  Row,
  Select,
  Tooltip
} from "antd";
import MaskedInput from 'react-text-mask';
import React from "react";
import { Formik } from "formik";
import "./register.css";

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const residences = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake"
          }
        ]
      }
    ]
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men"
          }
        ]
      }
    ]
  }
];

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = [".com", ".org", ".net"].map(
        domain => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };

  handleSubmitForm(value) {
    console.log("value submit", value);
  }

  onHandleCascaderChange(e, props){
    console.log('props-cascader value', e)
    console.log('props-cascader props', props)
    props.setFieldValue('location', e)
  }

  render() {
    const { autoCompleteResult } = this.state;

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Formik
        initialValues={{ email: "", password: "", passwordConfirm: '', nickname: '', location: '', phoneNumber: '', website: '', agreement : false, }}
        onSubmit={this.handleSubmitForm}
        validate={values => {
          console.log("values222", values);

          var patt = new RegExp(/(https?:\/\/)?(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)|(https?:\/\/)?(www\.)?(?!ww)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);

          const errors = {};
          if (!values.email) {
            errors.email = "Fill in email";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = "Email not valid";
          }

          if (!values.password) {
            errors.password = "Fill in password";
          }

          if (!values.passwordConfirm) {
            errors.password = "Fill in password";
          }

          if (values.passwordConfirm !== values.password) {
            errors.passwordConfirm = "Tidak sama";
          }
          if (!values.nickname) {
            errors.nickname = "Fill in nickname";
          }
          if (!values.location) {
            errors.location = "Fill in location";
          }
          if (!values.phoneNumber) {
            errors.phoneNumber = "Fill in phone number";
          }
          if (!values.website) {
            errors.website = "Fill in website";
          } else if (!patt.test(values.website)){
            errors.website = "Website url not valid";
          }
          
          return errors;
        }}
      >
        {props => {
          console.log("propstest", props);
          const {
            values: { 
              nickname,
              website,
              location,
              phoneNumber,
              email, 
              password, 
              passwordConfirm ,
            },
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
          } = props;
        
          return (
            <Form className="regist-form" onSubmit={handleSubmit}>
              <Form.Item label="E-mail">
                <Input
                  value={email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="email"
                />
                {errors.email && touched.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </Form.Item>
              <Form.Item label="Password" hasFeedback>
                <Input.Password
                  value={password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="password"
                />
                {errors.password && touched.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </Form.Item>
              <Form.Item label="Confirm Password" hasFeedback>
                <Input.Password
                  value={passwordConfirm}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="passwordConfirm"
                />
                {errors.passwordConfirm && touched.passwordConfirm && (
                  <div className="invalid-feedback">
                    {errors.passwordConfirm}
                  </div>
                )}
              </Form.Item>
              {/* 
                @TODO Validation
                Is Required
              */}
              <Form.Item
                label={
                  <span>
                    Nickname&nbsp;
                    <Tooltip title="What do you want others to call you?">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                }
              >
                <Input 
                    value={nickname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="nickname"
                />
                {errors.nickname && touched.nickname && (
                  <div className="invalid-feedback">{errors.nickname}</div>
                )}
              </Form.Item>
              <Form.Item label="Habitual Residence">
                {/* 
                @TODO Validation
                Is Required
              */}
                <Cascader 
                
                options={residences} 
                value={location}
                onChange={(e) => this.onHandleCascaderChange(e, props)}
                onBlur={handleBlur}
                id="location"

                />
                 {errors.location && touched.location && (
                  <div className="invalid-feedback">{errors.location}</div>
                )}
              </Form.Item>
              <Form.Item label="Phone Number">
                {/* 
                @TODO Validation
                1. Is Required
                2. using library -> https://github.com/text-mask/text-mask
              */}
                {/* <Inpcaut 
                  style={{ width: "100%" }} 
                  value={phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="phoneNumber"

                /> */}
                <MaskedInput
                  className="ant-input ant-cascader-input "
                  mask={s => Array.from(s).map(() => /[0-9]/i)}
                  value={phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="phoneNumber"
                  guide={false}
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <div className="invalid-feedback">{errors.phoneNumber}</div>
                )}
              </Form.Item>
              <Form.Item label="Website">
                {/* 
                @TODO Validation
                1. Is Required
                2. using library -> https://github.com/text-mask/text-mask
              */}
                {/* <AutoComplete dataSource={websiteOptions} placeholder="website"> */}
                  <Input 
                    value={website}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="website"
                  />
                  {errors.website && touched.website && (
                  <div className="invalid-feedback">{errors.website}</div>
                )}
                {/* </AutoComplete> */}
              </Form.Item>
              {/* <Form.Item
                label="Captcha"
                extra="We must make sure that your are a human."
              >
                <Row gutter={8}>
                  <Col span={12}>
                    <Input />
                  </Col>
                  <Col span={12}>
                    <Button>Get captcha</Button>
                  </Col>
                </Row>
              </Form.Item> */}
              <Form.Item>
                <Checkbox>
                  I have read the <a href="">agreement</a>
                </Checkbox>
                ,
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </Form>
          );
        }}
      </Formik>
    );
  }
}

export default RegistrationForm;
