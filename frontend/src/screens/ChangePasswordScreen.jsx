import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  useGetUserDetailsByUUIDQuery,
  useUpdatePasswordMutation,
} from "../slices/usersApiSlice";
import FormContainer from "../components/FormContainer";

const ChangePasswordScreen = () => {
  const { uuid } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const {
    data: userProfile,
    isLoading,
    error,
  } = useGetUserDetailsByUUIDQuery(uuid);

  const [updatePassword, { isLoading: loadingUpdatePassword }] =
    useUpdatePasswordMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        await updatePassword({
          _id: userProfile._id,
          password,
          resetPasswordUUID: uuid,
        }).unwrap();
        toast.success("Password Changed Successfully");
        navigate("/");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <h2>Change Password</h2>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
          {loadingUpdatePassword && <Loader />}
        </Form>
      )}
    </FormContainer>
  );
};

export default ChangePasswordScreen;
