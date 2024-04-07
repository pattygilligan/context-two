import { z } from "zod";

export const TodoSchema = z.object({
  text: z.string(),
  done: z.boolean(),
  id: z.number(),
});

export type Todo = z.infer<typeof TodoSchema>;
