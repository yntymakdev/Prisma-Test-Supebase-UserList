"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Todo {
  id: number;
  title: string;
  description: string;
  createdAt: string | null;
}

interface ApiResponse {
  message: string;
  data: Todo[];
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("/api/todo/get");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ApiResponse = await response.json();
        console.log("Fetched data:", data);

        if (data && Array.isArray(data.data)) {
          setTodos(data.data);
        } else {
          console.warn("Expected data.data to be an array, received:", data);
          setTodos([]);
        }
      } catch (error: any) {
        console.error("Failed to fetch todos:", error);
        setError("Failed to fetch todos. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Рассмотрите возможность использования спиннера загрузки
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (todos.length === 0) {
    return <div>No todos found.</div>;
  }

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <h2>{todo.title || "Title not available"}</h2>
            <p>{todo.description || "Description not available"}</p>
            <small>
              {todo.createdAt
                ? new Date(todo.createdAt).toLocaleString()
                : "Date not available"}
            </small>
            <button onClick={() => router.push(`/todos/${todo.id}`)}>
              View Details
            </button>
            <button onClick={() => router.push(`/todo/edit/${todo.id}`)}>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
