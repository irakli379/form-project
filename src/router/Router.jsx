import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Register from "../pages/Register";
import LogIn from "../pages/LogIn";
import Navbar from "../components/Navbar";
import { routes } from "./routes";
import UsersList from "../pages/UsersList";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navbar routes={routes} />}>
        <Route index element={<HomePage />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default Router;
