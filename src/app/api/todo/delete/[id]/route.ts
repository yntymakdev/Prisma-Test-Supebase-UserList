import { Prisma } from "@prisma/client";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      const todoId = Number(id);
      await Prisma.todo.delete({
        where: { id: todoId },
      });
      res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
      console.error("Failed to delete todo:", error);
      res.status(500).json({ message: "Failed to delete todo" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
