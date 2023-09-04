import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Gate } from "../Interface";

interface ModifyModalProps {
  selectedGate: Gate;
  onSave: (updatedGate: Gate) => void;
}

export function ModifyModal({ selectedGate, onSave }: ModifyModalProps) {
  const [show, setShow] = useState(false);
  const [updatedGate, setUpdatedRecord] = useState(selectedGate);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUpdatedRecord({ ...updatedGate, [name]: value });
  };

  const handleSave = () => {
    onSave(updatedGate);
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Modify
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit selected card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label>Code:</label>
            <input
              type="text"
              name="code"
              value={updatedGate.code}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Status:</label>
            <input
              type="text"
              name="status"
              value={updatedGate.status}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Note:</label>
            <input
              type="text"
              name="note"
              value={updatedGate.note}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Updated By:</label>
            <input
              type="text"
              name="updatedBy"
              value={updatedGate.updatedBy}
              onChange={handleInputChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}