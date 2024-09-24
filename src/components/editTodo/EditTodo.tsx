"use client";
import { useEffect, useState } from "react";

interface Todo {
  id: number;
  title: string;
  description: string;
}

const EditTodo = ({ id }: { id: string }) => {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await fetch(`/edit/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTodo(data.todo);
      } catch (error: any) {
        console.error("Failed to fetch todo:", error);
        setError("Failed to fetch todo. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!todo) return <div>No todo found.</div>;

  return (
    <div>
      <h1>Edit Todo</h1>
      <h2>{todo.title}</h2>
      <p>{todo.description}</p>
      {/* Здесь можно добавить форму для редактирования */}
    </div>
  );
};

export default EditTodo;
