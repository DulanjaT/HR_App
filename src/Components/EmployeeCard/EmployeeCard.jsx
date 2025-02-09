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

  const startEditing = () => {
    setIsEditing(true);
  };

  const viewEmployeeDetails = () => {
    const employeeData = {
      id: props.id,
      name: props.name,
      department: props.department,
      salary: props.salary,
      initialRole: props.initialRole,
      location: props.location,
      startDate: props.startDate,
      thumbnailUrl: `https://robohash.org/${props.id}.png?set=set5&size=200x200`,
    };

    navigate(`/app/EmployeePage/${props.id}`, { state: employeeData });
  };

  const saveUpdates = (updatedData) => {
    setRole(updatedData.role);
    props.onSave(props.id, updatedData);
    setIsEditing(false);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const togglePromotion = () => {
    if (isPromoted) {
      setRole(props.initialRole);
      setIsPromoted(false);
    } else {
      setRole("Team Lead");
      setIsPromoted(true);
    }
  };

  const formatStartDate = () => {
    const start = new Date(props.startDate);
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
    const year = start.getFullYear();
    return `${month}/${year}`;
  };

  const yearsAtCompany = () => {
    const today = new Date();
    const start = new Date(props.startDate);
    let years = today.getFullYear() - start.getFullYear();
    let months = today.getMonth() - start.getMonth();

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

  const isAnniversaryToday = () => {
    const today = new Date();
    const start = new Date(props.startDate);
    return (
      today.getMonth() === start.getMonth() &&
      today.getDate() === start.getDate()
    );
  };

  const probationReviewStatus = (probationPeriodMonths = 3) => {
    const today = new Date();
    const start = new Date(props.startDate);
    const monthsDifference =
      (today.getFullYear() - start.getFullYear()) * 12 +
      (today.getMonth() - start.getMonth());

    if (monthsDifference === probationPeriodMonths) {
      return "Probation review this month!";
    } else if (monthsDifference === probationPeriodMonths - 1) {
      return "Probation review next month!";
    }
    return "";
  };

  const handleDelete = () => {
    props.onDelete(props.id);
  };

  const departmentClass = `card card-${
    props.department?.trim().toLowerCase().replace(/\s+/g, "-") || "default"
  }`;

  return (
    <>
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
          <li>In company for: {yearsAtCompany()}</li>
          <li>
            {isAnniversaryToday() && (
              <span style={{ color: "green", fontWeight: "bold" }}>
                🎉 Work Anniversary Today!
              </span>
            )}
          </li>
          <li>
            {probationReviewStatus(3) && (
              <span style={{ color: "orange", fontWeight: "bold" }}>
                💬 {probationReviewStatus(3)}
              </span>
            )}
          </li>
        </ul>
        {!isEditing ? (
          <div className="cardButtonRow">
            <Button text="View" click={viewEmployeeDetails} variant="primary" />
            <Button text="Edit" click={startEditing} variant="primary" />
            <Button
              text={isPromoted ? "Demote" : "Promote"}
              click={togglePromotion}
              variant={isPromoted ? "secondary" : "primary"}
            />
            <Button text={"Delete"} click={handleDelete} variant="secondary" />
          </div>
        ) : (
          <div className="editFormContainer">
            <Form
              role={role}
              department={props.department}
              salary={props.salary}
              onSave={saveUpdates}
              location={props.location}
              onCancel={cancelEditing}
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
  initialRole: PropTypes.string.isRequired,
  location: PropTypes.string,
  startDate: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EmployeeCard;
