import React from "react";
import { Toast, ToastBody, ToastHeader } from "reactstrap";
import "./style.scss";

const Comment = ({ userName, userComment }) => {
  return (
    <Toast>
      <ToastHeader>{userName}</ToastHeader>
      <ToastBody>{userComment}</ToastBody>
    </Toast>
  );
};

export default Comment;
