import CreateTodo from "@/app/components/CreateTodo";
import EditTodo from "@/app/components/editTodo/[id]/EditTodo";
import ListUser from "@/app/components/ListUser";
import React from "react";

const page = () => (
  <>
    <CreateTodo />
    <ListUser />
    <EditTodo
      params={{
        id: "1",
      }}
    />
  </>
);

export default page;
