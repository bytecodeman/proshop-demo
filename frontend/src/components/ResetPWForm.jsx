import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const ResetPWForm = ({ onSubmitHandler }) => {
  const [email, setEmail] = useState("");

  return (
    <Form
      onSubmit={(e) =>
        onSubmitHandler(e, {
          email,
        })
      }
    >
      <Form.Group className="mb-4" controlId="email">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Button
        type="submit"
        variant="primary"
        className="my-3"
        style={{ marginTop: "1rem" }}
      >
        Submit
      </Button>
    </Form>
  );
};

export default ResetPWForm;
