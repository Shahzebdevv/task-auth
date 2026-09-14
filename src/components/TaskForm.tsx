"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TaskForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setMessage("");
    setIsError(false);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setIsError(true);
        setMessage(data.error || "Something went wrong");
        return;
      }

      setMessage("Task created!");
      setTitle("");
      router.refresh();
    } catch {
      setIsError(true);
      setMessage("Unable to create task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label htmlFor="task-title" className="sr-only">
        Task title
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="task-title"
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-3 focus:ring-indigo-100"
          aria-describedby={message ? "task-form-message" : undefined}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-indigo-300"
        >
          {isSubmitting ? "Adding..." : "Add task"}
        </button>
      </div>

      {message && (
        <p
          id="task-form-message"
          aria-live="polite"
          className={`text-sm ${isError ? "text-rose-700" : "text-slate-600"}`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
