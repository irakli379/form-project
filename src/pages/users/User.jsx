import { useState } from "react";
import { UseUsersContext } from "../../contexts/UsersContext";
import { useNavigate } from "react-router-dom";
import styles from "./User.module.css";

function User({ data }) {
  const { updateUser, deleteUser, setCurUser, setIsLoggedIn } =
    UseUsersContext();

  const navigate = useNavigate();

  const [userFields, setUserFields] = useState({
    ...data,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
    phoneNumber: data.phoneNumber,
  });

  return (
    <form
      className={styles.formContainer}
      onSubmit={(e) => {
        e.preventDefault();
        updateUser.mutate(userFields);
      }}
    >
      {[
        { label: "First Name", name: "firstName" },
        { label: "Last Name", name: "lastName" },
        { label: "Email", name: "email" },
        { label: "Password", name: "password" },
        { label: "Phone Number", name: "phoneNumber" },
      ].map(({ label, name }) => (
        <div key={name} className={styles.fieldContainer}>
          <label className={styles.label}>{label}</label>
          <input
            type="text"
            className={styles.input}
            value={userFields[name]}
            onChange={(e) =>
              setUserFields({ ...userFields, [name]: e.target.value })
            }
          />
        </div>
      ))}

      <div className={styles.buttonGroup}>
        <button className={`${styles.button} ${styles.updateButton}`}>
          Update
        </button>
        <button
          className={`${styles.button} ${styles.deleteButton}`}
          onClick={(e) => {
            e.preventDefault();
            deleteUser.mutate(userFields);
            setIsLoggedIn(false);
            setCurUser("");
            navigate("/");
          }}
        >
          Delete
        </button>
      </div>
    </form>
  );
}

export default User;
