import "./Button.css";
import PropTypes from "prop-types";

function Button({ text, click, type = "button", variant }) {
  return (
    <button
      className={`button ${
        variant === "primary" ? "button-primary" : "button-secondary"
      }`}
      type={type}
      onClick={click}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  click: PropTypes.func.isRequired,
  type: PropTypes.func.isRequired,
  variant: PropTypes.any.isRequired,
};

export default Button;
