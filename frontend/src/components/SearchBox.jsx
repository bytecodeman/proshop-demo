import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();

  // FIX: uncontrolled input - urlKeyword may be undefined
  const [keyword, setKeyword] = useState(urlKeyword || "");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      setKeyword("");
      navigate(`/search/${keyword.trim()}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex align-self-center">
      <Form.Control
        type="text"
        name="q"
        size="sm"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder="Search Products..."
        className="ms-2 py-0 fw-bold"
      ></Form.Control>
      <Button
        type="submit"
        variant="outline-light"
        size="sm"
        className="py-0 mx-2"
      >
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
