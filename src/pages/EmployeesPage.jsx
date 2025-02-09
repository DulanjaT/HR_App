import EmployeeList from "../components/EmployeeList/EmployeeList";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";

function EmployeesPage() {
  const navigate = useNavigate();

  const handleAddEmployee = () => {
    navigate("/app/AddEmployee"); // Navigate to the Add Employee form
  };

  return (
    <>
      {/* <Header /> */}
      <main>
        <div className="buttonRow">
          <Button
            text={"Add Employee"}
            variant="secondary"
            click={handleAddEmployee}
          />
        </div>
        <EmployeeList />
      </main>
      {/* <Footer /> */}
    </>
  );
}

export default EmployeesPage;
