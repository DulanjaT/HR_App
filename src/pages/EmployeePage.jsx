import { useLocation } from "react-router-dom";
import styles from "./EmployeePage.module.css";

const EmployeePage = () => {
  const location = useLocation();
  const employee = location.state;

  if (!employee) {
    return (
      <p>
        Error: Unable to retrieve employee data. Please navigate back and try
        again.
      </p>
    );
  }

  const departmentClass =
    styles[
      `employee-page-${
        employee.department.toLowerCase().replace(/\s+/g, "-") || "default"
      }`
    ];

  return (
    <div className={`${styles["employee-page"]} ${departmentClass}`}>
      <div className={styles["employee-header"]}>
        <img
          src={employee.thumbnailUrl}
          alt={`Photo of ${employee.name}`}
          className={styles["employee-thumbnail"]}
        />
        <h1 className={styles["employee-name"]}>{employee.name}</h1>
      </div>
      <div className={styles["employee-details"]}>
        <p>Department: {employee.department}</p>
        <p>Role: {employee.initialRole}</p>
        <p>Salary: {employee.salary} €</p>
        <p>Location: {employee.location}</p>
        <p>Start Date: {employee.startDate}</p>
      </div>
    </div>
  );
};

export default EmployeePage;
