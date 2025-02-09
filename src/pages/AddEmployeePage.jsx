import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NewHireForm from "../components/Forms/NewHireForm";

const AddEmployeePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleEmployeeSubmit = async (employeeData) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch(
        "https://mock-api-hgn0.onrender.com/api/employees",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(employeeData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add employee");
      }

      navigate("/app/EmployeesPage");
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h2>New Employee Addition</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {loading ? (
        <p>Please wait...</p>
      ) : (
        <NewHireForm onAddEmployee={handleEmployeeSubmit} />
      )}
    </main>
  );
};

export default AddEmployeePage;
