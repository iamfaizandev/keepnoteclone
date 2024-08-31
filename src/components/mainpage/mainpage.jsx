import { useEffect, useState } from "react";
import "./mainpage.css";
import axios from "axios";
import { useFormik } from "formik";
export function MainPage() {
  const [cardHide, setCardHide] = useState({ display: "none" });
  const [hideNoteInput, sethideNoteInput] = useState({ display: "flex" });
  const [undoRedoDisbabled, setUndoRedoDisbabled] = useState({
    cursor: "not-allowed",
    color: "grey",
  });
  // this input click for display card and hide this input box
  function handleInputOnClick() {
    setCardHide({ display: "block" });
    sethideNoteInput({ display: "none" });
  }

  // on blur hide card of input and all icons and show input
  function handleBlur() {
    setCardHide({ display: "none" });
    sethideNoteInput({ display: "flex" });
  }

  // undo redo on keyup
  function handleOnkeyUp(e) {
    if (e.target.value.length === 1 && 25) {
      setUndoRedoDisbabled({ cursor: "pointer", color: "red" });
    }
  }
  // Database Connection state
  const [tasks, setTasks] = useState([]);
  const formik = useFormik({
    initialValues: {
      Id: 0,
      Title: "",
      Discription: "",
      Date: new Date(),
    },
    onSubmit: (task) => {
      axios.post("http://127.0.0.1:2027/addtask", task);
    },
  });

  function LoadTask() {
    axios.get("http://127.0.0.1:2027/task").then((res) => {
      setTasks(res.data);
      // alert("Appointment Added Successfully..");
      // window.location.reload(true);
    });
  }
  useEffect(() => {
    LoadTask();
  }, [tasks]);
  return (
    <>
      <div className="mainPage">
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="form-control border border-0 w-75"
        >
          <div className="input-group" style={hideNoteInput}>
            <input
              name="takeNote"
              onClick={handleInputOnClick}
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
          <div className="card text-center" style={cardHide}>
            <div className="card-header d-flex justify-content-between align-items-center bg-white border-bottom-0">
              <div>
                <input
                  type="text"
                  className="form-control-plaintext w-50"
                  placeholder="Title"
                  name="Title"
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <input
                  type="date"
                  name="date"
                  onChange={formik.handleChange}
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
                <i
                  title="Background Options"
                  className="bi bi-palette me-3"
                ></i>
                <i title="Add Image" className="bi bi-image me-3"></i>
                <i title="Archive" className="bi bi-save2 me-3"></i>
                <i title="More" className="bi bi-three-dots-vertical me-3"></i>
                <i
                  title="Undo"
                  className="bi bi-arrow-counterclockwise me-3"
                  style={undoRedoDisbabled}
                ></i>
                <i
                  title="Redo"
                  style={undoRedoDisbabled}
                  className="bi bi-arrow-clockwise me-3"
                ></i>
                <button type="submit" className="bi bi-plus"></button>
              </div>
              <div></div>
              <div onClick={handleBlur} style={{ cursor: "pointer" }}>
                close
              </div>
            </div>
          </div>
        </form>

        <main className="task-card" style={{ cursor: "pointer" }}>
          <div className="d-flex  justify-content-center align-items-center">
            {tasks.map((task) => (
              <div className="alert alert-success w-50 me-4 " key={task.Id}>
                <h5 className="alert-title">{task.Title}</h5>
                <p>{task.Description}</p>
                <span className="bi bi-calendar">
                  <span className="ms-4">{task.Date}</span>
                </span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
