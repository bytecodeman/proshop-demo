import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import UserForm from "../../components/UserForm";
import { useCreateUserMutation } from "../../slices/usersApiSlice";

const UserCreateScreen = () => {
  const [createUser, { isLoading: loadingUpdate }] = useCreateUserMutation();

  const navigate = useNavigate();

  const submitHandler = async (e, user) => {
    e.preventDefault();
    const password = user.password.trim();
    const confirmPassword = user.confirmPassword.trim();
    if (!password || !confirmPassword) {
      toast.error("Password(s) are empty");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await createUser({
        name: user.name,
        email: user.email,
        password,
        isAdmin: user.isAdmin,
      }).unwrap();
      toast.success("User created successfully");
      navigate("/admin/userlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Create User</h1>
        {loadingUpdate && <Loader />}
        <UserForm onSubmitHandler={submitHandler} />
      </FormContainer>
    </>
  );
};

export default UserCreateScreen;
