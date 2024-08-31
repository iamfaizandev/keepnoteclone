import { useEffect, useState } from "react";
import "./taskpage.css";
import { useFormik } from "formik";
import axios from "axios";

export function TaskPage() {
  /// form state
  const [hideNoteInput, sethideNoteInput] = useState({ display: "flex" });
  const [cardHide, setCardHide] = useState({ display: "none" });
  const [undoRedoDisbabled, setUndoRedoDisbabled] = useState({
    cursor: "not-allowed",
    color: "grey",
  });
  function handleInputHideClick() {
    setCardHide({ display: "block" });
    sethideNoteInput({ display: "none" });
  }
  function handleBlur() {
    setCardHide({ display: "none" });
    sethideNoteInput({ display: "flex" });
  }
  function handleOnkeyUp(e) {
    if (e.target.value.length === 1 && 25) {
      setUndoRedoDisbabled({ cursor: "pointer", color: "red" });
    }
  }
  /// database state function style
  const [HideEditBox, setHideEditBox] = useState({ display: "none" });
  const [hideTaskCard, setHideTaskCard] = useState({ display: "block" });
  // Database Connection state
  const [editTask, setEditTask] = useState([
    { Id: 0, Title: "", Date: new Date(), Description: "" },
  ]);
  const [tasks, setTasks] = useState([]);
  const formik = useFormik({
    initialValues: {
      Id: 0,
      Title: "",
      Description: "",
      Date: new Date(),
    },
    onSubmit: (task) => {
      axios.post("http://127.0.0.1:2028/addtask", task);
    },
  });
  // formik for put edittask
  const editFormik = useFormik({
    initialValues: {
      Id: editTask[0].Id,
      Title: editTask[0].Title,
      Description: editTask[0].Description,
      Date: editTask[0].Date,
    },
    enableReinitialize: true,
    onSubmit: (task) => {
      axios.put(`http://127.0.0.1:2028/edittask/${editTask[0].Id}`, task);
      alert("Task Editted");
      window.location.reload();
    },
  });

  /// load task
  function LoadTask() {
    axios
      .get("http://127.0.0.1:2028/task")
      .then((res) => {
        setTasks(res.data);
        // alert("Appointment Added Successfully..");
        // window.location.reload(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  useEffect(() => {
    LoadTask();
  }, [tasks]);

  function handleDeleteClick(e) {
    var id = parseInt(e.target.value);
    var flag = window.confirm(`Are You Sure\n Want to Deleted?`);
    if (flag === true) {
      axios.delete(`http://127.0.0.1:2028/deletetask/${id}`);
      window.location.reload();
    }
  }
  /// Edit Click
  function OpenEditBox(id) {
    setHideEditBox({ display: "block" });
    setHideTaskCard({ display: "none" });
    axios.get(`http://127.0.0.1:2028/task/${id}`).then((res) => {
      setEditTask(res.data);
    });
  }
  function handleSaveClick() {
    setHideEditBox({ display: "none" });
    setHideTaskCard({ display: "block" });
    window.location.reload();
  }
  function handleCancelClick() {
    setHideEditBox({ display: "none" });
    setHideTaskCard({ display: "block" });
  }
  return (
    <div className="container-fluid ">
      <form action="" className="w-50 top-input-form" style={hideNoteInput}>
        <div className="input-group">
          <input
            name="takeNote"
            onClick={handleInputHideClick}
            type="text"
            className="form-control w-50 border-end-0"
            placeholder="Take a note.."
          />
          <span className="input-group-text bg-white">
            <span
              title="New List"
              className="bi bi-check2-square  ms-1 me-4"
            ></span>
            <span
              title="New Note with Drawing"
              className="bi bi-brush me-4 ms-1 "
            ></span>
            <span
              title="New Note with Image"
              className="bi bi-image me-4 ms-1 "
            ></span>
          </span>
        </div>
      </form>
      <form
        action=""
        onSubmit={formik.handleSubmit}
        className="after-form-hide"
        style={cardHide}
      >
        <div className="card text-center">
          <div className="card-header d-flex justify-content-between bg-white border-bottom-0">
            <div className="d-flex ">
              <div>
                <input
                  type="text"
                  className="form-control-plaintext "
                  placeholder="Title"
                  name="Title"
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <input
                  type="number"
                  className="form-control-plaintext "
                  placeholder="Task No"
                  name="TaskNumber"
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            <div>
              <input
                type="date"
                name="date"
                className="form-control border"
                id="date"
                onChange={formik.handleChange}
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
              onBlur={handleBlur}
              onKeyUp={handleOnkeyUp}
              onChange={formik.handleChange}
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
              <i
                title="Undo"
                style={undoRedoDisbabled}
                className="bi bi-arrow-counterclockwise me-3"
              ></i>
              <i
                title="Redo"
                style={undoRedoDisbabled}
                className="bi bi-arrow-clockwise me-3"
              ></i>
              <button type="submit" className="bi bi-plus"></button>
            </div>
            <div></div>
            <div style={{ cursor: "pointer" }} onClick={handleBlur}>
              close
            </div>
          </div>
        </div>
      </form>
      <main className="mainpage" style={{ cursor: "pointer" }}>
        <div className="d-flex  justify-content-center align-items-center">
          {tasks.map((task) => (
            <div
              className="alert alert-success  me-4 "
              style={hideTaskCard}
              key={task.Id}
            >
              <button
                className="btn btn-close text-end"
                name=""
                title="Close"
                style={{ float: "right" }}
                onClick={handleDeleteClick}
              ></button>
              <div className="alert-title fw-bold" style={{ fontSize: "20px" }}>
                {task.Title}
              </div>
              <p style={{ fontSize: "15px" }}>{task.Description}</p>
              <span className="bi bi-calendar">
                <span className="ms-1">{task.Date}</span>
              </span>
              <div className="mt-3">
                <button
                  onClick={() => OpenEditBox(task.Id)}
                  className="bi bi-pen-fill btn btn-outline-secondary"
                  title="Edit"
                ></button>
              </div>
            </div>
          ))}
          {/* Edit Box */}
          <form
            className="alert alert-danger  me-4 "
            onSubmit={editFormik.handleSubmit}
            style={HideEditBox}
          >
            <div className="alert-title fw-bold ">
              <input
                type="text"
                placeholder="Title "
                name="Title"
                value={editFormik.values.Title}
                className="form-control-plaintext w-75"
                onChange={editFormik.handleChange}
              />
            </div>
            <p>
              <input
                name="Description"
                value={editFormik.values.Description}
                className="form-control-plaintext"
                id=""
                cols="10"
                rows="1"
                placeholder="Take a note....."
                onChange={editFormik.handleChange}
              />
            </p>
            <span>
              <input
                value={editFormik.values.Date}
                type="date"
                name="Date"
                className="form-control-plaintext"
                onChange={editFormik.handleChange}
                id=""
              />
            </span>
            <div className="mt-3 d-flex justify-content-between">
              <button
                onClick={handleSaveClick}
                type="submit"
                className="bi bi-save-fill btn btn-outline-dark"
                title="Save"
              ></button>
              <button
                onClick={handleCancelClick}
                type="button"
                className="bi bi-x-square-fill btn btn-outline-danger "
                title="Cancel"
              ></button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
