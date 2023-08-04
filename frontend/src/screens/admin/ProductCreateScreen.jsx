import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import ProductForm from "../../components/ProductForm";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";

const ProductCreateScreen = () => {
  const [createProduct, { isLoading: loadingUpdate }] =
    useCreateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  const submitHandler = async (e, product) => {
    e.preventDefault();

    try {
      if (product.imageFile) {
        const formData = new FormData();
        formData.append("imageFile", product.imageFile);
        const res = await uploadProductImage(formData).unwrap();
        console.log(res);
        product.image = res.image;
      }

      await createProduct({
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
        category: product.category,
        description: product.description,
        countInStock: product.countInStock,
      }).unwrap();
      toast.success("Product created successfully");
      navigate("/admin/productlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Create Product</h1>
        {loadingUpdate && <Loader />}
        {loadingUpload && <Loader />}
        <ProductForm onSubmitHandler={submitHandler} />
      </FormContainer>
    </>
  );
};

export default ProductCreateScreen;
