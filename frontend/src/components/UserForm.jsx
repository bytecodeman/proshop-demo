import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const UserForm = ({ onSubmitHandler, user }) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState(user?.password || "");
  const [confirmPassword, setConfirmPassword] = useState(
    user?.confirmPassword || ""
  );
  const [isAdmin, setIsAdmin] = useState(user?.isAdmin || false);

  return (
    <Form
      onSubmit={(e) =>
        onSubmitHandler(e, {
          name,
          email,
          password,
          confirmPassword,
          isAdmin,
        })
      }
    >
      <Form.Group className="my-4" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="name"
          placeholder="Enter name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        ></Form.Control>
      </Form.Group>
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
      <Form.Group className="mb-4" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Form.Group className="mb-4" controlId="confirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Form.Group className="mb-4" controlId="isadmin">
        <Form.Label>Is Admin?</Form.Label>
        <Form.Check
          type="switch"
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}
        ></Form.Check>
      </Form.Group>
      <Button
        type="submit"
        variant="primary"
        className="my-3"
        style={{ marginTop: "1rem" }}
      >
        {user ? "Update" : "Create"}
      </Button>
    </Form>
  );
};

export default UserForm;
