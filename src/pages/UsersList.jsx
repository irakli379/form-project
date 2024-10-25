import { UseUsersContext } from "../contexts/UsersContext";
import styles from "./UsersList.module.css";

const UsersList = () => {
  const { getUsers } = UseUsersContext();
  const { data, error, isLoading } = getUsers;

  if (isLoading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error.message}</div>;

  console.log(data.items);

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {data.items.map((item) => (
          <li className={styles.listItem} key={item._uuid}>
            <h1 className={styles.itemTitle}>{item.firstName}</h1>
            <h2 className={styles.itemSubtitle}>{item.lastName}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
