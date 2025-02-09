import { useEffect, useState } from "react";
import EmployeeCard from "../EmployeeCard/EmployeeCard";
import "./EmployeeList.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          "https://hr-app-backend-a7ec.onrender.com/employees"
        );
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const updateEmployee = (id, updatedData) => {
    setEmployees((prev) =>
      prev.map((employee) =>
        employee.id === id ? { ...employee, ...updatedData } : employee
      )
    );
  };

  const deleteEmployee = async (id) => {
    try {
      await fetch(`https://hr-app-backend-a7ec.onrender.com/employees/${id}`, {
        method: "DELETE",
      });
      setEmployees((prev) => prev.filter((employee) => employee.id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="cards-list">
      {isLoading ? (
        <p>Loading employees...</p>
      ) : employees.length > 0 ? (
        employees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            {...employee}
            onDelete={deleteEmployee}
            onSave={updateEmployee}
          />
        ))
      ) : (
        <p>No employees found.</p>
      )}
    </div>
  );
};

export default EmployeeList;
