import "./header.css";
import keepIcon from "../../assets/keep_logo.png";

export function HeaderPage() {
  return (
    <div className="container-fluid">
      <header className="header">
        <div className="header-container">
          <div className="left d-flex">
            <span className="bi bi-list  "></span>
            <img src={keepIcon} alt="" className="keep_img" />
            <span className="keep_title">Keep</span>
          </div>

          <div className="mt-2 input-group w-50 ">
            <span className="input-group-text bg-white">
              <span className="bi bi-search search"></span>
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search"
            />
          </div>
          <div className="right">
            <span className="bi bi-arrow-clockwise me-2"></span>
            <span className="bi bi-view-list me-2"></span>
            <span className="bi bi-gear me-2"></span>
          </div>
        </div>
        <hr />
      </header>
    </div>
  );
}
