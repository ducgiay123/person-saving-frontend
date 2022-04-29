import React, { useState } from "react";
import { Form, Input, Select, AutoComplete, Modal } from "antd";
import "./registrationForm.css";
import Axios from "axios";
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const baseData = {
  name: "",
  location: "",
  money: 0,
};
const RegistrationForm = (props) => {
  const [form] = Form.useForm();

  const [newData, setNewData] = useState(baseData);

  const handleOk = () => {
    props.setVisible(false);
    Axios.post("http://localhost:8080/table", {
      name: newData.name,
      money: newData.money,
      location: newData.location,
    }).catch((err) => console.log(err));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewData({
      ...newData,
      [name]: value,
    });
  };
  return (
    <Modal
      visible={props.visible}
      okText="Submit"
      cancelText="Cancel"
      onOk={handleOk}
      onCancel={() => props.setVisible(false)}
    >
      <Form {...formItemLayout} form={form} name="register" scrollToFirstError>
        <Form.Item
          name="name"
          key={1}
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input your name",
            },
          ]}
        >
          <Input
            type="text"
            value={newData.name}
            onChange={handleInputChange}
            name="name"
          />
        </Form.Item>
        <Form.Item
          key={2}
          name="location"
          label="Location"
          rules={[
            {
              required: true,
              message: "Please input your location!",
            },
          ]}
          hasFeedback
        >
          <Input
            type="text"
            value={newData.location}
            onChange={handleInputChange}
            name="location"
          />
        </Form.Item>
        <Form.Item
          key={3}
          name="money"
          label="Money"
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
          ]}
        >
          <Input
            type="number"
            value={newData.money}
            onChange={handleInputChange}
            name="money"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RegistrationForm;
