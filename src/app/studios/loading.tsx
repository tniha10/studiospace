import { Search } from "lucide-react";

export default function StudiosLoading() {
  return (
    <main className="min-h-screen bg-base-200 px-5 py-16 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="skeleton h-4 w-32" />
        <div className="skeleton mt-4 h-12 w-2/3 max-w-xl" />
        <div className="skeleton mt-4 h-4 w-full max-w-3xl" />

        <div className="mt-10 flex flex-wrap gap-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="skeleton h-8 w-28 rounded-full" />
          ))}
        </div>

        <section className="mt-10 rounded-2xl border border-base-300 bg-base-100 p-7 md:p-10">
          <div className="mb-8 flex items-center gap-2 text-base-content/60">
            <Search size={18} />
            <span className="loading loading-spinner loading-sm" />
            Loading studios...
          </div>

          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 rounded-xl border border-base-300 p-5 sm:flex-row"
              >
                <div className="skeleton h-28 w-full rounded-xl sm:w-40" />
                <div className="flex-1 space-y-3 py-2">
                  <div className="skeleton h-4 w-2/3" />
                  <div className="skeleton h-3 w-1/2" />
                  <div className="skeleton h-3 w-1/3" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
