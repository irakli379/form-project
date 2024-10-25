import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ReusableForm.module.css";

const roles = {
  Admin: [
    "firstName",
    "lastName",
    "pid",
    "phoneNumber",
    "email",
    "password",
    "profileImage",
  ],
  User: [
    "firstName",
    "lastName",
    "pid",
    "phoneNumber",
    "email",
    "password",
    "profileImage",
    "address",
  ],
  Courier: [
    "firstName",
    "lastName",
    "pid",
    "phoneNumber",
    "email",
    "password",
    "profileImage",
    "vehicle",
    "workingDays",
  ],
};

const ReusableForm = ({ onSubmit }) => {
  const [selectedRole, setSelectedRole] = useState("Admin");
  const [formData, setFormData] = useState({});
  const [workingDays, setWorkingDays] = useState({});

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setFormData({});
    setWorkingDays({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddWorkingDay = (day) => {
    setWorkingDays({ ...workingDays, [day]: { startHours: "", endHours: "" } });
  };

  const handleWorkingHourChange = (day, type, value) => {
    setWorkingDays({
      ...workingDays,
      [day]: { ...workingDays[day], [type]: value },
    });
  };

  const validateCourier = () => {
    const daysCount = Object.keys(workingDays).length;
    const hoursCount = Object.values(workingDays).reduce(
      (count, day) => count + (day.startHours && day.endHours ? 1 : 0),
      0
    );
    return daysCount >= 5 && hoursCount >= 3;
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedRole === "Courier" && !validateCourier()) {
      alert("Courier must have at least 5 working days with 3 hours each.");
      return;
    }
    onSubmit({ ...formData, workingDays });
    navigate("/");
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.roleButtons}>
        {Object.keys(roles).map((role) => (
          <button
            key={role}
            type="button"
            onClick={() => handleRoleChange(role)}
            className={`${styles.roleButton} ${
              selectedRole === role ? styles.active : ""
            }`}
          >
            {role}
          </button>
        ))}
      </div>

      {roles[selectedRole].map((field) => {
        if (field === "workingDays") {
          return (
            <div key={field} className={styles.workingDays}>
              <h3>Working Days</h3>
              {["monday", "tuesday", "wednesday", "thursday", "friday"].map(
                (day) => (
                  <div key={day} className={styles.dayContainer}>
                    <h4 className={styles.dayTitle}>
                      {day.charAt(0).toUpperCase() + day.slice(1)}
                    </h4>
                    <button
                      type="button"
                      onClick={() => handleAddWorkingDay(day)}
                    >
                      Add Working Day
                    </button>
                    {workingDays[day] && (
                      <>
                        <select
                          onChange={(e) =>
                            handleWorkingHourChange(
                              day,
                              "startHours",
                              e.target.value
                            )
                          }
                          className={styles.select}
                        >
                          <option value="">Start Hour</option>
                          {[...Array(48).keys()].map((i) => {
                            const hour = String(Math.floor(i / 2)).padStart(
                              2,
                              "0"
                            );
                            const minute = i % 2 === 0 ? "00" : "30";
                            return (
                              <option key={i} value={`${hour}:${minute}`}>
                                {`${hour}:${minute}`}
                              </option>
                            );
                          })}
                        </select>
                        <select
                          onChange={(e) =>
                            handleWorkingHourChange(
                              day,
                              "endHours",
                              e.target.value
                            )
                          }
                          className={styles.select}
                        >
                          <option value="">End Hour</option>
                          {[...Array(48).keys()].map((i) => {
                            const hour = String(Math.floor(i / 2)).padStart(
                              2,
                              "0"
                            );
                            const minute = i % 2 === 0 ? "00" : "30";
                            return (
                              <option key={i} value={`${hour}:${minute}`}>
                                {`${hour}:${minute}`}
                              </option>
                            );
                          })}
                        </select>
                      </>
                    )}
                  </div>
                )
              )}
            </div>
          );
        }
        return (
          <div key={field} className={styles.field}>
            <label className={styles.label}>
              {field.charAt(0).toUpperCase() + field.slice(1)}:
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                onChange={handleChange}
                className={styles.input}
                required={
                  field !== "profileImage" &&
                  (selectedRole === "Courier" || selectedRole === "Admin")
                }
              />
            </label>
          </div>
        );
      })}

      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
  );
};

export default ReusableForm;
