import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input
} from "reactstrap";

import "./style.scss";

const ModalAdd = ({
  isModal,
  isEdit,
  toggleModalWindow,
  toggleInfoRecord,
  saveToStore,
  editToStore,
  currentTitle,
  currentDescription
}) => {
  return (
    <Modal
      isOpen={isModal}
      toggle={toggleModalWindow}
      className="modal-container"
    >
      <ModalHeader toggle={toggleModalWindow}>
        <Input
          type="text"
          name="title"
          id="titleId"
          placeholder="Введите заголовок"
          value={currentTitle}
          onChange={e => toggleInfoRecord(e, "currentTitle")}
        />
      </ModalHeader>
      <ModalBody>
        <Input
          type="textarea"
          name="description"
          id="descriptionId"
          placeholder="Введите описание"
          rows={15}
          value={currentDescription}
          onChange={e => toggleInfoRecord(e, "currentDescription")}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggleModalWindow}>
          Отмена
        </Button>
        <Button color="primary" onClick={isEdit ? editToStore : saveToStore}>
          Сохранить
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalAdd;
