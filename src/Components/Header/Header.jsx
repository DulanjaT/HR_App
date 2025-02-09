import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import Button from "../Button/Button";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <header className="header">
      <div className="headerMenu">
        <NavLink to="HomePage">
          <img src={logo} alt="Company Logo" className="logo" />
        </NavLink>
        <nav className="nav-links">
          <ul className="nav">
            <li>
              <NavLink to="HomePage" exact aria-label="Go to Home Page">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="EmployeesPage" aria-label="Go to Employees Page">
                Employees
              </NavLink>
            </li>
          </ul>
          <Button text="Logout" variant="secondary" click={handleLogout} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
