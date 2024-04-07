import { type NextApiRequest, type NextApiResponse } from "next";
import { sql } from "@vercel/postgres";
import { TodoSchema, Todo } from "~/lib/types";
import { z } from "zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const result = await sql`SELECT * FROM TodoList`;
      const validatedTodos = TodoSchema.array().parse(result.rows);

      res.status(200).json({ todoList: validatedTodos });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Type error in GET method" });
        return;
      } else {
        res.status(500).json({ message: "Error getting data from database" });
      }
    }
  } else if (req.method === "POST") {
    try {
      const newTodo = TodoSchema.parse(req.body);

      const result =
        await sql`INSERT INTO TodoList (Id, Text, Done) VALUES(${newTodo.id},${newTodo.text}, ${newTodo.done}) ON CONFLICT (Id) DO UPDATE SET Text = Excluded.text, Done = Excluded.done`;
      console.log(result);
      res.status(200).json({ result });
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log(error);
        res.status(400).json({ message: "type error" });
        return;
      }
      res.status(500).json({ message: "unable to upsert data into set" });
    }
  } else if (req.method === "DELETE") {
    try {
      const oldTodo = TodoSchema.parse(req.body);
      const result = await sql`DELETE FROM Todolist WHERE Id = ${oldTodo.id}`;
      res.status(200).json({ result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "error deleting " });
    }
  } else {
    res.status(405).json({ message: "method not allowed" });
  }
}
