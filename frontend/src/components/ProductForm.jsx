import { useState } from "react";
import { Form, Button, Image } from "react-bootstrap";

const ProductForm = ({ onSubmitHandler, product }) => {
  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price || 0);
  const [brand, setBrand] = useState(product?.brand || "");
  const [category, setCategory] = useState(product?.category || "");
  const [countInStock, setCountInStock] = useState(product?.countInStock || 0);
  const [description, setDescription] = useState(product?.description || "");
  const [imageFile, setImageFile] = useState("");
  const image = product?.image;

  return (
    <Form
      onSubmit={(e) =>
        onSubmitHandler(e, {
          name,
          price,
          image,
          brand,
          category,
          countInStock,
          description,
          imageFile,
        })
      }
    >
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="price" className="my-3">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="image" className="my-3">
        {image ? <Image src={image} thumbnail className="w-50" /> : null}
        <Form.Control
          label="Choose File"
          onChange={(e) => setImageFile(e.target.files[0])}
          type="file"
          name="imageFile"
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="brand" className="my-3">
        <Form.Label>Brand</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="countInStock" className="my-3">
        <Form.Label>Count In Stock</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter countInStock"
          value={countInStock}
          onChange={(e) => setCountInStock(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="category" className="my-3">
        <Form.Label>Category</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="description" className="my-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Button
        type="submit"
        variant="primary"
        className="my-3"
        style={{ marginTop: "1rem" }}
      >
        {product ? "Update" : "Create"}
      </Button>
    </Form>
  );
};

export default ProductForm;
