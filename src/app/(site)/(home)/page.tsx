import CreateTodo from "@/components/CreateTodo";
import EditTodo from "@/components/EditTodo";
import TodoPage from "@/components/editTodo/[id]/page";
import ListUser from "@/components/ListUser";
import React from "react";

const page = () => (
  <>
    <CreateTodo />
    <ListUser />
    <TodoPage
      params={{
        id: "",
      }}
    />
  </>
);

export default page;
