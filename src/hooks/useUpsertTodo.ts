import { useState, useEffect } from "react";
import { Todo, TodoSchema } from "~/lib/types";

type OnSuccess = (todo: Todo) => void;

export function useUpsert(onSuccess: OnSuccess) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const upsert = async (newTodo: Todo) => {
    try {
      setIsLoading(true);
      const response = await fetch("api/todo", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
      if (!response.ok) {
        throw new Error("error in useUpsert");
      }
      onSuccess(newTodo);
    } catch (error) {
      throw new Error("error in useUpsert");
    }
    setIsLoading(false);
  };

  return { upsert, isLoading, error };
}
