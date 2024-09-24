// src/app/components/.tsx
import { useState, useEffect } from "react";

interface Todo {
  id: number;
  title: string;
  description: string;
}

const DeleteTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([]); // Указываем тип Todo для состояния

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch("/api/todo"); // Получение списка задач
      const data = await response.json();
      setTodos(data.todos); // Убедитесь, что data.todos соответствует типу Todo[]
    };

    fetchTodos();
  }, []);

  const deleteTodo = async (id: number) => {
    const response = await fetch(`/api/todo/delete/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // Удаляем задачу из состояния после успешного удаления
      setTodos(todos.filter((todo) => todo.id !== id));
    } else {
      const errorData = await response.json();
      console.error("Error deleting todo:", errorData.error);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <h2>{todo.title}</h2>
            <p>{todo.description}</p>{" "}
            {/* Здесь должен быть доступ к description */}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteTodo;
