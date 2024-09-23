"use client";
import axios from "axios";
import React, { FC, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const ListUser = () => {
  interface FormData {
    username: string;
    email: string;
  }

  const { register, handleSubmit, reset } = useForm();
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("api/v1/get-me");
      console.log("🚀 ~ fetchUser ~ data:", data);
    } catch (error) {
      console.log("🚀 ~ fetchUser ~ error:", error);
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      console.log("🚀 ~ onSubmit ~ formData:", formData); // Log the form data
      const response = await axios.post("api/v1/create-user", formData);
      console.log("🚀 ~ onSubmit ~ response:", response.data);
      reset(); // Reset the form after successful submission
    } catch (error) {
      console.error(
        "🚀 ~ onSubmit ~ error:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      <h1>User List</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("username")}
          type="username"
          placeholder="username"
          required
        />
        <input
          {...register("email")}
          type="email"
          placeholder="email"
          required
        />
        <button type="submit">Click</button>
      </form>
    </div>
  );
};

export default ListUser;
