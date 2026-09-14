import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-8">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-slate-950"
        >
          TaskAuth
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Get started
          </Link>
        </div>
      </nav>

      <section className="mx-auto max-w-6xl px-6 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="max-w-3xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
            Personal task management
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Keep your day focused, one task at a time.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Taskflow gives you a calm, secure space to capture your tasks, track
            progress, and stay on top of what matters.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex justify-center rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create your workspace
            </Link>
            <Link
              href="/login"
              className="inline-flex justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Log in to your account
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              Everything you need to stay organized.
            </h2>
            <p className="mt-3 text-slate-600">
              A deliberately simple workspace for your everyday priorities.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Create tasks", "Capture work as soon as it comes to mind."],
              ["Track progress", "Mark completed tasks and see what is left."],
              [
                "Secure account",
                "Your workspace is protected by authentication.",
              ],
              ["Personal workspace", "Your task list belongs only to you."],
            ].map(([title, description]) => (
              <article
                key={title}
                className="rounded-xl border border-slate-200 p-5"
              >
                <div className="mb-4 h-2 w-8 rounded-full bg-indigo-600" />
                <h3 className="font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
          Start in three simple steps.
        </h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            [
              "01",
              "Create an account",
              "Set up your private workspace in moments.",
            ],
            [
              "02",
              "Add your tasks",
              "Keep your priorities together in one clear list.",
            ],
            [
              "03",
              "Track progress",
              "Complete tasks as you move through your day.",
            ],
          ].map(([number, title, description]) => (
            <li key={number} className="flex gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
                {number}
              </span>
              <div>
                <h3 className="font-semibold text-slate-900">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p className="font-medium text-slate-700">TaskAuth</p>
          <p>Simple task management for focused work.</p>
        </div>
      </footer>
    </main>
  );
}
