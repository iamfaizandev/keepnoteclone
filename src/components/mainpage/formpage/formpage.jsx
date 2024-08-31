import "./formpage.css";

export function FormPage(props) {
  return (
    <div className="container-fluid">
      <form action="">
        <div className="card text-center">
          <div className="card-header ">
            <div>
              <input
                type="text"
                className="form-control-plaintext "
                placeholder="Title"
                name="Title"
              />
            </div>
            <div>
              <input
                type="date"
                name="date"
                className="form-control "
                id="date"
              />
            </div>
          </div>
          <div className="card-body">
            <input
              name="Description"
              className="form-control-plaintext"
              id=""
              cols="10"
              rows="1"
              placeholder="Take a note....."
            />
          </div>
          <div className="card-footer  d-flex justify-content-between align-items-center bg-white border-top-0">
            <div>
              <i title="Remind Me" className="bi bi-bell me-3"></i>
              <i
                title="Collaborator"
                className="bi bi-person-plus-fill me-3"
              ></i>
              <i title="Background Options" className="bi bi-palette me-3"></i>
              <i title="Add Image" className="bi bi-image me-3"></i>
              <i title="Archive" className="bi bi-save2 me-3"></i>
              <i title="More" className="bi bi-three-dots-vertical me-3"></i>
              <i title="Undo" className="bi bi-arrow-counterclockwise me-3"></i>
              <i title="Redo" className="bi bi-arrow-clockwise me-3"></i>
              <button type="submit" className="bi bi-plus"></button>
            </div>
            <div></div>
            <div style={{ cursor: "pointer" }}>close</div>
          </div>
        </div>
      </form>
    </div>
  );
}
