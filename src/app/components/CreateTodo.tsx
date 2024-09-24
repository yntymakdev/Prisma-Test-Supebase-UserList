"use client";
import { useState } from "react";

const CreateTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Сброс ошибок перед отправкой
    console.log(
      "Submitting form with title:",
      title,
      "description:",
      description
    );

    try {
      const response = await fetch("/api/todo/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        console.log("Todo created successfully!");
        setTitle("");
        setDescription("");
      } else {
        const errorData = await response.json();
        console.log("Error:", errorData);
        setError(errorData.error || "Something went wrong");
      }
    } catch (err) {
      console.error("Request failed:", err);
      setError("Failed to submit todo");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <button type="submit">Create Todo</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default CreateTodo;
