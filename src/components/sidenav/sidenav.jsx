import { useState } from "react";
import "./sidenav.css";

export function SideNav() {
  const [showHideStyle, setShowHideStyle] = useState({ display: "none" });

  function handleMouseOver() {
    setShowHideStyle({ display: "flex" });
  }
  function handleMouseOut() {
    setShowHideStyle({ display: "none" });
  }

  return (
    <>
      <div className="container-fluid nav-container">
        <nav className="nav">
          <div
            className="nav_menu"
            onMouseOut={handleMouseOut}
            onMouseOver={handleMouseOver}
          >
            <span className="bi bi-lightbulb"></span>
            <span className="bi bi-bell"></span>
            <span className="bi bi-pencil"></span>
            <span className="bi bi-save2"></span>
            <span className="bi bi-trash"></span>
          </div>
          <div className="side_drawer" style={showHideStyle}>
            <span>Notes</span>
            <span>Reminders</span>
            <span>Edit </span>
            <span className="mb-2">Archives</span>
            <span>Bin</span>
          </div>
        </nav>
      </div>
    </>
  );
}
