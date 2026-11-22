
import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Design Dashboard", status: "Completed" },
    { id: 2, title: "Update Website", status: "Pending" },
    { id: 3, title: "Complete Project", status: "Completed" },
    { id: 4, title: "Testing Application", status: "Pending" }
  ]);

  const [page, setPage] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const [newTask, setNewTask] = useState("");
  const [editId, setEditId] = useState(null);

  const total = tasks.length;
  const completed = tasks.filter(
    task => task.status === "Completed"
  ).length;
  const pending = tasks.filter(
    task => task.status === "Pending"
  ).length;

  const addTask = () => {
    if (!newTask.trim()) return;

    if (editId !== null) {
      setTasks(tasks.map(task =>
        task.id === editId
          ? { ...task, title: newTask }
          : task
      ));
      setEditId(null);
    } else {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          title: newTask,
          status: "Pending"
        }
      ]);
    }

    setNewTask("");
  };

  const deleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = task => {
    setNewTask(task.title);
    setEditId(task.id);
  };

  const changeStatus = id => {
    setTasks(tasks.map(task =>
      task.id === id
        ? {
            ...task,
            status:
              task.status === "Pending"
                ? "Completed"
                : "Pending"
          }
        : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    if (page === "Pending") {
      return task.status === "Pending" && matchesSearch;
    }

    if (page === "Completed") {
      return task.status === "Completed" && matchesSearch;
    }

    return matchesSearch;
  });

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>My Dashboard</h2>

        {["Dashboard", "My Tasks", "Pending", "Completed"].map(item => (
          <button
            key={item}
            className={page === item ? "active" : ""}
            onClick={() => {
              setPage(item);
              setNewTask("");
              setEditId(null);
            }}
          >
            {item}
          </button>
        ))}
      </aside>

      <main className="main">
        <header>
          <div>
            <h1>{page}</h1>
            <p>Manage your tasks easily</p>
          </div>
        </header>

        {page === "Dashboard" && (
          <section className="stats">
            <div className="card">
              <h3>Total Tasks</h3>
              <h1>{total}</h1>
            </div>

            <div className="card">
              <h3>Completed</h3>
              <h1>{completed}</h1>
            </div>

            <div className="card">
              <h3>Pending</h3>
              <h1>{pending}</h1>
            </div>
          </section>
        )}

        <section className="tasks">
          <h2>{page === "Dashboard" ? "Recent Tasks" : page}</h2>

          <div className="task-input">
            <input
              type="text"
              placeholder="Enter task name"
              value={newTask}
              onChange={e => setNewTask(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") addTask();
              }}
            />

            <button onClick={addTask}>
              {editId !== null ? "Update Task" : "Add Task"}
            </button>
          </div>

          <input
            className="search"
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          {filteredTasks.length === 0 && (
            <p className="empty">No tasks found.</p>
          )}

          {filteredTasks.map(task => (
            <div className="task" key={task.id}>
              <span>{task.title}</span>

              <span className={
                task.status === "Completed" ? "done" : "pending"
              }>
                {task.status}
              </span>

              <div className="actions">
                <button onClick={() => changeStatus(task.id)}>
                  {task.status === "Completed" ? "Undo" : "Complete"}
                </button>

                <button onClick={() => editTask(task)}>
                  Edit
                </button>

                <button onClick={() => deleteTask(task.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;
