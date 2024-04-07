import { useState, useEffect } from "react";
import { Todo, TodoSchema } from "~/lib/types";

type OnSuccess = (todo: Todo) => void;

export function useDeleteTodo(onSuccess: OnSuccess) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const deleteTodo = async (deleteTodo: Todo) => {
    try {
      setIsLoading(true);
      const response = await fetch("api/todo", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(deleteTodo),
      });
      if (!response.ok) {
        throw new Error("error in useUpsert");
      }
      onSuccess(deleteTodo);
    } catch (error) {
      throw new Error("error in useUpsert");
    }
    setIsLoading(false);
  };

  return { deleteTodo, isLoading, error };
}
