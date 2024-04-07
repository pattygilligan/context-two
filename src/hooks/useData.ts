import { useState, useEffect } from "react";
import { type Todo, TodoSchema } from "~/lib/types";

interface FetchResponse {
  todoList: Todo[];
}

export function useData() {
  const [fetchedTodoList, setFetchedTodoList] = useState<Todo[] | null>(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [dataError, setDataError] = useState("");

  useEffect(() => {
    try {
      setDataLoading(true);
      fetch("api/todo", {
        method: "GET",
      })
        .then((response) => response.json() as Promise<FetchResponse>)
        .then((data) => {
          setFetchedTodoList(TodoSchema.array().parse(data.todoList));
        })
        .catch((error) => {
          setDataError("Error in the useData Hook");
        });
    } catch (error) {
      throw new Error("error in usedata");
    }
    setDataLoading(false);
  }, []);

  return { fetchedTodoList, dataLoading, dataError };
}
