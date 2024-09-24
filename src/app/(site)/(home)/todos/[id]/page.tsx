"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

interface Todo {
  id: number;
  title: string;
  description: string;
  createdAt: string | null;
}

const TodoDetail: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Получаем ID из URL
  const idString = pathname.split("/").pop();
  const id = idString ? parseInt(idString, 10) : null;

  useEffect(() => {
    const fetchTodoDetail = async () => {
      if (id === null) return;
      console.log("Fetching todo with ID:", id); // Лог для отладки

      try {
        const response = await fetch(`/api/todo/${id}`);
        console.log("Response status:", response.status); // Лог состояния ответа

        if (!response.ok) {
          console.log("Response not OK:", await response.text()); // Логирование текста ответа, если не OK
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: { success: boolean; todo: Todo } = await response.json();
        console.log("Response data:", data); // Логирование данных ответа

        if (!data.success) {
          console.log("Todo not found in response");
          throw new Error("No todo found");
        }
        setTodo(data.todo);
      } catch (error: any) {
        console.error("Failed to fetch todo detail:", error);
        setError("Failed to fetch todo detail. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTodoDetail();
  }, [id]);

  // Если данные загружаются
  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  // Если произошла ошибка
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  // Если todo не найден
  if (!todo) {
    return <div>No todo found.</div>;
  }

  // Основное содержимое страницы
  return (
    <div className="todo-detail">
      <h1>{todo.title || "Title not available"}</h1>
      <p>{todo.description || "Description not available"}</p>
      <small>
        {todo.createdAt
          ? new Date(todo.createdAt).toLocaleString()
          : "Date not available"}
      </small>
      <button onClick={() => router.push("/")}>Go to Main Page</button>
    </div>
  );
};

export default TodoDetail;
