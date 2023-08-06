import { Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { SolarAccessibilityBoldDuotone } from "../components/SolarAccessibilityBoldDuotone";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {keyword ? (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      ) : (
        <>
          <h1>Most Popular Products</h1>
          <Row className="justify-content-center">
            <Col sm={12} md={6} lg={4} xl={3}>
              <ProductCarousel />
            </Col>
          </Row>
        </>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>
            Latest Products <SolarAccessibilityBoldDuotone />
          </h1>
          <Row className="row-grid">
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            page={data.page}
            pages={data.pages}
            keyword={keyword}
            className="mt-3"
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
