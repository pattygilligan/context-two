import { useState, useEffect } from "react";
import { useUser } from "~/contexts/UserContext";
import type { Todo } from "~/lib/types";
import { useData } from "~/hooks/useData";
import { useUpsert } from "~/hooks/useUpsertTodo";
import { useDeleteTodo } from "~/hooks/useDeleteTodo";

export default function TodoList() {
  const { user, login, logout } = useUser();
  const [todoList, setTodoList] = useState<Todo[] | null>(null);
  const [inputText, setInputText] = useState("");

  const { fetchedTodoList, dataLoading, dataError } = useData();

  const onUpsertSuccess = (newTodo: Todo) => {
    if (!todoList?.find((item) => item.id === newTodo.id)) {
      setTodoList([...(todoList ?? []), newTodo]);
    } else {
      setTodoList(
        todoList?.map((item) => (item.id === newTodo.id ? newTodo : item)) ??
          [],
      );
    }
  };

  const { upsert, isLoading } = useUpsert(onUpsertSuccess);

  const onDeleteSuccess = (oldTodo: Todo) => {
    setTodoList(todoList?.filter((item) => item.id !== oldTodo.id) ?? []);
  };

  const { deleteTodo } = useDeleteTodo(onDeleteSuccess);

  useEffect(() => {
    setTodoList(fetchedTodoList);
  }, [fetchedTodoList]);

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min); // Ensure the min is rounded up to the nearest integer
    max = Math.floor(max); // Ensure the max is rounded down to the nearest integer
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }

  const handleAddTodo = () => {
    //1 is temporary ID
    const id = getRandomInt(1, 10000000);
    const newTodo = { text: inputText, done: false, id: id };
    void upsert(newTodo);
    setInputText("");
  };

  return (
    <div>
      <button onClick={logout}>logout</button>
      <h1 className="text-2xl font-bold">{user?.name}&apos;s Todo List!</h1>
      {todoList?.map((item) => {
        return (
          <div key={item.id} className="flex gap-2">
            <input
              type="checkbox"
              checked={item.done}
              onChange={() => upsert({ ...item, done: !item.done })}
            />
            <p>{item.text}</p>
            <button
              type="button"
              className="flex-grow text-red-500"
              onClick={() => deleteTodo(item)}
            >
              delete
            </button>
          </div>
        );
      })}
      <div>
        <form className="flex flex-grow flex-col gap-4">
          <h1 className="text-xl font-bold">Create Todo</h1>
          <input
            className="rounded border p-2"
            type="text"
            value={inputText}
            placeholder="enter todo here"
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            type="button"
            className="rounded bg-black p-2 text-white"
            onClick={handleAddTodo}
          >
            Create Todo
          </button>
        </form>
      </div>
    </div>
  );
}
