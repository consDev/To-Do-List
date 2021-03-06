/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { connect } from "react-redux";

import { addTask } from "../../Redux/Tasks/tasks.actions";

import "./TaskToAdd.scss";

const TaskToAdd = ({ toggleModal, addTask, lastTaskId }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskGifts, setTaskGifts] = useState("");
  const [taskImportance, setTaskImportance] = useState("");

  const onInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "title":
        setTaskTitle(value);
        return;
      case "description":
        setTaskDescription(value);
        return;
      case "gifts":
        setTaskGifts(value);
        return;
      case "task-importance":
        setTaskImportance(value);
        return;
      default:
        return;
    }
  };

  const onSubmitTask = () => {
    addTask({
      taskId: lastTaskId === undefined ? 0 : lastTaskId + 1,
      taskTitle: taskTitle,
      taskDescription: taskDescription,
      taskGifts: taskGifts,
      taskImportance: taskImportance,
    });
  };

  return (
    <div className="main-modal">
      <div
        onClick={toggleModal}
        style={{
          position: "absolute",
          top: "40px",
          right: "40px",
          fontSize: "25px",
          color: "#665998",
          cursor: "pointer",
        }}
      >
        X
      </div>
      <div className="task-modal">
        <input
          type="text"
          placeholder="Task Title"
          name="title"
          value={taskTitle}
          onChange={onInputChange}
        />
        <textarea
          placeholder="Task Description"
          name="description"
          value={taskDescription}
          onChange={onInputChange}
        />
        <input
          type="text"
          placeholder="Gifts and KPI for this task"
          name="gifts"
          value={taskGifts}
          onChange={onInputChange}
        />
        <div className="radio-group">
          <div className="radio-btns">
            <input
              type="radio"
              name="task-importance"
              value="Low"
              id="radio-1"
              onChange={onInputChange}
            />
            <label htmlFor="radio-1">Low</label>
          </div>
          <div className="radio-btns">
            <input
              type="radio"
              name="task-importance"
              value="Medium"
              id="radio-2"
              onChange={onInputChange}
            />
            <label htmlFor="radio-2">Medium</label>
          </div>
          <div className="radio-btns">
            <input
              type="radio"
              name="task-importance"
              value="High"
              id="radio-3"
              onChange={onInputChange}
            />
            <label htmlFor="radio-3">High</label>
          </div>
        </div>
        <a
          className="add-btn"
          onClick={() => {
            if (taskTitle && taskDescription && taskGifts && taskImportance) {
              toggleModal();
              onSubmitTask();
            } else {
              alert("Please fill all the fields");
            }
          }}
        >
          Add To Tasks
        </a>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  lastTaskId: state.tasks.lastTaskId,
});

const mapDispatchToProps = (dispatch) => ({
  addTask: (task) => dispatch(addTask(task)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskToAdd);
