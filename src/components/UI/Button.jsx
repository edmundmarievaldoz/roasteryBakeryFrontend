import "./Button.scss";
import { Link } from "react-router-dom";

// One shared pill button.
//   <Button to="/recipes/new" variant="primary">+ New recipe</Button>   -> a <Link> (navigates)
//   <Button onClick={onCancel}>Cancel</Button>                         -> a <button> (secondary)
//   <Button type="submit" variant="primary">Save</Button>              -> a submit <button>
// variant: "primary" | "secondary" | "danger"
// className: only for layout from the parent (margin, align-self), not for the look.
function Button({
  to,
  variant = "secondary",
  type = "button",
  onClick,
  disabled = false,
  className = "",
  children,
}) {
  // Initialisation--------------------------------------
  const classes = `button button--${variant} ${className}`.trim();

  // State ----------------------------------------------
  // Handlers -------------------------------------------
  // View -----------------------------------------------
  // 1. With "to": navigate to another page
  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  // 2. Without "to": a normal button
  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
