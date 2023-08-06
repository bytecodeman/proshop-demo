import React from "react";
import { Modal, Button } from "react-bootstrap";

const AboutThisAppModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>MERN Stack - eCommerce Platform</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          Ecommerce website built with MERN & Redux Toolkit. It is a
          full-featured shopping cart with PayPal & credit/debit payments.
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AboutThisAppModal;
