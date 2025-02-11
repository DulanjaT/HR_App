import { useState } from "react";
import PropTypes from "prop-types";
import "./EmployeeCard.css";
import Button from "../Button/Button";
import Form from "../Forms/Forms";
import { useNavigate } from "react-router-dom";

function EmployeeCard(props) {
  const [currentRole, setCurrentRole] = useState(props.defaultRole);
  const [hasBeenPromoted, setHasBeenPromoted] = useState(false);
  const [isInEditMode, setIsInEditMode] = useState(false);
  const navigate = useNavigate();

  const initiateEditMode = () => {
    setIsInEditMode(true);
  };

  const navigateToEmployeeDetails = () => {
    const employeeProfile = {
      id: props.id,
      name: props.name,
      department: props.department,
      salary: props.salary,
      defaultRole: props.defaultRole,
      location: props.location,
      startDate: props.startDate,
      thumbnailUrl: `https://robohash.org/${props.id}.png?set=set5&size=200x200`, // Restored the original key
    };

    navigate(`/app/EmployeePage/${props.id}`, { state: employeeProfile });
  };

  const saveEdits = (updatedInfo) => {
    setCurrentRole(updatedInfo.role);
    props.onSave(props.id, updatedInfo);
    setIsInEditMode(false);
  };

  const cancelEdits = () => {
    setIsInEditMode(false);
  };

  const togglePromotion = () => {
    if (hasBeenPromoted) {
      setCurrentRole(props.defaultRole);
      setHasBeenPromoted(false);
    } else {
      setCurrentRole("Team Leader");
      setHasBeenPromoted(true);
    }
  };

  const getFormattedStartDate = () => {
    const start = new Date(props.startDate);
    const year = start.getFullYear();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[start.getMonth()];
    return `${month}/${year}`;
  };

  const calculateTenure = () => {
    const current = new Date();
    const start = new Date(props.startDate);
    let years = current.getFullYear() - start.getFullYear();
    let months = current.getMonth() - start.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    if (years === 0) {
      return `${months} months`;
    } else if (months === 0) {
      return `${years} years`;
    } else {
      return `${years} years and ${months} months`;
    }
  };

  const checkWorkAnniversary = () => {
    const today = new Date();
    const start = new Date(props.startDate);
    return (
      today.getMonth() === start.getMonth() &&
      today.getDate() === start.getDate()
    );
  };

  const reviewProbationPeriod = (probationMonths = 3) => {
    const current = new Date();
    const start = new Date(props.startDate);
    const totalMonths =
      (current.getFullYear() - start.getFullYear()) * 12 +
      (current.getMonth() - start.getMonth());

    if (totalMonths === probationMonths) {
      return "Probation review scheduled for this month.";
    } else if (totalMonths === probationMonths - 1) {
      return "Upcoming probation review next month.";
    } else {
      return "";
    }
  };

  const deleteEmployeeRecord = () => {
    props.onDelete(props.id);
  };

  const cardClassName = `card card-${
    props.department?.trim().toLowerCase().replace(/\s+/g, "-") || "default"
  }`;

  return (
    <>
      <div className={cardClassName}>
        <h3 className="card-title">{props.name}</h3>
        <img
          src={`https://robohash.org/${props.id}.png?set=set5&size=200x200`}
          alt={`${props.name}'s avatar`}
          className="thumbnail"
        />
        <ul className="card-content">
          <li>Current Role: {currentRole}</li>
          <li>Department: {props.department}</li>
          <li>Salary: {props.salary} €</li>
          <li>Start Date: {getFormattedStartDate()}</li>
          <li>Time with Company: {calculateTenure()}</li>
          <li>
            {checkWorkAnniversary() && (
              <span style={{ color: "green", fontWeight: "bold" }}>
                🎉 Anniversary Today!
              </span>
            )}
          </li>
          <li>
            {reviewProbationPeriod(3) && (
              <span style={{ color: "orange", fontWeight: "bold" }}>
                💬 {reviewProbationPeriod(3)}
              </span>
            )}
          </li>
        </ul>
        {!isInEditMode ? (
          <div className="cardButtonRow">
            <Button
              text="View Profile"
              click={navigateToEmployeeDetails}
              variant="primary"
            />
            <Button
              text="Edit Info"
              click={initiateEditMode}
              variant="primary"
            />
            <Button
              text={hasBeenPromoted ? "Revert Role" : "Promote"}
              click={togglePromotion}
              variant={hasBeenPromoted ? "secondary" : "primary"}
            />
            <Button
              text={"Remove"}
              click={deleteEmployeeRecord}
              variant="secondary"
            />
          </div>
        ) : (
          <div className="editFormContainer">
            <Form
              role={currentRole}
              department={props.department}
              salary={props.salary}
              onSave={saveEdits}
              location={props.location}
              onCancel={cancelEdits}
            />
          </div>
        )}
      </div>
    </>
  );
}

EmployeeCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  salary: PropTypes.number.isRequired,
  defaultRole: PropTypes.string.isRequired,
  location: PropTypes.string,
  startDate: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EmployeeCard;
