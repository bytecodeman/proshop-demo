import { useState } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image, Card } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import Rating from "./Rating";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";

const ProductCarousel = () => {
  const [productIndex, setProductIndex] = useState(0);
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const updateInfoCard = (x) => {
    setProductIndex(x);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Carousel pause="hover" className="bg-info" onSlid={updateInfoCard}>
            {products.map((product) => (
              <Carousel.Item key={product._id}>
                <Link to={`/product/${product._id}`}>
                  <Image src={product.image} alt={product.name} fluid />
                </Link>
              </Carousel.Item>
            ))}
          </Carousel>
          <Link to={`/product/${products[productIndex]._id}`}>
            <Card className="p-3 rounded">
              <Card.Body>
                <Card.Title as="div">
                  <strong>{products[productIndex].name}</strong>
                </Card.Title>
              </Card.Body>
              <Card.Text as="div">
                <Rating
                  value={products[productIndex].rating}
                  text={`${products[productIndex].numReviews} reviews`}
                />
              </Card.Text>
              <Card.Text as="h3">${products[productIndex].price}</Card.Text>
            </Card>
          </Link>
        </>
      )}
    </>
  );
};

export default ProductCarousel;
