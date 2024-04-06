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
  } else if (req.method === "DELETE") {
  } else {
    res.status(405).json({ message: "method not allowed" });
  }
}
