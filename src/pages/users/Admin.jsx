import { useState } from "react";
import { UseUsersContext } from "../../contexts/UsersContext";
import styles from "./Admin.module.css";

function Admin() {
  const [selectedRole, setSelectedRole] = useState("All");
  const [openAddTaskForm, setOpenAddTaskForm] = useState(false);

  const [task, setTask] = useState({
    taskName: "",
    taskDescription: "",
    taskTime: 1,
    taskPriority: false,
  });

  const { getUsers, deleteUser, updateUser } = UseUsersContext();
  const { data, error, isLoading } = getUsers;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const filteredData =
    selectedRole === "All"
      ? data.items.filter((us) => us.role === "User" || us.role === "Courier")
      : data.items.filter((user) => user.role === selectedRole);

  return (
    <div className={styles.adminContainer}>
      <div className={styles.filterButtons}>
        {["All", "Courier", "User"].map((role) => (
          <button
            key={role}
            className={`${styles.optionButton} ${
              selectedRole === role ? styles.active : ""
            }`}
            onClick={() => setSelectedRole(role)}
          >
            {role}
          </button>
        ))}
      </div>

      <div className={styles.dataContainer}>
        {filteredData.map((item) => {
          if (item.role === "Courier") {
            return (
              <div key={item._uuid} className={styles.dataCard}>
                <h1>{item.firstName}</h1>
                <h2>{item.phoneNumber}</h2>
                <h3>{item.role}</h3>
                {openAddTaskForm ? (
                  <form
                    style={{ paddingRight: "20px" }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      updateUser.mutate({
                        ...item,
                        tasks: {
                          ...(item.tasks || {}),
                          [task.taskName]: {
                            name: task.taskName,
                            description: task.taskDescription,
                            time: task.taskTime,
                            priority: task.taskPriority,
                          },
                        },
                      });
                    }}
                  >
                    <div>
                      <label>Task Name</label>
                      <input
                        type="text"
                        value={task.taskName}
                        onChange={(e) =>
                          setTask({ ...task, taskName: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label>Task Description</label>
                      <input
                        type="text"
                        value={task.taskDescription}
                        onChange={(e) =>
                          setTask({ ...task, taskDescription: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label>Days for Completion</label>
                      <input
                        type="text"
                        value={task.taskTime}
                        onChange={(e) =>
                          setTask({ ...task, taskTime: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label>Priority</label>
                      <input
                        type="radio"
                        checked={task.taskPriority}
                        onClick={() =>
                          setTask((prev) => ({
                            ...prev,
                            taskPriority: !prev.taskPriority,
                          }))
                        }
                      />
                    </div>
                    <button className={styles.newTaskButton}>Add Task</button>
                  </form>
                ) : null}
                <button
                  className={styles.newTaskButton}
                  onClick={() => setOpenAddTaskForm((prev) => !prev)}
                >
                  New Task
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => deleteUser.mutate(item)}
                >
                  Delete
                </button>
              </div>
            );
          }

          return (
            <div key={item._uuid} className={styles.dataCard}>
              <h1>{item.firstName}</h1>
              <h2>{item.phoneNumber}</h2>
              <h3>{item.role}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Admin;
