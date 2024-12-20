import React from "react"
import { useState } from 'react';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Modal
} from 'antd';

const EditVehicleRegistration = ({isModalOpen, handleOk, handleCancel, car, bodyTypes, engineTypes}) => {
  const [form] = Form.useForm();

  const onOk = () => {
    form
    .validateFields()
    .then((values) => {
      console.log(bodyTypes.find(elem=> elem.type_name === values.body_type))
      const body = {
        model: values.model,
        color: values.color,
        price: Number(values.price),
        year: Number(values.year),
        count: Number(values.count),
        body_type_id: bodyTypes.find(elem=> elem.type_name === values.body_type).id,
        engine_type_id: engineTypes.find(elem=> elem.type_name === values.engine_type).id
      }
      console.log("Form values:", body);
      fetch(`http://localhost:8080/api/cars/${car.id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(body)
      })
      .then((data) => data.json())
      .then(() => {
        const body = {
          id: car.id,
          model: values.model,
          color: values.color,
          price: Number(values.price),
          year: Number(values.year),
          count: Number(values.count),
          body_type: values.body_type,
          engine_type: values.engine_type
        }

        handleOk(body)
      })
      
    })
    .catch((info) => {
      console.log("Validation failed:", info);
    });
  }

  return (
    <>
      <Modal title="Edit car" open={isModalOpen} onOk={onOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical" autoComplete="on" initialValues={car}>
          <Form.Item label="Model" name={"model"} rules={[{ required: true, message: 'Please input model value!'}]}>
            <Input/>
          </Form.Item >
          <Form.Item label="Color" name={"color"} rules={[{ required: true, message: 'Please input model value!' }]}>
            <Input/>
          </Form.Item>
          <Form.Item label="Count" name={"count"} rules={[{ required: true, message: 'Please input model value!' }]}>
            <Input/>
          </Form.Item>
          <Form.Item label="Price" name={"price"} rules={[{ required: true, message: 'Please input model value!' }]}>
            <Input/>
          </Form.Item>
          <Form.Item label="Year" name={"year"} rules={[{ required: true, message: 'Please input model value!' }]}>
            <Input/>
          </Form.Item>
          <Form.Item label="Body type" name={"body_type"} rules={[{ required: true, message: 'Please select option!'}]}>
            <Select>
            {bodyTypes.map(elem => {  
                return <Select.Option value={elem.id}>{elem.type_name}</Select.Option>
              })}
            </Select>
          </Form.Item>
          <Form.Item label="Engine type" name={"engine_type"} rules={[{ required: true, message: 'Please select option!'}]}>
            <Select>
            {engineTypes.map(elem => {   
                return <Select.Option value={elem.id}>{elem.type_name}</Select.Option>
              })}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default EditVehicleRegistration;
