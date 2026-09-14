import LogoutButton from "@/components/LogoutButton";
import TaskForm from "@/components/TaskForm";
import TaskItem from "@/components/TaskItem";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const tasks = await prisma.task.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <header className="flex flex-col gap-5 border-b border-slate-200 pb-7 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-indigo-600">TaskAuth</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              Welcome back, {session.user.name}
            </h1>
            <p className="mt-2 text-sm text-slate-600">{session.user.email}</p>
          </div>
          <LogoutButton />
        </header>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900">Add a task</h2>
          <p className="mt-1 text-sm text-slate-600">
            Keep your next priority visible.
          </p>
          <div className="mt-5">
            <TaskForm />
          </div>
        </section>

        <section className="mt-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">My tasks</h2>
              <p className="mt-1 text-sm text-slate-600">
                {tasks.length === 1 ? "1 task" : `${tasks.length} tasks`} in
                your workspace
              </p>
            </div>
          </div>

          {tasks.length === 0 ? (
            <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
              <h3 className="font-semibold text-slate-900">No tasks yet</h3>
              <p className="mt-2 text-sm text-slate-600">
                Create your first task and start organizing your day.
              </p>
            </div>
          ) : (
            <ul className="mt-5 space-y-3">
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  completed={task.completed}
                />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
