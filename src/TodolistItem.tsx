import { type ChangeEvent, type KeyboardEvent, useState } from "react";
import type { FilterValues, Task } from "./App";
import { Button } from "./Button";

type Props = {
  title: string;
  tasks: Task[];
  deleteTask: (taskId: string) => void;
  changeFilter: (filter: FilterValues) => void;
  createTask: (title: string) => void;
  changeTaskStatus: (taskid: string, newTaskStatus: boolean) => void;
};

export const TodolistItem = ({
  title,
  tasks,
  deleteTask,
  changeFilter,
  createTask,
  changeTaskStatus,
}: Props) => {

  const [taskTitle, setTaskTitle] = useState("");
  const [isError, setIsError] = useState<string | null>(null);
  const [isActive, setActive] = useState("all")

  const createTaskHandler = () => {
    if (taskTitle.trim()) {
      createTask(taskTitle.trim());
      setTaskTitle("");
    } else {
      setIsError("Title is required");
    }
  };

  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setIsError(null)
    setTaskTitle(event.currentTarget.value);
  };

  const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      createTaskHandler();
    }
  };

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement>,
    taskId: string
  ) => {
    const newTaskStatus = e.currentTarget.checked;
    changeTaskStatus(taskId, newTaskStatus);
  };

  const changeFilterHandler = (filter: FilterValues) => {
    changeFilter(filter)
    setActive(filter)
  }

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          className={isError ? "error" : ""}
          value={taskTitle}
          onChange={changeTaskTitleHandler}
          onKeyDown={createTaskOnEnterHandler}
        />
        <Button title={"+"} onClick={createTaskHandler} />
      </div>
      {isError && <div className="errorMessage">Title is required</div>}

      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            const deleteTaskHandler = () => {
              deleteTask(task.id);
            };

            return (
              <li key={task.id} className={task.isDone ? "isDone" : ""}>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={(e) => onChangeHandler(e, task.id)}
                />
                <span>{task.title}</span>
                <Button title={"x"} onClick={deleteTaskHandler} />
              </li>
            );
          })}
        </ul>
      )}
      <div>
        <Button buttonClassName={isActive === "all" ? "activeFilter" : ""} title={"All"} onClick={() => changeFilterHandler("all")} />
        <Button buttonClassName={isActive === "active" ? "activeFilter" : ""} title={"Active"} onClick={() => changeFilterHandler("active")} />
        <Button buttonClassName={isActive === "completed" ? "activeFilter" : ""} title={"Completed"} onClick={() => changeFilterHandler("completed")} />
      </div>
    </div>
  );
};
