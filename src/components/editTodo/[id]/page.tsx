// src/app/todo/edit/[id]/page.tsx

import EditTodo from "../EditTodo";

const Page = ({ params }: { params: { id: string } }) => {
  return <EditTodo id={params.id} />;
};

export default Page;
