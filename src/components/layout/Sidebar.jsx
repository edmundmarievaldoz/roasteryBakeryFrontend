import { NavLink } from "react-router-dom";
import "./Sidebar.scss";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav>
        <div className="topNav">
          <div className="navItem">
            <NavLink to="/recipes">Dashboard</NavLink>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;