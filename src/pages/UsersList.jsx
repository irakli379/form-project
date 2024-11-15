import { UseUsersContext } from "../contexts/UsersContext";
import User from "./users/User";
import Admin from "./users/Admin";
import Courier from "./users/Courier";
import styles from "./UsersList.module.css";

const UsersList = () => {
  const { getUsers, curUser } = UseUsersContext();
  const { data, error, isLoading } = getUsers;

  if (isLoading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error.message}</div>;

  console.log(
    data.items,
    data.items.filter((it) => it.role === "Admin"),
    data.items.find((cur) => cur.email === curUser)?.firstName
  );

  const userData = data.items.find((cur) => cur.email === curUser);

  if (curUser) {
    if (data.items.find((cur) => cur.email === curUser).role === "User") {
      return <User data={userData} />;
    }
    if (data.items.find((cur) => cur.email === curUser).role === "Admin") {
      return <Admin data={userData} />;
    }
    if (data.items.find((cur) => cur.email === curUser).role === "Courier") {
      return <Courier data={userData} />;
    }
  }
  return <h1>Please Log in</h1>;

  // return (
  //   <div className={styles.container}>
  //     <ul className={styles.list}>
  //       {data.items.map((item) => (
  //         <li className={styles.listItem} key={item._uuid}>
  //           <h1 className={styles.itemTitle}>{item.firstName}</h1>
  //           <h2 className={styles.itemSubtitle}>{item.lastName}</h2>
  //           <h1>{item.role}</h1>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
};

export default UsersList;
