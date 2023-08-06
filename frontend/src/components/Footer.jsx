import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import AboutThisAppModal from "./AboutThisAppModal";

const Footer = () => {
  const [show, setShow] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <footer>
      <Container>
        <div className="d-flex align-items-center justify-content-between mt-3 mb-5">
          <span>ProShop &copy; {currentYear}</span>
          <Button variant="outline-primary" size="sm" onClick={handleShow}>
            About This App
          </Button>
        </div>
      </Container>
      <AboutThisAppModal show={show} handleClose={handleClose} />
    </footer>
  );
};

export default Footer;
