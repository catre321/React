import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Card } from "../Interface";

interface ModifyModalProps {
  selectedCard: Card;
  onSave: (updatedCard: Card) => void;
}

export function ModifyModal({ selectedCard, onSave }: ModifyModalProps) {
  const [show, setShow] = useState(false);
  const [updatedCard, setUpdatedRecord] = useState(selectedCard);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUpdatedRecord({ ...updatedCard, [name]: value });
  };

  const handleSave = () => {
    onSave(updatedCard);
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
              value={updatedCard.code}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Status:</label>
            <input
              type="text"
              name="status"
              value={updatedCard.status}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Note:</label>
            <input
              type="text"
              name="note"
              value={updatedCard.note}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Updated By:</label>
            <input
              type="text"
              name="updatedBy"
              value={updatedCard.updatedBy}
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