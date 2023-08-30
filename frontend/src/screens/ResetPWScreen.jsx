import { useState } from "react";
import FormContainer from "../components/FormContainer";
import ResetPWForm from "../components/ResetPWForm";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "../slices/usersApiSlice";

const ResetPWScreen = () => {
  const [resetPassword, { isLoading: loadingUpdate }] =
    useResetPasswordMutation();

  const [resetDone, setResetDone] = useState(false);

  const submitHandler = async (e, user) => {
    e.preventDefault();
    try {
      await resetPassword(user).unwrap();
      setResetDone(true);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Reset Password</h1>
      {!resetDone ? (
        <>
          <p>
            Enter your Email below and click Submit. An email will be sent, if
            it is in the system. A link in that email will allow you to change
            your password.
          </p>
          {loadingUpdate && <Loader />}
          <ResetPWForm onSubmitHandler={submitHandler} />
        </>
      ) : (
        <p>Check your email for a link to change your password.</p>
      )}
    </FormContainer>
  );
};

export default ResetPWScreen;
