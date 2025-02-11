import { useState } from "react";
import PropTypes from "prop-types";
import "./EmployeeCard.css";
import Button from "../Button/Button";
import Form from "../Forms/Forms";
import { useNavigate } from "react-router-dom";

function EmployeeCard(props) {
  const [role, setRole] = useState(props.initialRole);
  const [isPromoted, setIsPromoted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const handleEditClick = () => setIsEditing(true);

  const handleViewEmployee = () => {
    navigate(`/app/EmployeePage/${props.id}`, {
      state: {
        id: props.id,
        name: props.name,
        department: props.department,
        salary: props.salary,
        initialRole: props.initialRole,
        location: props.location,
        startDate: props.startDate,
        thumbnailUrl: `https://robohash.org/${props.id}.png?set=set5&size=200x200`,
      },
    });
  };

  const handleSave = (updatedData) => {
    setRole(updatedData.role);
    props.onSave(props.id, updatedData);
    setIsEditing(false);
  };

  const handleCancel = () => setIsEditing(false);

  const clickHandler = () => {
    setRole(isPromoted ? props.initialRole : "Team Lead");
    setIsPromoted(!isPromoted);
  };

  const formatStartDate = () => {
    const startDate = new Date(props.startDate);
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
    return `${monthNames[startDate.getMonth()]}/${startDate.getFullYear()}`;
  };

  const yearsWorked = () => {
    const today = new Date();
    const startDate = new Date(props.startDate);
    let years = today.getFullYear() - startDate.getFullYear();
    let months = today.getMonth() - startDate.getMonth();
    if (months < 0) {
      years--;
      months += 12;
    }
    return years === 0
      ? `${months} months`
      : months === 0
      ? `${years} years`
      : `${years} years and ${months} months`;
  };

  const isAnniversary = () => {
    const today = new Date();
    const startDate = new Date(props.startDate);
    return (
      today.getMonth() === startDate.getMonth() &&
      today.getDate() === startDate.getDate()
    );
  };

  const hasProbationReviewComingUp = (probationPeriodMonths = 3) => {
    const today = new Date();
    const startDate = new Date(props.startDate);
    const totalMonthsDifference =
      (today.getFullYear() - startDate.getFullYear()) * 12 +
      (today.getMonth() - startDate.getMonth());
    return totalMonthsDifference === probationPeriodMonths
      ? "Probation review this month!"
      : totalMonthsDifference === probationPeriodMonths - 1
      ? "Probation review next month!"
      : "";
  };

  const handleDelete = () => props.onDelete(props.id);

  const departmentClass = `card card-${
    props.department?.trim().toLowerCase().replace(/\s+/g, "-") || "default"
  }`;

  return (
    <div className={departmentClass}>
      <h3 className="card-title">{props.name}</h3>
      <img
        src={`https://robohash.org/${props.id}.png?set=set5&size=200x200`}
        alt={`${props.name}'s avatar`}
        className="thumbnail"
      />
      <ul className="card-content">
        <li>Role: {role}</li>
        <li>Department: {props.department}</li>
        <li>Salary: {props.salary} €</li>
        <li>Started: {formatStartDate()}</li>
        <li>In company for: {yearsWorked()}</li>
        <li>
          {isAnniversary() && (
            <span style={{ color: "green", fontWeight: "bold" }}>
              🎉 Anniversary Celebration Today!
            </span>
          )}
        </li>
        <li>
          {hasProbationReviewComingUp(3) && (
            <span style={{ color: "orange", fontWeight: "bold" }}>
              💬 {hasProbationReviewComingUp(3)}
            </span>
          )}
        </li>
      </ul>
      {!isEditing ? (
        <div className="cardButtonRow">
          <Button text="View" click={handleViewEmployee} variant="primary" />
          <Button text="Edit" click={handleEditClick} variant="primary" />
          <Button
            text={isPromoted ? "Demote" : "Promote"}
            click={clickHandler}
            variant={isPromoted ? "secondary" : "primary"}
          />
          <Button text="Delete" click={handleDelete} variant="secondary" />
        </div>
      ) : (
        <div className="editFormContainer">
          <Form
            role={role}
            department={props.department}
            salary={props.salary}
            onSave={handleSave}
            location={props.location}
            onCancel={handleCancel}
          />
        </div>
      )}
    </div>
  );
}

EmployeeCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  salary: PropTypes.number.isRequired,
  initialRole: PropTypes.string.isRequired,
  location: PropTypes.string,
  startDate: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EmployeeCard;
