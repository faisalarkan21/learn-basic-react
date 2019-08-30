import { Modal } from 'antd';
import React from "react";


export const ModalDelete = (props, row) => {
  console.log()
  return (
    <Modal
    title="Confirm"
    visible={props.visible}
    onOk={props.handleOk}
    onCancel={props.handleCancel}
  >
    {/* <p>{} {row.name} ? </p> */}
    {props.children}
  </Modal>
  )
}
