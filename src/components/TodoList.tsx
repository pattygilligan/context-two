import { useState } from "react";
import { useUser } from "~/contexts/UserContext";

export default function TodoList() {
  const { user, login, logout } = useUser();

  return (
    <div>
      <button onClick={logout}>logout</button>
      <h1 className="text-2xl font-bold">{user?.name}&apos;s Todo List!</h1>
    </div>
  );
}
