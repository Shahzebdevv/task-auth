"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type TaskItemProps = {
  id: string;
  title: string;
  completed: boolean;
};

export default function TaskItem({ id, title, completed }: TaskItemProps) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const isPending = isUpdating || isDeleting;

  const handleToggle = async () => {
    if (isPending) {
      return;
    }

    setError("");
    setIsUpdating(true);

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !completed,
        }),
      });

      if (!response.ok) {
        setError("Unable to update task. Please try again.");
        return;
      }

      router.refresh();
    } catch {
      setError("Unable to update task. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (isPending) {
      return;
    }

    setError("");
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        setError("Unable to delete task. Please try again.");
        return;
      }

      router.refresh();
    } catch {
      setError("Unable to delete task. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <li className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={handleToggle}
          disabled={isPending}
          aria-pressed={completed}
          aria-label={completed ? `Mark ${title} as incomplete` : `Mark ${title} as complete`}
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 ${
            completed
              ? "border-indigo-600 bg-indigo-600 text-white"
              : "border-slate-300 bg-white text-transparent hover:border-indigo-500"
          }`}
        >
          {isUpdating ? "…" : "✓"}
        </button>
        <span
          className={`min-w-0 flex-1 break-words text-sm font-medium ${
            completed ? "text-slate-400 line-through" : "text-slate-800"
          }`}
        >
          {title}
        </span>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="rounded-md px-2.5 py-1.5 text-sm font-medium text-slate-500 transition hover:bg-rose-50 hover:text-rose-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
      {error && (
        <p role="alert" className="mt-3 text-sm text-rose-700">
          {error}
        </p>
      )}
    </li>
  );
}
