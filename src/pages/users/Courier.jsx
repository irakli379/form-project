import { useState } from "react";
import { UseUsersContext } from "../../contexts/UsersContext";
import styles from "./Courier.module.css";

function Courier({ data }) {
  const { updateUser } = UseUsersContext();

  const [courierFields, setCourierFields] = useState({
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
        updateUser.mutate(courierFields);
      }}
    >
      <div>
        <label>First Name</label>
        <input
          type="text"
          value={courierFields.firstName}
          onChange={(e) =>
            setCourierFields({ ...courierFields, firstName: e.target.value })
          }
        />
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          value={courierFields.lastName}
          onChange={(e) =>
            setCourierFields({ ...courierFields, lastName: e.target.value })
          }
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          value={courierFields.email}
          onChange={(e) =>
            setCourierFields({ ...courierFields, email: e.target.value })
          }
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="text"
          value={courierFields.password}
          onChange={(e) =>
            setCourierFields({ ...courierFields, password: e.target.value })
          }
        />
      </div>
      <div>
        <label>Phone Number</label>
        <input
          type="text"
          value={courierFields.phoneNumber}
          onChange={(e) =>
            setCourierFields({ ...courierFields, phoneNumber: e.target.value })
          }
        />
      </div>
      <button>Update</button>

      {courierFields.tasks ? (
        <div className={styles.tasksContainer}>
          {Object.entries(courierFields.tasks).map(
            ([taskName, taskDetails]) => (
              <div key={taskName} className={styles.taskCard}>
                {taskDetails.priority && (
                  <div className={styles.ribbon}>Priority</div>
                )}
                <h4>{taskName}</h4>
                <p>{taskDetails.description}</p>
                <p>
                  Time: <span>{taskDetails.time} days</span>
                </p>
                <p>
                  Priority:{" "}
                  <span
                    className={taskDetails.priority ? styles.taskPriority : ""}
                  >
                    {taskDetails.priority ? "High" : "Normal"}
                  </span>
                </p>
              </div>
            )
          )}
        </div>
      ) : (
        <p>No tasks available</p>
      )}
    </form>
  );
}

export default Courier;
