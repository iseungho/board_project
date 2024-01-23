import React, { useState, useEffect } from "react";
import "./App.scss";

function App() {
  // 로컬 스토리지에서 데이터 불러오기
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const [tasks, setTasks] = useState(savedTasks);
  const [newTask, setNewTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");
  // 로컬 스토리지에 데이터 저장
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  // 할 일 추가
  const addTask = () => {
    if (newTask.trim() !== "") {
      const newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
      setTasks([...tasks, { id: newId, text: newTask }]);
      setNewTask("");
    }
  };
  //할 일 삭제
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    setEditTaskId(null);
  };
  //수정
  const editTask = (task) => {
    setEditTaskId(task.id);
    setEditTaskText(task.text);
  };
  //업데이트
  const updateTask = () => {
    if (editTaskText.trim() !== "") {
      const updatedTasks = tasks.map((task) =>
        task.id === editTaskId ? { ...task, text: editTaskText } : task
      );
      setTasks(updatedTasks);
      setEditTaskId(null);
      setEditTaskText("");
    }
  };
  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          placeholder="새로운 일정을 입력하세요!"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>일정 등록</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {editTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editTaskText}
                  onChange={(e) => setEditTaskText(e.target.value)}
                />
                <button onClick={updateTask}>수정 완료</button>
              </>
            ) : (
              <>
                <div>{task.id}번째 할일</div>
                <div>{task.text}</div>
                <div>
                  <button onClick={() => editTask(task)}>수정하기</button>
                  <button onClick={() => deleteTask(task.id)}>삭제하기</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
