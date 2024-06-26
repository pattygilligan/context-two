import Head from "next/head";
import Link from "next/link";
import TodoList from "~/components/TodoList";
import { useUser } from "~/contexts/UserContext";

export default function Home() {
  const { user, login } = useUser();

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="min-h-96 min-w-96 rounded border bg-white p-4">
          {user ? (
            <TodoList />
          ) : (
            <button onClick={() => login({ name: "Patrick Gilligan" })}>
              login
            </button>
          )}
        </div>
      </main>
    </>
  );
}
