import { type ChangeEvent, type KeyboardEvent, useState } from "react";
import type { FilterValues, Task } from "./App";
import { Button } from "./Button";

type Props = {
  title: string;
  tasks: Task[];
  deleteTask: (taskId: string) => void;
  changeFilter: (filter: FilterValues) => void;
  createTask: (title: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean) => void;
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
  const [isError, setIsError] = useState<string | null>(null)
  const [filter, setFilter] = useState("all")

  const createTaskHandler = () => {
    if (taskTitle.trim()) {
      createTask(taskTitle.trim());
      setTaskTitle("");
    } else {
      setIsError("Enter valid name!")
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

  const changeFilterHandler = (filter: FilterValues) => {
    changeFilter(filter)
    setFilter(filter)
  }

const changeTaskStatusHandler = (taskId: string, e: ChangeEvent<HTMLInputElement>) => {
  changeTaskStatus(taskId, e.currentTarget.checked);
};

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          value={taskTitle}
          onChange={changeTaskTitleHandler}
          onKeyDown={createTaskOnEnterHandler}
          className={isError ? "error" : ""}
        />
        <Button title={"+"} onClick={createTaskHandler} />
      </div>
      <div className="errorMessage">{isError}</div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            const deleteTaskHandler = () => {
              deleteTask(task.id);
            };
            // const changeTaskStatusHandler = (
            //   e: ChangeEvent<HTMLInputElement>
            // ) => {
            //   changeTaskStatus(task.id, e.currentTarget.checked);
            // };
            return (
              <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={(e) => changeTaskStatusHandler(task.id, e)}
                />
                <span>{task.title}</span>
                <Button title={"x"} onClick={deleteTaskHandler} />
              </li>
            );
          })}
        </ul>
      )}
      <div>
        <Button title={"All"} buttonClassName={filter === "all" ? "activeBakground" : ""} onClick={() => changeFilterHandler("all")} />
        <Button title={"Active"} buttonClassName={filter === "active" ? "activeBakground" : ""} onClick={() => changeFilterHandler("active")} />
        <Button title={"Completed"} buttonClassName={filter === "completed" ? "activeBakground" : ""} onClick={() => changeFilterHandler("completed")} />
      </div>
    </div>
  );
};
