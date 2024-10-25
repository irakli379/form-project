import ReusableForm from "../components/forms/ReusableForm";
import { UseUsersContext } from "../contexts/UsersContext";

const Register = () => {
  const { mutation } = UseUsersContext();

  const handleFormSubmit = (data) => {
    console.log("Form Data:", data);
    mutation.mutate(data);
  };

  return (
    <div>
      <h1>Register</h1>
      <ReusableForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default Register;
