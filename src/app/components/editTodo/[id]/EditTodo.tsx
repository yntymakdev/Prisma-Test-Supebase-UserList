// src/app/editTodo/[id]/page.tsx
"use client";
import { useEffect, useState } from "react";

interface Todo {
  id: number;
  title: string;
  description: string;
}

const EditTodo = ({ params }: { params: { id: string } }) => {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    const fetchTodo = async () => {
      const id = parseInt(params.id);
      console.log("Fetching todo with ID:", id);

      try {
        const response = await fetch(`/api/todo/edit/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTodo(data.todo);
        setTitle(data.todo.title); // Устанавливаем начальное значение заголовка
        setDescription(data.todo.description); // Устанавливаем начальное значение описания
      } catch (error: any) {
        console.error("Failed to fetch todo:", error.message);
        setError("Failed to fetch todo. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [params.id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const id = parseInt(params.id);

    try {
      const response = await fetch(`/api/todo/edit/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedTodo = await response.json();
      console.log("Updated Todo:", updatedTodo);
      setTodo(updatedTodo.updatedTodo);
      // Обновите состояние title и description, если необходимо
      setTitle(updatedTodo.updatedTodo.title);
      setDescription(updatedTodo.updatedTodo.description);
    } catch (error: any) {
      console.error("Failed to update todo:", error.message);
      setError("Failed to update todo. Please try again later.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!todo) return <div>No todo found.</div>;

  return (
    <div>
      <h1>Edit Todo</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Update Todo</button>
      </form>
    </div>
  );
};

export default EditTodo;
